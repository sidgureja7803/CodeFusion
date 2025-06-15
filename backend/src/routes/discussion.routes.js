import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getDiscussions,
  createDiscussion,
  toggleLike,
  deleteDiscussion,
} from "../controllers/discussion.controller.js";

const router = express.Router();

// Get discussions for a problem (no auth required to view)
router.get("/problem/:problemId", getDiscussions);

// Create discussion (requires auth)
router.post("/problem/:problemId", authMiddleware, createDiscussion);

// Toggle like (requires auth)
router.post("/:discussionId/like", authMiddleware, toggleLike);

// Delete discussion (requires auth)
router.delete("/:discussionId", authMiddleware, deleteDiscussion);

export default router;
