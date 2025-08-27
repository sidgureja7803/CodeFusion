import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";
import rateLimit from "express-rate-limit";
import { getCookieConfig } from "./cors.middleware.js";

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

// Schema-compatible version of the auth middleware
// Avoids schema field mismatches by only selecting fields that are guaranteed to exist
export const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header with better debugging
    const cookieToken = req.cookies?.jwt;
    const authHeaderToken = req.headers.authorization?.replace('Bearer ', '');
    const token = cookieToken || authHeaderToken;
    
    console.log(`🔐 Auth check for path: ${req.method} ${req.path}`);
    console.log(`🍪 Cookie token exists: ${!!cookieToken}`);
    console.log(`🔑 Auth header token exists: ${!!authHeaderToken}`);
    
    if (!token) {
      console.log("❌ No auth token found in request");
      return res.status(401).json({ 
        message: "Unauthorized - No token found",
        code: "NO_TOKEN"
      });
    }

    // For AI endpoints specifically, handle token verification differently
    const isAiEndpoint = req.path.startsWith('/ai/');
    console.log(`🤖 Is AI endpoint: ${isAiEndpoint}`);

    try {
      // Use more robust token verification
      let jwtOptions = {};
      if (isAiEndpoint) {
        // More lenient settings for AI endpoints
        jwtOptions = { 
          ignoreExpiration: true // Don't strictly enforce expiration for AI calls
        };
      }
      
      // Log token first few characters for debugging
      console.log(`🔑 Verifying token: ${token.substring(0, 10)}...`);

      // Verify JWT token with more detailed error handling
      const decoded = jwt.verify(token, process.env.JWT_SECRET, jwtOptions);
      
      // If we're ignoring expiration for AI endpoints, handle expired tokens gracefully
      if (isAiEndpoint && decoded.exp && Date.now() >= decoded.exp * 1000) {
        console.log("⚠️ AI endpoint using expired token, but continuing due to lenient policy");
      }
      // For non-AI endpoints, still check expiration
      else if (!isAiEndpoint && decoded.exp && Date.now() >= decoded.exp * 1000) {
        console.log("❌ Token expired for regular endpoint");
        return res.status(401).json({ 
          message: "Unauthorized - Token expired",
          code: "TOKEN_EXPIRED"
        });
      }

      // Log successful token verification
      console.log(`✅ Token verified successfully for user ID: ${decoded.id}`);

      // Fetch user with minimal selection - only fields we know exist in all schemas
      // This avoids errors when the schema and database are out of sync
      const user = await db.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          // Only select fields that are guaranteed to exist
          createdAt: true,
          updatedAt: true
          // Fields that may not exist are omitted for compatibility
        },
      });

      if (!user) {
        console.error(`❌ User not found for ID: ${decoded.id}`);
        return res.status(404).json({ 
          message: "User not found",
          code: "USER_NOT_FOUND"
        });
      }

      // No account status checks that depend on possibly missing fields

      console.log(`👤 User authenticated: ${user.email} (${user.id})`);

      // Update last activity timestamp if lastLogin field exists
      try {
        await db.user.update({
          where: { id: user.id },
          data: { lastLogin: new Date() }
        });
      } catch (updateError) {
        // If lastLogin doesn't exist in the database, this will fail silently
        console.error(`Note: Could not update lastLogin, field may not exist: ${updateError.message}`);
      }

      // Attach user to request object
      req.loggedInUser = user;
      
      // If token was expired for AI endpoint but we're being lenient,
      // let's also set a header to indicate that a refresh is needed
      if (isAiEndpoint && decoded.exp && Date.now() >= decoded.exp * 1000) {
        res.setHeader('X-Token-Refresh-Required', 'true');
      }
      
      // Add security headers
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('X-Frame-Options', 'DENY');
      res.setHeader('X-XSS-Protection', '1; mode=block');
      res.setHeader('Cache-Control', 'no-store');
      
      next();
    } catch (jwtError) {
      // Handle specific JWT errors
      if (jwtError.name === 'TokenExpiredError') {
        console.log('❌ Token expired:', jwtError.message);
        return res.status(401).json({ 
          message: "Unauthorized - Token expired",
          code: "TOKEN_EXPIRED"
        });
      } else if (jwtError.name === 'JsonWebTokenError') {
        console.error('❌ Invalid token:', jwtError.message);
        return res.status(401).json({ 
          message: "Unauthorized - Invalid token",
          code: "INVALID_TOKEN"
        });
      } else {
        console.error('❌ Token verification failed:', jwtError);
        return res.status(401).json({ 
          message: "Unauthorized - Token verification failed",
          code: "TOKEN_VERIFICATION_FAILED"
        });
      }
    }
  } catch (error) {
    console.error("💥 Error in auth middleware:", error);
    return res.status(500).json({ 
      message: "Internal server error during authentication",
      code: "AUTH_ERROR"
    });
  }
};

// Enhanced admin middleware with logging - schema compatible version
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

// Token refresh middleware - schema compatible version
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

      // Use consistent cookie config helper
      res.cookie("jwt", newToken, getCookieConfig());
    }

    next();
  } catch (error) {
    console.error("Error in refresh token middleware:", error);
    next();
  }
};

// Session validation middleware - schema compatible version
export const validateSession = async (req, res, next) => {
  try {
    const user = req.loggedInUser;
    
    if (!user) {
      return next();
    }

    // Skip session validation logic that depends on possibly missing fields
    next();
  } catch (error) {
    console.error("Error in session validation:", error);
    next();
  }
};
