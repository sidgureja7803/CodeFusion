import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import { Toast } from "./useToastStore";

export const useExecutionStore = create((set, get) => ({
  isExecuting: false,
  isSubmitting: false,
  submission: null,

  executeCode: async (
    source_code,
    languageId,
    stdin,
    expectedOutput,
    problemId,
    saveSubmission = false
  ) => {
    try {
      console.log("⚡ Code Execution: Starting request...");
      console.log("Language ID:", languageId);
      console.log("Problem ID:", problemId);
      console.log("Save submission:", saveSubmission);
      console.log("Test cases count:", stdin?.length || 0);
      console.log("Code length:", source_code?.length || 0);

      set({
        isExecuting: saveSubmission ? false : true,
        isSubmitting: saveSubmission ? true : false,
      });

      const requestData = {
        source_code,
        languageId,
        stdin,
        expectedOutput,
        problemId,
        saveSubmission,
      };

      console.log("Request data:", requestData);

      const res = await axiosInstance.post("/execution", requestData);
      
      console.log("⚡ Code Execution: Response received:", res.data);

      set({ submission: res.data.submission });

      const message = res.data.message || (saveSubmission ? "Solution submitted successfully!" : "Code executed successfully!");
      Toast.success(message);
      
      return res.data; // Return the response data
    } catch (error) {
      console.error("⚡ Code Execution Error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });

      let errorMessage = saveSubmission ? "Error submitting solution" : "Error executing code";
      
      if (error.response?.status === 401) {
        errorMessage = "Please log in to execute code";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please try again later.";
      } else if (error.response?.status === 500) {
        errorMessage = "Code execution service is temporarily unavailable";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Toast.error(errorMessage);
      throw error; // Rethrow so the Promise rejects
    } finally {
      set({ isExecuting: false, isSubmitting: false });
    }
  },
}));
