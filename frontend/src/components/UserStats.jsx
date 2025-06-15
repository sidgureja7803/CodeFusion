import React, { useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import {
  Activity,
  Award,
  CheckCircle,
  Target,
  Star,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const UserStats = () => {
  const { solvedProblems, getSolvedProblemByUser } = useProblemStore();
  const { submissions, getAllSubmissions } = useSubmissionStore();

  useEffect(() => {
    getSolvedProblemByUser();
    getAllSubmissions();
  }, [getSolvedProblemByUser, getAllSubmissions]);

  // Calculate problem statistics
  const easyProblems = solvedProblems.filter(
    (p) => p.difficulty === "EASY"
  ).length;
  const mediumProblems = solvedProblems.filter(
    (p) => p.difficulty === "MEDIUM"
  ).length;
  const hardProblems = solvedProblems.filter(
    (p) => p.difficulty === "HARD"
  ).length;
  const totalProblems = solvedProblems.length;

  // Calculate submission statistics
  const acceptedSubmissions = submissions.filter(
    (s) => s.status === "Accepted" || s.status === "ACCEPTED"
  ).length;
  const submissionRate = submissions.length
    ? ((acceptedSubmissions / submissions.length) * 100).toFixed(1)
    : 0;

  // Find most practiced tag
  const tagCounts = {};
  solvedProblems.forEach((problem) => {
    problem.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const mostPracticedTag =
    Object.entries(tagCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  // Calculate recent activity
  const recentSubmissions =
    submissions.length > 0
      ? submissions
          .slice(0, 5)
          .map((s) => new Date(s.createdAt))
          .sort((a, b) => b - a)
      : [];
  const isActiveRecently =
    recentSubmissions.length > 0 &&
    (new Date() - recentSubmissions[0]) / (1000 * 60 * 60 * 24) < 7;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="profile-component-card p-4"
    >
      <div className="flex flex-col">
        <h3 className="text-2xl dark:text-white text-black neue-med mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5" /> Your Statistics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg dark:text-white/80 text-black/80 neue-med">
                Problems Solved
              </h4>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl dark:text-white text-black neue-med">
                {totalProblems}
              </span>
              <div className="flex gap-2 items-center">
                <div className="stat-pill bg-emerald-900/30 text-emerald-500 border-emerald-700">
                  {easyProblems} Easy
                </div>
                <div className="stat-pill bg-amber-900/30 text-amber-500 border-amber-700">
                  {mediumProblems} Medium
                </div>
                <div className="stat-pill bg-red-900/30 text-red-400 border-red-700">
                  {hardProblems} Hard
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg dark:text-white/80 text-black/80 neue-med">
                Submission Success
              </h4>
              <Target className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex justify-between items-end">
              <span className="text-3xl dark:text-white text-black neue-med">
                {submissionRate}%
              </span>
              <div className="flex gap-2 items-center">
                <div className="stat-pill bg-blue-900/30 text-blue-500 border-blue-700">
                  {acceptedSubmissions}/{submissions.length} Passed
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg dark:text-white/80 text-black/80 neue-med">
                Expertise
              </h4>
              <Star className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="flex justify-between items-end">
              <div className="flex gap-2 items-center">
                <div className="stat-pill bg-indigo-900/30 text-indigo-400 border-indigo-700">
                  {mostPracticedTag}
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <Clock className="w-4 h-4 text-purple-500" />
                <span
                  className={`text-sm ${
                    isActiveRecently ? "text-green-500" : "text-red-400"
                  }`}
                >
                  {isActiveRecently ? "Recent activity" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <span className="text-white/60 neue-reg text-sm">
            Keep solving problems to improve your stats!
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default UserStats;
