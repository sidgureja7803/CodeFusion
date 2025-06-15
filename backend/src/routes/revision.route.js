import express from "express";
import {
  addToRevision,
  removeFromRevision,
  getAllRevisionProblems,
} from "../controllers/revision.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const revisionRoutes = express.Router();

revisionRoutes.post("/add", authMiddleware, addToRevision);
revisionRoutes.delete("/remove/:problemId", authMiddleware, removeFromRevision);
revisionRoutes.get("/all", authMiddleware, getAllRevisionProblems);

export default revisionRoutes;
