import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black/60 bg-white/60">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-[#0e0e0e] rounded-lg shadow-xl p-5 max-w-xl w-full mx-4 contrast-[1.2]"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl dark:text-white text-black arame">
            {title || "Confirm Action"}
          </h2>
          <button
            onClick={onClose}
            className="text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors arame cursor-pointer"
          >
            X [ESC]
          </button>
        </div>

        <div className="mb-6">
          <p className="text-white/80">
            {message || "Are you sure you want to proceed?"}
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-white/80 border border-[#383838] hover:text-white hover:border-[#525252] transition-colors neue-reg text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="add-btn px-6 py-2 rounded-md text-white transition-all flex items-center gap-2 neue-reg text-sm cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
