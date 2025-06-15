import { db } from "../libs/db.js";

export const getMetrics = async (req, res) => {
  try {
    // Get total counts
    const [
      totalUsers,
      totalProblems,
      totalSubmissions,
      totalDiscussions,
      totalAcceptedSubmissions,
      totalTestCases,
      totalRevisions,
      totalPlaylists,
    ] = await Promise.all([
      db.user.count(),
      db.problem.count(),
      db.submission.count(),
      db.discussion.count(),
      db.submission.count({
        where: {
          status: "ACCEPTED",
        },
      }),
      db.testCaseResult.count(),
      db.revision.count(),
      db.playlist.count(),
    ]);

    // Get problem difficulty breakdown
    const problemsByDifficulty = await db.problem.groupBy({
      by: ["difficulty"],
      _count: {
        id: true,
      },
    });

    // Get submission status breakdown
    const submissionsByStatus = await db.submission.groupBy({
      by: ["status"],
      _count: {
        id: true,
      },
    });

    // Get language usage statistics
    const submissionsByLanguage = await db.submission.groupBy({
      by: ["language"],
      _count: {
        id: true,
      },
    });

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentActivity = await Promise.all([
      db.user.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      }),
      db.submission.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      }),
      db.problem.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      }),
      db.discussion.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      }),
    ]);

    // Get top performing users (by accepted submissions)
    const topUsers = await db.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        submissions: {
          where: {
            status: "ACCEPTED",
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        submissions: {
          _count: "desc",
        },
      },
      take: 5,
    });

    // Calculate success rate
    const successRate =
      totalSubmissions > 0
        ? ((totalAcceptedSubmissions / totalSubmissions) * 100).toFixed(1)
        : 0;

    // Get daily submission trends (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const dailySubmissions = await db.submission.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo,
        },
      },
      select: {
        createdAt: true,
        status: true,
      },
    });

    // Group submissions by day
    const submissionTrends = {};
    dailySubmissions.forEach((submission) => {
      const date = submission.createdAt.toISOString().split("T")[0];
      if (!submissionTrends[date]) {
        submissionTrends[date] = { total: 0, accepted: 0 };
      }
      submissionTrends[date].total++;
      if (submission.status === "ACCEPTED") {
        submissionTrends[date].accepted++;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          totalProblems,
          totalSubmissions,
          totalDiscussions,
          totalAcceptedSubmissions,
          totalTestCases,
          totalRevisions,
          totalPlaylists,
          successRate: parseFloat(successRate),
        },
        breakdowns: {
          problemsByDifficulty: problemsByDifficulty.map((item) => ({
            difficulty: item.difficulty,
            count: item._count.id,
          })),
          submissionsByStatus: submissionsByStatus.map((item) => ({
            status: item.status,
            count: item._count.id,
          })),
          submissionsByLanguage: submissionsByLanguage.map((item) => ({
            language: item.language,
            count: item._count.id,
          })),
        },
        recentActivity: {
          newUsers: recentActivity[0],
          newSubmissions: recentActivity[1],
          newProblems: recentActivity[2],
          newDiscussions: recentActivity[3],
        },
        topUsers: topUsers.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          acceptedSubmissions: user.submissions.length,
        })),
        trends: {
          dailySubmissions: submissionTrends,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching metrics data",
    });
  }
};
