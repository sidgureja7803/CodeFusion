import React, { useEffect, useState } from "react";
import { X, Plus, Loader } from "lucide-react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { motion, AnimatePresence } from "framer-motion";

const AddToPlaylistModal = ({ isOpen, onClose, problemId }) => {
  const { playlists, getAllPlaylists, addProblemToPlaylist, isLoading } =
    usePlaylistStore();
  const [selectedPlaylist, setSelectedPlaylist] = useState("");

  useEffect(() => {
    if (isOpen) {
      getAllPlaylists();
    }
  }, [isOpen]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlaylist) return;

    await addProblemToPlaylist(selectedPlaylist, [problemId]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bh-white/20 dark:bg-black/20 backdrop-blur-md flex items-center justify-center z-50 brightness-125"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <motion.div
          className="modal-card rounded-lg p-3 w-full max-w-2xl border border-[#000] dark:border-none"
          initial={{ opacity: 0, y: 0, scale: 1 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="flex justify-between items-center border-b border-base-300 mb-8 px-2">
            <h3 className="text-base text-black/90 dark:text-white/90 arame">
              Add to Playlist
            </h3>
            <button
              onClick={onClose}
              className="dark:text-white text-black hover:text-red-500 transition-colors arame cursor-pointer"
            >
              X [ESC]
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-control">
              {/* <label className="text-white/90 neue-med text-sm mb-2">
              <span className="label-text font-medium">Select Playlist</span>
            </label> */}
              <select
                className="select select-bordered w-full"
                value={selectedPlaylist}
                onChange={(e) => setSelectedPlaylist(e.target.value)}
                disabled={isLoading}
              >
                <option value="">Select a playlist</option>
                {playlists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md text-black/80 dark:text-white/80 border border-[#383838] dark:hover:text-white hover:text-black hover:border-[#525252] transition-colors neue-reg text-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="add-btn px-6 py-2 rounded-md dark:text-white text-black transition-all flex items-center gap-2 neue-reg text-sm cursor-pointer"
                disabled={!selectedPlaylist || isLoading}
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                Add to Playlist
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddToPlaylistModal;
