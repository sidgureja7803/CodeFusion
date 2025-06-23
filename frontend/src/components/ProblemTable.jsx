import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../store/useAction";
import { usePlaylistStore } from "../store/usePlaylistStore";
import AddToPlaylistModal from "../components/AddToPlaylist";
import ConfirmationModal from "./ConfirmationModal";
import { 
  Bookmark, 
  BookmarkCheck, 
  Save, 
  Trash2, 
  Edit, 
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Building2,
  Tag,
  Clock,
  TrendingUp,
  Eye,
  Code2
} from "lucide-react";
import { useRevisionStore } from "../store/useRevisionStore";

const ProblemTable = ({ problems, onProblemDeleted }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const isAdmin = authUser?.role === "ADMIN";
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [filters, setFilters] = useState({
    search: "",
    tags: "",
    companyTags: "",
    difficulty: "",
  });
  const { onDeleteProblem, isDeletingProblem } = useActions();
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [problemToDelete, setProblemToDelete] = useState(null);
  const [problemTitleToDelete, setProblemTitleToDelete] = useState("");

  const {
    addToRevision,
    removeFromRevision,
    isInRevision,
    isLoading: isRevisionLoading,
  } = useRevisionStore();

  const handleRevisionToggle = async (problemId) => {
    if (isInRevision(problemId)) {
      await removeFromRevision(problemId);
    } else {
      await addToRevision(problemId);
    }
  };

  const difficultyOptions = ["EASY", "MEDIUM", "HARD"];

  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    const tagsSet = new Set();
    problems.forEach((problem) => {
      problem.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return Array.from(tagsSet);
  }, [problems]);

  const allCompanyTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    const companyTagsSet = new Set();
    problems.forEach((problem) => {
      problem.companyTags?.forEach((tag) => companyTagsSet.add(tag));
    });
    return Array.from(companyTagsSet);
  }, [problems]);

  const filteredProblems = useMemo(() => {
    if (!Array.isArray(problems)) return [];

    return problems
      .filter((problem) => {
        const matchesSearch =
          filters.search === "" ||
          problem.title.toLowerCase().includes(filters.search.toLowerCase());
        const matchesTags =
          filters.tags === "" || problem.tags?.includes(filters.tags);
        const matchesCompanyTags =
          filters.companyTags === "" ||
          problem.companyTags?.includes(filters.companyTags);
        const matchesDifficulty =
          filters.difficulty === "" ||
          problem.difficulty === filters.difficulty;

        return (
          matchesSearch &&
          matchesTags &&
          matchesDifficulty &&
          matchesCompanyTags
        );
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [problems, filters]);

  const itemsPerPage = viewMode === "grid" ? 12 : 8;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = useMemo(
    () => filteredProblems.slice(startIndex, endIndex),
    [filteredProblems, startIndex, endIndex]
  );

  const handleAddToPlaylist = (problemId) => {
    setSelectedProblemId(problemId);
    setIsAddToPlaylistModalOpen(true);
  };

  const handleDeleteClick = (problemId, problemTitle) => {
    setProblemToDelete(problemId);
    setProblemTitleToDelete(problemTitle);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = async () => {
    const result = await onDeleteProblem(problemToDelete);
    if (result.success && onProblemDeleted) {
      onProblemDeleted(problemToDelete);
    }
    setProblemToDelete(null);
    setProblemTitleToDelete("");
  };

  const handleEdit = (problemId) => {
    navigate(`/problem/edit/${problemId}`);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "from-emerald-500 to-green-500";
      case "MEDIUM":
        return "from-amber-500 to-orange-500";
      case "HARD":
        return "from-red-500 to-pink-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getDifficultyBg = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
      case "MEDIUM":
        return "bg-amber-500/10 border-amber-500/30 text-amber-400";
      case "HARD":
        return "bg-red-500/10 border-red-500/30 text-red-400";
      default:
        return "bg-gray-500/10 border-gray-500/30 text-gray-400";
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      tags: "",
      companyTags: "",
      difficulty: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== "");

  return (
    <div className="space-y-6">
      {/* Enhanced Filters Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200">
              Filter Problems
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                Clear All
              </button>
            )}
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-slate-600 text-purple-600 dark:text-purple-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-slate-600 text-purple-600 dark:text-purple-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search problems..."
              className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            />
          </div>

          <select
            className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            value={filters.tags}
            onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
          >
            <option value="">All Tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            value={filters.difficulty}
            onChange={(e) =>
              setFilters({ ...filters, difficulty: e.target.value })
            }
          >
            <option value="">All Difficulties</option>
            {difficultyOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
              </option>
            ))}
          </select>

          <select
            className="px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
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

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                <Search className="w-3 h-3" />
                "{filters.search}"
              </span>
            )}
            {filters.tags && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                <Tag className="w-3 h-3" />
                {filters.tags}
              </span>
            )}
            {filters.difficulty && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm">
                <TrendingUp className="w-3 h-3" />
                {filters.difficulty}
              </span>
            )}
            {filters.companyTags && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm">
                <Building2 className="w-3 h-3" />
                {filters.companyTags}
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-between"
      >
        <div className="text-slate-600 dark:text-slate-400">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProblems.length)} of {filteredProblems.length} problems
        </div>
        <div className="text-sm text-slate-500 dark:text-slate-500">
          Page {currentPage} of {totalPages}
        </div>
      </motion.div>

      {/* Problems Display */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentItems.map((problem, index) => {
              const isSolved = problem.solvedBy.some(
                (solvedRecord) => solvedRecord.userId === authUser?.id
              );
              const isMarkedForRevision = isInRevision(problem.id);

              return (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 relative overflow-hidden"
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    {isSolved ? (
                      <div className="p-1 bg-emerald-500/20 rounded-full">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="p-1 bg-slate-500/20 rounded-full">
                        <XCircle className="w-4 h-4 text-slate-500" />
                      </div>
                    )}
                  </div>

                  {/* Problem Number */}
                  <div className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-2">
                    #{startIndex + index + 1}
                  </div>

                  {/* Title */}
                  <Link 
                    to={`/problem/${problem.id}`}
                    className="block mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors"
                  >
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-tight">
                      {problem.title}
                    </h3>
                  </Link>

                  {/* Difficulty Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyBg(problem.difficulty)}`}>
                      {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1).toLowerCase()}
                    </span>
                  </div>

                  {/* Tags */}
                  {problem.tags && problem.tags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md text-xs truncate"
                            title={tag}
                          >
                            {tag}
                          </span>
                        ))}
                        {problem.tags.length > 3 && (
                          <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md text-xs">
                            +{problem.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Company Tags */}
                  {problem.companyTags && problem.companyTags.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <Building2 className="w-3 h-3" />
                        <span>Companies</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {problem.companyTags.slice(0, 2).map((company) => (
                          <span
                            key={company}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-xs truncate"
                            title={company}
                          >
                            {company}
                          </span>
                        ))}
                        {problem.companyTags.length > 2 && (
                          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-xs">
                            +{problem.companyTags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* LeetCode Stats - only show for LeetCode problems */}
                  {problem.leetcodeId && (
                    <div className="mb-4 grid grid-cols-2 gap-3">
                      {problem.acceptanceRate && (
                        <div className="flex items-center gap-1 text-xs">
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                          <span className="text-slate-600 dark:text-slate-400">
                            {(problem.acceptanceRate * 100).toFixed(1)}% accepted
                          </span>
                        </div>
                      )}
                      {problem.frequency && (
                        <div className="flex items-center gap-1 text-xs">
                          <TrendingUp className="w-3 h-3 text-purple-500" />
                          <span className="text-slate-600 dark:text-slate-400">
                            {(problem.frequency * 100).toFixed(1)}% frequency
                          </span>
                        </div>
                      )}
                      {problem.likes && (
                        <div className="flex items-center gap-1 text-xs">
                          <Eye className="w-3 h-3 text-blue-500" />
                          <span className="text-slate-600 dark:text-slate-400">
                            {problem.likes} likes
                          </span>
                        </div>
                      )}
                      {problem.askedByFaang && (
                        <div className="flex items-center gap-1 text-xs">
                          <Code2 className="w-3 h-3 text-orange-500" />
                          <span className="text-orange-600 dark:text-orange-400 font-medium">
                            FAANG
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleRevisionToggle(problem.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isMarkedForRevision
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                            : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                        }`}
                        title={isMarkedForRevision ? "Remove from revision" : "Save for revision"}
                        disabled={isRevisionLoading}
                      >
                        {isMarkedForRevision ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                      
                      <button
                        onClick={() => handleAddToPlaylist(problem.id)}
                        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                        title="Add to playlist"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>

                    {isAdmin && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleEdit(problem.id)}
                          className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors"
                          title="Edit problem"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(problem.id, problem.title)}
                          className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                          title="Delete problem"
                          disabled={isDeletingProblem}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-700/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Tags
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Companies
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Stats
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {currentItems.map((problem, index) => {
                    const isSolved = problem.solvedBy.some(
                      (solvedRecord) => solvedRecord.userId === authUser?.id
                    );
                    const isMarkedForRevision = isInRevision(problem.id);

                    return (
                      <motion.tr
                        key={problem.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600 dark:text-slate-300">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {isSolved ? (
                            <div className="flex items-center">
                              <CheckCircle className="w-5 h-5 text-emerald-500" />
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <XCircle className="w-5 h-5 text-slate-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link 
                            to={`/problem/${problem.id}`}
                            className="text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
                          >
                            {problem.title}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyBg(problem.difficulty)}`}>
                            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1).toLowerCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {problem.tags?.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md text-xs truncate"
                                title={tag}
                              >
                                {tag}
                              </span>
                            ))}
                            {problem.tags && problem.tags.length > 3 && (
                              <span className="inline-block px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md text-xs">
                                +{problem.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {problem.companyTags && problem.companyTags.length > 0 ? (
                              <>
                                {problem.companyTags.slice(0, 2).map((company) => (
                                  <span
                                    key={company}
                                    className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-xs truncate"
                                    title={company}
                                  >
                                    {company}
                                  </span>
                                ))}
                                {problem.companyTags.length > 2 && (
                                  <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-md text-xs">
                                    +{problem.companyTags.length - 2}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-slate-400 text-xs">N/A</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {problem.leetcodeId ? (
                            <div className="space-y-1">
                              {problem.acceptanceRate && (
                                <div className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>{(problem.acceptanceRate * 100).toFixed(1)}%</span>
                                </div>
                              )}
                              {problem.frequency && (
                                <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400">
                                  <TrendingUp className="w-3 h-3" />
                                  <span>{(problem.frequency * 100).toFixed(1)}%</span>
                                </div>
                              )}
                              {problem.askedByFaang && (
                                <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                                  <Code2 className="w-3 h-3" />
                                  <span>FAANG</span>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleRevisionToggle(problem.id)}
                              className={`p-2 rounded-lg transition-colors ${
                                isMarkedForRevision
                                  ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                                  : "hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400"
                              }`}
                              title={isMarkedForRevision ? "Remove from revision" : "Save for revision"}
                              disabled={isRevisionLoading}
                            >
                              {isMarkedForRevision ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                            </button>
                            
                            <button
                              onClick={() => handleAddToPlaylist(problem.id)}
                              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors"
                              title="Add to playlist"
                            >
                              <Save className="w-4 h-4" />
                            </button>

                            {isAdmin && (
                              <>
                                <button
                                  onClick={() => handleEdit(problem.id)}
                                  className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 transition-colors"
                                  title="Edit problem"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(problem.id, problem.title)}
                                  className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
                                  title="Delete problem"
                                  disabled={isDeletingProblem}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Pagination */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-4"
        >
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredProblems.length)} of {filteredProblems.length} results
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === pageNumber
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {filteredProblems.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-12 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-slate-400 to-slate-500 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-6">
            <Code2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
            No Problems Found
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {hasActiveFilters 
              ? "Try adjusting your filters to find more problems."
              : "No coding problems are available at the moment."
            }
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Clear Filters
            </button>
          )}
        </motion.div>
      )}

      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => {
          setIsAddToPlaylistModalOpen(false);
        }}
        problemId={selectedProblemId}
      />
      <ConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Problem"
        message={`Are you sure you want to delete "${problemTitleToDelete}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default ProblemTable;
