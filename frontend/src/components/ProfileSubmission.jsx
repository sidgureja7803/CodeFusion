import React, { useEffect, useState, useMemo } from "react";
import { useSubmissionStore } from "../store/useSubmissionStore";
import { motion } from "framer-motion";
import Editor from "@monaco-editor/react";
import {
  Code,
  Terminal,
  Clock,
  HardDrive,
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  FileCode,
} from "lucide-react";
import { formatSubmissionStatus } from "../libs/utils";
import { useThemeStore } from "../store/useThemeStore";

const ProfileSubmission = () => {
  const { submissions, getAllSubmissions } = useSubmissionStore();
  const [expandedSubmission, setExpandedSubmission] = useState(null);
  const [filter, setFilter] = useState("all");
  const { theme } = useThemeStore();

  useEffect(() => {
    getAllSubmissions();
  }, [getAllSubmissions]);

  // Memoized helper functions
  const helpers = useMemo(
    () => ({
      getStatusClass: (status) => {
        const statusMap = {
          Accepted: "pill-success",
          ACCEPTED: "pill-success",
          "Wrong Answer": "pill-danger",
          "Time Limit Exceeded": "pill-warning",
        };
        return statusMap[status] || "pill-primary";
      },

      formatDate: (dateString) => {
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }).format(new Date(dateString));
      },

      // Consolidated safe value renderer
      safeValue: (value, defaultValue = "N/A") => {
        if (value == null) return defaultValue;

        if (typeof value === "object") {
          // Handle specific object structures
          if (value.code) return value.code;
          if (value.value !== undefined) return String(value.value);

          try {
            return JSON.stringify(value, null, 2);
          } catch {
            return `[Object: ${Object.prototype.toString.call(value)}]`;
          }
        }

        return String(value);
      },

      // Simplified JSON parser
      parseJsonValue: (value, defaultValue = "N/A") => {
        if (!value) return defaultValue;

        try {
          const parsed = JSON.parse(value);
          return helpers.safeValue(Array.isArray(parsed) ? parsed[0] : parsed);
        } catch {
          return helpers.safeValue(value, defaultValue);
        }
      },

      // Language mapping
      getEditorLanguage: (language) => {
        const langMap = {
          JAVASCRIPT: "javascript",
          PYTHON: "python",
          JAVA: "java",
        };
        return langMap[language?.toUpperCase()] || "javascript";
      },
    }),
    []
  );

  const getEditorTheme = () => {
    return theme === "light" ? "vs-light" : "vs-dark";
  };

  // Memoized computed values
  const computedValues = useMemo(() => {
    const filteredSubmissions = submissions.filter(
      (submission) => filter === "all" || submission.status === filter
    );

    const acceptedCount = submissions.filter((s) =>
      ["Accepted", "ACCEPTED"].includes(s.status)
    ).length;

    return { filteredSubmissions, acceptedCount };
  }, [submissions, filter]);

  const toggleExpand = (id) => {
    setExpandedSubmission((prev) => (prev === id ? null : id));
  };

  // Extracted components for better organization
  const SubmissionHeader = ({ submission }) => (
    <div
      className="flex justify-between cursor-pointer"
      onClick={() => toggleExpand(submission.id)}
    >
      <div className="flex flex-col md:flex-row gap-3 md:items-center w-full">
        <div
          className={`profile-pill ${helpers.getStatusClass(
            submission.status
          )} flex items-center gap-1`}
        >
          {submission.status === "Accepted" && <Check size={12} />}
          {formatSubmissionStatus(submission.status)}
        </div>

        <div className="flex items-center gap-2 text-black/50 dark:text-white/50 text-sm">
          <Clock size={14} />
          <span>{helpers.formatDate(submission.createdAt)}</span>
        </div>
      </div>

      <div>
        {expandedSubmission === submission.id ? (
          <ChevronUp className="dark:text-white/70 text-black/70" />
        ) : (
          <ChevronDown className="dark:text-white/70 text-black/70" />
        )}
      </div>
    </div>
  );

  const SubmissionDetails = ({ submission }) => (
    <motion.div
      className="mt-4 pt-4 border-t dark:border-white/10 border-black/10"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      transition={{ duration: 0.3 }}
    >
      {/* Code Section */}
      <div className="mb-4">
        <h3 className="text-lg font-medium dark:text-white text-black mb-2 flex items-center gap-2">
          <Code size={16} />
          Solution Code ({submission.language})
        </h3>
        <div className="border dark:border-white/5 border-black/5 rounded-lg overflow-hidden">
          <Editor
            height="400px"
            language={helpers.getEditorLanguage(submission.language)}
            theme={getEditorTheme()}
            value={helpers.safeValue(
              submission.sourceCode,
              "No code available"
            )}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              automaticLayout: true,
              scrollBeyondLastLine: false,
              wordWrap: "on",
              folding: true,
              renderLineHighlight: "none",
              selectionHighlight: false,
              contextmenu: false,
              padding: { top: 16, bottom: 16 },
            }}
          />
        </div>
      </div>

      {/* Input/Output Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {[
          {
            title: "Input",
            value: submission.stdin,
            default: "No input provided",
          },
          { title: "Output", value: submission.stdout, default: "No output" },
        ].map(({ title, value, default: defaultVal }) => (
          <div key={title}>
            <h3 className="text-md font-medium text-white/70 mb-2 flex items-center gap-2">
              <Terminal size={14} />
              {title}
            </h3>
            <pre className="dark:bg-black/30 bg-white/30 dark:text-white/70 text-black/70 p-3 rounded-lg overflow-x-auto border border-white/5 text-xs h-24">
              <code>{helpers.parseJsonValue(value, defaultVal)}</code>
            </pre>
          </div>
        ))}
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          {
            icon: Clock,
            color: "text-blue-400",
            title: "Execution Time",
            value: submission.time,
          },
          {
            icon: HardDrive,
            color: "text-purple-400",
            title: "Memory Used",
            value: submission.memory,
          },
        ].map(({ icon: Icon, color, title, value }) => (
          <div
            key={title}
            className="flex items-center gap-4 dark:bg-black/20 bg-white/20 p-3 rounded-lg border border-white/5"
          >
            <Icon className={`${color} w-10 h-10`} />
            <div>
              <div className="dark:text-white/60 text-black/60 text-xs">
                {title}
              </div>
              <div className="dark:text-white text-black text-lg">
                {helpers.parseJsonValue(value)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const EmptyState = () => (
    <div className="empty-state">
      <div className="empty-state-icon">📝</div>
      <h3 className="text-xl font-medium dark:text-white text-black mb-2">
        No submissions found
      </h3>
      <p className="text-white/70">
        You haven't submitted any solutions yet, or none match your current
        filter.
      </p>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="profile-component-card p-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="profile-component-header flex items-center gap-2">
          <FileCode className="w-5 h-5 text-red-500" /> Submission History
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 filter-input"
            >
              <option className="dark:bg-black/90 bg-white/90" value="all">
                All Submissions
              </option>
              <option className="dark:bg-black/90 bg-white/90" value="ACCEPTED">
                Accepted
              </option>
              <option
                className="dark:bg-black/90 bg-white/90"
                value="WRONG_ANSWER"
              >
                Wrong Answer
              </option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-white/50"></div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: "Total",
                value: submissions.length,
                color: "dark:text-white text-black",
              },
              {
                label: "Accepted",
                value: computedValues.acceptedCount,
                color: "text-emerald-500",
              },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className="flex gap-8 items-center justify-between dark:bg-black/20 bg-white/20 border dark:border-white/10 border-black/10 rounded-md px-3 text-center"
              >
                <div className="text-xs dark:text-white/60 text-black/60">
                  {label}
                </div>
                <div className={`text-xl font-medium ${color}`}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      {computedValues.filteredSubmissions.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {computedValues.filteredSubmissions.map((submission) => (
            <motion.div
              key={submission.id}
              className="playlist-card overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <SubmissionHeader submission={submission} />
              {expandedSubmission === submission.id && (
                <SubmissionDetails submission={submission} />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ProfileSubmission;
