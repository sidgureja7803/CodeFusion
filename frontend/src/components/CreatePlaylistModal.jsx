import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Modal.css";
import { useAuthStore } from "../store/useAuthStore";

const CreatePlaylistModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { authUser } = useAuthStore();

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

  const handleFormSubmit = async (data) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 dark:bg-black/20 bg-white/20 backdrop-blur-md flex items-center justify-center z-50 brightness-125"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className="modal-card w-full max-w-3xl relative p-3 border border-[#000] dark:border-none"
            initial={{ opacity: 0, y: 0, scale: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Red glow effect */}
            <div
              className="absolute -top-10 -left-20 w-40 h-20"
              style={{
                background:
                  "radial-gradient(circle, rgba(215, 8, 1, 0.4) 0%, rgba(255, 0, 0, 0) 80%)",
                filter: "blur(15px)",
                opacity: "0.5",
                zIndex: "-1",
                transform: "rotate(-25deg)",
                pointerEvents: "none",
              }}
            ></div>

            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="text-base text-black/90 dark:text-white/90 arame">
                {authUser?.name} / New Playlist
              </h3>
              <button
                onClick={onClose}
                className="dark:text-white text-black hover:text-red-500 transition-colors arame cursor-pointer"
              >
                X [ESC]
              </button>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <div className="form-control">
                {/* <label className="label mb-1">
                  <span className="text-white neue-med text-sm">
                    Playlist Name
                  </span>
                </label> */}
                <input
                  type="text"
                  className="modal-input w-full p-2"
                  placeholder="Playlist name"
                  {...register("name", {
                    required: "Playlist name is required",
                  })}
                />
                {errors.name && (
                  <label className="label mt-1">
                    <span className="text-[#ff9999] text-sm neue-reg">
                      {errors.name.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="border-b border-[#383838] mb-4">
                {/* <label className="label mb-1">
                  <span className="text-white neue-med text-sm">
                    Description
                  </span>
                </label> */}
                <textarea
                  className="modal-text-area w-full p-2 h-20 resize-none"
                  placeholder="Add description..."
                  {...register("description")}
                />
              </div>

              <div className="flex justify-end gap-4 ">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md text-black/80 dark:text-white/80 border border-[#1e1e1e] dark:border-[#383838] hover:text-black dark:hover:text-white hover:border-[#525252] transition-colors neue-reg text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="add-btn px-6 py-2 rounded-md dark:text-white text-black transition-all flex items-center gap-2 neue-reg text-sm cursor-pointer"
                >
                  <Plus size={18} />
                  Create Playlist
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreatePlaylistModal;
