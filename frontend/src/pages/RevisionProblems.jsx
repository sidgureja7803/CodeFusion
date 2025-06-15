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
        return "dark:bg-emerald-900/60 bg-emerald-200/60 dark:text-emerald-400 text-emerald-600 border border-emerald-700";
      case "MEDIUM":
        return "dark:bg-amber-900/60 bg-amber-200/60 dark:text-amber-400 text-amber-600 border border-amber-700";
      case "HARD":
        return "dark:bg-red-900/60 bg-red-200/60 dark:text-red-200 text-red-600 border border-red-700";
      default:
        return "bg-gray-900/60 text-gray-300 border border-gray-700";
    }
  };

  return (
    <div className="dashboard-container min-h-screen mx-auto">
      <div className="max-w-[1200px] mx-auto">
        <Navbar />
        <Sidebar />

        <div className="my-4">
          <Link
            to="/dashboard"
            className="dark:text-white/80 dark:hover:text-white text-black/80 hover:text-black transition-all duration-300 ease-in-out flex items-center gap-2 mb-4"
          >
            <ArrowLeft size={18} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="dark:text-white text-black text-4xl text-center">
            Saved Problems for Revision
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          exit={{ opacity: 0 }}
          className="flex justify-end h-8 mr-[0.5em] "
        >
          {filters.search ||
          filters.tags ||
          filters.difficulty ||
          filters.companyTags ? (
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  tags: "",
                  difficulty: "",
                  companyTags: "",
                })
              }
              className="px-3 py-1 text-sm bg-transparent hover:bg-gray-700/20 dark:text-white/80 dark:hover:text-white text-black/80 hover:text-black rounded border border-blue-700 transition-all duration-200 flex items-center gap-2"
            >
              Clear Filters
            </button>
          ) : (
            <div></div> // Empty div to hold space when button is not visible
          )}
        </motion.div>

        {!isLoading && revisionProblemsWithDetails.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "backInOut" }}
            className="dash-card mb-4 "
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-white/50 text-black/50"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search problems..."
                  className="pl-10 px-4 py-2 dark:text-white text-black filter-input w-full"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                  }
                />
              </div>

              <select
                className="px-4 py-2 dark:text-white text-black filter-input"
                value={filters.tags}
                onChange={(e) =>
                  setFilters({ ...filters, tags: e.target.value })
                }
              >
                <option className="dark:bg-black/90 bg-white/90" value="">
                  All Tags
                </option>
                {allTags.map((tag) => (
                  <option
                    className="dark:bg-black/90 bg-white/90"
                    key={tag}
                    value={tag}
                  >
                    {tag}
                  </option>
                ))}
              </select>

              <select
                className="px-4 py-2 filter-input"
                value={filters.difficulty}
                onChange={(e) =>
                  setFilters({ ...filters, difficulty: e.target.value })
                }
              >
                <option className="dark:bg-black/90 bg-white/90" value="">
                  All Difficulties
                </option>
                <option className="dark:bg-black/90 bg-white/90" value="EASY">
                  Easy
                </option>
                <option className="dark:bg-black/90 bg-white/90" value="MEDIUM">
                  Medium
                </option>
                <option className="dark:bg-black/90 bg-white/90" value="HARD">
                  Hard
                </option>
              </select>

              <select
                className="px-4 py-2 dark:text-white text-black filter-input"
                value={filters.companyTags}
                onChange={(e) =>
                  setFilters({ ...filters, companyTags: e.target.value })
                }
              >
                <option className="dark:bg-black/90 bg-white/90" value="">
                  All Companies
                </option>
                {allCompanyTags.map((tag) => (
                  <option
                    className="dark:bg-black/90 bg-white/90"
                    key={tag}
                    value={tag}
                  >
                    {tag}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader />
          </div>
        ) : revisionProblemsWithDetails.length === 0 ? (
          <div className="dark:bg-black/20 bg-white/20 p-8 rounded-xl border dark:border-white/10 border-black/10 text-center profile-component-card">
            <BookmarkCheck className="w-12 h-12 dark:text-white/80 text-black/80 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium dark:text-white text-black mb-2 neue-med">
              No problems saved for revision
            </h3>
            <p className="dark:text-white/60 text-black/60 mb-6 neue-reg">
              When you find problems you want to revise later, save them for
              quick access.
            </p>
            <Link to="/dashboard" className="px-4 py-2 ai-btn">
              Browse Problems
            </Link>
          </div>
        ) : filteredProblems.length === 0 ? (
          <div className="dark:bg-black/20 bg-white/20  p-8 rounded-lg border dark:border-white/10 border-black/10 text-center">
            <Filter className="w-12 h-12 dark:text-white/80 text-black/80 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium dark:text-white text-black mb-2 neue-med">
              No matching problems found
            </h3>
            <p className="dark:text-white/60 text-black/60 mb-6 neue-reg">
              Try adjusting your filter criteria to find more problems.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="table-card"
          >
            <table className="w-full">
              <thead className="neue-med">
                <tr className="border-b border-white/30">
                  <th className="text-left py-2 dark:text-white/80 text-black/80">
                    Problem
                  </th>
                  <th className="text-left py-2 dark:text-white/80 text-black/80">
                    Difficulty
                  </th>
                  <th className="text-left py-2 dark:text-white/80 text-black/80">
                    Tags
                  </th>
                  <th className="text-left py-2 dark:text-white/80 text-black/80">
                    Company
                  </th>
                  <th className="text-right py-2 dark:text-white/80 text-black/80">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredProblems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b dark:border-white/30 border-black/30 hover:bg-white/10 dark:hover:bg-white/10 cursor-pointer"
                    onClick={() => navigate(`/problem/${item.problemId}`)}
                  >
                    <td className="py-4 font-medium dark:text-white text-black">
                      {item.problemDetails?.title || "Loading..."}
                    </td>
                    <td className="py-4">
                      {item.problemDetails ? (
                        <span
                          className={`px-3 py-1 rounded-full ${getDifficultyClass(
                            item.problemDetails.difficulty
                          )}`}
                        >
                          {item.problemDetails.difficulty
                            .charAt(0)
                            .toUpperCase() +
                            item.problemDetails.difficulty
                              .slice(1)
                              .toLowerCase()}
                        </span>
                      ) : (
                        "Loading..."
                      )}
                    </td>
                    <td className="py-4">
                      {item.problemDetails?.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="dark:bg-white/10 bg-black/10 px-2 py-1 rounded-full text-sm dark:text-white text-black mr-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-1">
                        {item.companyTags && item.companyTags.length > 0 ? (
                          item.companyTags.map((company, index) => (
                            <div
                              key={index}
                              className="profile-pill pill-primary flex items-center gap-1"
                            >
                              {company ? (
                                <span className="text-xs">{company}</span>
                              ) : (
                                <span className="text-xs">N/A</span>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="profile-pill pill-primary flex items-center gap-1">
                            <span className="text-xs">N/A</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={(e) =>
                            handleRemoveFromRevision(item.problemId, e)
                          }
                          className="p-1.5 hover:bg-emerald-900/30 rounded-full transition-colors"
                          title="Remove from revision"
                        >
                          <BookmarkCheck
                            size={16}
                            className="dark:text-white text-black"
                          />
                        </button>
                        <Link
                          to={`/problem/${item.problemId}`}
                          className="p-1.5 hover:bg-blue-900/30 rounded-full transition-colors"
                          title="View problem"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={16} className="text-blue-500" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RevisionProblems;