import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { useProblemStore } from "../store/useProblemStore";
import { Navbar } from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Code, 
  Award, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  CheckCircle,
  XCircle
} from "lucide-react";

const Statistics = () => {
  const { authUser } = useAuthStore();
  const { submissions, getSubmissions } = useSubmissionStore();
  const { problems } = useProblemStore();
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    acceptedSubmissions: 0,
    rejectedSubmissions: 0,
    accuracyRate: 0,
    totalProblemsSolved: 0,
    easyProblems: 0,
    mediumProblems: 0,
    hardProblems: 0,
    currentStreak: 0,
    longestStreak: 0,
    submissionsByLanguage: {},
    recentActivity: []
  });

  useEffect(() => {
    getSubmissions();
  }, [getSubmissions]);

  useEffect(() => {
    if (submissions && problems) {
      calculateStats();
    }
  }, [submissions, problems]);

  const calculateStats = () => {
    const totalSubmissions = submissions.length;
    const acceptedSubmissions = submissions.filter(s => 
      s.status === "ACCEPTED" || s.status === "Accepted"
    ).length;
    const rejectedSubmissions = totalSubmissions - acceptedSubmissions;
    const accuracyRate = totalSubmissions > 0 ? (acceptedSubmissions / totalSubmissions * 100) : 0;

    // Get unique solved problems
    const solvedProblems = new Set(
      submissions
        .filter(s => s.status === "ACCEPTED" || s.status === "Accepted")
        .map(s => s.problemId)
    );

    // Count by difficulty
    const difficultyCount = { easy: 0, medium: 0, hard: 0 };
    problems.forEach(problem => {
      if (solvedProblems.has(problem.id)) {
        if (problem.difficulty === "EASY") difficultyCount.easy++;
        else if (problem.difficulty === "MEDIUM") difficultyCount.medium++;
        else if (problem.difficulty === "HARD") difficultyCount.hard++;
      }
    });

    // Language distribution
    const languageCount = {};
    submissions.forEach(sub => {
      if (sub.language) {
        languageCount[sub.language] = (languageCount[sub.language] || 0) + 1;
      }
    });

    // Recent activity (last 10 submissions)
    const recentActivity = submissions
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    setStats({
      totalSubmissions,
      acceptedSubmissions,
      rejectedSubmissions,
      accuracyRate: Math.round(accuracyRate),
      totalProblemsSolved: solvedProblems.size,
      easyProblems: difficultyCount.easy,
      mediumProblems: difficultyCount.medium,
      hardProblems: difficultyCount.hard,
      currentStreak: authUser?.streakCount || 0,
      longestStreak: authUser?.maxStreakCount || 0,
      submissionsByLanguage: languageCount,
      recentActivity
    });
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, gradient }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-all duration-300 ${gradient}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          {value}
        </h3>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </motion.div>
  );

  const LanguageBar = ({ language, count, total, color }) => {
    const percentage = (count / total) * 100;
    return (
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            {language}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {count} ({Math.round(percentage)}%)
          </span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${color}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-inter">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Navbar />
        <Sidebar />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
            Coding Statistics
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Track your progress, analyze your performance, and identify areas for improvement
          </p>
        </motion.div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Target}
            title="Problems Solved"
            value={stats.totalProblemsSolved}
            subtitle={`${stats.easyProblems} Easy, ${stats.mediumProblems} Medium, ${stats.hardProblems} Hard`}
            color="bg-gradient-to-r from-emerald-500 to-green-500"
          />
          <StatCard
            icon={BarChart3}
            title="Accuracy Rate"
            value={`${stats.accuracyRate}%`}
            subtitle={`${stats.acceptedSubmissions} accepted of ${stats.totalSubmissions} submissions`}
            color="bg-gradient-to-r from-blue-500 to-cyan-500"
          />
          <StatCard
            icon={Zap}
            title="Current Streak"
            value={stats.currentStreak}
            subtitle={`Longest streak: ${stats.longestStreak} days`}
            color="bg-gradient-to-r from-orange-500 to-red-500"
          />
          <StatCard
            icon={Code}
            title="Total Submissions"
            value={stats.totalSubmissions}
            subtitle={`${stats.rejectedSubmissions} failed attempts`}
            color="bg-gradient-to-r from-purple-500 to-pink-500"
          />
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Difficulty Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                Problems by Difficulty
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                  <span className="font-medium text-emerald-700 dark:text-emerald-300">Easy</span>
                </div>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.easyProblems}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                  <span className="font-medium text-amber-700 dark:text-amber-300">Medium</span>
                </div>
                <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.mediumProblems}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="font-medium text-red-700 dark:text-red-300">Hard</span>
                </div>
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {stats.hardProblems}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Language Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                Languages Used
              </h3>
            </div>
            
            {Object.keys(stats.submissionsByLanguage).length > 0 ? (
              <div>
                {Object.entries(stats.submissionsByLanguage)
                  .sort(([,a], [,b]) => b - a)
                  .slice(0, 5)
                  .map(([language, count], index) => {
                    const colors = [
                      'bg-gradient-to-r from-blue-500 to-blue-600',
                      'bg-gradient-to-r from-green-500 to-green-600',
                      'bg-gradient-to-r from-purple-500 to-purple-600',
                      'bg-gradient-to-r from-orange-500 to-orange-600',
                      'bg-gradient-to-r from-pink-500 to-pink-600'
                    ];
                    return (
                      <LanguageBar
                        key={language}
                        language={language}
                        count={count}
                        total={stats.totalSubmissions}
                        color={colors[index]}
                      />
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                No submissions yet
              </div>
            )}
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Recent Activity
            </h3>
          </div>
          
          {stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((submission, index) => (
                <div
                  key={submission.id}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    {submission.status === "ACCEPTED" || submission.status === "Accepted" ? (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium text-slate-800 dark:text-slate-200">
                        Problem #{submission.problemId}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {submission.language} • {new Date(submission.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    submission.status === "ACCEPTED" || submission.status === "Accepted"
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                      : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                  }`}>
                    {submission.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              No recent activity
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Statistics;