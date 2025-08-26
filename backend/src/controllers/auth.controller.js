import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import { Role } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getCookieConfig } from "../middleware/cors.middleware.js";
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
      role: "USER", // Use string instead of enum for now
      emailVerified: false // Set email as not verified initially
    };
    console.log("User data to create:", { ...userData, password: "[HIDDEN]" });

    const newUser = await db.user.create({
      data: userData,
    });
    
    console.log("✅ User created with ID:", newUser.id);

    // Import OTP service and generate OTP
    const { generateOTP, sendVerificationEmail } = await import("../services/otpService.js");
    
    // Generate and send OTP
    const otp = generateOTP(email);
    await sendVerificationEmail(email, name, otp);
    console.log("✉️ Verification email sent to:", email);

    console.log("🎉 Registration successful! OTP verification required.");
    
    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify your email with the OTP sent to your inbox.",
      requireVerification: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
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

  console.log("Login attempt:", { email, hasPassword: !!password });

  try {
    // Basic validation
    if (!email || !password) {
      console.log("❌ Login failed: Missing required fields");
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required",
        code: "MISSING_CREDENTIALS"
      });
    }

    // Find user by email
    console.log("🔍 Looking up user by email...");
    const user = await db.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      console.log("❌ Login failed: User not found with email:", email);
      return res.status(401).json({ 
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND"
      });
    }

    console.log("✅ User found, validating password...");
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("❌ Login failed: Incorrect password for user:", user.email);
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please try again.",
        code: "INVALID_PASSWORD"
      });
    }

    // Check if email is verified
    if (user.emailVerified === false) {
      console.log("⚠️ Login attempt with unverified email:", user.email);
      
      // Import OTP service and generate new OTP
      const { generateOTP, sendVerificationEmail } = await import("../services/otpService.js");
      
      // Generate and send a new OTP
      const otp = generateOTP(email);
      await sendVerificationEmail(email, user.name, otp);
      
      console.log("✉️ New verification email sent to:", email);
      
      return res.status(403).json({
        success: false,
        message: "Email not verified. A new verification code has been sent to your email.",
        requireVerification: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    }

    console.log("✅ Email verified, generating token...");
    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Update last login and streak
    console.log("📊 Updating user streak data...");
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
      console.log(`✨ User streak continued: ${streakCount} days`);
    } else if (!isSameDay) {
      // Streak broken, unless this is the first login of today
      streakCount = 1;
      console.log("🔄 User streak reset to 1 day");
    } else {
      console.log("👍 User already logged in today, streak unchanged");
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

    // Set cookie using consistent helper
    console.log("🍪 Setting JWT cookie with config:", getCookieConfig());
    res.cookie("jwt", token, getCookieConfig());

    console.log("✅ Login successful for user:", user.email);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        streakCount,
        maxStreakCount
      },
    });
  } catch (error) {
    console.error("💥 Error logging in user:", { 
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    
    // Database connection issues
    if (error.code === "P1001" || error.code === "P1002") {
      return res.status(503).json({
        success: false,
        message: "Database service unavailable, please try again later",
        code: "DB_ERROR"
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: "Error logging in user",
      code: "SERVER_ERROR"
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear cookie using consistent helper
    console.log("🍪 Clearing JWT cookie with config:", getCookieConfig());
    res.clearCookie("jwt", getCookieConfig());
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
    console.error("Error updating profile:", { 
      message: error.message,
      code: error.code,
      stack: error.stack,
      prismaError: error.code === "P2002" ? "Unique constraint failed" : undefined
    });

    // Handle Prisma unique constraint violation
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
        code: "EMAIL_EXISTS",
        field: "email"
      });
    }

    // Database connection issues
    if (error.code === "P1001" || error.code === "P1002") {
      return res.status(503).json({
        success: false,
        message: "Database service unavailable, please try again later",
        code: "DB_ERROR"
      });
    }

    // Generic server error with more details in logs
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating profile",
      code: "SERVER_ERROR"
    });
  }
};
