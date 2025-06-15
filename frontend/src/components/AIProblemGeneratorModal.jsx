import React, { useState, useEffect } from "react";
import { axiosInstance } from "../libs/axios";
import { Toast } from "../store/useToastStore";
import { Loader } from "./Loader";
import "../styles/AIProblemGeneratorModal.css";
import aiOrb from "../assets/images/ai-orb.webp";
import { motion, AnimatePresence } from "framer-motion";

const AIProblemGeneratorModal = ({ isOpen, onClose, onProblemGenerated }) => {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [category, setCategory] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!topic.trim()) {
      Toast.error("Please enter a topic for the problem");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await axiosInstance.post("/ai/generate-problem", {
        topic,
        difficulty,
        category,
        additionalRequirements: additionalRequirements.trim(),
      });

      onProblemGenerated(response.data.problem);
      Toast.success("Problem generated successfully!");
      onClose();
    } catch (error) {
      console.error("Error generating problem:", error);
      Toast.error(
        error.response?.data?.message || "Failed to generate problem"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 bg-black/20  flex items-center justify-center z-50 brightness-125"
        >
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-black/90 modal-card rounded-lg shadow-xl w-full max-w-2xl p-2 px-6 m-4 text-white border border-[#6272ff] relative"
          >
            {isGenerating && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-lg z-10">
                <div className="flex flex-col items-center gap-4">
                  <Loader />
                  <p className="text-white/80 neue-reg">
                    Generating problem...
                  </p>
                </div>
              </div>
            )}
            <div
              className="absolute -top-10 -left-20 w-60 h-30"
              style={{
                background:
                  "radial-gradient(circle, rgba(99, 102, 241, 0.6) 0%, rgba(255, 0, 0, 0) 100%)",
                filter: "blur(25px)",
                opacity: "0.6",
                zIndex: "-1",
                transform: "rotate(30deg)",
                pointerEvents: "none",
              }}
            ></div>

            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl flex items-center gap-2 neue-med">
                <img className="w-14" src={aiOrb} alt="" />
                AI Problem Generator
              </h2>

              <button
                className="text-white/70 hover:text-white transition-colors arame cursor-pointer"
                onClick={onClose}
              >
                x [ESC]
              </button>
            </div>
            <div>
              <p className="pill-primary py-2 px-4 rounded-md border-2 mb-4 text-sm">
                🧪 This feature is wildly experimental. the problem it spits out
                is 100% guaranteed to be wrong and won’t be created (but form
                should get filled). The model isn’t high-end, and the reference
                solution usually gets rejected by Judge0 for being invalid. So
                yeah... proceed with caution. <br />
                Try using Arrays [Topic], Easy [Difficulty], Arrays [Category]
                and no additional requirements.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2 ">
                  <label>
                    <span className="neue-reg">
                      Topic <span className="text-red-500">*</span>
                    </span>
                    <br />
                    <span className="text-sm text-white/70 neue-reg">
                      [The main concept or algorithm the problem should focus
                      on]
                    </span>
                  </label>

                  <input
                    type="text"
                    className="neue-reg text-sm w-full p-2 border-b-2 border-[#6272ff] rounded-md focus:outline-none"
                    placeholder="e.g., Binary Trees, Dynamic Programming, Graph Traversal"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="neue-reg ">Difficulty</span>
                  </label>
                  <select
                    className="text-sm ai-select border-b-2 p-2 neue-reg border-[#6272ff] w-full"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="neue-reg">Category/Tags</span>
                  </label>
                  <input
                    type="text"
                    className="neue-reg text-sm w-full p-2 border-b-2 border-[#6272ff] rounded-md focus:outline-none"
                    placeholder="e.g., Arrays, Searching, Greedy Algorithms"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="label">
                    <span className="neue-reg">Additional Requirements</span>
                  </label>
                  <textarea
                    className="modal-text-area w-full p-2 h-20 resize-none border-b-2 border-[#6272ff] rounded-md focus:outline-none"
                    placeholder="Any specific constraints or requirements for the problem"
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md text-white/80 border border-[#383838] hover:text-white hover:border-[#525252] transition-colors neue-reg text-sm cursor-pointer"
                  onClick={onClose}
                  disabled={isGenerating}
                >
                  Cancel
                </button>
                <button type="submit" disabled={isGenerating}>
                  <span className="px-6 py-2 rounded-md text-white transition-all flex items-center gap-2 neue-reg text-sm cursor-pointer border-[#6272ff] border bg-[#6272ff2f] generate-btn ">
                    Generate Problem
                  </span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIProblemGeneratorModal;
