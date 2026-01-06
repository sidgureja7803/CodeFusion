import { create } from "zustand";
import { axiosInstance } from "../libs/axios.js";
import { executeCodeWithTestCases, getLanguageName } from "../libs/rapidapi.js";
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

      // Execute code directly via RapidAPI
      const executionResult = await executeCodeWithTestCases(
        source_code,
        languageId,
        stdin,
        expectedOutput
      );

      console.log("⚡ Code Execution: Results received:", executionResult);

      // If saveSubmission is true, save to backend
      if (saveSubmission) {
        try {
          const submissionData = {
            problemId,
            sourceCode: { code: source_code },
            language: getLanguageName(languageId),
            status: executionResult.status,
            testCases: executionResult.results,
          };

          const res = await axiosInstance.post("/submission/save", submissionData);
          
          console.log("⚡ Submission saved:", res.data);
          
          set({ submission: res.data.submission });
          
          Toast.success("Solution submitted successfully!");
          
          return {
            success: true,
            message: "Solution submitted successfully!",
            submission: res.data.submission,
            results: executionResult.results,
          };
        } catch (saveError) {
          console.error("Error saving submission:", saveError);
          Toast.error("Code executed but failed to save submission");
          
          // Return execution results even if save failed
          return {
            success: false,
            message: "Code executed but failed to save submission",
            submission: {
              status: executionResult.status,
              testCases: executionResult.results,
            },
            results: executionResult.results,
          };
        }
      } else {
        // Just return execution results without saving
        set({ 
          submission: {
            status: executionResult.status,
            testCases: executionResult.results,
          }
        });
        
        Toast.success("Code executed successfully!");
        
        return {
          success: true,
          message: "Code executed successfully!",
          submission: {
            status: executionResult.status,
            testCases: executionResult.results,
          },
          results: executionResult.results,
        };
      }
    } catch (error) {
      console.error("⚡ Code Execution Error:", error);
      console.error("Error details:", {
        message: error.message,
      });

      let errorMessage = saveSubmission ? "Error submitting solution" : "Error executing code";
      let shouldRetry = false;
      
      if (error.message?.includes("RapidAPI credentials")) {
        errorMessage = "RapidAPI is not configured. Please check your environment variables.";
      } else if (error.message?.includes("timed out")) {
        errorMessage = "Code execution timed out. Your code might be taking too long to execute.";
      } else if (error.message?.includes("Failed to submit code")) {
        errorMessage = "Failed to submit code to execution service";
        shouldRetry = true;
      } else if (error.message?.includes("Failed to get results")) {
        errorMessage = "Failed to get execution results";
        shouldRetry = true;
      } else if (!error.response && error.message) {
        errorMessage = error.message || "Network error. Please check your internet connection.";
        shouldRetry = true;
      }

      // Show toast with retry option for retryable errors
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
