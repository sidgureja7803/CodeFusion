import express from "express";
import { Liveblocks } from "@liveblocks/node";
import { authMiddleware } from "../middleware/auth.middleware.js";
import dotenv from "dotenv";
dotenv.config();

const liveblocksRoutes = express.Router();

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY,
});

liveblocksRoutes.post("/auth", authMiddleware, async (req, res) => {
  try {
    const user = req.loggedInUser;

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
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
