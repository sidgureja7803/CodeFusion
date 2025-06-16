import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { Toast } from "./useToastStore";

export const useAIAssistantStore = create((set) => ({
  isLoading: false,
  aiResponse: null,
  explanation: null,
  history: [],

  // Get help from AI
  getAIHelp: async (prompt, problemId, code, language) => {
    try {
      console.log("🤖 AI Assistant: Starting request...");
      console.log("Prompt:", prompt);
      console.log("Problem ID:", problemId);
      console.log("Language:", language);
      console.log("Code length:", code?.length || 0);
      
      set({ isLoading: true });

      const requestData = {
        prompt,
        problemId,
        code,
        language,
      };

      console.log("Request data:", requestData);

      const response = await axiosInstance.post("/ai/help", requestData);

      console.log("🤖 AI Assistant: Response received:", response.data);

      const newMessage = {
        role: "assistant",
        content: response.data.response,
        timestamp: new Date().toISOString(),
      };

      set((state) => ({
        aiResponse: response.data.response,
        history: [
          ...state.history,
          {
            role: "user",
            content: prompt,
            timestamp: new Date().toISOString(),
          },
          newMessage,
        ],
      }));

      Toast.success("AI response received!");
      return response.data.response;
    } catch (error) {
      console.error("🤖 AI Assistant Error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      
      let errorMessage = "Failed to get AI assistance";
      
      if (error.response?.status === 401) {
        errorMessage = "Please log in to use AI Assistant";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests. Please try again later.";
      } else if (error.response?.status === 500) {
        errorMessage = "AI service is temporarily unavailable";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Toast.error(errorMessage);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Get code explanation
  getCodeExplanation: async (code, language) => {
    try {
      console.log("🤖 Code Explanation: Starting request...");
      set({ isLoading: true });

      const response = await axiosInstance.post("/ai/explain", {
        code,
        language,
      });

      console.log("🤖 Code Explanation: Response received:", response.data);

      set({ explanation: response.data.explanation });
      Toast.success("Code explanation received!");
      return response.data.explanation;
    } catch (error) {
      console.error("🤖 Code Explanation Error:", error);
      
      let errorMessage = "Failed to explain code";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      Toast.error(errorMessage);
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Clear AI response and history
  clearChat: () => {
    console.log("🤖 AI Assistant: Clearing chat history");
    set({
      aiResponse: null,
      history: [],
    });
  },
}));
