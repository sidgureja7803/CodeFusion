import cors from 'cors';

/**
 * Enhanced CORS middleware with improved cookie handling
 * @param {Object} options - CORS configuration options
 * @returns {Function} - Express middleware function
 */
export const configureCors = (app) => {
  // Get allowed origins from environment
  const allowedOrigins = process.env.FRONTEND_URL.split(",");


  // Log allowed origins for debugging
  console.log("🔗 Configured CORS Origins:", allowedOrigins);

  // CORS options with improved cookie handling
  const corsOptions = {
    origin: function (origin, callback) {
      console.log(`🌐 CORS Request from origin: ${origin || 'no origin'}`);
      
      // Allow requests with no origin (like mobile apps, curl requests, etc)
      if (!origin) {
        console.log(`✅ CORS allowed for request with no origin`);
        return callback(null, true);
      }
      
      // Check if the origin is in our allowed list
      if (allowedOrigins.includes(origin)) {
        console.log(`✅ CORS allowed for origin: ${origin}`);
        return callback(null, true);
      } 
      
      // Also check if it's a subdomain or different port of allowed origin
      const isPartialMatch = allowedOrigins.some(allowed => {
        try {
          const allowedUrl = new URL(allowed);
          const originUrl = new URL(origin);
          // Check if hostname ends with the allowed hostname (subdomain support)
          return originUrl.hostname.endsWith(allowedUrl.hostname);
        } catch (e) {
          return false;
        }
      });

      if (isPartialMatch) {
        console.log(`✅ CORS allowed for subdomain/related origin: ${origin}`);
        return callback(null, true);
      }

      console.log(`❌ CORS blocked for origin: ${origin}`);
      console.log(`📋 Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error(`Not allowed by CORS. Origin: ${origin} is not in allowed list`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["set-cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204
  };

  // Apply CORS middleware for all routes
  app.use(cors(corsOptions));
  
  // Handle preflight requests properly
  // We don't need app.options() as the cors middleware already handles OPTIONS requests

  console.log("✅ Enhanced CORS middleware configured");
};

/**
 * Cookie configuration helper for consistent cookie settings across the application
 * @param {boolean} isProduction - Whether the app is in production mode
 * @returns {Object} - Cookie configuration object
 */
export const getCookieConfig = (isProduction = process.env.NODE_ENV === 'production') => {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/'
  };
};
