import express from "express";
import {
  getDSASheets,
  getDSASheetByIdController
} from "../controllers/dsasheets.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const dsaSheetsRoutes = express.Router();

// Routes for DSA Sheets
dsaSheetsRoutes.get("/", authMiddleware, getDSASheets);
dsaSheetsRoutes.get("/:sheetId", authMiddleware, getDSASheetByIdController);

export default dsaSheetsRoutes;
