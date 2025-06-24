import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  RefreshCw,
  Lightbulb,
  Code,
  X,
  Maximize2,
  Trash2,
  Minimize2,
} from "lucide-react";
import { useAIAssistantStore } from "../store/useAIAssistantStore";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import aiorb from "../assets/images/ai-orb2.webp";
import "../styles/AIChatPanel.css";
// Using CSS-based AI icon instead of batman image

const AIChatPanel = ({ problem, code, language, onClose }) => {
  const [prompt, setPrompt] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { isLoading, getAIHelp, history, clearChat } = useAIAssistantStore();
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Handle typing animation
  useEffect(() => {
    if (isLoading) {
      setIsTyping(true);
    } else {
      // Delay hiding typing indicator for smooth transition
      const timer = setTimeout(() => setIsTyping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    console.log("🤖 AI Chat: Submitting prompt:", prompt);
    console.log("🤖 AI Chat: Problem ID:", problem?.id);
    console.log("🤖 AI Chat: Language:", language);
    console.log("🤖 AI Chat: Code length:", code?.length || 0);

    await getAIHelp(prompt, problem?.id, code, language);
    setPrompt("");
  };

  const handleQuickPrompt = async (quickPrompt) => {
    console.log("🤖 AI Chat: Using quick prompt:", quickPrompt);
    console.log("🤖 AI Chat: Problem ID:", problem?.id);
    console.log("🤖 AI Chat: Language:", language);
    console.log("🤖 AI Chat: Code length:", code?.length || 0);
    
    await getAIHelp(quickPrompt, problem?.id, code, language);
  };

  const orbVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      filter: "brightness(1) drop-shadow(0 0 8px rgba(65, 20, 220, 0.3))",
    },
    active: {
      scale: 1.1,
      rotate: 360,
      filter: "brightness(1.2) drop-shadow(0 0 15px rgba(65, 20, 220, 0.6))",
    },
    thinking: {
      scale: [1, 1.05, 1],
      rotate: [0, 10, -10, 0],
      filter: "brightness(1.3) drop-shadow(0 0 20px rgba(65, 20, 220, 0.8))",
    },
  };

  const quickPromptVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(65, 20, 220, 0.4)",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const getOrbAnimation = () => {
    if (isLoading) return "thinking";
    if (history.length > 0) return "active";
    return "idle";
  };

  return (
    <motion.div
      className={`ai-chat-panel ${minimized ? "minimized" : ""} ${
        isExpanded ? "expanded" : ""
      }`}
      initial={{ height: 400, opacity: 0, y: 50 }}
      animate={{
        height: minimized ? 48 : isExpanded ? 600 : 400,
        opacity: 1,
        y: 0,
        width: isExpanded ? "95%" : "380px",
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <motion.div className="ai-chat-header">
        <motion.div className="flex items-center justify-center gap-2">
          <motion.img
            src={aiorb}
            className="w-8"
            alt="Alfred AI"
            variants={orbVariants}
            animate={getOrbAnimation()}
            transition={{
              duration: isLoading ? 2 : 0.5,
              repeat: isLoading ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          <span className="text-white font-semibold">Alfred AI</span>
          {isLoading && (
            <RefreshCw size={14} className="animate-spin text-white/50" />
          )}
        </motion.div>

        <div className="flex gap-2">
          {!minimized && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white/60 hover:text-white"
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          )}
          <button
            onClick={() => {
              if (onClose) {
                onClose();
              } else {
                setMinimized(!minimized);
              }
            }}
            className="text-white/60 hover:text-white"
          >
            {minimized ? <Maximize2 size={16} /> : <X size={16} />}
          </button>
        </div>
      </motion.div>

      {!minimized && (
        <>
          {/* Quick prompt buttons */}
          {history.length === 0 && (
            <div className="quick-prompts">
              <button
                onClick={() =>
                  handleQuickPrompt("Help me understand this problem")
                }
              >
                <Lightbulb size={14} />
                Understand this problem
              </button>
              <button
                onClick={() =>
                  handleQuickPrompt("What's the approach to solve this?")
                }
              >
                <Code size={14} />
                Solution approach
              </button>
              <button onClick={() => handleQuickPrompt("Debug my code")}>
                <RefreshCw size={14} />
                Debug my code
              </button>
            </div>
          )}

          {/* Chat messages */}
          <div className="ai-chat-messages">
            {history.length === 0 ? (
              <div className="empty-state">
                <div className="ai-icon w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center opacity-50 mb-4">
                  <Bot className="w-8 h-8 text-white" />
                </div>
                <p>Ask me anything about this problem or your code!</p>
              </div>
            ) : (
              <AnimatePresence>
                {history.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`chat-message ${message.role}`}
                  >
                    {message.role === "assistant" ? (
                      <div className="markdown-content">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <p>{message.content}</p>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            
            {/* Typing indicator */}
            {isLoading && (
              <motion.div
                className="chat-message assistant"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="ai-chat-input">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask Alfred a question..."
              disabled={isLoading}
              className="w-full"
            />
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={`send-button ${!prompt.trim() ? "disabled" : ""}`}
            >
              <Send size={16} />
            </button>

            {history.length > 0 && (
              <button
                type="button"
                onClick={clearChat}
                className="clear-button"
                title="Clear chat"
              >
                <Trash2 size={14} />
              </button>
            )}
          </form>
        </>
      )}
    </motion.div>
  );
};

export default AIChatPanel;
