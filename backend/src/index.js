import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDatabase } from "./libs/db.js";
import authRoutes from "./routes/auth.routes.js";
import problemRoutes from "./routes/problem.routes.js";
import submissionRoutes from "./routes/submission.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import liveblocksRoutes from "./routes/liveblocks.route.js";
import cookieParser from "cookie-parser";
import { configureCors } from "./middleware/cors.middleware.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Apply middleware
app.use(express.json());
app.use(cookieParser());
configureCors(app);

// Define API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/problems", problemRoutes);
app.use("/api/v1/submissions", submissionRoutes);
app.use("/api/v1/ai", aiRoutes);
app.use("/api/v1/liveblocks", liveblocksRoutes);

// Health check endpoint
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Start the server
const startServer = async () => {
  try {
    // Start the HTTP server immediately to prevent deployment timeouts
    const server = app.listen(PORT, () => {
      console.log(`🚀 Starting CodeFusion Backend...`);
      console.log(`🌐 Server running on port ${PORT}`);
    });

    // Connect to the database with retry logic
    const dbConnected = await connectDatabase();
    
    if (!dbConnected) {
      console.warn("⚠️ Server running with limited functionality due to database connection issues");
      console.log("📝 API endpoints that don't require database access will still work");
    } else {
      console.log("✅ Server fully operational with database connection");
    }

    // Handle graceful shutdown
    const handleShutdown = async () => {
      console.log("🛑 Shutting down server...");
      server.close(() => {
        console.log("✅ HTTP server closed");
        process.exit(0);
      });
    };

    // Listen for termination signals
    process.on("SIGTERM", handleShutdown);
    process.on("SIGINT", handleShutdown);
  } catch (error) {
    console.error(`❌ Error starting server: ${error.message}`);
    process.exit(1);
  }
};

// Start the server
startServer();