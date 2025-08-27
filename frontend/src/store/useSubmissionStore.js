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
        return;
      }
      
      set({ isLoading: true });
      const res = await axiosInstance.get(
        `/submission/get-submissions/${problemId}`
      );

      set({ submission: res.data.data });
    } catch (error) {
      console.error("Error getting submissions for problem:", error);
      
      let errorMessage = "Error getting submissions for problem";
      
      // More specific error messages based on error type
      if (error.response?.status === 401) {
        errorMessage = "Please log in to view submissions";
      } else if (error.response?.status === 404) {
        errorMessage = "No submissions found for this problem";
        // Set empty array to avoid undefined errors
        set({ submission: [] });
      } else if (!error.response && error.message) {
        errorMessage = "Network error. Please check your connection.";
      }
      
      Toast.error(errorMessage, "Submissions Error");
    } finally {
      set({ isLoading: false });
    }
  },

  getSubmissionCountForProblem: async (problemId) => {
    try {
      // Don't proceed without problem ID
      if (!problemId) {
        console.error("Missing problem ID for getSubmissionCountForProblem");
        return;
      }
      
      const res = await axiosInstance.get(
        `/submission/get-submissions-count/${problemId}`
      );

      set({ submissionCount: res.data.data });
    } catch (error) {
      console.error("Error getting submission count for problem:", error);
      
      let errorMessage = "Error getting submission count";
      
      // More specific error messages based on error type
      if (error.response?.status === 401) {
        errorMessage = "Please log in to view submission count";
      } else if (error.response?.status === 404) {
        // If 404, set count to 0 instead of showing error
        set({ submissionCount: 0 });
        return;
      } else if (!error.response && error.message) {
        errorMessage = "Network error. Please check your connection.";
      }
      
      Toast.error(errorMessage, "Submission Count Error");
    }
  },
}));
