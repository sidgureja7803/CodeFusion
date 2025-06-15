import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { X, Save } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Modal.css";
import { useAuthStore } from "../store/useAuthStore";
import { Toast } from "../store/useToastStore";
import { usePlaylistStore } from "../store/usePlaylistStore";

const EditPlaylistModal = ({ isOpen, onClose, onSuccess, playlist }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { updatePlaylist, isLoading } = usePlaylistStore();
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

  useEffect(() => {
    if (isOpen && playlist) {
      setName(playlist.name || "");
      setDescription(playlist.description || "");
    }
  }, [isOpen, playlist]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name.trim()) {
      Toast.error("Playlist name is required");
      return;
    }

    try {
      await updatePlaylist(playlist.id, {
        name: name.trim(),
        description: description.trim() || undefined,
      });

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      // Error is already handled in the store
      console.error("Error updating playlist:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-100 brightness-125"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <motion.div
            className="modal-card w-full max-w-3xl relative p-3"
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
              <h3 className="text-base text-white/90 arame">
                {authUser?.name} / Edit Playlist
              </h3>
              <button
                onClick={onClose}
                className="text-white hover:text-red-500 transition-colors arame cursor-pointer"
              >
                X [ESC]
              </button>
            </div>

            <form onSubmit={handleSubmit}>
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
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>

              <div className="border-b border-[#383838] mb-4">
                {/* <label className="label mb-1">
                  <span className="text-white neue-med text-sm">
                    Description
                  </span>
                </label> */}
                <textarea
                  className="modal-text-area w-full p-2 h-20 resize-none"
                  value={description}
                  placeholder="Add description..."
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-4 ">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-md text-white/80 border border-[#383838] hover:text-white hover:border-[#525252] transition-colors neue-reg text-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="add-btn px-6 py-2 rounded-md text-white transition-all flex items-center gap-2 neue-reg text-sm cursor-pointer"
                >
                  {isLoading ? (
                    "Updating..."
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditPlaylistModal;
