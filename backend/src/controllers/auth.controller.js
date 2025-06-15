import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { Role } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Registering user:", { name, email, password });
  
  try {
    // Validate input
    if (!name || !email || !password) {
      console.log("Missing required fields:", { name: !!name, email: !!email, password: !!password });
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    console.log("Checking if user exists with email:", email);
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("User already exists:", existingUser.email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    console.log("Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    // Create user
    console.log("Creating user with data:", { name, email, role: Role.USER });
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: Role.USER,
      },
    });
    console.log("User created successfully:", newUser.id);

    // Generate JWT token
    console.log("Generating JWT token...");
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("JWT token generated successfully");

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("Registration successful for user:", newUser.email);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        image: newUser.image,
      },
    });
  } catch (error) {
    console.error("Detailed error creating user:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Full error:", error);
    
    // Check for specific Prisma errors
    if (error.code === 'P2002') {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("Logging in user:", { email, password });

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Update last login and streak
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastLogin = user.lastLogin || new Date(0);
    const lastLoginDate = new Date(lastLogin);

    // Format dates to compare just the date part (not time)
    const isYesterday =
      lastLoginDate.getFullYear() === yesterday.getFullYear() &&
      lastLoginDate.getMonth() === yesterday.getMonth() &&
      lastLoginDate.getDate() === yesterday.getDate();

    // Format today for comparison
    const isSameDay =
      lastLoginDate.getFullYear() === today.getFullYear() &&
      lastLoginDate.getMonth() === today.getMonth() &&
      lastLoginDate.getDate() === today.getDate();

    let streakCount = user.streakCount || 0;
    let maxStreakCount = user.maxStreakCount || 0;

    if (isYesterday) {
      // Continued streak
      streakCount += 1;
    } else if (!isSameDay) {
      // Streak broken, unless this is the first login of today
      streakCount = 1;
    }

    // Update max streak if current streak is higher
    maxStreakCount = Math.max(streakCount, maxStreakCount);

    await db.user.update({
      where: { id: user.id },
      data: {
        lastLogin: today,
        streakCount,
        maxStreakCount,
      },
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Error logging in user" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Error logging out user" });
  }
};

export const me = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "User authenticated successfully",
      user: req.loggedInUser,
    });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Error getting user" });
  }
};
