import React, { useEffect, useState } from "react";
import { usePlaylistStore } from "../store/usePlaylistStore";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // Add AnimatePresence
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  List,
  Tag,
  ExternalLink,
  Folder,
  Trash2,
  Plus,
  Edit,
} from "lucide-react";
import EditPlaylistModal from "./EditPlaylistModal";
import CreatePlaylistModal from "./CreatePlaylistModal";

const PlaylistProfile = () => {
  const { getAllPlaylists, createPlaylist, playlists, deletePlaylist } =
    usePlaylistStore();
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] =
    useState(false);

  const handlePlaylistUpdated = () => {
    setIsEditModalOpen(false);
    getAllPlaylists();
  };

  useEffect(() => {
    getAllPlaylists();
  }, [getAllPlaylists]);

  const togglePlaylist = (id) => {
    if (expandedPlaylist === id) {
      setExpandedPlaylist(null);
    } else {
      setExpandedPlaylist(id);
    }
  };

  const handleDelete = async (id) => {
    await deletePlaylist(id);
  };

  const handleEdit = (playlist) => {
    setSelectedPlaylist(playlist);
    setIsEditModalOpen(true);
  };

  const handleCreatePlaylist = async (playlistData) => {
    const result = await createPlaylist(playlistData);
  };

  const getDifficultyBadge = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return <span className="profile-pill pill-success">Easy</span>;
      case "MEDIUM":
        return <span className="profile-pill pill-warning">Medium</span>;
      case "HARD":
        return <span className="profile-pill pill-danger">Hard</span>;
      default:
        return <span className="profile-pill">Unknown</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="profile-component-card p-2 h-[70vh]"
    >
      {playlists.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📚</div>
          <h3 className="text-xl font-medium dark:text-white text-black mb-2 neue-med">
            No playlists found
          </h3>
          <p className="dark:text-white/70 text-black/70 mb-4 neue-reg">
            Create your first playlist to organize problems!
          </p>
          <button
            onClick={() => {
              setIsCreatePlaylistModalOpen(true);
            }}
            className="ai-btn"
          >
            <Plus size={16} className="mr-1 cp-svg" /> Create Playlist
          </button>
        </div>
      ) : (
        <div className="space-y-6 overflow-auto h-full p-4">
          {playlists.map((playlist) => (
            <motion.div
              key={playlist.id}
              className="playlist-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Playlist Header */}
              <div
                className="flex flex-col cursor-pointer"
                onClick={() => togglePlaylist(playlist.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold neue-med dark:text-white text-black">
                      {playlist.name}
                    </h3>
                  </div>
                  <motion.button
                    className="dark:text-white/70 text-black/70 dark:hover:text-white hover:text-black transition-colors"
                    animate={{
                      rotate: expandedPlaylist === playlist.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown />
                  </motion.button>
                </div>

                {/* Description */}
                {playlist.description && (
                  <p className="dark:text-white/60 text-black/60">
                    {playlist.description}
                  </p>
                )}
              </div>

              {/* Expanded Problems List with AnimatePresence */}
              <AnimatePresence>
                {expandedPlaylist === playlist.id && (
                  <motion.div
                    key={`playlist-${playlist.id}`} // Important: unique key
                    className="mt-4 pt-4 border-t dark:border-white/10 border-black/10 overflow-hidden"
                    initial={{
                      opacity: 0,
                      height: 0,
                      y: -10,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      y: -10,
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "anticipate",
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="flex items-center gap-4 mt-1 text-sm dark:text-white/60 text-black/60">
                        <div className="flex items-center gap-1 neue-reg">
                          <List size={14} />
                          <span>{playlist.problems?.length || 0} problems</span>
                        </div>
                        <div className="flex items-center gap-1 neue-reg">
                          <Clock size={14} />
                          <span>Created {formatDate(playlist.createdAt)}</span>
                        </div>
                      </div>

                      <h4 className="text-lg mb-3 dark:text-white text-black neue-med">
                        Problems in this playlist
                      </h4>

                      {!playlist.problems || playlist.problems.length === 0 ? (
                        <motion.div
                          className="p-4 dark:bg-black/20 bg-white/20 rounded-lg border dark:border-white/5 border-black/5 dark:text-white/60 text-black/60"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span>No problems added to this playlist yet.</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="profile-table-card"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <table className="profile-table w-full">
                            <thead>
                              <tr>
                                <th className="text-left py-2 dark:text-white/80 text-black/80 neue-med">
                                  Problem
                                </th>
                                <th className="text-left py-2 dark:text-white/80 text-black/80 neue-med">
                                  Difficulty
                                </th>
                                <th className="text-left py-2 dark:text-white/80 text-black/80 neue-med">
                                  Tags
                                </th>
                                <th className="text-left py-2 dark:text-white/80 text-black/80 neue-med">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {playlist.problems.map((item, index) => (
                                <motion.tr
                                  key={item.id}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.3 + index * 0.05 }}
                                >
                                  <td className="font-medium dark:text-white text-black">
                                    {item.problem.title}
                                  </td>
                                  <td>
                                    {getDifficultyBadge(
                                      item.problem.difficulty
                                    )}
                                  </td>
                                  <td>
                                    <div className="flex flex-wrap gap-1">
                                      {item.problem.tags &&
                                        item.problem.tags.map((tag, idx) => (
                                          <div
                                            key={idx}
                                            className="profile-pill pill-primary"
                                          >
                                            <Tag size={10} /> {tag}
                                          </div>
                                        ))}
                                    </div>
                                  </td>
                                  <td className="text-left">
                                    <Link
                                      to={`/problem/${item.problem.id}`}
                                      className="profile-btn profile-btn-outline inline-flex items-center gap-1 py-1 px-2 text-xs"
                                    >
                                      <ExternalLink size={12} />
                                      Solve
                                    </Link>
                                  </td>
                                </motion.tr>
                              ))}
                            </tbody>
                          </table>
                        </motion.div>
                      )}

                      <motion.div
                        className="flex justify-end mt-4 gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent closing when clicking edit
                            handleEdit(playlist);
                          }}
                          className="profile-btn flex items-center gap-1 bg-blue-900/20 border border-blue-500/30 text-blue-400 hover:bg-blue-900/40"
                        >
                          <Edit size={14} />
                          Edit Playlist
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent closing when clicking delete
                            handleDelete(playlist.id);
                          }}
                          className="profile-btn flex items-center gap-1 bg-red-900/20 border border-red-500/30 text-red-400 hover:bg-red-900/40"
                        >
                          <Trash2 size={14} />
                          Delete Playlist
                        </button>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      <EditPlaylistModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedPlaylist(null);
        }}
        onSuccess={handlePlaylistUpdated}
        playlist={selectedPlaylist}
      />

      <div className="box-shadow">
        <CreatePlaylistModal
          isOpen={isCreatePlaylistModalOpen}
          onClose={() => setIsCreatePlaylistModalOpen(false)}
          onSubmit={handleCreatePlaylist}
        />
      </div>
    </motion.div>
  );
};

export default PlaylistProfile;
