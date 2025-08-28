import express from "express";
import { register, login, logout, me, updateProfile, refreshToken } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.compatible.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

// Add token refresh endpoint
authRoutes.post("/refresh", authMiddleware, refreshToken);

authRoutes.post("/logout", authMiddleware, logout);

authRoutes.get("/me", authMiddleware, me);

authRoutes.put("/profile", authMiddleware, updateProfile);

// OTP verification routes removed

export default authRoutes;
