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
      set({ isLoading: true });

      const response = await axiosInstance.post("/ai/help", {
        prompt,
        problemId,
        code,
        language,
      });

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

      return response.data.response;
    } catch (error) {
      console.error("Error getting AI help:", error);
      Toast.error("Failed to get AI assistance");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Get code explanation
  getCodeExplanation: async (code, language) => {
    try {
      set({ isLoading: true });

      const response = await axiosInstance.post("/ai/explain", {
        code,
        language,
      });

      set({ explanation: response.data.explanation });
      return response.data.explanation;
    } catch (error) {
      console.error("Error getting code explanation:", error);
      Toast.error("Failed to explain code");
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // Clear AI response and history
  clearChat: () => {
    set({
      aiResponse: null,
      history: [],
    });
  },
}));
