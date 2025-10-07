import React, { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
// Removed unused import: formatSubmissionStatus
import { useThemeStore } from "../store/useThemeStore.js";
import Discussion from "../components/Discussion";
import DebugAIPanel from "../components/DebugAIPanel.jsx";

export const ProblemPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { getProblemById, problem } = useProblemStore();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("JAVASCRIPT");
  // Removed unused state: isBookmarked
  // Removed unused state: testcases
  const [successRate, setSuccessRate] = useState(0);
  const [showAiChat, setShowAiChat] = useState(false);
  const [isCollaborative, setIsCollaborative] = useState(false);
  const [collaborationUrl, setCollaborationUrl] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [userSolvedCode, setUserSolvedCode] = useState(null);
  const { authUser } = useAuthStore();
  const { theme } = useThemeStore();
  // This ref will be used by the editor
  const nonCollabEditorRef = useRef(null);

  const { isExecuting, executeCode, isSubmitting, submission, set: setExecution } =
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
    } catch (error) {
      console.error("Error toggling revision:", error);
      Toast.error("Failed to update revision status");
    }
  };

  // Check if current problem is in revision
  const isMarkedForRevision = isInRevision(id);

  useEffect(() => {
    // Force re-parse URL parameters
    const currentURL = new URL(window.location.href);
    const session = currentURL.searchParams.get("session");

    if (session) {
      setIsCollaborative(true);
      setSessionId(session);
      setCollaborationUrl(window.location.href);
    } else {
      // Only reset if we're not in the middle of creating a session
      if (!sessionId && !isCollaborative) {
        setIsCollaborative(false);
        setSessionId("");
        setCollaborationUrl("");
      }
    }
  }, [location.search, location.pathname, sessionId, isCollaborative]); // Added missing dependencies

  useEffect(() => {
    if (!id) {
      console.error("No problem ID provided");
      return;
    }

    console.log("🔍 Loading problem data for ID:", id);
    
    // Use Promise.allSettled to handle errors independently
    const loadProblemData = async () => {
      try {
        await getProblemById(id);
      } catch (error) {
        console.error("Error loading problem:", error);
      }
      
      try {
        await getSubmissionForProblem(id);
      } catch (error) {
        console.error("Error loading submissions:", error);
      }
      
      try {
        await getSubmissionCountForProblem(id);
      } catch (error) {
        console.error("Error loading submission count:", error);
      }
    };
    
    loadProblemData();
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
        const codeTemplate = problem.codeSnippets[selectedLanguage] || 
                           problem.codeSnippets["JAVASCRIPT"] || 
                           problem.codeSnippets["PYTHON"] || 
                           "// Write your solution here";
        setCode(codeTemplate);
        setUserSolvedCode(null);
      }
    } else if (problem) {
      // Fallback if no code snippets are available
      setCode(`// Problem: ${problem.title || 'Unknown Problem'}
// Write your solution here

function solution() {
    // Your code goes here
}`);
      setUserSolvedCode(null);
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
    } else {
      // Fallback code template based on language
      const fallbackTemplates = {
        JAVASCRIPT: `function solution() {
    // Write your solution here
    
}`,
        PYTHON: `def solution():
    # Write your solution here
    pass`,
        JAVA: `public int solution() {
    // Write your solution here
    
}`,
        CPP: `int solution() {
    // Write your solution here
    
}`,
        C: `int solution() {
    // Write your solution here
    
}`
      };
      
      setCode(fallbackTemplates[lang] || fallbackTemplates.JAVASCRIPT);
      setUserSolvedCode(null);
    }
  };

  const resetToTemplate = () => {
    if (problem?.codeSnippets?.[selectedLanguage]) {
      setCode(problem.codeSnippets[selectedLanguage]);
      setUserSolvedCode(null);
    }
  };

  // Useful for future UI indicators
  // const isProblemSolved =
  //   submissions &&
  //   submissions.some(
  //     (sub) => sub.status === "ACCEPTED" || sub.status === "Accepted"
  //   );

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <div className="bg-white/90 dark:bg-slate-800/90 rounded-xl p-6 shadow-lg border border-purple-200 dark:border-purple-600 mb-8">
              <div className="text-xl leading-relaxed font-inter text-slate-800 dark:text-white whitespace-pre-wrap">
                {problem?.description}
              </div>
            </div>

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
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Examples
                  </h3>
                  <div className="h-2 w-2 bg-purple-500 rounded-full animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Object.entries(problem?.examples).map(
                    ([lang, example], idx) => (
                      <div
                        key={lang}
                        className="bg-white dark:bg-slate-800 rounded-xl border-2 border-purple-200 dark:border-purple-700 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-6">
                            <div className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-bold">
                              Example {idx + 1}
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                Input:
                              </h4>
                              <pre className="mt-2 p-4 bg-emerald-50 dark:bg-emerald-900/30 rounded-lg overflow-x-auto border border-emerald-200 dark:border-emerald-700 font-mono text-emerald-900 dark:text-emerald-100">
                                {example.input}
                              </pre>
                            </div>
                            <div>
                              <h4 className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                Output:
                              </h4>
                              <pre className="mt-2 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg overflow-x-auto border border-blue-200 dark:border-blue-700 font-mono text-blue-900 dark:text-blue-100">
                                {example.output}
                              </pre>
                            </div>
                            {example.explanation && (
                              <div>
                                <h4 className="font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                                  Explanation:
                                </h4>
                                <div className="mt-2 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700 text-purple-900 dark:text-purple-100">
                                  {example.explanation}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>


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
        if (!authUser) {
          // User is not logged in
          return (
            <div className="p-8 text-center">
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8 max-w-md mx-auto">
                <div className="text-blue-600 dark:text-blue-400 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <h3 className="text-xl font-bold">Authentication Required</h3>
                </div>
                <p className="text-slate-700 dark:text-slate-300">Please log in to view your submission history for this problem.</p>
              </div>
            </div>
          );
        }
        
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
      console.log("🚀 Starting code execution...");
      console.log("Problem:", problem);
      console.log("Selected language:", selectedLanguage);
      console.log("Code:", code);
      console.log("Problem ID:", id);
      console.log("Auth user:", authUser);
      
      if (!authUser) {
        Toast.error("Please log in to execute code");
        return;
      }
      
      if (!problem?.testcases || problem.testcases.length === 0) {
        Toast.error("No test cases available for this problem");
        return;
      }
      
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((testcase) => testcase.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      
      console.log("Language ID:", language_id);
      console.log("Test inputs:", stdin);
      console.log("Expected outputs:", expected_outputs);
      
      if (!language_id) {
        Toast.error("Invalid language selection");
        return;
      }
      
      executeCode(code, language_id, stdin, expected_outputs, id, false);
    } catch (error) {
      console.error("Error executing code", error);
      Toast.error("Failed to execute code: " + error.message);
    }
  };

  const handleSubmitSolution = (e) => {
    e.preventDefault();
    try {
      console.log("📤 Starting solution submission...");
      console.log("Problem:", problem);
      console.log("Selected language:", selectedLanguage);
      console.log("Code:", code);
      console.log("Problem ID:", id);
      console.log("Auth user:", authUser);
      
      if (!authUser) {
        Toast.error("Please log in to submit solution");
        return;
      }
      
      if (!problem?.testcases || problem.testcases.length === 0) {
        Toast.error("No test cases available for this problem");
        return;
      }
      
      const language_id = getLanguageId(selectedLanguage);
      const stdin = problem.testcases.map((testcase) => testcase.input);
      const expected_outputs = problem.testcases.map((tc) => tc.output);
      
      console.log("Language ID:", language_id);
      console.log("Test inputs:", stdin);
      console.log("Expected outputs:", expected_outputs);
      
      if (!language_id) {
        Toast.error("Invalid language selection");
        return;
      }

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
      console.error("Error submitting solution", error);
      Toast.error("Failed to submit solution: " + error.message);
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
    // Store editor reference for future use
    nonCollabEditorRef.current = editor;
    console.log("Editor mounted:", editor?.getId());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-900 dark:via-slate-800/90 dark:to-slate-900 font-['Inter'] relative overflow-hidden pb-10">
      {/* Premium animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Enhanced gradient orbs with better animations */}
        <div className="absolute -top-64 -right-64 w-128 h-128 bg-gradient-to-br from-blue-500/15 via-indigo-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute -bottom-64 -left-64 w-128 h-128 bg-gradient-to-br from-emerald-500/15 via-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }}></div>
        
        {/* Enhanced secondary accent orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-violet-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s' }}></div>
        
        {/* Improved grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] dark:bg-[linear-gradient(rgba(199,210,254,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(199,210,254,0.02)_1px,transparent_1px)]"></div>
      </div>
      <DebugAIPanel />
      <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 px-6 py-4 sticky top-0 z-50 shadow-xl shadow-slate-200/40 dark:shadow-slate-900/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Main header row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  console.log("Back button clicked, navigating to dashboard");
                  navigate("/dashboard", { replace: true });
                }}
                className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700/50 dark:to-slate-800/50 text-slate-700 dark:text-slate-200 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/40 dark:hover:to-indigo-800/40 rounded-xl transition-all duration-300 font-semibold shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-blue-300/30 border border-slate-300/50 dark:border-slate-600/50 hover:border-blue-300 dark:hover:border-blue-600/50"
                title="Go to Dashboard"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="hidden sm:inline">Dashboard</span>
              </motion.button>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-300 transform hover:scale-[1.02] font-semibold"
              >
                {/* <img src={logo} className="w-10 h-10 drop-shadow-lg" alt="CodeFusion" /> */}
                <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow">
                  CodeFusion
                </span>
              </Link>
            </div>
            
            {/* Problem title and difficulty - for medium+ screens */}
            {problem && (
              <div className="hidden md:flex items-center gap-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent transition-all duration-300">
                  {problem.title}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-sm ${
                    problem.difficulty === "EASY"
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/70 shadow-green-200/20 dark:shadow-green-900/30"
                      : problem.difficulty === "MEDIUM"
                      ? "bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/70 shadow-amber-200/20 dark:shadow-amber-900/30"
                      : "bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/40 dark:to-rose-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/70 shadow-red-200/20 dark:shadow-red-900/30"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${problem.difficulty === "EASY" ? "bg-green-500" : problem.difficulty === "MEDIUM" ? "bg-yellow-500" : "bg-red-500"}`}></span>
                  {problem.difficulty}
                </span>
              </div>
            )}

            {/* Mobile problem title - for small screens */}
            {problem && (
              <div className="md:hidden flex items-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm ${
                    problem.difficulty === "EASY"
                      ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800/70 shadow-green-200/20 dark:shadow-green-900/30"
                      : problem.difficulty === "MEDIUM"
                      ? "bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800/70 shadow-amber-200/20 dark:shadow-amber-900/30"
                      : "bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900/40 dark:to-rose-900/40 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/70 shadow-red-200/20 dark:shadow-red-900/30"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${problem.difficulty === "EASY" ? "bg-green-500" : problem.difficulty === "MEDIUM" ? "bg-yellow-500" : "bg-red-500"}`}></span>
                  {problem.difficulty}
                </span>
              </div>
            )}
          </div>

          {/* Show problem title on small screens */}
          {problem && (
            <div className="md:hidden mt-2 mb-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent transition-all duration-300">
                {problem.title}
              </h1>
            </div>
          )}
          
          {/* Stats & actions row */}
          <div className="flex flex-col mt-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Problem stats */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800/60">
                  <Clock className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  <span>
                    Updated{" "}
                    {new Date(problem?.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md transition-all duration-300 hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800/60">
                  <Users className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                  <span className="font-medium">{submissionCount || 0} Submissions</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 shadow-md transition-all duration-300 hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800/60">
                  <ThumbsUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span className="font-medium">
                    {submissions && submissions.length > 0
                      ? `${successRate}% Success Rate`
                      : "No attempts yet"}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 items-center">
                {/* AI Assistant button */}
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 border shadow-md ${
                    showAiChat 
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg border-blue-400 dark:border-blue-600" 
                      : "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-800/40 dark:to-indigo-800/40 text-blue-700 dark:text-blue-200 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-700/60 dark:hover:to-indigo-700/60 border-blue-300 dark:border-blue-600 hover:shadow-xl"
                  }`}
                  onClick={() => setShowAiChat(!showAiChat)}
                >
                  <img
                    src={aiorb}
                    className="w-5 h-5 brightness-125"
                    alt=""
                  />
                  <span>Fusion AI</span>
                </button>

                {/* Collaboration toggle button */}
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-xl ${
                    isCollaborative
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg border border-blue-400 dark:border-blue-600"
                      : "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-cyan-500 hover:text-white border border-slate-200 dark:border-slate-700"
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
                  className={`p-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-xl ${
                    isMarkedForRevision
                      ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg border border-emerald-400 dark:border-emerald-600"
                      : "bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-green-500 hover:text-white border border-slate-200 dark:border-slate-700"
                  }`}
                  title={
                    isMarkedForRevision
                      ? "Remove from revision"
                      : "Save for revision"
                  }
                >
                  {isRevisionLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
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
          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl rounded-3xl shadow-2xl shadow-purple-300/30 dark:shadow-purple-900/40 border border-purple-300/40 dark:border-purple-600/50 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
            <div className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900">
              <div className="flex overflow-x-auto gap-1 px-1 pt-1 custom-scrollbar">
                <button
                  className={`flex items-center gap-2 px-5 py-3 font-medium transition-all duration-300 whitespace-nowrap rounded-t-xl ${
                    activeTab === "description" 
                      ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-800 shadow-md" 
                      : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/80 dark:hover:bg-slate-800/80"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <div className={`p-1.5 rounded-md transition-all duration-300 ${activeTab === "description" ? "bg-purple-100 dark:bg-purple-900/30" : "bg-slate-100 dark:bg-slate-700"}`}>
                    <FileText className={`w-4 h-4 ${activeTab === "description" ? "text-purple-600 dark:text-purple-400" : "text-slate-600 dark:text-slate-400"}`} />
                  </div>
                  <span className="hidden sm:inline">Description</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-5 py-3 font-medium transition-all duration-300 whitespace-nowrap rounded-t-xl ${
                    activeTab === "submissions" 
                      ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-800 shadow-md" 
                      : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/80 dark:hover:bg-slate-800/80"
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <div className={`p-1.5 rounded-md transition-all duration-300 ${activeTab === "submissions" ? "bg-purple-100 dark:bg-purple-900/30" : "bg-slate-100 dark:bg-slate-700"}`}>
                    <Code2 className={`w-4 h-4 ${activeTab === "submissions" ? "text-purple-600 dark:text-purple-400" : "text-slate-600 dark:text-slate-400"}`} />
                  </div>
                  <span className="hidden sm:inline">Submissions</span>
                  {submissions?.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-semibold rounded-full">
                      {submissions.length}
                    </span>
                  )}
                </button>
                <button
                  className={`flex items-center gap-2 px-5 py-3 font-medium transition-all duration-300 whitespace-nowrap rounded-t-xl ${
                    activeTab === "discussion" 
                      ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-800 shadow-md" 
                      : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/80 dark:hover:bg-slate-800/80"
                  }`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <div className={`p-1.5 rounded-md transition-all duration-300 ${activeTab === "discussion" ? "bg-purple-100 dark:bg-purple-900/30" : "bg-slate-100 dark:bg-slate-700"}`}>
                    <MessageSquare className={`w-4 h-4 ${activeTab === "discussion" ? "text-purple-600 dark:text-purple-400" : "text-slate-600 dark:text-slate-400"}`} />
                  </div>
                  <span className="hidden sm:inline">Discussion</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-5 py-3 font-medium transition-all duration-300 whitespace-nowrap rounded-t-xl ${
                    activeTab === "hints" 
                      ? "text-purple-600 dark:text-purple-400 border-b-2 border-purple-600 dark:border-purple-400 bg-white dark:bg-slate-800 shadow-md" 
                      : "text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-white/80 dark:hover:bg-slate-800/80"
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <div className={`p-1.5 rounded-md transition-all duration-300 ${activeTab === "hints" ? "bg-purple-100 dark:bg-purple-900/30" : "bg-slate-100 dark:bg-slate-700"}`}>
                    <Lightbulb className={`w-4 h-4 ${activeTab === "hints" ? "text-purple-600 dark:text-purple-400" : "text-slate-600 dark:text-slate-400"}`} />
                  </div>
                  <span className="hidden sm:inline">Hints</span>
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar scrollbar-thin relative">
              <div className="animate-fadeIn transition-all duration-300">
                {renderTabContent()}
              </div>
              <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-white dark:from-slate-800 to-transparent pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white dark:from-slate-800 to-transparent pointer-events-none"></div>
            </div>
          </div>

          <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-3xl rounded-3xl shadow-2xl shadow-blue-300/30 dark:shadow-blue-900/40 border border-blue-300/40 dark:border-blue-600/50 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
            {/* Editor Header */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border-b border-blue-200 dark:border-slate-700 p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg shadow-blue-300/30 dark:shadow-blue-900/40">
                    <Terminal className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Code Editor
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Write, test, and submit your solution</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="relative group">
                    <select
                      className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border-2 border-blue-300/50 dark:border-blue-700/50 rounded-xl text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300/50 dark:focus:ring-blue-700/50 shadow-md transition-all duration-300"
                      value={selectedLanguage}
                      onChange={handleLanguageChange}
                    >
                      {problem?.codeSnippets && Object.keys(problem.codeSnippets).length > 0 ? (
                        Object.keys(problem.codeSnippets).map((lang) => (
                          <option key={lang} value={lang}>
                            {lang
                              .toLowerCase()
                              .split("_")
                              .map(
                                (word) => word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value="JAVASCRIPT">JavaScript</option>
                          <option value="PYTHON">Python</option>
                          <option value="JAVA">Java</option>
                          <option value="CPP">C++</option>
                          <option value="C">C</option>
                        </>
                      )}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-blue-600 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform">
                        <path d="m6 9 6 6 6-6"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">

              {/* Show notification when user's previous code is loaded */}
              {userSolvedCode && (
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 border-l-4 border-emerald-400 dark:border-emerald-600 border-y border-r border-emerald-200 dark:border-emerald-800/50 p-4 rounded-lg flex items-center justify-between mb-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                        Your previous solution loaded
                      </span>
                      <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">
                        You can continue where you left off
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-3 py-1.5 text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-md hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-all duration-300 hover:shadow-md border border-emerald-200 dark:border-emerald-800/50 font-medium"
                    onClick={resetToTemplate}
                    title="Reset to template code"
                  >
                    Reset to Template
                  </button>
                </div>
              )}

              {/* Collaboration banner */}
              {isCollaborative && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-l-4 border-blue-400 dark:border-blue-600 border-y border-r border-blue-200 dark:border-blue-800/50 p-4 rounded-lg flex items-center justify-between mb-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full shadow-inner">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                        Collaborative Mode Active
                      </span>
                      <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-0.5">
                        Real-time collaboration enabled
                      </p>
                    </div>
                  </div>
                  <button
                    className="flex items-center gap-2 px-4 py-1.5 text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-all duration-300 hover:shadow-md border border-blue-200 dark:border-blue-800/50 font-medium"
                    onClick={copyCollaborationLink}
                    title="Copy collaboration link"
                  >
                    <Copy className="w-3 h-3" />
                    Share Link
                  </button>
                </div>
              )}

              {/* Editor container with enhanced styling */}
              <div className="h-[500px] w-full flex flex-col rounded-xl overflow-hidden border border-slate-300 dark:border-slate-600 shadow-lg bg-white dark:bg-slate-900 relative group">
                {/* Code editor toolbar */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center px-3 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {selectedLanguage.toLowerCase()}
                  </div>
                </div>
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
                  <div className="flex flex-col h-full pt-8"> {/* Add padding-top to account for the toolbar */}
                    <div className="flex-1 relative">
                      <Editor
                        height="100%"
                        language={selectedLanguage.toLowerCase()}
                        theme={getEditorTheme()}
                        value={code}
                        onChange={(value) => setCode(value || "")}
                        onMount={handleNonCollabEditorMount}
                        options={{
                          minimap: { enabled: true },
                          fontSize: 14,
                          lineNumbers: "on",
                          automaticLayout: true,
                          scrollBeyondLastLine: false,
                          fontFamily: "JetBrains Mono, Monaco, 'Courier New', monospace",
                          fontLigatures: true,
                          cursorBlinking: "smooth",
                          cursorSmoothCaretAnimation: true,
                          roundedSelection: true,
                          smoothScrolling: true,
                          padding: { top: 10 },
                          renderLineHighlight: "all",
                        }}
                      />
                      {/* Subtle gradient overlay to enhance editor appearance */}
                      <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-white/20 to-transparent dark:from-black/20 to-transparent z-10"></div>
                        <div className="absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-white/20 to-transparent dark:from-black/20 to-transparent z-10"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons with enhanced design */}
              <div className="mt-8 space-y-4">
                {/* Main action buttons */}
                <div className="flex flex-col sm:flex-row w-full gap-4">
                  <button
                    className="w-full sm:flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    onClick={handleRunCode}
                    disabled={isExecuting || isSubmitting}
                  >
                    {isExecuting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span className="relative">
                          <span className="animate-pulse">Running</span>...
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="p-1.5 bg-blue-700/50 rounded-full">
                          <Play className="w-4 h-4" />
                        </div>
                        <span>Run Code</span>
                      </>
                    )}
                  </button>
                  <button
                    className="w-full sm:flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    onClick={handleSubmitSolution}
                    disabled={isExecuting || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span className="relative">
                          <span className="animate-pulse">Submitting</span>...
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="p-1.5 bg-emerald-700/50 rounded-full">
                          <Code2 className="w-4 h-4" />
                        </div>
                        <span>Submit Solution</span>
                      </>
                    )}
                  </button>
                </div>
                
                {/* Secondary action buttons */}
                <div className="flex justify-end gap-2">
                  <button 
                    onClick={() => resetToTemplate()}
                    className="p-2.5 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-700/80 text-slate-700 dark:text-slate-300 transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    title="Reset to template code"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 2v6h6"></path>
                      <path d="M3 13a9 9 0 1 0 3-7.7L3 8"></path>
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => {
                      // Copy code to clipboard
                      navigator.clipboard.writeText(code).then(() => {
                        Toast.success("Code copied to clipboard!", "Copy Success", 2000);
                      }).catch(err => {
                        Toast.error("Failed to copy code", "Copy Error", 2000);
                        console.error("Copy failed:", err);
                      });
                    }}
                    className="p-2.5 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-800/80 hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-700 dark:hover:to-slate-700/80 text-slate-700 dark:text-slate-300 transition-all duration-300 shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    title="Copy code to clipboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-6">
        {submission && (
          <div className="animate-fadeIn bg-gradient-to-br from-white/95 to-blue-50/90 dark:from-slate-800/95 dark:to-blue-900/90 backdrop-blur-3xl rounded-3xl shadow-2xl border border-blue-300/50 dark:border-blue-600/50 transform hover:shadow-blue-300/40 dark:hover:shadow-blue-900/50 transition-all duration-300">
            <div className="border-b border-blue-200/70 dark:border-blue-700/70 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 py-3 px-5 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2.5">
                  <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg shadow-blue-300/20 dark:shadow-blue-900/30">
                    <Terminal className="w-5 h-5 text-white" />
                  </div>
                  Execution Results
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setExecution({ submission: null })}
                    className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 transition-all duration-300 hover:rotate-90 hover:scale-110 shadow-sm hover:shadow-md border border-slate-300/50 dark:border-slate-600/50"
                    title="Clear results"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18"></path>
                      <path d="M6 6l12 12"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      const resultText = document.querySelector('.execution-results-container').innerText;
                      navigator.clipboard.writeText(resultText).then(() => {
                        Toast.success("Results copied to clipboard!", "Copy Success", 2000);
                      }).catch(err => {
                        Toast.error("Failed to copy results", "Copy Error", 2000);
                        console.error("Copy failed:", err);
                      });
                    }}
                    className="p-2 rounded-lg bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md border border-slate-300/50 dark:border-slate-600/50"
                    title="Copy results to clipboard"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              {submission.is_submission && (
                <div className="mt-2 flex items-center gap-2">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${submission.status === "Accepted" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}>
                    {submission.status}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Submitted {new Date(submission.timestamp).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-5 execution-results-container">
              <div className="bg-white/70 dark:bg-slate-800/70 border border-blue-200/50 dark:border-blue-800/50 rounded-xl overflow-hidden shadow-inner">
                <Submission submission={submission} />
              </div>
            </div>
          </div>
        )}
      </div>

      {showAiChat && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <AIChatPanel
            problem={problem}
            code={code}
            language={selectedLanguage}
            onClose={() => setShowAiChat(false)}
          />
        </div>
      )}
    </div>
  );
};