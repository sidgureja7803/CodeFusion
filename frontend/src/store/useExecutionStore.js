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

      // Input validation
      if (!source_code || source_code.trim() === "") {
        Toast.error("Please write some code before executing");
        return { error: "No code provided" };
      }

      if (!languageId) {
        Toast.error("Please select a language");
        return { error: "No language selected" };
      }

      if (!Array.isArray(stdin) || stdin.length === 0) {
        Toast.error("No test cases available");
        return { error: "No test cases" };
      }

      if (!Array.isArray(expectedOutput) || expectedOutput.length === 0) {
        Toast.error("No expected outputs available");
        return { error: "No expected outputs" };
      }

      if (stdin.length !== expectedOutput.length) {
        Toast.error("Test case inputs and outputs don't match");
        return { error: "Mismatched test case count" };
      }

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
      let shouldRetry = false;
      
      if (error.response?.status === 401) {
        errorMessage = "Please log in to execute code";
        // Don't auto-retry auth errors
      } else if (error.response?.status === 403) {
        errorMessage = "You don't have permission to execute this code";
        // Don't auto-retry permission errors
      } else if (error.response?.status === 400) {
        // Bad request errors
        if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please try again later.";
        // Don't auto-retry rate limit errors
      } else if (error.response?.status === 500) {
        errorMessage = "Code execution service is temporarily unavailable";
        shouldRetry = true;
      } else if (error.response?.status === 502 || error.response?.status === 503 || error.response?.status === 504) {
        errorMessage = "Service temporarily unavailable. Please try again in a moment.";
        shouldRetry = true;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = "Connection timed out. Your code might be taking too long to execute.";
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (!error.response && error.message) {
        errorMessage = "Network error. Please check your internet connection.";
        shouldRetry = true;
      }

      // Show toast with retry option for server/network errors
      if (shouldRetry) {
        Toast.error(errorMessage, "Error", 5000, {
          action: {
            label: "Retry",
            onClick: () => {
              const state = get();
              state.executeCode(source_code, languageId, stdin, expectedOutput, problemId, saveSubmission);
            }
          }
        });
      } else {
        Toast.error(errorMessage);
      }
      
      return { error: errorMessage }; // Return error object instead of throwing
    } finally {
      set({ isExecuting: false, isSubmitting: false });
    }
  },
}));
