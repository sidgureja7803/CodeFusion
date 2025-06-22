import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Editor from "@monaco-editor/react";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  BookmarkCheck,
  Clock,
  ChevronRight,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
  Bot,
  UserPlus,
  Copy,
  ArrowLeft,
} from "lucide-react";
import logo from "../assets/images/logo2.png";
import aiorb from "../assets/images/ai-orb2.webp";
import Switch from "../components/Switch.jsx";
import Toolbar from "../components/Toolbar";

import { useProblemStore } from "../store/useProblemStore";
import { useExecutionStore } from "../store/useExecutionStore";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { useRevisionStore } from "../store/useRevisionStore.js"; // Add this import
import { getLanguageId } from "../libs/utils.js";
import "../styles/ProblemPage.css";
import Submission from "../components/Submission";
import SubmissionsList from "../components/SubmissionList";
import AIChatPanel from "../components/AiChatPanel.jsx";
import { Loader } from "../components/Loader.jsx";
import { RoomProvider } from "../libs/liveblocks.js";
import CollaborativeEditor from "../components/CollaborativeEditor";
import { Toast } from "../store/useToastStore";
import { useAuthStore } from "../store/useAuthStore.js";
import { formatSubmissionStatus } from "../libs/utils";
import { useThemeStore } from "../store/useThemeStore.js";
import Discussion from "../components/Discussion";
import DebugAIPanel from "../components/DebugAIPanel.jsx";

export const ProblemPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getProblemById, problem, isProblemLoading } = useProblemStore();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestcases] = useState([]);
  const [successRate, setSuccessRate] = useState(0);
  const [showAiChat, setShowAiChat] = useState(false);
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [collaborationUrl, setCollaborationUrl] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [userSolvedCode, setUserSolvedCode] = useState(null);
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();
  const [nonCollabEditorRef, setNonCollabEditorRef] = useState(null);

  const { isExecuting, executeCode, isSubmitting, submission } =
    useExecutionStore();
  const {
    submission: submissions,
    submissionCount,
    isLoading: isSubmissionsLoading,
    getSubmissionForProblem,
    getSubmissionCountForProblem,
  } = useSubmissionStore();

  // Add revision store
  const {
    addToRevision,
    removeFromRevision,
    isInRevision,
    isLoading: isRevisionLoading,
  } = useRevisionStore();

  // Handle revision toggle
  const handleRevisionToggle = async () => {
    if (!id) return;

    try {
      if (isInRevision(id)) {
        await removeFromRevision(id);
      } else {
        await addToRevision(id);
      }
    } catch (error) {}
  };

  // Check if current problem is in revision
  const isMarkedForRevision = isInRevision(id);

  useEffect(() => {
    // console.log("Full URL:", window.location.href);
    // console.log("Location search:", location.search);

    // Force re-parse URL parameters
    const currentURL = new URL(window.location.href);
    const session = currentURL.searchParams.get("session");

    // console.log("Session from current URL:", session);

    if (session) {
      // console.log("Setting collaborative mode with session:", session);
      setIsCollaborative(true);
      setSessionId(session);
      setCollaborationUrl(window.location.href);
    } else {
      // console.log("No session found, setting normal mode");
      // Only reset if we're not in the middle of creating a session
      if (!sessionId && !isCollaborative) {
        setIsCollaborative(false);
        setSessionId("");
        setCollaborationUrl("");
      }
    }
  }, [location.search, location.pathname]); // Changed dependency to location.search

  useEffect(() => {
    getProblemById(id);
    getSubmissionForProblem(id);
    getSubmissionCountForProblem(id);
  }, [
    id,
    getProblemById,
    getSubmissionCountForProblem,
    getSubmissionForProblem,
  ]);

  useEffect(() => {
    if (submissions && submissions.length > 0) {
      const acceptedSubmissions = submissions.filter(
        (submission) =>
          submission.status === "ACCEPTED" || submission.status === "Accepted"
      ).length;

      const calculatedRate = Math.round(
        (acceptedSubmissions / submissions.length) * 100
      );
      setSuccessRate(calculatedRate);
    } else {
      setSuccessRate(0);
    }
  }, [submissions]);

  useEffect(() => {
    if (activeTab === "submissions" && id) {
      getSubmissionForProblem(id);
    }
  }, [activeTab, id, getSubmissionForProblem]);

  const getUserAcceptedCode = (submissions, language) => {
    if (!submissions || !Array.isArray(submissions)) {
      return null;
    }

    // Find the most recent accepted submission for the current language
    const acceptedSubmission = submissions
      .filter((sub) => {
        const isAccepted =
          sub.status === "ACCEPTED" || sub.status === "Accepted";
        const isCorrectLanguage = sub.language === language;
        return isAccepted && isCorrectLanguage && sub.sourceCode;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

    // Extract source code - handle both string and object formats
    if (acceptedSubmission?.sourceCode) {
      if (typeof acceptedSubmission.sourceCode === "string") {
        return acceptedSubmission.sourceCode;
      } else if (acceptedSubmission.sourceCode.code) {
        return acceptedSubmission.sourceCode.code;
      }
    }

    return null;
  };

  // Load code whenever problem or selected language changes
  useEffect(() => {
    if (problem && problem.codeSnippets) {
      // Check if user has solved this problem
      const userAcceptedCode = getUserAcceptedCode(
        submissions,
        selectedLanguage
      );

      if (userAcceptedCode) {
        // User has solved this problem, use their code
        setCode(userAcceptedCode);
        setUserSolvedCode(userAcceptedCode);
      } else {
        // User hasn't solved or no submissions, use default template
        setCode(problem.codeSnippets[selectedLanguage] || "");
        setUserSolvedCode(null);
      }
    }
  }, [problem, selectedLanguage, submissions]);

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);

    // Check if user has solved this problem in the new language
    const userAcceptedCode = getUserAcceptedCode(submissions, lang);

    if (userAcceptedCode) {
      setCode(userAcceptedCode);
      setUserSolvedCode(userAcceptedCode);
    } else if (problem?.codeSnippets?.[lang]) {
      setCode(problem.codeSnippets[lang]);
      setUserSolvedCode(null);
    }
  };

  const resetToTemplate = () => {
    if (problem?.codeSnippets?.[selectedLanguage]) {
      setCode(problem.codeSnippets[selectedLanguage]);
      setUserSolvedCode(null);
    }
  };

  const isProblemSolved =
    submissions &&
    submissions.some(
      (sub) => sub.status === "ACCEPTED" || sub.status === "Accepted"
    );

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none text-slate-700 dark:text-slate-300">
            <div className="text-lg leading-relaxed font-inter">{problem?.description}</div>

            {problem?.examples && (
              <>
                {problem?.companyTags && problem.companyTags.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-slate-800 dark:text-slate-200 font-inter">Companies:</h3>
                    <div className="flex flex-wrap gap-2">
                      {problem.companyTags.map((company, idx) => (
                        <span
                          key={idx}
                          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg text-sm border border-blue-200 dark:border-blue-800 font-medium"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-6 text-slate-800 dark:text-slate-200 font-inter">Examples:</h3>
                {Object.entries(problem?.examples).map(
                  ([lang, example], idx) => (
                    <div
                      key={lang}
                      className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-xl mb-6 border border-slate-200 dark:border-slate-700 shadow-sm"
                    >
                      <div className="mb-4">
                        <div className="text-emerald-600 dark:text-emerald-400 mb-2 text-sm font-semibold uppercase tracking-wide">
                          Input:
                        </div>
                        <div className="bg-slate-800 dark:bg-slate-900 text-green-400 px-4 py-3 rounded-lg font-mono text-sm border border-slate-700">
                          {example.input}
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="text-blue-600 dark:text-blue-400 mb-2 text-sm font-semibold uppercase tracking-wide">
                          Output:
                        </div>
                        <div className="bg-slate-800 dark:bg-slate-900 text-blue-400 px-4 py-3 rounded-lg font-mono text-sm border border-slate-700">
                          {example.output}
                        </div>
                      </div>
                      {example.explanation && (
                        <div>
                          <div className="text-purple-600 dark:text-purple-400 mb-2 text-sm font-semibold uppercase tracking-wide">
                            Explanation:
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-inter">
                            {example.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </>
            )}

            {problem?.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200 font-inter">Constraints:</h3>
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl mb-6 border border-amber-200 dark:border-amber-800">
                  <div className="text-slate-700 dark:text-slate-300 font-mono text-sm">
                    {problem?.constraints}
                  </div>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionsList
            submissions={submissions}
            isLoading={isSubmissionsLoading}
          />
        );
      case "discussion":
        return <Discussion problemId={id} />;
      case "hints":
        return (
          <div className="">
            {problem?.hints ? (
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-violet-200 dark:border-violet-800">
                <div className="text-slate-700 dark:text-slate-300 font-inter leading-relaxed">
                  {problem.hints}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-500 dark:text-slate-400 font-inter">No hints available</div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleRunCode = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem?.testcases.map((testcase) => testcase.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      executeCode(code, language_id, stdin, expected_outputs, id, false);
    } catch (error) {
      console.log("Error executing code", error);
    }
  };

  const handleSubmitSolution = (e) => {
    e.preventDefault();
    try {
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem?.testcases.map((testcase) => testcase.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);

      // Execute code and then refresh submissions data
      executeCode(code, language_id, stdin, expected_outputs, id, true).then(
        () => {
          // Refresh submission data after submission completes
          getSubmissionForProblem(id);
          getSubmissionCountForProblem(id);

          // If we're not on the submissions tab, switch to it to show the latest submission
          if (activeTab !== "submissions") {
            setActiveTab("submissions");
          }
        }
      );
    } catch (error) {
      console.log("Error submitting solution", error);
    }
  };

  const toggleCollaborativeMode = () => {
    if (!isCollaborative) {
      // Generate a new session ID only when starting collaboration
      const newSessionId = `room-${id}-${Date.now()}-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

      console.log("Starting collaboration with session:", newSessionId);

      setSessionId(newSessionId);
      setIsCollaborative(true);

      // Update URL immediately
      const url = new URL(window.location.href);
      url.searchParams.set("session", newSessionId);
      const newUrl = url.toString();

      console.log("New collaboration URL:", newUrl);

      window.history.pushState({}, "", newUrl);
      setCollaborationUrl(newUrl);
    } else {
      console.log("Stopping collaboration");

      setIsCollaborative(false);
      setSessionId("");

      // Remove session from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("session");
      window.history.pushState({}, "", url.toString());
      setCollaborationUrl("");
    }
  };

  const copyCollaborationLink = async () => {
    try {
      await navigator.clipboard.writeText(collaborationUrl);
      Toast.success("Collaboration link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy link:", err);
      Toast.error("Failed to copy link to clipboard");
    }
  };
  const getEditorTheme = () => {
    return theme === "light" ? "vs-light" : "vs-dark";
  };
  // Get random color based on user ID
  const getRandomColor = (id) => {
    const colors = [
      "#FF6B6B", // Red
      "#4ECDC4", // Teal
      "#FFE66D", // Yellow
      "#6A0572", // Purple
      "#FF9E7A", // Orange
      "#2E86AB", // Blue
      "#A846A0", // Pink
      "#50514F", // Dark Gray
    ];

    // Generate consistent index based on user ID
    const hash = id.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    return colors[hash % colors.length];
  };

  // Add debug info to see the current state
  // console.log("Current state:", {
  //   userSolvedCode: !!userSolvedCode,
  //   code: code?.substring(0, 50) + "...",
  //   submissions: submissions?.length,
  // });

  // Handle non-collaborative editor mount
  const handleNonCollabEditorMount = useCallback((editor) => {
    setNonCollabEditorRef(editor);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-inter">
      <DebugAIPanel />
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 text-slate-700 dark:text-slate-300 hover:from-slate-200 hover:to-slate-300 dark:hover:from-slate-700 dark:hover:to-slate-600 rounded-xl transition-all duration-300 font-medium shadow-sm hover:shadow-md"
                title="Go to Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </button>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors font-semibold"
              >
                <img src={logo} className="w-10 h-10" alt="CodeFusion" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  CodeFusion
                </span>
              </Link>
            </div>
            
            {/* Problem title and difficulty */}
            {problem && (
              <div className="hidden md:flex items-center gap-4">
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  {problem.title}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    problem.difficulty === "EASY"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : problem.difficulty === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {problem.difficulty}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-col mt-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span>
                    Updated{" "}
                    {new Date(problem?.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <Users className="w-4 h-4" />
                  <span>{submissionCount} Submissions</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <ThumbsUp className="w-4 h-4" />
                  <span>
                    {submissions && submissions.length > 0
                      ? `${successRate}% Success Rate`
                      : "No attempts yet"}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 items-center">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    showAiChat 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg" 
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white"
                  }`}
                  onClick={() => {
                    console.log("AI button clicked, current state:", showAiChat);
                    setShowAiChat(!showAiChat);
                    console.log("New state will be:", !showAiChat);
                  }}
                >
                  <img
                    src={aiorb}
                    className="w-5 h-5 brightness-125"
                    alt=""
                  />
                  <span>AI Assistant</span>
                </button>

                {/* Collaboration toggle button */}
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isCollaborative
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white"
                  }`}
                  onClick={toggleCollaborativeMode}
                >
                  <UserPlus className="w-4 h-4" />
                  {isCollaborative
                    ? "Collaborating"
                    : "Collaborate"}
                </button>
                {/* Save to Revision Button */}
                <button
                  onClick={handleRevisionToggle}
                  disabled={isRevisionLoading}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isMarkedForRevision
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 hover:text-white"
                  }`}
                  title={
                    isMarkedForRevision
                      ? "Remove from revision"
                      : "Save for revision"
                  }
                >
                  {isRevisionLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : isMarkedForRevision ? (
                    <BookmarkCheck className="w-5 h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isExecuting ? <Loader /> : <div></div>}
      {isSubmitting ? <Loader /> : <div></div>}

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              <div className="flex overflow-x-auto">
                <button
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap border-b-2 ${
                    activeTab === "description" 
                      ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-800 shadow-sm" 
                      : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  <span className="hidden sm:inline">Description</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap border-b-2 ${
                    activeTab === "submissions" 
                      ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-800 shadow-sm" 
                      : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50"
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Submissions</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap border-b-2 ${
                    activeTab === "discussion" 
                      ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-800 shadow-sm" 
                      : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50"
                  }`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden sm:inline">Discussion</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap border-b-2 ${
                    activeTab === "hints" 
                      ? "text-purple-600 dark:text-purple-400 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-800 shadow-sm" 
                      : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 border-transparent hover:bg-white/50 dark:hover:bg-slate-800/50"
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  <span className="hidden sm:inline">Hints</span>
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">{renderTabContent()}</div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  <span className="text-xl font-bold text-slate-800 dark:text-slate-200">Code Editor</span>
                </div>
                <select
                  className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-sm"
                  value={selectedLanguage}
                  onChange={handleLanguageChange}
                >
                  {Object.keys(problem?.codeSnippets || {}).map((lang) => (
                    <option key={lang} value={lang}>
                      {lang
                        .toLowerCase()
                        .split("_")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </option>
                  ))}
                </select>
              </div>

              {/* Show notification when user's previous code is loaded */}
              {userSolvedCode && (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200 dark:border-emerald-800 p-3 rounded-lg flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400 text-sm">✓</span>
                    <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                      Your previous solution loaded
                    </span>
                  </div>
                  <button
                    className="px-3 py-1 text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-md hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
                    onClick={resetToTemplate}
                    title="Reset to template code"
                  >
                    Reset to Template
                  </button>
                </div>
              )}

              {/* Collaboration banner */}
              {isCollaborative && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800 p-3 rounded-lg flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                      Collaborative Mode Active
                    </span>
                  </div>
                  <button
                    className="flex items-center gap-1 px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-colors"
                    onClick={copyCollaborationLink}
                    title="Copy collaboration link"
                  >
                    <Copy className="w-3 h-3" />
                    Share Link
                  </button>
                </div>
              )}

              <div className="h-[500px] w-full flex flex-col rounded-xl overflow-hidden border border-slate-300 dark:border-slate-600 shadow-lg">
                {isCollaborative ? (
                  <RoomProvider
                    id={sessionId}
                    initialPresence={{
                      name: authUser?.name || "Anonymous",
                      color: getRandomColor(
                        authUser?.id || Math.random().toString()
                      ),
                      userId: authUser?.id,
                      avatar: authUser?.profilePicture,
                    }}
                  >
                    <CollaborativeEditor
                      height="100%"
                      language={selectedLanguage.toLowerCase()}
                      theme={getEditorTheme()}
                      value={code}
                      onChange={(value) => setCode(value || "")}
                      roomId={sessionId}
                    />
                  </RoomProvider>
                ) : (
                  <div className="flex flex-col h-full">
                    <div className="flex-1">
                      <Editor
                        height="100%"
                        language={selectedLanguage.toLowerCase()}
                        theme={getEditorTheme()}
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        onMount={handleNonCollabEditorMount}
                        options={{
                          minimap: { enabled: false },
                          fontSize: 14,
                          lineNumbers: "on",
                          automaticLayout: true,
                          scrollBeyondLastLine: false,
                          fontFamily: "JetBrains Mono, Monaco, 'Courier New', monospace",
                          fontLigatures: true,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  onClick={handleRunCode}
                  disabled={isExecuting || isSubmitting}
                >
                  <Play className="w-5 h-5" />
                  {isExecuting ? "Running..." : "Run Code"}
                </button>
                <button
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  onClick={handleSubmitSolution}
                  disabled={isExecuting || isSubmitting}
                >
                  <Code2 className="w-5 h-5" />
                  {isSubmitting ? "Submitting..." : "Submit Solution"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700">
          <div className="p-6">
            {submission ? (
              <Submission submission={submission} />
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <Terminal className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    Test Cases
                  </h3>
                  <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                    {problem?.testcases?.length || 0} cases
                  </div>
                </div>

                {problem?.testcases && problem.testcases.length > 0 ? (
                  <div className="space-y-4">
                    {problem.testcases.map((testcase, index) => (
                      <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl border border-slate-200 dark:border-slate-600">
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg text-sm font-medium">
                              Test Case {index + 1}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-semibold mb-2 text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Input:</h4>
                              <div className="bg-slate-800 dark:bg-slate-900 text-green-400 p-3 rounded-lg font-mono text-sm overflow-x-auto border border-slate-700">
                                {testcase?.input || "No input"}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-semibold mb-2 text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                                Expected Output:
                              </h4>
                              <div className="bg-slate-800 dark:bg-slate-900 text-blue-400 p-3 rounded-lg font-mono text-sm overflow-x-auto border border-slate-700">
                                {testcase?.output || "No output"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Terminal className="w-16 h-16 mx-auto mb-4 text-slate-400 dark:text-slate-500" />
                    <h4 className="text-lg font-medium mb-2 text-slate-600 dark:text-slate-400">
                      No Test Cases Available
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-500">
                      Test cases will appear here when the problem is loaded.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showAiChat && (
        <AIChatPanel
          problem={problem}
          code={code}
          language={selectedLanguage}
        />
      )}
    </div>
  );
};