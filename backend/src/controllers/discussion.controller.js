import { db } from "../libs/db.js";

// Get discussions for a problem
export const getDiscussions = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { page = 1, sortBy = "createdAt", order = "desc" } = req.query;

    const limit = 20;
    const skip = (parseInt(page) - 1) * limit;

    // Build orderBy object based on sortBy parameter
    let orderBy;
    if (sortBy === "likes") {
      // For sorting by likes count, use aggregation
      orderBy = {
        likes: {
          _count: order,
        },
      };
    } else {
      // For other fields like createdAt
      orderBy = {
        [sortBy]: order,
      };
    }

    const discussions = await db.discussion.findMany({
      where: {
        problemId,
        parentId: null, // Only get top-level discussions
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            likes: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: true,
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });

    const totalDiscussions = await db.discussion.count({
      where: {
        problemId,
        parentId: null,
      },
    });

    const totalPages = Math.ceil(totalDiscussions / limit);

    res.json({
      discussions,
      pagination: {
        page: parseInt(page),
        totalPages,
        totalDiscussions,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching discussions:", error);
    res.status(500).json({ message: "Failed to fetch discussions" });
  }
};

// Create a new discussion
export const createDiscussion = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { content, parentId } = req.body;

    // Get userId from the authenticated user - check both possible locations
    const userId = req.userId || req.loggedInUser?.id;

    console.log("Creating discussion with:", {
      problemId,
      content,
      parentId,
      userId,
      loggedInUser: req.loggedInUser,
      reqUserId: req.userId,
    });

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: "Content is required" });
    }

    // Verify that the problem exists
    const problemExists = await db.problem.findUnique({
      where: { id: problemId },
    });

    if (!problemExists) {
      return res.status(404).json({ error: "Problem not found" });
    }

    // If parentId is provided, verify that the parent discussion exists
    if (parentId) {
      const parentExists = await db.discussion.findUnique({
        where: { id: parentId },
      });

      if (!parentExists) {
        return res.status(404).json({ error: "Parent discussion not found" });
      }
    }

    const discussion = await db.discussion.create({
      data: {
        content: content.trim(),
        problemId,
        authorId: userId,
        parentId: parentId || null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        likes: true,
        _count: {
          select: {
            replies: true,
            likes: true,
          },
        },
      },
    });

    res.status(201).json(discussion);
  } catch (error) {
    console.error("Error creating discussion:", error);
    res.status(500).json({ error: "Failed to create discussion" });
  }
};

// Toggle like on discussion
export const toggleLike = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const userId = req.userId || req.loggedInUser?.id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const existingLike = await db.discussionLike.findUnique({
      where: {
        discussionId_userId: {
          discussionId,
          userId,
        },
      },
    });

    if (existingLike) {
      // Unlike
      await db.discussionLike.delete({
        where: {
          id: existingLike.id,
        },
      });
      res.json({ liked: false });
    } else {
      // Like
      await db.discussionLike.create({
        data: {
          discussionId,
          userId,
        },
      });
      res.json({ liked: true });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Failed to toggle like" });
  }
};

// Delete discussion (only author or admin)
export const deleteDiscussion = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const userId = req.userId || req.loggedInUser?.id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const discussion = await db.discussion.findUnique({
      where: { id: discussionId },
      include: { author: true },
    });

    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    // Check if user is author or admin
    const user = req.loggedInUser || { id: userId };
    if (discussion.authorId !== userId && user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this discussion" });
    }

    await db.discussion.delete({
      where: { id: discussionId },
    });

    res.json({ message: "Discussion deleted successfully" });
  } catch (error) {
    console.error("Error deleting discussion:", error);
    res.status(500).json({ error: "Failed to delete discussion" });
  }
};
