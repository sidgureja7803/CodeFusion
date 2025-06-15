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
      set({
        isExecuting: saveSubmission ? false : true,
        isSubmitting: saveSubmission ? true : false,
      });

      const res = await axiosInstance.post("/execution", {
        source_code,
        languageId,
        stdin,
        expectedOutput,
        problemId,
        saveSubmission,
      });
      console.log("Execution response:", res.data);

      set({ submission: res.data.submission });

      Toast.success(res.data.message);
      return res.data; // Return the response data
    } catch (error) {
      console.log("Error executing code", error);
      Toast.error(
        saveSubmission ? "Error submitting solution" : "Error executing code"
      );
      throw error; // Rethrow so the Promise rejects
    } finally {
      set({ isExecuting: false, isSubmitting: false });
    }
  },
}));
