import express from "express";
import { register, login, logout, me, updateProfile, refreshToken } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { verifyEmail, resendVerificationOTP } from "../services/otpService.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

// Add token refresh endpoint
authRoutes.post("/refresh", authMiddleware, refreshToken);

authRoutes.post("/logout", authMiddleware, logout);

authRoutes.get("/me", authMiddleware, me);

authRoutes.put("/profile", authMiddleware, updateProfile);

// OTP verification routes
authRoutes.post("/verify-email", verifyEmail);
authRoutes.post("/resend-otp", resendVerificationOTP);

export default authRoutes;