import React, { useState } from "react";
import PlaylistProfile from "../components/PlaylistProfile";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import "../styles/Playlists.css";
import { Link } from "react-router-dom";
import { ArrowLeft, PlayCircle, Users, Calendar, Target, TrendingUp, Plus } from "lucide-react";
import Sidebar from "../components/Sidebar";

const Playlists = () => {
  const [activeView, setActiveView] = useState("grid");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-inter">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Navbar />
        <Sidebar />

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 mb-8"
        >
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors mb-6 font-medium"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                Your Playlists
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Organize your coding practice with curated problem collections
              </p>
            </div>

            {/* Quick Actions */}
            <div className="hidden md:flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <Plus className="w-4 h-4" />
                Create Playlist
              </button>
              
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setActiveView("grid")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeView === "grid"
                      ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setActiveView("list")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                    activeView === "list"
                      ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  12
                </h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Playlists
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  3 created this month
                </p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  145
                </h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Problems
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Across all playlists
                </p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  78%
                </h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Completion Rate
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Average across playlists
                </p>
              </div>
            </div>

            <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  5
                </h3>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Active This Week
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Recently accessed
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden"
        >
          {/* Content Header */}
          <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-4 border-b border-slate-200 dark:border-slate-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PlayCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  My Playlists
                </h2>
              </div>
              
              {/* Mobile View Toggle */}
              <div className="md:hidden flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setActiveView("grid")}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    activeView === "grid"
                      ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setActiveView("list")}
                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                    activeView === "list"
                      ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  List
                </button>
              </div>
            </div>
          </div>

          {/* Playlist Content */}
          <div className="p-6">
            <PlaylistProfile viewMode={activeView} />
          </div>
        </motion.div>

        {/* Quick Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800"
        >
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">
            💡 Pro Tips for Better Learning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                  Organize by Topic
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Group similar problems together for focused practice
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                  Progressive Difficulty
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Start with easy problems and gradually increase difficulty
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-1">
                  Regular Review
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Revisit your playlists regularly to reinforce learning
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Playlists;