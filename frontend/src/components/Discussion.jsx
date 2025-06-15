import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ThumbsUp,
  Reply,
  Trash2,
  Send,
  User,
  MoreVertical,
} from "lucide-react";
import { useDiscussionStore } from "../store/useDiscussionStore";
import { useAuthStore } from "../store/useAuthStore";
import { formatDistanceToNow } from "date-fns";
import { Loader } from "./Loader";

const Discussion = ({ problemId }) => {
  const [newDiscussion, setNewDiscussion] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  const {
    discussions,
    isLoading,
    pagination,
    getDiscussions,
    createDiscussion,
    toggleLike,
    deleteDiscussion,
  } = useDiscussionStore();

  const { authUser } = useAuthStore();

  // Check if user is authenticated by checking if authUser exists
  const isAuthenticated = !!authUser;

  useEffect(() => {
    if (problemId) {
      setError(null);
      getDiscussions(problemId, 1, sortBy, sortOrder).catch((err) => {
        setError("Failed to load discussions");
        console.error("Discussion loading error:", err);
      });
    }
  }, [problemId, sortBy, sortOrder]);

  const handleSubmitDiscussion = async (e) => {
    e.preventDefault();
    if (!newDiscussion.trim()) return;

    setIsCreating(true);
    try {
      await createDiscussion(problemId, newDiscussion.trim());
      setNewDiscussion("");
    } catch (error) {
      setError("Failed to post discussion");
    } finally {
      setIsCreating(false);
    }
  };

  const formatRelativeTime = (date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  const DiscussionCard = ({ discussion, isReply = false }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [isReplying, setIsReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");
    const canDelete =
      authUser &&
      (authUser.id === discussion.authorId || authUser.role === "ADMIN");

    // Safe access to counts with fallbacks
    const likesCount = discussion._count?.likes || 0;
    const repliesCount = discussion._count?.replies || 0;
    const replies = discussion.replies || [];

    const handleReply = async (e) => {
      e.preventDefault();
      if (!replyContent.trim()) return;

      try {
        await createDiscussion(problemId, replyContent, discussion.id);
        setReplyContent("");
        setIsReplying(false);
      } catch (error) {
        // Error handled in store
      }
    };

    return (
      <div
        className={`border rounded-lg p-4 ${
          isReply
            ? "dark:bg-black/10 bg-white/10 dark:border-white/5 border-black/5 ml-8 mt-2"
            : "dark:bg-black/20 bg-white/20 dark:border-white/10 border-black/10"
        }`}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full dark:bg-white/10 bg-black/10 flex items-center justify-center">
              <User size={16} className="dark:text-white/70 text-black/70" />
            </div>
            <div>
              <h4 className="font-medium dark:text-white text-black">
                {discussion.author?.name || "Unknown User"}
              </h4>
              <p className="text-xs dark:text-white/50 text-black/50">
                {formatRelativeTime(discussion.createdAt)}
              </p>
            </div>
          </div>

          {canDelete && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1 rounded-full hover:bg-white/10"
              >
                <MoreVertical
                  size={16}
                  className="dark:text-white/70 text-black/70"
                />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-8 z-10 dark:bg-black/90 bg-white/90 border dark:border-white/10 border-black/10 rounded-lg shadow-lg">
                  <button
                    onClick={() => {
                      deleteDiscussion(
                        discussion.id,
                        isReply,
                        isReply ? discussion.parentId : null
                      );
                      setShowMenu(false);
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-400/10 w-full text-left rounded-lg"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mb-4">
          <p className="dark:text-white/80 text-black/80 whitespace-pre-wrap">
            {discussion.content}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              toggleLike(discussion.id, isReply, discussion.parentId)
            }
            className="flex items-center gap-2 text-sm dark:text-white/60 text-black/60 hover:text-blue-400 transition-colors"
            disabled={!isAuthenticated}
          >
            <ThumbsUp size={14} />
            {likesCount}
          </button>

          {!isReply && isAuthenticated && (
            <button
              onClick={() => setIsReplying(!isReplying)}
              className="flex items-center gap-2 text-sm dark:text-white/60 text-black/60 hover:text-blue-400 transition-colors"
            >
              <Reply size={14} />
              Reply
            </button>
          )}

          {!isReply && repliesCount > 0 && (
            <span className="text-sm dark:text-white/60 text-black/60">
              {repliesCount} {repliesCount === 1 ? "reply" : "replies"}
            </span>
          )}
        </div>

        {isReplying && (
          <form
            onSubmit={handleReply}
            className="mt-4 pt-4 border-t dark:border-white/10 border-black/10"
          >
            <div className="flex gap-2">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 p-3 dark:bg-black/30 bg-white/30 border dark:border-white/10 border-black/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-black"
                rows={2}
              />
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={!replyContent.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsReplying(false);
                    setReplyContent("");
                  }}
                  className="px-4 py-2 dark:bg-white/10 bg-black/10 text-white rounded-lg hover:bg-white/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Replies */}
        {replies.length > 0 && (
          <div className="mt-4">
            {replies.map((reply) => (
              <DiscussionCard
                key={reply.id}
                discussion={reply}
                isReply={true}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  // if (isLoading && discussions.length === 0) {
  //   return (
  //     <div>
  //       <Loader />
  //     </div>
  //   );
  // }

  // Add character limit
  const MAX_DISCUSSION_LENGTH = 2500;
  const remainingChars = MAX_DISCUSSION_LENGTH - newDiscussion.length;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold dark:text-white text-black flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Discussion ({discussions.length})
        </h2>

        <select
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => {
            const [newSortBy, newOrder] = e.target.value.split("-");
            setSortBy(newSortBy);
            setSortOrder(newOrder);
          }}
          className="dark:bg-black/90 bg-white/90 border dark:border-white/10 border-black/10 rounded-lg px-3 py-2 dark:text-white text-black"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="likes-desc">Most Liked</option>
        </select>
      </div>

      {/* New Discussion Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitDiscussion} className="mb-8">
          <div className="space-y-4">
            <textarea
              value={newDiscussion}
              onChange={(e) => {
                if (e.target.value.length <= MAX_DISCUSSION_LENGTH) {
                  setNewDiscussion(e.target.value);
                }
              }}
              placeholder="Start a discussion about this problem..."
              className="w-full p-4 dark:bg-black/30 bg-white/30 border dark:border-white/10 border-black/10 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-black"
              rows={4}
            />
            <div className="text-xs text-gray-500 text-right">
              {remainingChars} characters remaining
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newDiscussion.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send size={16} />
                Post Discussion
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 dark:bg-black/20 bg-white/20 border dark:border-white/10 border-black/10 rounded-lg text-center">
          <p className="dark:text-white/70 text-black/70">
            Please sign in to participate in discussions
          </p>
        </div>
      )}

      {/* Discussions List with height limit and scroll */}
      <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        <div className="space-y-6">
          {discussions.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50 dark:text-white/50 text-black/50" />
              <h3 className="text-lg font-medium dark:text-white text-black mb-2">
                No discussions yet
              </h3>
              <p className="dark:text-white/60 text-black/60">
                Be the first to start a discussion about this problem!
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {discussions.map((discussion) => (
                <DiscussionCard key={discussion.id} discussion={discussion} />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() =>
                    getDiscussions(problemId, page, sortBy, sortOrder)
                  }
                  className={`px-3 py-2 rounded-lg ${
                    page === pagination.page
                      ? "bg-blue-600 text-white"
                      : "dark:bg-black/30 bg-white/30 dark:text-white text-black hover:bg-blue-600/20"
                  }`}
                >
                  {page}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;
