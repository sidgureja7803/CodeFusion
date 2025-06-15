import express from "express";
import {
  getAIHelp,
  getCodeExplanation,
  generateAIProblem,
} from "../controllers/ai.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const aiAssistantRoutes = express.Router();

// Routes for AI assistance
aiAssistantRoutes.post("/help", authMiddleware, getAIHelp);
aiAssistantRoutes.post("/explain", authMiddleware, getCodeExplanation);
aiAssistantRoutes.post("/generate-problem", authMiddleware, generateAIProblem);

export default aiAssistantRoutes;
