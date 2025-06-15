import { db } from "../libs/db.js";

export const addToRevision = async (req, res) => {
  try {
    const { problemId } = req.body;
    const userId = req.loggedInUser.id;

    if (!problemId) {
      return res.status(400).json({ error: "Problem ID is required" });
    }

    // Check if problem exists
    const problem = await db.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // Create or update revision entry
    const revision = await db.revision.upsert({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
      update: {},
      create: {
        userId,
        problemId,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Problem saved for revision",
      data: revision,
    });
  } catch (error) {
    console.error("Error adding to revision:", error);
    return res.status(500).json({ error: "Error adding to revision" });
  }
};

export const removeFromRevision = async (req, res) => {
  try {
    const { problemId } = req.params;
    const userId = req.loggedInUser.id;

    // Delete revision entry
    await db.revision.delete({
      where: {
        userId_problemId: {
          userId,
          problemId,
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Problem removed from revision",
    });
  } catch (error) {
    console.error("Error removing from revision:", error);
    return res.status(500).json({ error: "Error removing from revision" });
  }
};

export const getAllRevisionProblems = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;

    // Get all revision entries for the user
    const revisions = await db.revision.findMany({
      where: {
        userId,
      },
      include: {
        problem: {
          select: {
            id: true,
            title: true,
            difficulty: true,
            tags: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Revision problems fetched successfully",
      data: revisions,
    });
  } catch (error) {
    console.error("Error fetching revision problems:", error);
    return res.status(500).json({ error: "Error fetching revision problems" });
  }
};
