import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useProblemStore } from "../store/useProblemStore";
import { Loader } from "../components/Loader";
import Sidebar from "../components/Sidebar";
import ProblemTable from "../components/ProblemTable";
import CreatePlaylistModal from "../components/CreatePlaylistModal";
import "../styles/Dashboard.css";
import { usePlaylistStore } from "../store/usePlaylistStore";

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good Morning";
  } else if (hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

// Function to get formatted date string
const getFormattedDateTime = () => {
  const greeting = getGreeting();
  const date = new Date();

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayOfWeek = dayNames[date.getDay()];
  const month = monthNames[date.getMonth()];
  const dayOfMonth = date.getDate();
  const year = date.getFullYear();

  return `${greeting} • ${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
};

export const Dashboard = () => {
  const { getProblems, problems, isProblemsLoading } = useProblemStore();
  const { createPlaylist } = usePlaylistStore();
  const { authUser } = useAuthStore();
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
    useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(
    getFormattedDateTime()
  );
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    // Update the datetime every minute
    const intervalId = setInterval(() => {
      setCurrentDateTime(getFormattedDateTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (
        e.key.toLowerCase() === "c" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey // Avoid shortcuts like Ctrl+C
      ) {
        setIsCreatePlaylistModalOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    getProblems();
  }, [getProblems]);

  const handleCreatePlaylist = async (playlistData) => {
    const result = await createPlaylist(playlistData);
  };

  const handleProblemDeleted = () => {
    // Refresh the problems list after deletion
    getProblems();
  };

  if (isProblemsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-inter" ref={sectionRef}>
      {/* Sidebar */}
      <Sidebar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Navbar />

        {/* Enhanced Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-8 bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform rotate-12 scale-150"></div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 flex items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {authUser?.name
                  ? authUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "NA"}
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  Welcome Back, {authUser?.name} 
                </h1>
                <span className="text-2xl">✨</span>
              </div>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-1 font-medium">
                {currentDateTime}
              </p>
              
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
                {authUser?.email}
              </p>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsCreatePlaylistModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="text-sm">📝</span>
                  <span>Create Playlist</span>
                  <kbd className="ml-2 px-2 py-1 bg-white/20 rounded text-xs">C</kbd>
                </button>
                
                <button
                  onClick={() => navigate("/revision-problems")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="text-sm">🔖</span>
                  <span>Revision</span>
                </button>
                
                <button
                  onClick={() => navigate("/playlists")}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <span className="text-sm">📚</span>
                  <span>My Playlists</span>
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="hidden lg:flex flex-col gap-3">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {problems.length}
                </div>
                <div className="text-sm text-blue-600/70 dark:text-blue-400/70">
                  Total Problems
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {problems.filter(p => p.difficulty === 'EASY').length}
                </div>
                <div className="text-sm text-emerald-600/70 dark:text-emerald-400/70">
                  Easy Problems
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Problems Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-8"
        >
          {problems.length === 0 ? (
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-12 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
                📝
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                No Problems Found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                It looks like there are no coding problems available at the moment.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Refresh Page
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Section Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Coding Problems
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-1">
                    Solve problems, practice algorithms, and level up your coding skills
                  </p>
                </div>
                
                {/* Quick Stats */}
                <div className="hidden md:flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {problems.filter(p => p.difficulty === 'EASY').length}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Easy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                      {problems.filter(p => p.difficulty === 'MEDIUM').length}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Medium</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-red-600 dark:text-red-400">
                      {problems.filter(p => p.difficulty === 'HARD').length}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">Hard</div>
                  </div>
                </div>
              </div>

              {/* Problems Table */}
              <ProblemTable
                problems={problems}
                onProblemDeleted={handleProblemDeleted}
              />
            </div>
          )}
        </motion.div>
      </div>

      <CreatePlaylistModal
        isOpen={isCreatePlaylistModalOpen}
        onClose={() => setIsCreatePlaylistModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />
    </div>
  );
};