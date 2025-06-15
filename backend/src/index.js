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

dotenv.config();

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true, // This is important for cookies/auth to work
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS middleware before other middleware
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Can y'all crack the code ? 🃏");
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
