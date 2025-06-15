import { db } from "../libs/db.js";

export const createPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.loggedInUser.id;

    const playlist = await db.Playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res.status(201).json({
      success: true,
      message: "Playlist created successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error creating playlist:", error);
    res.status(500).json({ message: "Error creating playlist" });
  }
};

export const getAllLists = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const playlists = await db.Playlist.findMany({
      where: { userId },
      include: {
        problems: {
          include: { problem: true },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlists retrieved successfully",
      playlists,
    });
  } catch (error) {
    console.error("Error retrieving playlists:", error);
    res.status(500).json({ message: "Error retrieving playlists" });
  }
};

export const getPlaylistById = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const playlist = await db.Playlist.findUnique({
      where: {
        id: playlistId,
        userId: req.loggedInUser.id,
      },
      include: {
        problems: {
          include: { problem: true },
        },
      },
    });

    if (!playlist || playlist.userId !== req.loggedInUser.id) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    res.status(200).json({
      success: true,
      message: "Playlist retrieved successfully",
      playlist,
    });
  } catch (error) {
    console.error("Error retrieving playlist:", error);
    res.status(500).json({ message: "Error retrieving playlist" });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;
    const userId = req.loggedInUser.id;

    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId,
      },
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    const problems = await db.problem.findMany({
      where: {
        id: { in: problemIds },
      },
    });

    if (!Array.isArray(problems) || problems.length == 0) {
      return res.status(404).json({ message: "Invalid or no problems found" });
    }

    //check if the problems already exist in the playlist
    const existingProblems = await db.problemPlaylist.findMany({
      where: {
        playlistId,
        problemId: { in: problemIds },
      },
    });

    if (existingProblems.length > 0) {
      return res
        .status(400)
        .json({ message: "Problems already exist in playlist" });
    }

    const problemsPlaylist = await db.problemPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playlistId,
        problemId,
      })),
    });

    res.status(200).json({
      success: true,
      message: "Problem added to playlist successfully",
      problemsPlaylist,
    });
  } catch (error) {
    console.error("Error adding problem to playlist:", error);
    res.status(500).json({ message: "Error adding problem to playlist" });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const userId = req.loggedInUser.id;
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId,
      },
    });
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    await db.Playlist.delete({
      where: {
        id: playlistId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Playlist deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting playlist:", error);
    res.status(500).json({ message: "Error deleting playlist" });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { problemIds } = req.body;
    const userId = req.loggedInUser.id;

    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ message: "Invalid problem IDs" });
    }

    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId,
      },
    });

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Check if the problems exist in the playlist
    const existingProblems = await db.problemPlaylist.findMany({
      where: {
        playlistId,
        problemId: { in: problemIds },
      },
    });

    if (existingProblems.length === 0) {
      return res.status(404).json({ message: "No problems found in playlist" });
    }

    // Delete the PlaylistProblem records
    await db.problemPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: { in: problemIds },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problem removed from playlist successfully",
    });
  } catch (error) {
    console.error("Error removing problem from playlist:", error);
    res.status(500).json({ message: "Error removing problem from playlist" });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { name, description } = req.body;
    const userId = req.loggedInUser.id;

    // Validate input
    if (!name && !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide name or description to update",
      });
    }

    // Check if playlist exists and belongs to user
    const playlist = await db.playlist.findUnique({
      where: {
        id: playlistId,
        userId,
      },
    });

    if (!playlist) {
      return res.status(404).json({
        success: false,
        message: "Playlist not found",
      });
    }

    // Create update data object with only provided fields
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;

    // Update the playlist
    const updatedPlaylist = await db.playlist.update({
      where: {
        id: playlistId,
      },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      message: "Playlist updated successfully",
      playlist: updatedPlaylist,
    });
  } catch (error) {
    console.error("Error updating playlist:", error);

    // Handle unique constraint violation (duplicate playlist name)
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "You already have a playlist with this name",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating playlist",
    });
  }
};
