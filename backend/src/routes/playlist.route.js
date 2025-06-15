import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getAllLists,
  getPlaylistById,
  createPlaylist,
  addProblemToPlaylist,
  removeProblemFromPlaylist,
  deletePlaylist,
  updatePlaylist,
} from "../controllers/playlist.controller.js";

const playlistRoutes = express.Router();

playlistRoutes.get("/", authMiddleware, getAllLists);

playlistRoutes.get("/:playlistId", authMiddleware, getPlaylistById);

playlistRoutes.post("/create-playlist", authMiddleware, createPlaylist);

playlistRoutes.post(
  "/:playlistId/add-problem",
  authMiddleware,
  addProblemToPlaylist
);

playlistRoutes.delete(
  "/:playlistId/remove-problem",
  authMiddleware,
  removeProblemFromPlaylist
);

playlistRoutes.delete(
  "/:playlistId/delete-playlist",
  authMiddleware,
  deletePlaylist
);

playlistRoutes.patch("/:playlistId", authMiddleware, updatePlaylist);

export default playlistRoutes;
