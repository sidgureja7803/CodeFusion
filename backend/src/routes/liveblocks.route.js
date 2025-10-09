import express from "express";
import { Liveblocks } from "@liveblocks/node";
import { authMiddleware } from "../middleware/auth.middleware.js";
import dotenv from "dotenv";
dotenv.config();

const liveblocksRoutes = express.Router();

// Check if Liveblocks secret key is available
const liveblocksSecretKey = process.env.LIVEBLOCKS_SECRET_KEY;

// Create a mock Liveblocks instance if no secret key is available
const liveblocks = liveblocksSecretKey 
  ? new Liveblocks({
      secret: liveblocksSecretKey,
    })
  : {
      // Mock implementation
      prepareSession: (userId) => ({
        allow: () => {},
        authorize: async () => ({
          body: { message: "Liveblocks mock session" },
          status: 200
        }),
        FULL_ACCESS: "*"
      })
    };

// Log Liveblocks configuration status
if (!liveblocksSecretKey) {
  console.warn("⚠️ LIVEBLOCKS_SECRET_KEY is not configured in environment variables");
  console.log("ℹ️ Using mock Liveblocks implementation");
} else {
  console.log("✅ Liveblocks configured with secret key");
}

liveblocksRoutes.post("/auth", authMiddleware, async (req, res) => {
  try {
    const user = req.loggedInUser;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if Liveblocks is properly configured
    if (!liveblocksSecretKey) {
      console.warn("⚠️ Liveblocks auth requested but LIVEBLOCKS_SECRET_KEY is not configured");
      return res.status(200).json({ 
        message: "Liveblocks is not configured. This is a mock response.",
        userId: user.id
      });
    }

    // Create a session for the current user
    const session = liveblocks.prepareSession(user.id.toString(), {
      userInfo: {
        name: user.name,
        picture:
          user.profilePicture ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.name
          )}&background=random`,
        color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      },
    });

    // Allow access to all rooms for this user
    session.allow("*", session.FULL_ACCESS);

    // Authorize the user and return the result
    const { body, status } = await session.authorize();
    return res.status(status).send(body);
  } catch (error) {
    console.error("Liveblocks auth error:", error);
    return res.status(500).json({ error: "Authentication failed" });
  }
});

export default liveblocksRoutes;