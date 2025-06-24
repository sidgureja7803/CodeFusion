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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900 font-inter relative overflow-hidden" ref={sectionRef}>
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
      </div>
      {/* Sidebar */}
      <Sidebar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Navbar />

        {/* Enhanced Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-8 bg-gradient-to-br from-white/90 to-blue-50/80 dark:from-slate-800/90 dark:to-blue-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-blue-300/50 dark:border-blue-600/50 p-8 relative overflow-hidden"
        >
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-15">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transform rotate-12 scale-150"></div>
          </div>
          <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl"></div>
          <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
          
          {/* Content */}
          <div className="relative z-10 flex items-start gap-6">
            {/* Enhanced Avatar */}
            <div className="relative">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl border-2 border-white/20 transform hover:scale-105 transition-transform duration-300">
                {authUser?.name
                  ? authUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                  : "NA"}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-3 border-white dark:border-slate-800 shadow-lg animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-3xl blur-xl"></div>
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

              {/* Enhanced Quick Actions */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsCreatePlaylistModalOpen(true)}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-600 hover:from-blue-700 hover:via-indigo-800 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 border border-blue-400/30"
                >
                  <span className="text-lg group-hover:animate-bounce">📝</span>
                  <span>Create Playlist</span>
                  <kbd className="ml-2 px-2 py-1 bg-white/25 rounded-md text-xs font-mono border border-white/20">C</kbd>
                </button>
                
                <button
                  onClick={() => navigate("/revision-problems")}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 hover:from-blue-700 hover:via-blue-800 hover:to-cyan-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 border border-blue-400/30"
                >
                  <span className="text-lg group-hover:animate-bounce">🔖</span>
                  <span>Revision</span>
                </button>
                
                <button
                  onClick={() => navigate("/playlists")}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-600 hover:from-emerald-700 hover:via-emerald-800 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 border border-emerald-400/30"
                >
                  <span className="text-lg group-hover:animate-bounce">📚</span>
                  <span>My Playlists</span>
                </button>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="hidden lg:flex flex-col gap-4">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-800/40 dark:to-cyan-800/40 p-6 rounded-2xl border border-blue-300/50 dark:border-blue-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-1">
                  {problems.length}
                </div>
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                  Total Problems
                </div>
                <div className="w-full bg-blue-200/50 dark:bg-blue-700/30 rounded-full h-1.5 mt-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-800/40 dark:to-green-800/40 p-6 rounded-2xl border border-emerald-300/50 dark:border-emerald-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-1">
                  {problems.filter(p => p.difficulty === 'EASY').length}
                </div>
                <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  Easy Problems
                </div>
                <div className="w-full bg-emerald-200/50 dark:bg-emerald-700/30 rounded-full h-1.5 mt-2">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-1.5 rounded-full" style={{width: `${(problems.filter(p => p.difficulty === 'EASY').length / problems.length) * 100}%`}}></div>
                </div>
              </div>
              
                              <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-800/40 dark:to-orange-800/40 p-6 rounded-2xl border border-amber-300/50 dark:border-amber-600/50 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="text-3xl font-bold text-amber-700 dark:text-amber-300 mb-1">
                    {problems.filter(p => p.difficulty === 'MEDIUM').length}
                  </div>
                  <div className="text-sm font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                    Medium Problems
                  </div>
                  <div className="w-full bg-amber-200/50 dark:bg-amber-700/30 rounded-full h-1.5 mt-2">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full" style={{width: `${(problems.filter(p => p.difficulty === 'MEDIUM').length / problems.length) * 100}%`}}></div>
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
            <div className="bg-gradient-to-br from-white/90 to-blue-50/80 dark:from-slate-800/90 dark:to-blue-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-blue-300/50 dark:border-blue-600/50 p-12 text-center relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-white text-3xl mx-auto mb-6 shadow-2xl border-2 border-white/20">
                  📝
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-4">
                  No Problems Found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-8 text-lg">
                  It looks like there are no coding problems available at the moment.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-600 hover:from-blue-700 hover:via-indigo-800 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 border border-blue-400/30"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Enhanced Section Header */}
              <div className="bg-gradient-to-r from-white/80 to-blue-50/60 dark:from-slate-800/80 dark:to-blue-900/60 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/50 dark:border-blue-700/50 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                                          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 dark:from-blue-300 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mb-2">
                        🚀 Coding Problems
                      </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">
                      Solve problems, practice algorithms, and level up your coding skills
                    </p>
                  </div>
                  
                  {/* Enhanced Quick Stats */}
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-center p-3 bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-800/30 dark:to-green-800/30 rounded-xl border border-emerald-300/50 dark:border-emerald-600/50">
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {problems.filter(p => p.difficulty === 'EASY').length}
                      </div>
                      <div className="text-xs font-semibold text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wide">Easy</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-800/30 rounded-xl border border-amber-300/50 dark:border-amber-600/50">
                      <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        {problems.filter(p => p.difficulty === 'MEDIUM').length}
                      </div>
                      <div className="text-xs font-semibold text-amber-600/80 dark:text-amber-400/80 uppercase tracking-wide">Medium</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-800/30 dark:to-orange-800/30 rounded-xl border border-red-300/50 dark:border-red-600/50">
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                        {problems.filter(p => p.difficulty === 'HARD').length}
                      </div>
                      <div className="text-xs font-semibold text-red-600/80 dark:text-red-400/80 uppercase tracking-wide">Hard</div>
                    </div>
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