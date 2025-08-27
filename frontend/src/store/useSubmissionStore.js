import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import { Toast } from "./useToastStore";

export const useSubmissionStore = create((set, get) => ({
  isLoading: false,
  submissions: [],
  submission: null,
  submissionCount: null,

  getAllSubmissions: async () => {
    try {
      set({ isLoading: true });
      const res = await axiosInstance.get("/submission/get-all-submissions");
      console.log("All submissions:", res.data.data);

      set({ submissions: res.data.data });
    } catch (error) {
      console.log("Error getting all submissions", error);
      Toast.error("Error getting all submissions");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionForProblem: async (problemId) => {
    try {
      // Don't proceed without problem ID
      if (!problemId) {
        console.error("Missing problem ID for getSubmissionForProblem");
        // Set default empty data instead of showing error
        set({ submission: [] });
        return;
      }
      
      set({ isLoading: true });
      
      try {
        const res = await axiosInstance.get(
          `/submission/get-submissions/${problemId}`
        );

        set({ submission: res.data.data });
        console.log("✅ Retrieved submissions successfully");
      } catch (submissionError) {
        console.error("Error getting submissions:", submissionError);
        
        // Handle specific error cases
        if (submissionError.response?.status === 401) {
          console.log("👤 Authentication required to view submissions");
          // Don't show error toast here, just set empty data
          set({ submission: [] });
        } else if (submissionError.response?.status === 404) {
          console.log("ℹ️ No submissions found for this problem");
          // Set empty array to avoid undefined errors
          set({ submission: [] });
        } else {
          // For other errors, show toast only for non-auth errors
          let errorMessage = "Error loading submissions";
          if (!submissionError.response?.status === 401) {
            Toast.error(errorMessage, "Submissions Error");
          }
          set({ submission: [] });
        }
      }
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      // Don't proceed without problem ID
      if (!problemId) {
        console.error("Missing problem ID for getSubmissionCountForProblem");
        // Set default value instead of showing error
        set({ submissionCount: 0 });
        return;
      }
      
      try {
        const res = await axiosInstance.get(
          `/submission/get-submissions-count/${problemId}`
        );

        set({ submissionCount: res.data.data });
        console.log("✅ Retrieved submission count successfully:", res.data.data);
      } catch (countError) {
        console.error("Error getting submission count:", countError);
        
        // Handle specific error cases
        if (countError.response?.status === 401) {
          console.log("👤 Authentication required to view submission count");
          // Don't show error toast, just set default value
          set({ submissionCount: 0 });
        } else if (countError.response?.status === 404) {
          console.log("ℹ️ No submission count found for this problem");
          // Set default to 0
          set({ submissionCount: 0 });
        } else {
          // For other errors, set default and only show toast for non-auth errors
          if (countError.response?.status !== 401) {
            let errorMessage = "Error loading submission count";
            Toast.error(errorMessage, "Submission Error");
          }
          set({ submissionCount: 0 });
        }
      }
    } catch (error) {
      console.error("Unexpected error in getSubmissionCountForProblem:", error);
      set({ submissionCount: 0 });
    }
  },
}));
