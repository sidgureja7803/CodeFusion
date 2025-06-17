import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { Role } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  console.log("=== REGISTRATION ENDPOINT HIT ===");
  console.log("Request body:", req.body);
  
  try {
    const { name, email, password } = req.body;
    
    // Basic validation
    if (!name || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    console.log("✅ All fields provided");
    console.log("📧 Email:", email);
    console.log("👤 Name:", name);

    // Test database connection
    console.log("🔍 Testing database connection...");
    const testQuery = await db.user.count();
    console.log("✅ Database query successful. User count:", testQuery);

    // Check if user exists
    console.log("🔍 Checking if user exists...");
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (existingUser) {
      console.log("❌ User already exists");
      return res.status(400).json({ message: "User already exists with this email" });
    }
    
    console.log("✅ Email is available");

    // Hash password
    console.log("🔐 Hashing password...");
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed");

    // Create user (simplified)
    console.log("👤 Creating user...");
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "USER" // Use string instead of enum for now
    };
    console.log("User data to create:", { ...userData, password: "[HIDDEN]" });

    const newUser = await db.user.create({
      data: userData,
    });
    
    console.log("✅ User created with ID:", newUser.id);

    // Generate token
    console.log("🔑 Generating JWT...");
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("✅ JWT generated");

    // Set cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    console.log("🎉 Registration successful!");
    
    return res.status(201).json({
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
    console.log("💥 ERROR IN REGISTRATION:");
    console.log("Error type:", error.constructor.name);
    console.log("Error message:", error.message);
    console.log("Error code:", error.code);
    console.log("Error stack:", error.stack);
    
    if (error.code === 'P2002') {
      return res.status(400).json({ message: "Email already exists" });
    }
    
    return res.status(500).json({ 
      message: "Registration failed",
      error: process.env.NODE_ENV === "development" ? error.message : "Internal server error"
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
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
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

export const updateProfile = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const {
      name,
      gender,
      dateOfBirth,
      bio,
      githubProfile,
      linkedinProfile
    } = req.body;

    console.log("Updating profile for user:", userId);
    console.log("Profile data:", req.body);

    // Validate optional fields
    const updateData = {};
    
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: "Name must be a non-empty string" 
        });
      }
      updateData.name = name.trim();
    }

    if (gender !== undefined) {
      const validGenders = ['MALE', 'FEMALE', 'OTHER', 'PREFER_NOT_TO_SAY'];
      if (gender && !validGenders.includes(gender)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid gender value" 
        });
      }
      updateData.gender = gender || null;
    }

    if (dateOfBirth !== undefined) {
      if (dateOfBirth) {
        const dobDate = new Date(dateOfBirth);
        if (isNaN(dobDate.getTime())) {
          return res.status(400).json({ 
            success: false, 
            message: "Invalid date of birth format" 
          });
        }
        // Check if date is not in the future
        if (dobDate > new Date()) {
          return res.status(400).json({ 
            success: false, 
            message: "Date of birth cannot be in the future" 
          });
        }
        updateData.dateOfBirth = dobDate;
      } else {
        updateData.dateOfBirth = null;
      }
    }

    if (bio !== undefined) {
      if (bio && typeof bio !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Bio must be a string" 
        });
      }
      if (bio && bio.length > 500) {
        return res.status(400).json({ 
          success: false, 
          message: "Bio must be 500 characters or less" 
        });
      }
      updateData.bio = bio ? bio.trim() : null;
    }

    if (githubProfile !== undefined) {
      if (githubProfile) {
        // Basic GitHub URL validation
        const githubRegex = /^https:\/\/github\.com\/[a-zA-Z0-9._-]+\/?$/;
        if (!githubRegex.test(githubProfile)) {
          return res.status(400).json({ 
            success: false, 
            message: "Invalid GitHub profile URL format" 
          });
        }
      }
      updateData.githubProfile = githubProfile || null;
    }

    if (linkedinProfile !== undefined) {
      if (linkedinProfile) {
        // Basic LinkedIn URL validation
        const linkedinRegex = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9._-]+\/?$/;
        if (!linkedinRegex.test(linkedinProfile)) {
          return res.status(400).json({ 
            success: false, 
            message: "Invalid LinkedIn profile URL format" 
          });
        }
      }
      updateData.linkedinProfile = linkedinProfile || null;
    }

    // Update user profile
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        gender: true,
        dateOfBirth: true,
        bio: true,
        githubProfile: true,
        linkedinProfile: true,
        streakCount: true,
        maxStreakCount: true,
        createdAt: true,
        updatedAt: true
      }
    });

    console.log("Profile updated successfully:", updatedUser.id);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error updating profile" 
    });
  }
};
