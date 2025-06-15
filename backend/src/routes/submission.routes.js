import express from "express";
import {
  getAllSubmissions,
  getSubmissionByProblem,
  getSubmissionsCountByProblemId,
} from "../controllers/submission.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const submissionRoutes = express.Router();

submissionRoutes.get("/get-all-submissions", authMiddleware, getAllSubmissions);

submissionRoutes.get(
  "/get-submissions/:id",
  authMiddleware,
  getSubmissionByProblem
);
submissionRoutes.get(
  "/get-submissions-count/:problemId",
  authMiddleware,
  getSubmissionsCountByProblemId
);

export default submissionRoutes;
