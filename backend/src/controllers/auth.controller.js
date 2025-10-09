import bcrypt from "bcryptjs";
import { db } from "../libs/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getCookieConfig } from "../middleware/cors.middleware.js";
import { generateOTP, sendVerificationEmail } from "../services/otpService.js";

// Define Role enum to match the schema
const Role = {
  ADMIN: "ADMIN",
  USER: "USER"
};
dotenv.config();

export const register = async (req, res) => {
  console.log("=== REGISTRATION ENDPOINT HIT ===");
  console.log("Request body:", req.body);
  
  // Check if request body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    console.log("❌ Empty request body");
    return res.status(400).json({ message: "Request body is empty" });
  }
  
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
    // Use select to only retrieve needed fields to avoid schema mismatch issues
    const existingUser = await db.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true
      }
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
    
    // Explicitly define the fields we want to create to avoid schema mismatch issues
    console.log("Creating user with explicit fields...");
    
    const newUser = await db.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: Role.USER,
        streakCount: 0,
        maxStreakCount: 0,
        emailVerified: false // Explicitly set emailVerified to false
      },
      // Select only fields we know exist in the database
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        streakCount: true,
        maxStreakCount: true,
        emailVerified: true,
        createdAt: true
      }
    });
    
    console.log("✅ User created with ID:", newUser.id);
    
    // Generate and send OTP for email verification
    console.log("📧 Generating OTP for email verification...");
    const otp = generateOTP(email);
    const emailSent = await sendVerificationEmail(email, name, otp);
    
    if (emailSent) {
      console.log("✅ Verification email sent successfully");
    } else {
      console.log("⚠️ Failed to send verification email, but continuing registration");
    }
    
    console.log("🎉 Registration successful!");
    
    // Generate JWT token for immediate login after signup
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie with enhanced error handling
    try {
      const cookieConfig = getCookieConfig();
      console.log("🍪 Setting JWT cookie with config:", cookieConfig);
      res.cookie("jwt", token, cookieConfig);
      
      // Also add the token to the response body for clients that can't access cookies
      console.log("🔑 Adding token to response body as fallback");
    } catch (cookieError) {
      console.error("❌ Cookie setting error:", cookieError.message);
    }
    
    return res.status(201).json({
      success: true,
      message: "User registered successfully. Please check your email for verification code.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        emailVerified: newUser.emailVerified
      },
      requiresVerification: true
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
  console.log("=== LOGIN ENDPOINT HIT ===");
  console.log("Request body:", req.body ? { ...req.body, password: req.body.password ? '[REDACTED]' : null } : 'No body');
  
  // Check if request body exists
  if (!req.body || Object.keys(req.body).length === 0) {
    console.log("❌ Empty request body");
    return res.status(400).json({ 
      success: false,
      message: "Request body is empty", 
      code: "EMPTY_REQUEST" 
    });
  }
  
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
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        emailVerified: true, // Make sure we select emailVerified field
        lastLogin: true,
        streakCount: true,
        maxStreakCount: true
      }
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

    // Check if email is verified - if not, send a new OTP
    if (!user.emailVerified) {
      console.log("⚠️ Email not verified for user:", user.email);
      
      // Generate and send a new OTP
      console.log("📧 Generating new OTP for unverified user...");
      const otp = generateOTP(user.email);
      const emailSent = await sendVerificationEmail(user.email, user.name, otp);
      
      if (emailSent) {
        console.log("✅ New verification email sent successfully");
      } else {
        console.log("⚠️ Failed to send verification email, but continuing with response");
      }
      
      return res.status(403).json({
        success: false,
        message: "Email not verified. We've sent a new verification code to your email.",
        code: "EMAIL_NOT_VERIFIED",
        email: user.email,
        requiresVerification: true,
        otpSent: emailSent
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

    // Set cookie with enhanced handling for cross-origin contexts
    const cookieConfig = getCookieConfig();
    console.log("🍪 Setting JWT cookie with config:", cookieConfig);
    
    try {
      // Always set the cookie
      res.cookie("jwt", token, cookieConfig);
      console.log("✅ Cookie set successfully");
      
      // Also include the token in response body as a fallback
      // This is useful for clients that can't access cookies due to browser restrictions
      // or when cookies aren't properly set in cross-origin contexts
      console.log("🔑 Adding token to response body as fallback");
    } catch (cookieError) {
      console.error("❌ Error setting cookie:", cookieError);
      // Continue execution even if cookie setting fails
    }

    console.log("✅ Login successful for user:", user.email);
    // Return response with token in body as fallback for clients with cookie issues
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        streakCount,
        maxStreakCount
      },
      // Include auth token in response for clients that can't access cookies
      // The frontend can use this as a fallback
      auth: {
        token,
        expiresIn: "7d"
      }
    });
  } catch (error) {
    console.error("💥 Error logging in user:", { 
      message: error.message,
      code: error.code,
      name: error.name,
      stack: error.stack
    });
    
    // More detailed error logging
    try {
      console.error("📊 Debug info for login error:");
      console.error("JWT_SECRET exists:", !!process.env.JWT_SECRET);
      console.error("NODE_ENV:", process.env.NODE_ENV);
      
      // Check cookie handling
      if (error.message && error.message.includes("cookie")) {
        console.error("🍪 Cookie-related error detected");
        // Try login without setting the cookie
        return res.status(200).json({
          success: true,
          message: "User logged in successfully (cookie handling bypassed)",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            streakCount: user.streakCount || 0,
            maxStreakCount: user.maxStreakCount || 0
          },
          tokenError: error.message
        });
      }
    } catch (debugError) {
      console.error("Error in debug handling:", debugError);
    }
    
    // Database connection issues
    if (error.code === "P1001" || error.code === "P1002") {
      return res.status(503).json({
        success: false,
        message: "Database service unavailable, please try again later",
        code: "DB_ERROR"
      });
    }
    
    // JWT errors
    if (error.name === "JsonWebTokenError" || error.message.includes("jwt")) {
      return res.status(500).json({
        success: false,
        message: "Authentication error - please contact support",
        code: "JWT_ERROR",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
    
    // Database update errors
    if (error.message.includes("update") || error.message.includes("prisma")) {
      return res.status(500).json({
        success: false,
        message: "Database update error - please try again",
        code: "UPDATE_ERROR",
        details: process.env.NODE_ENV === "development" ? error.message : undefined
      });
    }
    
    return res.status(500).json({ 
      success: false,
      message: "Error logging in user",
      code: "SERVER_ERROR",
      details: process.env.NODE_ENV === "development" ? error.message : undefined
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Get cookie config but ensure path is correct
    const cookieConfig = {
      ...getCookieConfig(),
      maxAge: 0,           // Immediate expiration
      expires: new Date(0) // Set to epoch time
    };
    
    console.log("🍪 Clearing JWT cookie with config:", cookieConfig);
    
    // Clear the cookie by setting an expired date
    res.cookie("jwt", "", cookieConfig);
    res.clearCookie("jwt", cookieConfig);
    
    console.log("✅ JWT cookie cleared successfully");
    
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

// Token refresh endpoint
export const refreshToken = async (req, res) => {
  try {
    const user = req.loggedInUser;
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No user found to refresh token",
        code: "NO_USER",
      });
    }
    
    console.log(`🔄 Refreshing token for user: ${user.email}`);
    
    // Generate a new token
    const token = jwt.sign(
      { 
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    
    // Set the new token as a cookie
    res.cookie("jwt", token, getCookieConfig());
    
    console.log("✅ Token refreshed successfully");
    
    // Return success response with token in body for clients with cookie issues
    return res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        streakCount: user.streakCount,
        maxStreakCount: user.maxStreakCount
      },
      // Include auth token in response for clients that can't access cookies
      auth: {
        token,
        expiresIn: "7d"
      }
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to refresh token",
      code: "REFRESH_ERROR",
    });
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
