import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../libs/axios";
import { Toast } from "./useToastStore";

export const useRevisionStore = create(
  persist(
    (set, get) => ({
      revisionProblems: [],
      isLoading: false,
      error: null,

      // Add a problem to revision list
      addToRevision: async (problemId) => {
        try {
          set({ isLoading: true });
          const response = await axiosInstance.post(`/revision/add`, {
            problemId,
          });

          if (response.data.success) {
            // Get current state
            const { revisionProblems } = get();
            // Add new problem to the list if not already present
            if (!revisionProblems.some((p) => p.problemId === problemId)) {
              set({
                revisionProblems: [...revisionProblems, response.data.data],
                error: null,
              });
            }
            Toast.success("Problem saved for revision");
          }
        } catch (error) {
          set({ error: error.message });
          Toast.error("Failed to save problem for revision");
        } finally {
          set({ isLoading: false });
        }
      },

      // Remove a problem from revision list
      removeFromRevision: async (problemId) => {
        try {
          set({ isLoading: true });
          const response = await axiosInstance.delete(
            `/revision/remove/${problemId}`
          );

          if (response.data.success) {
            const { revisionProblems } = get();
            set({
              revisionProblems: revisionProblems.filter(
                (p) => p.problemId !== problemId
              ),
              error: null,
            });
            Toast.success("Problem removed from revision");
          }
        } catch (error) {
          set({ error: error.message });
          Toast.error("Failed to remove problem from revision");
        } finally {
          set({ isLoading: false });
        }
      },

      // Get all revision problems
      getRevisionProblems: async () => {
        try {
          set({ isLoading: true });
          const response = await axiosInstance.get("/revision/all");

          if (response.data.success) {
            set({
              revisionProblems: response.data.data,
              error: null,
            });
          }
        } catch (error) {
          set({ error: error.message });
          Toast.error("Failed to fetch revision problems");
        } finally {
          set({ isLoading: false });
        }
      },

      // Check if a problem is in the revision list
      isInRevision: (problemId) => {
        const { revisionProblems } = get();
        return revisionProblems.some((p) => p.problemId === problemId);
      },
    }),
    {
      name: "revision-store",
      getStorage: () => localStorage,
    }
  )
);
