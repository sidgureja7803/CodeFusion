import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useActions } from "../store/useAction";
import { usePlaylistStore } from "../store/usePlaylistStore";
import AddToPlaylistModal from "../components/AddToPlaylist";
import ConfirmationModal from "./ConfirmationModal";
import { Bookmark, BookmarkCheck, Save, Trash2, Edit } from "lucide-react";
import { useRevisionStore } from "../store/useRevisionStore";

const ProblemTable = ({ problems, onProblemDeleted }) => {
  const navigate = useNavigate();
  const { authUser } = useAuthStore();
  const isAdmin = authUser?.role === "ADMIN";
  const [currentPage, setCurrentPage] = useState(1);
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

  const itemsPerPage = 8;
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

  return (
    <div>
      {/* filters  */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "backInOut" }}
        className="dash-card mb-2 mt-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search problems..."
            className=" px-4 py-2 text-white filter-input"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <select
            placeholder="Filter by tags..."
            className="px-4 py-2 text-white filter-input"
            value={filters.tags}
            onChange={(e) => setFilters({ ...filters, tags: e.target.value })}
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
            {difficultyOptions.map((option) => (
              <option
                className="dark:bg-black/90 bg-white/90"
                key={option}
                value={option}
              >
                {option.charAt(0).toUpperCase() + option.slice(1).toLowerCase()}
              </option>
            ))}
          </select>
          <select
            className="px-4 py-2 text-white filter-input"
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

      {/* table  */}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: "backInOut" }}
        className="table-card "
      >
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/30">
              <th className="text-left py-2 text-black/80 dark:text-white/80 neue-med">
                Sno.
              </th>
              <th className="text-left py-2 text-black/80 dark:text-white/80 neue-med">
                Status
              </th>
              <th className="text-left py-2 text-black/80 dark:text-white/80 neue-med">
                Title
              </th>
              <th className="text-left py-2 text-black/80 dark:text-white/80 neue-med">
                Tags
              </th>
              <th className="text-left py-2 text-black/80 dark:text-white/80 neue-med">
                Company
              </th>
              <th className="text-left py-2 text-black/80 dark:text-white/80 neue-med">
                Difficulty
              </th>
              <th className="text-left py-2 text-black/80 dark:text-white/80 neue-med">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((problem) => {
              const isSolved = problem.solvedBy.some(
                (solvedRecord) => solvedRecord.userId === authUser?.id
              );

              const isMarkedForRevision = isInRevision(problem.id);
              return (
                <tr
                  key={problem.id}
                  className="border-b border-white/30 hover:bg-white/10 "
                >
                  <td className="py-2">
                    <span className="text-black/80 dark:text-white/80">
                      {startIndex + currentItems.indexOf(problem) + 1}
                    </span>
                  </td>
                  <td className="py-2">
                    {isSolved ? (
                      <span className="text-green-500">☑️</span>
                    ) : (
                      <span className="text-red-700 text-base ml-1 arame">
                        X
                      </span>
                    )}
                  </td>
                  <td className="py-2 text-black dark:text-white hover:underline">
                    <Link to={`/problem/${problem.id}`}>{problem.title}</Link>
                  </td>
                  <td className="py-2">
                    <div className="flex flex-wrap gap-2">
                      {problem.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="bg-white/10 px-2 py-1 rounded-full text-sm text-black dark:text-white max-w-20 truncate inline-block"
                          title={tag}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {problem.companyTags && problem.companyTags.length > 0 ? (
                        <>
                          {problem.companyTags
                            .slice(0, 2)
                            .map((company, index) => (
                              <div
                                key={index}
                                className="profile-pill pill-primary flex items-center gap-1 max-w-20 truncate"
                                title={company}
                              >
                                <span className="text-xs truncate">
                                  {company}
                                </span>
                              </div>
                            ))}
                          {problem.companyTags.length > 2 && (
                            <div
                              className="profile-pill pill-secondary flex items-center gap-1"
                              title={problem.companyTags.slice(2).join(", ")}
                            >
                              <span className="text-xs">
                                +{problem.companyTags.length - 2}
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="profile-pill pill-primary flex items-center gap-1">
                          <span className="text-xs">N/A</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-2">
                    <span
                      className={`  px-2 py-1 rounded-full ${
                        problem.difficulty === "EASY"
                          ? "dark:bg-emerald-900/60 dark:text-emerald-400 border dark:border-emerald-700 bg-emerald-200/60 text-emerald-700 border-emerald-700"
                          : problem.difficulty === "MEDIUM"
                          ? "dark:bg-amber-900/60 dark:text-amber-400 border dark:border-amber-700 bg-amber-200/60 text-amber-500 border-amber-500"
                          : "dark:bg-red-900/60 dark:text-red-300 border dark:border-red-700 bg-red-200/60 text-red-500 border-red-500"
                      }`}
                    >
                      {problem.difficulty.charAt(0).toUpperCase() +
                        problem.difficulty.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="py-2 flex items-center justify-start">
                    <button
                      onClick={() => handleRevisionToggle(problem.id)}
                      className="mr-4 hover:bg-gray-700/50  cursor-pointer"
                      title={
                        isMarkedForRevision
                          ? "Remove from revision"
                          : "Save for revision"
                      }
                      disabled={isRevisionLoading}
                    >
                      {isMarkedForRevision ? (
                        <ion-icon
                          style={{
                            color: "var(--color-text-primary",
                            fontSize: "1.1em",
                          }}
                          name="bookmark"
                        ></ion-icon>
                      ) : (
                        <ion-icon
                          style={{
                            color: "var(--color-text-primary",
                            fontSize: "1.1em",
                          }}
                          name="bookmark-outline"
                        ></ion-icon>
                      )}
                    </button>
                    <button
                      onClick={() => handleAddToPlaylist(problem.id)}
                      className="mr-4 cursor-pointer"
                    >
                      💾
                    </button>
                    {isAdmin && (
                      <button
                        disabled={isDeletingProblem}
                        onClick={() =>
                          handleDeleteClick(problem.id, problem.title)
                        }
                        className="mr-4 cursor-pointer"
                      >
                        🗑️
                      </button>
                    )}
                    {isAdmin && (
                      <button
                        className="cursor-pointer"
                        onClick={() => handleEdit(problem.id)}
                      >
                        ✏️
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      <div className="flex justify-center mt-6 gap-2">
        <button
          className={`neue-med transition-colors duration-200 ease-in-out ${
            currentPage === 1
              ? "dark:text-white/40 text-black/40 cursor-not-allowed"
              : "dark:text-white/80 text-black/80 hover:text-white cursor-pointer"
          }`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="dark:text-white/80 text-black/80 neue-med">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`neue-med transition-colors duration-200 ease-in-out ${
            currentPage === totalPages
              ? "dark:text-white/40 text-black/40 cursor-not-allowed"
              : "dark:text-white/80 text-black/80 hover:text-white cursor-pointer"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

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
