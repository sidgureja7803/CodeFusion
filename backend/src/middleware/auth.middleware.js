import jwt from "jsonwebtoken";
import { db } from "../libs/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token found" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await db.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
          streakCount: true,
          maxStreakCount: true,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // If the user is found, attach it to the request object
      req.loggedInUser = user;
      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }
  } catch (error) {
    console.error("Error in auth middleware:", error);
    return res.status(500).json({ message: "Error authenticating User" });
  }
};

export const checkAdmin = async (req, res, next) => {
  try {
    const user = req.loggedInUser;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }
    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Forbidden - Admins only" });
    }
    next();
  } catch (error) {
    console.error("Error in checkAdmin middleware:", error);
    return res.status(500).json({ message: "Error checking admin role" });
  }
};
