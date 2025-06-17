import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRevisionStore } from "../store/useRevisionStore";
import { useProblemStore } from "../store/useProblemStore";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import {
  BookmarkCheck,
  ArrowLeft,
  ExternalLink,
  Search,
  Filter,
  SortAsc,
  Calendar,
  Code,
  Target,
  TrendingUp
} from "lucide-react";
import { Loader } from "../components/Loader";

const RevisionProblems = () => {
  const navigate = useNavigate();
  const {
    revisionProblems,
    getRevisionProblems,
    removeFromRevision,
    isLoading,
  } = useRevisionStore();
  const { problems, getProblems } = useProblemStore();

  const [filters, setFilters] = useState({
    search: "",
    tags: "",
    companyTags: "",
    difficulty: "",
  });

  useEffect(() => {
    getRevisionProblems();
    if (!problems.length) {
      getProblems();
    }
  }, [getRevisionProblems, getProblems, problems.length]);

  // Get full problem details from the problem store
  const revisionProblemsWithDetails = revisionProblems.map((revItem) => {
    const problem = problems.find((p) => p.id === revItem.problemId);
    return {
      ...revItem,
      problemDetails: problem || null,
    };
  });

  // Filter problems based on search, tags, and difficulty
  const filteredProblems = useMemo(() => {
    return revisionProblemsWithDetails.filter((item) => {
      if (!item.problemDetails) return false;

      const matchesSearch =
        filters.search === "" ||
        item.problemDetails.title
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesCompanyTags =
        filters.companyTags === "" ||
        item.problemDetails.companyTags?.includes(filters.companyTags);

      const matchesTags =
        filters.tags === "" ||
        (item.problemDetails.tags &&
          item.problemDetails.tags.includes(filters.tags));

      const matchesDifficulty =
        filters.difficulty === "" ||
        item.problemDetails.difficulty === filters.difficulty;

      return (
        matchesSearch && matchesTags && matchesDifficulty && matchesCompanyTags
      );
    });
  }, [revisionProblemsWithDetails, filters]);

  const handleRemoveFromRevision = (problemId, e) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromRevision(problemId);
  };

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    const tagsSet = new Set();

    revisionProblemsWithDetails.forEach((item) => {
      if (item.problemDetails?.tags) {
        item.problemDetails.tags.forEach((tag) => tagsSet.add(tag));
      }
    });

    return Array.from(tagsSet);
  }, [revisionProblemsWithDetails]);

  const allCompanyTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    const companyTagsSet = new Set();
    revisionProblemsWithDetails.forEach((problem) => {
      problem.companyTags?.forEach((tag) => companyTagsSet.add(tag));
    });
    return Array.from(companyTagsSet);
  }, [revisionProblemsWithDetails]);

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800";
      case "MEDIUM":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800";
      case "HARD":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800";
      default:
        return "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-800";
    }
  };

  // Statistics for the header
  const stats = {
    total: filteredProblems.length,
    easy: filteredProblems.filter(p => p.problemDetails?.difficulty === "EASY").length,
    medium: filteredProblems.filter(p => p.problemDetails?.difficulty === "MEDIUM").length,
    hard: filteredProblems.filter(p => p.problemDetails?.difficulty === "HARD").length,
  };

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

          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
                Revision Problems
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Problems you've saved for future practice and review
              </p>
            </div>

            {/* Quick Stats */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  {stats.total}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.easy}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Easy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  {stats.medium}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Medium</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {stats.hard}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Hard</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters Section */}
        {!isLoading && revisionProblemsWithDetails.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  Filter & Search
                </h3>
              </div>

              {(filters.search || filters.tags || filters.difficulty || filters.companyTags) && (
                <button
                  onClick={() =>
                    setFilters({
                      search: "",
                      tags: "",
                      difficulty: "",
                      companyTags: "",
                    })
                  }
                  className="px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-600 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500" size={16} />
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="pl-10 w-full px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                />
              </div>

              <select
                className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={filters.tags}
                onChange={(e) =>
                  setFilters({ ...filters, tags: e.target.value })
                }
              >
                <option value="">All Tags</option>
                {allTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={filters.difficulty}
                onChange={(e) =>
                  setFilters({ ...filters, difficulty: e.target.value })
                }
              >
                <option value="">All Difficulties</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>

              <select
                className="px-4 py-3 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={filters.companyTags}
                onChange={(e) =>
                  setFilters({ ...filters, companyTags: e.target.value })
                }
              >
                <option value="">All Companies</option>
                {allCompanyTags.map((tag) => (
                  <option key={tag} value={tag}>
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {/* Content Section */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader />
          </div>
        ) : revisionProblemsWithDetails.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-12 border border-slate-200 dark:border-slate-700 shadow-lg text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
              🔖
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
              No problems saved for revision
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
              When you find problems you want to revise later, save them using the bookmark button for quick access.
            </p>
            <Link 
              to="/dashboard" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Code className="w-4 h-4" />
              Browse Problems
            </Link>
          </motion.div>
        ) : filteredProblems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-3xl p-12 border border-slate-200 dark:border-slate-700 shadow-lg text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
              🔍
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
              No matching problems found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              Try adjusting your filter criteria to find more problems.
            </p>
            <button
              onClick={() => setFilters({ search: "", tags: "", difficulty: "", companyTags: "" })}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Clear All Filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden"
          >
            {/* Table Header */}
            <div className="bg-slate-50 dark:bg-slate-700/50 px-6 py-4 border-b border-slate-200 dark:border-slate-600">
              <div className="grid grid-cols-12 gap-4 items-center text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
                <div className="col-span-4">Problem</div>
                <div className="col-span-2">Difficulty</div>
                <div className="col-span-2">Tags</div>
                <div className="col-span-2">Company</div>
                <div className="col-span-2 text-right">Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredProblems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-12 gap-4 items-center p-6 hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors"
                  onClick={() => navigate(`/problem/${item.problemId}`)}
                >
                  <div className="col-span-4">
                    <h3 className="font-semibold text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {item.problemDetails?.title || "Loading..."}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Added {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="col-span-2">
                    {item.problemDetails ? (
                      <span className={`px-3 py-1.5 rounded-full text-sm font-medium ${getDifficultyClass(item.problemDetails.difficulty)}`}>
                        {item.problemDetails.difficulty.charAt(0).toUpperCase() + item.problemDetails.difficulty.slice(1).toLowerCase()}
                      </span>
                    ) : (
                      <span className="text-slate-400">Loading...</span>
                    )}
                  </div>

                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {item.problemDetails?.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                      {item.problemDetails?.tags?.length > 2 && (
                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded text-xs">
                          +{item.problemDetails.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {item.companyTags && item.companyTags.length > 0 ? (
                        item.companyTags.slice(0, 2).map((company, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs border border-blue-200 dark:border-blue-800"
                          >
                            {company}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 text-sm">N/A</span>
                      )}
                    </div>
                  </div>

                  <div className="col-span-2 text-right">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        onClick={(e) => handleRemoveFromRevision(item.problemId, e)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors group"
                        title="Remove from revision"
                      >
                        <BookmarkCheck size={16} className="text-red-500 group-hover:text-red-600" />
                      </button>
                      <Link
                        to={`/problem/${item.problemId}`}
                        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors group"
                        title="View problem"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} className="text-blue-500 group-hover:text-blue-600" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RevisionProblems;