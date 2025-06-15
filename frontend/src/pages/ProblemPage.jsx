import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
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

export const ProblemPage = () => {
  const { id } = useParams();
  const location = useLocation();
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
          <div className="prose max-w-none">
            <p className="text-lg">{problem?.description}</p>

            {problem?.examples && (
              <>
                {problem?.companyTags && problem.companyTags.length > 0 && (
                  <div className="mt-2">
                    <h3 className="text-lg font-medium mb-2">Companies:</h3>
                    <div className="flex flex-wrap gap-2">
                      {problem.companyTags.map((company, idx) => (
                        <span
                          key={idx}
                          className="dark:bg-indigo-900/50 bg-indigo-100/50 dark:text-indigo-300 text-indigo-500 px-3 py-1 rounded-full text-sm border border-indigo-800"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(problem?.examples).map(
                  ([lang, example], idx) => (
                    <div
                      key={lang}
                      className="bg-base-200 p-3 px-6 rounded-xl mb-6 font-mono "
                    >
                      <div className="mb-2">
                        <div className="text-indigo-300 mb-2 text-sm font-semibold">
                          Input:
                        </div>
                        <span className="dark:bg-black/90 bg-white/90 px-4 py-1 rounded-lg font-semibold dark:text-white text-black text-sm">
                          {example.input}
                        </span>
                      </div>
                      <div className="mb-2">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Output:
                        </div>
                        <span className="dark:bg-black/90 bg-white/90 px-4 py-1 rounded-lg font-semibold dark:text-white text-black">
                          {example.output}
                        </span>
                      </div>
                      {example.explanation && (
                        <div>
                          <div className="text-emerald-300 mb-2 text-base font-semibold">
                            Explanation:
                          </div>
                          <p className="text-md font-sem">
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
                <h3 className="text-xl font-bold mb-4">Constraints:</h3>
                <div className="bg-base-200 p-3 px-6 rounded-xl mb-6">
                  <span className="py-1 rounded-lg font-semibold dark:text-white text-black">
                    {problem?.constraints}
                  </span>
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
              <div className="bg-base-200 p-3 rounded-xl">
                <span className="py-1 rounded-lg font-semibold text-black dark:text-white">
                  {problem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center ">No hints available</div>
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
    <div className="min-h-screen problem-page-container">
      <nav className="problem-page-navbar bg-[#e4e4e4] px-4">
        <div className="flex-1 gap-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Link
                to={"/dashboard"}
                className="flex items-center gap-2 text-primary mb-2"
              >
                <div className="logo w-[50px] h-auto z-50 hover:brightness-200 hover:contrast-150 transition-all duration-400 ease-in-out">
                  <img src={logo} alt="logo" />
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <h1 className="text-xl neue-med">{problem?.title}</h1>
            </div>
            <div className="-mt-4">
              <Switch />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>
                  Updated{" "}
                  {new Date(problem?.createdAt).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="text-base-content/30">•</span>
                <Users className="w-4 h-4" />
                <span>{submissionCount} Submissions</span>
                <span className="text-base-content/30">•</span>
                <ThumbsUp className="w-4 h-4" />
                {submissions && submissions.length > 0
                  ? `${successRate}% Success Rate`
                  : "No attempts yet"}
              </div>
              <div className="flex gap-4 items-center">
                <button
                  className={`ai-btn relative ${
                    showAiChat ? "active-ai-btn" : ""
                  }`}
                  onClick={() => setShowAiChat(!showAiChat)}
                >
                  <img
                    src={aiorb}
                    className="w-10 absolute left-0 brightness-125 ai-logo"
                    alt=""
                  />
                  <span className="ml-8">AI Assistant</span>
                </button>

                {/* Collaboration toggle button */}
                <button
                  className={`ai-btn gap-2 ${
                    isCollaborative ? "text-primary active-ai-btn" : ""
                  }`}
                  onClick={toggleCollaborativeMode}
                >
                  <UserPlus className="w-4 h-4" />
                  {isCollaborative
                    ? "Collaborating [Experimental]"
                    : "Collaborate [Experimental]"}
                </button>
                {/* Save to Revision Button */}
                <button
                  onClick={handleRevisionToggle}
                  disabled={isRevisionLoading}
                  className={`btn btn-ghost btn-circle ${
                    isMarkedForRevision
                      ? "text-primary"
                      : "text-base-content/70"
                  } hover:text-primary transition-colors`}
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

                <select
                  className="select select-bordered select-primary w-40"
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
            </div>
          </div>
        </div>
      </nav>

      {isExecuting ? <Loader /> : <div></div>}
      {isSubmitting ? <Loader /> : <div></div>}

      <div className="mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="bg-base-100 shadow-xl">
            <div className="card-body p-0">
              <div className="tabs tabs-bordered">
                <button
                  className={`tab gap-2 ${
                    activeTab === "description" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  <FileText className="w-4 h-4" />
                  Description
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "submissions" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("submissions")}
                >
                  <Code2 className="w-4 h-4" />
                  Submissions
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "discussion" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("discussion")}
                >
                  <MessageSquare className="w-4 h-4" />
                  Discussion
                </button>
                <button
                  className={`tab gap-2 ${
                    activeTab === "hints" ? "tab-active" : ""
                  }`}
                  onClick={() => setActiveTab("hints")}
                >
                  <Lightbulb className="w-4 h-4" />
                  Hints
                </button>
              </div>

              <div className="p-4">{renderTabContent()}</div>
            </div>
          </div>

          <div className="bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="tabs tabs-bordered">
                <button className="tab tab-active gap-2">
                  <Terminal className="w-4 h-4" />
                  Code Editor
                </button>
              </div>

              {/* Show notification when user's previous code is loaded */}
              {userSolvedCode && (
                <div className="bg-emerald-300/10 border border-emerald-500/20 py-1 px-2 rounded-md flex items-center justify-between my-2">
                  <div className="flex items-center gap-2">
                    <span className="text-success text-sm">✓</span>
                    <span className="text-sm text-success font-medium">
                      Your previous solution loaded
                    </span>
                  </div>
                  <button
                    className="btn btn-xs btn-ghost text-success hover:bg-success/20"
                    onClick={resetToTemplate}
                    title="Reset to template code"
                  >
                    Reset to Template
                  </button>
                </div>
              )}

              {/* Collaboration banner */}
              {isCollaborative && (
                <div className="bg-primary/10 border border-primary/20 p-3 rounded-md flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary font-medium">
                      Collaborative Mode Active
                    </span>
                  </div>
                  <button
                    className="btn btn-xs btn-ghost text-primary hover:bg-primary/20"
                    onClick={copyCollaborationLink}
                    title="Copy collaboration link"
                  >
                    <Copy className="w-3 h-3" />
                    Share Link
                  </button>
                </div>
              )}

              <div className="h-[450px] w-full flex flex-col">
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
                    {/* Toolbar for non-collaborative editor
                    {nonCollabEditorRef && (
                      <Toolbar editor={nonCollabEditorRef} />
                    )} */}

                    {/* Editor */}
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
                          fontSize: 16,
                          lineNumbers: "on",
                          automaticLayout: true,
                          scrollBeyondLastLine: false,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2 border-t border-base-300 bg-base-200 mt-2">
                <div className="flex justify-between items-center">
                  <button
                    className="btn btn-primary gap-2"
                    onClick={handleRunCode}
                    disabled={isExecuting || isSubmitting}
                  >
                    <Play className="w-4 h-4" />
                    {isExecuting ? "Running..." : "Run Code"}
                  </button>
                  <button
                    className="btn btn-success gap-2"
                    onClick={handleSubmitSolution}
                    disabled={isExecuting || isSubmitting}
                  >
                    <Code2 className="w-4 h-4" />
                    {isSubmitting ? "Submitting..." : "Submit Solution"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shadow-xl mt-6">
        <div className="card-body">
          {submission ? (
            <Submission submission={submission} />
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Test Cases
                </h3>
                <div className=" badge-primary">
                  {problem?.testcases?.length || 0} cases
                </div>
              </div>

              {problem?.testcases && problem.testcases.length > 0 ? (
                <div className="space-y-4 pb-4">
                  {problem.testcases.map((testcase, index) => (
                    <div key={index} className=" bg-base-200">
                      <div className="card-body p-4">
                        <div className="flex items-center gap-2 mb-3 py-2">
                          <div className="badge-secondary">
                            Test Case {index + 1}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Input:</h4>
                            <div className="bg-base-300 p-3 rounded-lg font-mono text-sm overflow-x-auto">
                              {testcase?.input || "No input"}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Expected Output:
                            </h4>
                            <div className="bg-base-300 p-3 rounded-lg font-mono text-sm overflow-x-auto">
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
                  <Terminal className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h4 className="text-lg font-medium mb-2">
                    No Test Cases Available
                  </h4>
                  <p className="text-sm">
                    Test cases will appear here when the problem is loaded.
                  </p>
                </div>
              )}
            </>
          )}
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
