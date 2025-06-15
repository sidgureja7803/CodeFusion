import express from "express";
import { getMetrics } from "../controllers/metrics.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const metricsRoutes = express.Router();

metricsRoutes.get("/", authMiddleware, getMetrics);

export default metricsRoutes;
