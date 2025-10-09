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
  MessageCircle,
  Sparkles,
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
  const { isLoading, getAIHelp, history, clearChat } = useAIAssistantStore();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Focus input when component mounts
  useEffect(() => {
    if (inputRef.current && !minimized) {
      inputRef.current.focus();
    }
  }, [minimized]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    console.log("🤖 AI Chat: Submitting prompt:", prompt);
    console.log("🤖 AI Chat: Problem ID:", problem?.id);
    console.log("🤖 AI Chat: Language:", language);
    console.log("🤖 AI Chat: Code length:", code?.length || 0);

    try {
      await getAIHelp(prompt, problem?.id, code, language);
      setPrompt("");
    } catch (error) {
      // Keep the prompt in case the user wants to retry
      console.error("Failed to get AI help:", error);
      
      // Show user-friendly error in the chat
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered a problem processing your request. Please try again in a moment.",
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      if (error.response?.status === 401) {
        errorMessage.content = "You need to be logged in to use the AI assistant. Please log in and try again.";
      } else if (error.response?.status === 429) {
        errorMessage.content = "I've received too many requests. Please wait a moment before trying again.";
      }
      
      // Add error message to chat history
      useAIAssistantStore.getState().set((state) => ({
        history: [
          ...state.history,
          {
            role: "user",
            content: prompt,
            timestamp: new Date().toISOString(),
          },
          errorMessage
        ],
      }));
    }
  };

  const handleQuickPrompt = async (quickPrompt) => {
    console.log("🤖 AI Chat: Using quick prompt:", quickPrompt);
    console.log("🤖 AI Chat: Problem ID:", problem?.id);
    console.log("🤖 AI Chat: Language:", language);
    console.log("🤖 AI Chat: Code length:", code?.length || 0);
    
    try {
      await getAIHelp(quickPrompt, problem?.id, code, language);
    } catch (error) {
      console.error("Failed to get AI help for quick prompt:", error);
      
      // Show user-friendly error in the chat
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I encountered a problem processing your request. Please try again in a moment.",
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      if (error.response?.status === 401) {
        errorMessage.content = "You need to be logged in to use the AI assistant. Please log in and try again.";
      } else if (error.response?.status === 429) {
        errorMessage.content = "I've received too many requests. Please wait a moment before trying again.";
      }
      
      // Add error message to chat history
      useAIAssistantStore.getState().set((state) => ({
        history: [
          ...state.history,
          {
            role: "user",
            content: quickPrompt,
            timestamp: new Date().toISOString(),
          },
          errorMessage
        ],
      }));
    }
  };

  const orbVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      filter: "brightness(1) drop-shadow(0 0 10px rgba(79, 70, 229, 0.4))",
    },
    active: {
      scale: 1.1,
      rotate: 360,
      filter: "brightness(1.3) drop-shadow(0 0 15px rgba(79, 70, 229, 0.7))",
    },
    thinking: {
      scale: [1, 1.08, 1],
      rotate: [0, 15, -15, 0],
      filter: "brightness(1.4) drop-shadow(0 0 25px rgba(79, 70, 229, 0.9))",
    },
  };

  const quickPromptVariants = {
    hidden: { opacity: 0, y: 15, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        type: "spring",
        stiffness: 450,
        damping: 25,
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 0 18px rgba(79, 70, 229, 0.5)",
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
      initial={{ height: 450, opacity: 0, y: 50 }}
      animate={{
        height: minimized ? 48 : isExpanded ? 650 : 450,
        opacity: 1,
        y: 0,
        width: isExpanded ? "95%" : "420px",
      }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <motion.div className="ai-chat-header">
        <motion.div className="flex items-center justify-center gap-2">
          <motion.div
            className="relative"
          >
            <motion.img
              src={aiorb}
              className="w-10 h-10 rounded-full shadow-lg"
              alt="Fusion AI"
              variants={orbVariants}
              animate={getOrbAnimation()}
              transition={{
                duration: isLoading ? 2 : 0.5,
                repeat: isLoading ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
            {isLoading && (
              <motion.div 
                className="absolute -top-1 -right-1 bg-indigo-600 rounded-full p-1 shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <RefreshCw size={12} className="animate-spin text-white" />
              </motion.div>
            )}
          </motion.div>
          <motion.span 
            className="text-white font-semibold tracking-tight flex items-center gap-1"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span>Fusion AI</span>
            <Sparkles size={14} className="text-indigo-300" />
          </motion.span>
        </motion.div>

        <div className="flex gap-2">
          {!minimized && (
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </motion.button>
          )}
          {onClose && (
            <motion.button
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} />
            </motion.button>
          )}
        </div>
      </motion.div>

      {!minimized && (
        <>
          {/* Quick prompt buttons */}
          {history.length === 0 && (
            <motion.div 
              className="quick-prompts"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <motion.button
                onClick={() => handleQuickPrompt("Help me understand this problem")}
                className="quick-prompt-btn"  
                whileHover={{ scale: 1.03, backgroundColor: "rgba(79, 70, 229, 0.12)" }}
                whileTap={{ scale: 0.97 }}
                custom={0}
                variants={quickPromptVariants}
              >
                <div className="prompt-icon">
                  <Lightbulb size={14} />
                </div>
                <span>Understand this problem</span>
              </motion.button>
              <motion.button
                onClick={() => handleQuickPrompt("What's the approach to solve this?")}
                className="quick-prompt-btn"  
                whileHover={{ scale: 1.03, backgroundColor: "rgba(79, 70, 229, 0.12)" }}
                whileTap={{ scale: 0.97 }}
                custom={1}
                variants={quickPromptVariants}
              >
                <div className="prompt-icon">
                  <Code size={14} />
                </div>
                <span>Solution approach</span>
              </motion.button>
              <motion.button 
                onClick={() => handleQuickPrompt("Debug my code")}
                className="quick-prompt-btn"  
                whileHover={{ scale: 1.03, backgroundColor: "rgba(79, 70, 229, 0.12)" }}
                whileTap={{ scale: 0.97 }}
                custom={2}
                variants={quickPromptVariants}
              >
                <div className="prompt-icon">
                  <RefreshCw size={14} />
                </div>
                <span>Debug my code</span>
              </motion.button>
            </motion.div>
          )}

          {/* Chat messages */}
          <div className="ai-chat-messages custom-scrollbar">
            {history.length === 0 ? (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div 
                  className="ai-icon w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
                >
                  <MessageCircle className="w-8 h-8 text-white" />
                </motion.div>
                <motion.p 
                  className="text-base text-slate-600 font-medium mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  How can I help you today?</motion.p>
                <motion.p 
                  className="text-sm text-slate-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  Ask me anything about this problem or your code!
                </motion.p>
              </motion.div>
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
                    {message.role === "assistant" && (
                      <motion.div 
                        className="flex items-center mb-1 ml-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 mr-2 flex items-center justify-center shadow-sm">
                          <Bot className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-xs font-medium text-slate-500">Fusion AI</span>
                      </motion.div>
                    )}
                    {message.role === "user" && (
                      <motion.div 
                        className="flex items-center mb-1 justify-end mr-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span className="text-xs font-medium text-slate-500">You</span>
                      </motion.div>
                    )}
                    {message.role === "assistant" ? (
                      <div className={`markdown-content ${message.isError ? "error-message" : ""}`}>
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
            <div className="relative flex w-full items-center">
              <input
                ref={inputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask Fusion AI a question..."
                disabled={isLoading}
                className="w-full pr-20"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (prompt.trim()) handleSubmit(e);
                  }
                }}
              />
              <div className="absolute right-1 flex items-center space-x-1">
                {history.length > 0 && (
                  <motion.button
                    type="button"
                    onClick={clearChat}
                    className="clear-button"
                    title="Clear chat"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={14} />
                  </motion.button>
                )}
                <motion.button
                  type="submit"
                  disabled={isLoading || !prompt.trim()}
                  className={`send-button ${!prompt.trim() ? "disabled" : ""}`}
                  whileHover={prompt.trim() ? { scale: 1.05, backgroundColor: "rgba(79, 70, 229, 0.2)" } : {}}
                  whileTap={prompt.trim() ? { scale: 0.95 } : {}}
                  title="Send message"
                >
                  <Send size={16} />
                </motion.button>
              </div>
            </div>
          </form>
        </>
      )}
    </motion.div>
  );
};

export default AIChatPanel;
