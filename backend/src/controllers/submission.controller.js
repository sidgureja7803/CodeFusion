import { db } from "../libs/db.js";

export const getAllSubmissions = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;

    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      data: submissions,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};

export const getSubmissionByProblem = async (req, res) => {
  try {
    const userId = req.loggedInUser.id;
    const problemId = req.params.id;
    const submissions = await db.submission.findMany({
      where: {
        userId: userId,
        problemId: problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions fetched successfully",
      data: submissions,
    });
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions",
      error: error.message,
    });
  }
};

export const getSubmissionsCountByProblemId = async (req, res) => {
  try {
    const problemId = req.params.problemId;
    const submissionsCount = await db.submission.count({
      where: {
        problemId: problemId,
      },
    });

    res.status(200).json({
      success: true,
      message: "Submissions count fetched successfully",
      data: submissionsCount,
    });
  } catch (error) {
    console.error("Error fetching submissions count:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch submissions count",
      error: error.message,
    });
  }
};
