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

      // First, check if we need to refresh token before AI request
      try {
        console.log("🔄 Proactively refreshing token before AI request");
        await axiosInstance.post("/auth/refresh");
        console.log("✅ Token refreshed successfully");
      } catch (refreshError) {
        // If refresh fails, we'll still try the AI request
        // Our axios interceptor will handle auth errors for AI requests gracefully
        console.log("⚠️ Token refresh failed, continuing with AI request anyway");
      }

      const requestData = {
        prompt,
        problemId,
        code,
        language,
      };

      console.log("Request data:", requestData);

      // Send the AI request with special handling via axios interceptor
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

      // Silent success - no need for toast
      return response.data.response;
    } catch (error) {
      console.error("🤖 AI Assistant Error:", error);
      console.error("Error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
      });
      
      // Add the user's message to history even if we get an error
      set((state) => ({
        history: [
          ...state.history,
          {
            role: "user",
            content: prompt,
            timestamp: new Date().toISOString(),
          }
        ],
      }));
      
      // Create user-friendly error message
      let errorMessage = "Failed to get AI assistance";
      let errorContent = "I encountered a problem processing your request. Please try again.";
      
      if (error.response?.status === 401 || error.response?.data?.code === "AI_AUTH_REQUIRED") {
        errorMessage = "Authentication required";
        errorContent = "You need to be logged in to use the AI assistant. Please refresh the page and try again.";
      } else if (error.response?.status === 429) {
        errorMessage = "Too many requests";
        errorContent = "I'm receiving too many requests right now. Please try again in a moment.";
      } else if (error.response?.status === 500) {
        errorMessage = "AI service unavailable";
        errorContent = "The AI service is temporarily unavailable. Please try again later.";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
        errorContent = error.response.data.message;
      }
      
      // Add error message to chat history as an assistant message
      const errorResponseMessage = {
        role: "assistant",
        content: errorContent,
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      set((state) => ({
        history: [
          ...state.history,
          errorResponseMessage
        ],
      }));
      
      // Show toast for non-auth errors only
      if (error.response?.status !== 401) {
        Toast.error(errorMessage);
      }
      
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
