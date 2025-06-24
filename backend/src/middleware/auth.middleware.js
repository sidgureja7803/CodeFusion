import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
import rateLimit from "express-rate-limit";

// Rate limiting for authentication endpoints
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    error: "Too many authentication attempts, please try again later.",
    retryAfter: "15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Enhanced authentication middleware with security improvements
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt || req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        message: "Unauthorized - No token found",
        code: "NO_TOKEN"
      });
    }

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if token is expired (additional safety check)
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({ 
          message: "Unauthorized - Token expired",
          code: "TOKEN_EXPIRED"
        });
      }

      // Fetch user with security considerations
      const user = await db.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          streakCount: true,
          maxStreakCount: true,
          gender: true,
          dateOfBirth: true,
          bio: true,
          githubProfile: true,
          linkedinProfile: true,
          createdAt: true,
          updatedAt: true,
          lastLogin: true,
          isActive: true, // Add this field to user model
          emailVerified: true, // Add this field for email verification
        },
      });

      if (!user) {
        return res.status(404).json({ 
          message: "User not found",
          code: "USER_NOT_FOUND"
        });
      }

      // Check if user account is active
      if (user.isActive === false) {
        return res.status(403).json({ 
          message: "Account suspended",
          code: "ACCOUNT_SUSPENDED"
        });
      }

      // Update last activity timestamp
      await db.user.update({
        where: { id: user.id },
        data: { lastLogin: new Date() }
      });

      // Attach user to request object
      req.loggedInUser = user;
      
      // Add security headers
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      
      next();
    } catch (jwtError) {
      // Handle specific JWT errors
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: "Unauthorized - Token expired",
          code: "TOKEN_EXPIRED"
        });
      } else if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          message: "Unauthorized - Invalid token",
          code: "INVALID_TOKEN"
        });
      } else {
        return res.status(401).json({ 
          message: "Unauthorized - Token verification failed",
          code: "TOKEN_VERIFICATION_FAILED"
        });
      }
    }
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({ 
      message: "Internal server error during authentication",
      code: "AUTH_ERROR"
    });
  }
};

// Enhanced admin middleware with logging
export const checkAdmin = async (req, res, next) => {
  try {
    const user = req.loggedInUser;
    
    if (!user) {
      return res.status(401).json({ 
        message: "Unauthorized - No user found",
        code: "NO_USER"
      });
    }
    
    if (user.role !== "ADMIN") {
      // Log unauthorized admin access attempts
      console.warn(`Unauthorized admin access attempt by user ${user.id} (${user.email})`);
      
      return res.status(403).json({ 
        message: "Forbidden - Admin access required",
        code: "INSUFFICIENT_PRIVILEGES"
      });
    }
    
    // Log admin actions for audit trail
    console.info(`Admin action by user ${user.id} (${user.email}): ${req.method} ${req.path}`);
    
    next();
  } catch (error) {
    console.error("Error in checkAdmin middleware:", error);
    return res.status(500).json({ 
      message: "Error checking admin privileges",
      code: "ADMIN_CHECK_ERROR"
    });
  }
};

// Token refresh middleware
export const refreshTokenMiddleware = async (req, res, next) => {
  try {
    const user = req.loggedInUser;
    
    if (!user) {
      return next();
    }

    // Generate new token if current one expires within 1 hour
    const token = req.cookies.jwt;
    const decoded = jwt.decode(token);
    
    if (decoded && decoded.exp && (decoded.exp * 1000 - Date.now()) < 3600000) {
      const newToken = jwt.sign(
        { 
          id: user.id, 
          email: user.email,
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.cookie("jwt", newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });
    }

    next();
  } catch (error) {
    console.error("Error in refresh token middleware:", error);
    next();
  }
};

// Session validation middleware
export const validateSession = async (req, res, next) => {
  try {
    const user = req.loggedInUser;
    
    if (!user) {
      return next();
    }

    // Check for concurrent sessions (optional - implement based on requirements)
    // This could involve checking a sessions table in the database
    
    // Validate user account status
    const currentUser = await db.user.findUnique({
      where: { id: user.id },
      select: { isActive: true, emailVerified: true }
    });

    if (!currentUser?.isActive) {
      return res.status(403).json({ 
        message: "Account has been deactivated",
        code: "ACCOUNT_DEACTIVATED"
      });
    }

    next();
  } catch (error) {
    console.error("Error in session validation:", error);
    next();
  }
};
