import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import executionRoutes from "./routes/code-execution.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import playlistRoutes from "./routes/playlist.route.js";
import revisionRoutes from "./routes/revision.route.js";
import aiAssistantRoutes from "./routes/ai.routes.js";
import liveblocksRoutes from "./routes/liveblocks.route.js";
import discussionRoutes from "./routes/discussion.routes.js";
import metricsRoutes from "./routes/metrics.route.js";
import firebaseAuthRoutes from "./routes/firebase-auth.routes.js";
import dsaSheetsRoutes from "./routes/dsasheets.routes.js";
import { connectDatabase, disconnectDatabase } from "./libs/db.js";
import { setUserContext } from "./middleware/rls.middleware.js";

dotenv.config();

const app = express();

// Convert comma-separated domains from .env to an array
const allowedOrigins = [
  ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map(url => url.trim()) : []),
  "http://localhost:5174"
];

// Log allowed origins for debugging
console.log("🔗 Allowed CORS Origins:", allowedOrigins);

const corsOptions = {
  origin: function (origin, callback) {
    console.log(`🌐 CORS Request from origin: ${origin}`);
    if (!origin || allowedOrigins.includes(origin)) {
      console.log(`✅ CORS allowed for origin: ${origin}`);
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked for origin: ${origin}`);
      console.log(`📋 Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error(`Not allowed by CORS. Origin: ${origin} is not in allowed list: ${allowedOrigins.join(', ')}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};



// Apply CORS middleware before other middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Add RLS middleware to set user context for database operations
app.use(setUserContext);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Can y'all crack the code ? 🃏");
});

// Wake-up endpoint for Render deployment
app.get("/api/v1/wake-up", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is awake!",
    timestamp: new Date().toISOString(),
    status: "active"
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/execution", executionRoutes);
app.use("/api/v1/submission", submissionRoutes);
app.use("/api/v1/playlist", playlistRoutes);
app.use("/api/v1/revision", revisionRoutes);
app.use("/api/v1/ai", aiAssistantRoutes);
app.use("/api/v1/liveblocks", liveblocksRoutes);
app.use("/api/v1/discussions", discussionRoutes);
app.use("/api/v1/metrics", metricsRoutes);
app.use("/api/v1/firebase-auth", firebaseAuthRoutes);
app.use("/api/v1/dsasheets", dsaSheetsRoutes);

// Start server with database connection
const startServer = async () => {
  try {
    // Connect to database first
    console.log("🚀 Starting CodeFusion Backend...");
    const dbConnected = await connectDatabase();
    
    if (!dbConnected) {
      console.error("❌ Failed to connect to database. Exiting...");
      process.exit(1);
    }
    
    // Start the server
    const server = app.listen(PORT, () => {
      console.log(`🌟 CodeFusion Server is running on port ${PORT}`);
      console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
      console.log(`🤖 AI Provider: Novita AI (LLaMA 3-8B)`);
      console.log("✅ All systems ready!");
    });

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
      console.log(`\n🛑 Received ${signal}. Starting graceful shutdown...`);
      
      server.close(async () => {
        console.log("🔌 HTTP server closed.");
        await disconnectDatabase();
        console.log("👋 CodeFusion Backend shut down successfully!");
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1);
  }
};

// Start the server
startServer();
