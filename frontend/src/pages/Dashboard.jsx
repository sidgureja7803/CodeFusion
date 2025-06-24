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
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  Zap, 
  Award,
  Calendar,
  BookOpen,
  Bookmark
} from "lucide-react";

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

  const easyProblems = problems.filter(p => p.difficulty === 'EASY').length;
  const mediumProblems = problems.filter(p => p.difficulty === 'MEDIUM').length;
  const hardProblems = problems.filter(p => p.difficulty === 'HARD').length;
  const totalProblems = problems.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-['Inter'] relative overflow-hidden" ref={sectionRef}>
      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main gradient orbs */}
        <div className="absolute -top-64 -right-64 w-128 h-128 bg-gradient-to-br from-blue-500/15 via-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-64 -left-64 w-128 h-128 bg-gradient-to-br from-emerald-500/15 via-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        
        {/* Secondary accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-violet-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(199,210,254,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(199,210,254,0.02)_1px,transparent_1px)]"></div>
      </div>

      {/* Sidebar */}
      <Sidebar />

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        <Navbar />

        {/* Enhanced Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-12 relative"
        >
          {/* Premium Card Container */}
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-blue-500/10 dark:shadow-purple-500/10 border border-white/20 dark:border-slate-700/30 relative overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/10 dark:to-purple-900/20"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-400/10 via-indigo-400/5 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-emerald-400/10 via-cyan-400/5 to-transparent rounded-full blur-3xl"></div>
            
            <div className="relative z-10 p-12">
              <div className="flex flex-col lg:flex-row items-start gap-12">
                {/* User Profile Section */}
                <div className="flex items-start gap-6 flex-1">
                  {/* Premium Avatar */}
                  <div className="relative group">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-2xl border-4 border-white/30 dark:border-slate-700/30 transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
                      {authUser?.name
                        ? authUser.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : "NA"}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-3 border-white dark:border-slate-800 shadow-lg">
                      <div className="w-full h-full bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-600 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent leading-tight">
                        Welcome back, <span className="text-blue-600 dark:text-blue-400">{authUser?.name}</span>
                      </h1>
                      <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                      <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                        {currentDateTime}
                      </p>
                    </div>
                    
                    <p className="text-sm text-slate-500 dark:text-slate-500 mb-8 font-medium">
                      {authUser?.email}
                    </p>

                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsCreatePlaylistModalOpen(true)}
                        className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:from-blue-700 hover:via-blue-800 hover:to-indigo-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 border border-blue-500/20"
                      >
                        <BookOpen className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        <span>Create Playlist</span>
                        <kbd className="ml-2 px-2 py-1 bg-white/20 rounded-md text-xs font-mono border border-white/30">C</kbd>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/revision-problems")}
                        className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-green-700 hover:from-emerald-700 hover:via-emerald-800 hover:to-green-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/40 border border-emerald-500/20"
                      >
                        <Bookmark className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        <span>Revision</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate("/playlists")}
                        className="group flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-violet-600 via-purple-700 to-violet-700 hover:from-violet-700 hover:via-purple-800 hover:to-violet-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-violet-500/25 hover:shadow-xl hover:shadow-violet-500/40 border border-violet-500/20"
                      >
                        <Target className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        <span>My Playlists</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Premium Stats Dashboard */}
                <div className="lg:w-80">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Total Problems */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-2xl border border-blue-200/50 dark:border-blue-700/30 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-1">
                        {totalProblems}
                      </div>
                      <div className="text-xs font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide">
                        Total Problems
                      </div>
                      <div className="w-full bg-blue-200/50 dark:bg-blue-800/30 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-1000" style={{width: '100%'}}></div>
                      </div>
                    </motion.div>
                    
                    {/* Easy Problems */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 p-6 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/30 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Zap className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-1">
                        {easyProblems}
                      </div>
                      <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                        Easy
                      </div>
                      <div className="w-full bg-emerald-200/50 dark:bg-emerald-800/30 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-2 rounded-full transition-all duration-1000" style={{width: totalProblems > 0 ? `${(easyProblems / totalProblems) * 100}%` : '0%'}}></div>
                      </div>
                    </motion.div>
                    
                    {/* Medium Problems */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 p-6 rounded-2xl border border-amber-200/50 dark:border-amber-700/30 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Target className="w-8 h-8 text-amber-600 dark:text-amber-400" />
                        <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-1">
                        {mediumProblems}
                      </div>
                      <div className="text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wide">
                        Medium
                      </div>
                      <div className="w-full bg-amber-200/50 dark:bg-amber-800/30 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-1000" style={{width: totalProblems > 0 ? `${(mediumProblems / totalProblems) * 100}%` : '0%'}}></div>
                      </div>
                    </motion.div>
                    
                    {/* Hard Problems */}
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 p-6 rounded-2xl border border-red-200/50 dark:border-red-700/30 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Award className="w-8 h-8 text-red-600 dark:text-red-400" />
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-3xl font-bold text-red-900 dark:text-red-100 mb-1">
                        {hardProblems}
                      </div>
                      <div className="text-xs font-semibold text-red-700 dark:text-red-300 uppercase tracking-wide">
                        Hard
                      </div>
                      <div className="w-full bg-red-200/50 dark:bg-red-800/30 rounded-full h-2 mt-3">
                        <div className="bg-gradient-to-r from-red-500 to-rose-500 h-2 rounded-full transition-all duration-1000" style={{width: totalProblems > 0 ? `${(hardProblems / totalProblems) * 100}%` : '0%'}}></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Problems Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-12"
        >
          {problems.length === 0 ? (
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-blue-500/10 dark:shadow-purple-500/10 border border-white/20 dark:border-slate-700/30 p-16 text-center relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-blue-900/20 dark:via-indigo-900/10 dark:to-purple-900/20"></div>
              <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-2xl"></div>
              
              <div className="relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-white text-4xl mx-auto mb-8 shadow-2xl border-4 border-white/20">
                  📝
                </div>
                <h3 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-700 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-6">
                  No Problems Found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-10 text-xl max-w-md mx-auto leading-relaxed">
                  It looks like there are no coding problems available at the moment.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.location.reload()}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-600 hover:from-blue-700 hover:via-indigo-800 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl border border-blue-400/30"
                >
                  Refresh Page
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Enhanced Section Header */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-700 to-indigo-700 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                          Coding Problems
                        </h2>
                        <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-xl font-medium">
                        Master algorithms, practice problem-solving, and level up your coding skills
                      </p>
                    </div>
                    
                    {/* Premium Quick Stats */}
                    <div className="hidden xl:flex items-center gap-6">
                      <div className="text-center p-4 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl border border-emerald-300/50 dark:border-emerald-600/30 shadow-lg">
                        <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
                          {easyProblems}
                        </div>
                        <div className="text-xs font-semibold text-emerald-600/80 dark:text-emerald-400/80 uppercase tracking-wide">Easy</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl border border-amber-300/50 dark:border-amber-600/30 shadow-lg">
                        <div className="text-3xl font-bold text-amber-700 dark:text-amber-300">
                          {mediumProblems}
                        </div>
                        <div className="text-xs font-semibold text-amber-600/80 dark:text-amber-400/80 uppercase tracking-wide">Medium</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-red-100 to-rose-100 dark:from-red-900/30 dark:to-rose-900/30 rounded-xl border border-red-300/50 dark:border-red-600/30 shadow-lg">
                        <div className="text-3xl font-bold text-red-700 dark:text-red-300">
                          {hardProblems}
                        </div>
                        <div className="text-xs font-semibold text-red-600/80 dark:text-red-400/80 uppercase tracking-wide">Hard</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Problems Table */}
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/30 shadow-lg overflow-hidden">
                <ProblemTable
                  problems={problems}
                  onProblemDeleted={handleProblemDeleted}
                />
              </div>
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