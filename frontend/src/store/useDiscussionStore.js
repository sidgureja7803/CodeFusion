import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { Toast } from "./useToastStore";

export const useDiscussionStore = create((set, get) => ({
  discussions: [],
  isLoading: false,
  pagination: null,

  // Get discussions for a problem
  getDiscussions: async (
    problemId,
    page = 1,
    sortBy = "createdAt",
    order = "desc"
  ) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(
        `/discussions/problem/${problemId}?page=${page}&sortBy=${sortBy}&order=${order}`
      );
      set({
        discussions: response.data.discussions,
        pagination: response.data.pagination,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching discussions:", error);
      Toast.error("Failed to load discussions");
      set({ isLoading: false });
    }
  },

  // Create a new discussion
  createDiscussion: async (problemId, content, parentId = null) => {
    try {
      const response = await axiosInstance.post(
        `/discussions/problem/${problemId}`,
        {
          content,
          parentId,
        }
      );

      const { discussions } = get();
      if (parentId) {
        // Add reply to existing discussion
        const updatedDiscussions = discussions.map((discussion) => {
          if (discussion.id === parentId) {
            return {
              ...discussion,
              replies: [...(discussion.replies || []), response.data],
              _count: {
                ...discussion._count,
                replies: (discussion._count?.replies || 0) + 1,
              },
            };
          }
          return discussion;
        });
        set({ discussions: updatedDiscussions });
      } else {
        // Add new top-level discussion with proper structure
        const newDiscussion = {
          ...response.data,
          replies: [],
          _count: {
            replies: 0,
            likes: 0,
          },
        };
        set({ discussions: [newDiscussion, ...discussions] });
      }

      Toast.success("Discussion posted successfully");
      return response.data;
    } catch (error) {
      console.error("Error creating discussion:", error);
      Toast.error("Failed to post discussion");
      throw error;
    }
  },

  // Toggle like on discussion
  toggleLike: async (discussionId, isReply = false, parentId = null) => {
    try {
      const response = await axiosInstance.post(
        `/discussions/${discussionId}/like`
      );

      const { discussions } = get();
      const updatedDiscussions = discussions.map((discussion) => {
        if (isReply && discussion.id === parentId) {
          return {
            ...discussion,
            replies: (discussion.replies || []).map((reply) => {
              if (reply.id === discussionId) {
                return {
                  ...reply,
                  _count: {
                    ...reply._count,
                    likes: response.data.liked
                      ? (reply._count?.likes || 0) + 1
                      : Math.max((reply._count?.likes || 0) - 1, 0),
                  },
                };
              }
              return reply;
            }),
          };
        } else if (discussion.id === discussionId) {
          return {
            ...discussion,
            _count: {
              ...discussion._count,
              likes: response.data.liked
                ? (discussion._count?.likes || 0) + 1
                : Math.max((discussion._count?.likes || 0) - 1, 0),
            },
          };
        }
        return discussion;
      });

      set({ discussions: updatedDiscussions });
    } catch (error) {
      console.error("Error toggling like:", error);
      Toast.error("Failed to update like");
    }
  },

  // Delete discussion
  deleteDiscussion: async (discussionId, isReply = false, parentId = null) => {
    try {
      await axiosInstance.delete(`/discussions/${discussionId}`);

      const { discussions } = get();
      if (isReply) {
        const updatedDiscussions = discussions.map((discussion) => {
          if (discussion.id === parentId) {
            return {
              ...discussion,
              replies: (discussion.replies || []).filter(
                (reply) => reply.id !== discussionId
              ),
              _count: {
                ...discussion._count,
                replies: Math.max((discussion._count?.replies || 0) - 1, 0),
              },
            };
          }
          return discussion;
        });
        set({ discussions: updatedDiscussions });
      } else {
        set({ discussions: discussions.filter((d) => d.id !== discussionId) });
      }

      Toast.success("Discussion deleted");
    } catch (error) {
      console.error("Error deleting discussion:", error);
      Toast.error("Failed to delete discussion");
    }
  },

  // Clear discussions
  clearDiscussions: () => set({ discussions: [], pagination: null }),
}));
