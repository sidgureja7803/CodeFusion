import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
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
import { configureCors } from "./middleware/cors.middleware.js";

dotenv.config();

const app = express();

// Configure enhanced CORS with improved cookie handling
configureCors(app);

app.use(express.json());
// Configure cookie parser with extended options for better cookie handling
app.use(cookieParser(process.env.COOKIE_SECRET));

// Add debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.path} - Origin: ${req.headers.origin || 'No origin'} - ${new Date().toISOString()}`);
  next();
});
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
