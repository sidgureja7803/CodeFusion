import cors from 'cors';

/**
 * Enhanced CORS middleware with improved cookie handling
 * @param {Object} options - CORS configuration options
 * @returns {Function} - Express middleware function
 */
export const configureCors = (app) => {
  // Get allowed origins from environment with expanded defaults for production
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173,https://codefusion.vercel.app,https://codefusion-app.vercel.app';
  const allowedOrigins = frontendUrl.includes(',') ? frontendUrl.split(',') : [frontendUrl];

  // Log allowed origins for debugging
  console.log("🔗 Configured CORS Origins:", allowedOrigins);

  // CORS options with enhanced cookie handling and more permissive origin matching
  const corsOptions = {
    origin: function (origin, callback) {
      console.log(`🌐 CORS Request from origin: ${origin || 'no origin'}`);
      
      // Allow requests with no origin (like mobile apps, curl requests, etc)
      if (!origin) {
        console.log(`✅ CORS allowed for request with no origin`);
        return callback(null, true);
      }
      
      // Check if the origin is in our allowed list (exact match)
      if (allowedOrigins.includes(origin)) {
        console.log(`✅ CORS allowed for exact match origin: ${origin}`);
        return callback(null, true);
      } 
      
      // Enhanced origin matching for production scenarios
      // Check for subdomain matches (e.g. test.codefusion.app matches codefusion.app)
      // Check for protocol variations (http vs https)
      // Check for port variations (e.g. localhost:5173 vs localhost:3000)
      const isPartialMatch = allowedOrigins.some(allowed => {
        try {
          // Remove protocol for flexible matching
          const stripProtocol = (url) => url.replace(/^https?:\/\//, '');
          const allowedStripped = stripProtocol(allowed);
          const originStripped = stripProtocol(origin);
          
          // Direct match after protocol strip
          if (allowedStripped === originStripped) return true;
          
          // Check for subdomain match
          const originDomain = originStripped.split(':')[0]; // Remove port if any
          const allowedDomain = allowedStripped.split(':')[0]; // Remove port if any
          
          if (originDomain.endsWith(`.${allowedDomain}`) || allowedDomain.endsWith(`.${originDomain}`)) {
            return true;
          }
          
          // Convert to URL objects for more detailed comparison
          const allowedUrl = new URL(allowed);
          const originUrl = new URL(origin);
          
          // Match domains ignoring subdomains
          const allowedBase = allowedUrl.hostname.split('.').slice(-2).join('.');
          const originBase = originUrl.hostname.split('.').slice(-2).join('.');
          
          // Same base domain
          return allowedBase === originBase;
          
        } catch (e) {
          console.error(`Error comparing origins: ${e.message}`);
          return false;
        }
      });

      if (isPartialMatch) {
        console.log(`✅ CORS allowed for related origin: ${origin}`);
        return callback(null, true);
      }
      
      // In development mode, be more permissive
      if (process.env.NODE_ENV !== 'production') {
        console.log(`⚠️ Development mode: allowing otherwise restricted origin: ${origin}`);
        return callback(null, true);
      }

      console.log(`❌ CORS blocked for origin: ${origin}`);
      console.log(`📋 Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error(`Not allowed by CORS. Origin: ${origin} is not in allowed list`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "X-XSRF-TOKEN"],
    exposedHeaders: ["Set-Cookie"],
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
  // Enhanced cookie configuration with domain flexibility
  const config = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax', // 'none' allows cross-origin cookies when secure=true
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    path: '/'
  };
  
  // In development mode, make cookies work with localhost
  if (!isProduction) {
    // Remove secure requirement for local development
    config.secure = false;
  }
  
  // Log cookie config for debugging
  console.log(`🍪 Cookie config: ${JSON.stringify(config)}`);
  
  return config;
};

// Utility to check if request is from a specific origin
export const isRequestFromOrigin = (req, origin) => {
  const requestOrigin = req.headers.origin || req.headers.referer;
  if (!requestOrigin) return false;
  return requestOrigin.includes(origin);
};

// Middleware to diagnose auth issues
export const authDebugMiddleware = (req, res, next) => {
  console.log(`🔍 Auth Debug: ${req.method} ${req.path}`);
  console.log(`- Origin: ${req.headers.origin || 'none'}`);
  console.log(`- Referer: ${req.headers.referer || 'none'}`);
  console.log(`- Has Cookies: ${!!req.headers.cookie}`);
  if (req.headers.cookie) {
    console.log(`- Cookies: ${req.headers.cookie.includes('jwt') ? 'contains jwt' : 'no jwt'}`);
  }
  next();
};