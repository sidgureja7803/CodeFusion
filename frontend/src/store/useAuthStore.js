import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { Toast } from "./useToastStore";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoggingIn: false,
  isCheckingAuth: false,
  isSigningUp: false,

  // Wake up backend (for Render deployment)
  wakeUpBackend: async () => {
    try {
      console.log("🚀 Waking up backend...");
      const response = await axiosInstance.get("/wake-up", { timeout: 10000 });
      console.log("✅ Backend is awake:", response.data.message);
      return true;
    } catch (error) {
      console.error("⚠️ Failed to wake up backend:", error.message);
      return false;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      // Try to wake up backend first
      await useAuthStore.getState().wakeUpBackend();
      
      const response = await axiosInstance.get("/auth/me");
      set({ authUser: response.data.user });
      return true;
    } catch (error) {
      console.error("Error checking authentication:", error);
      
      // Enhance error message based on specific error conditions
      if (error.response) {
        // Server responded with error
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 401) {
          error.friendlyMessage = 'You are not logged in. Please sign in to continue.';
        } else if (status === 500) {
          error.friendlyMessage = 'Server error occurred. Please try again later.';
        } else {
          error.friendlyMessage = data?.message || 'Authentication failed. Please try again.';
        }
      } else if (error.request) {
        // No response received
        error.friendlyMessage = 'Cannot connect to server. Please check your internet connection and try again.';
      } else {
        // Request setup error
        error.friendlyMessage = 'An unexpected error occurred. Please try again.';
      }
      
      set({ authUser: null });
      throw error;
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      // Wake up backend before signup
      await useAuthStore.getState().wakeUpBackend();
      
      const response = await axiosInstance.post("/auth/register", data);
      console.log("Sign up response:", response.data);
      set({ authUser: response.data.user });
      Toast.success(
        "Account created successfully!",
        "Welcome to CodeFusion!",
        4000
      );
    } catch (error) {
      console.error("Error signing up:", error);

      // Handle specific signup errors
      let errorMessage = "Sign up failed. Please try again.";
      let errorTitle = "Sign Up Error";
      
      if (error.response) {
        const status = error.response.status;
        const serverMessage = error.response.data?.message;
        
        if (status === 400 && (serverMessage?.toLowerCase().includes('already exists') || 
            serverMessage?.toLowerCase().includes('email already exists'))) {
          errorMessage = "This email address is already registered. Please sign in instead.";
          errorTitle = "Account Already Exists";
        } else if (status === 500) {
          errorMessage = "Server error occurred. Please try again later.";
          errorTitle = "Server Error";
        } else if (serverMessage) {
          errorMessage = serverMessage;
        }
      } else if (error.message === "Network Error") {
        errorMessage = "Cannot connect to server. Please check your internet connection.";
        errorTitle = "Connection Error";
      }
      
      // Add friendly message property that components can use
      error.friendlyMessage = errorMessage;
      
      Toast.error(errorMessage, errorTitle, 5000);

      throw error;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      // Wake up backend before login
      await useAuthStore.getState().wakeUpBackend();
      
      const response = await axiosInstance.post("/auth/login", data);
      console.log("Login response:", response.data);

      Toast.success("Login successful!", "Welcome back!", 4000);
      set({ authUser: response.data.user });
    } catch (error) {
      console.error("Error logging in:", error);

      // Handle specific login errors with appropriate toast notifications
      let errorMessage = "Login failed. Please try again.";
      let errorTitle = "Login Error";

      if (error.response?.status === 401) {
        const serverMessage = error.response.data?.message;

        if (serverMessage?.toLowerCase().includes("password")) {
          errorMessage =
            "Incorrect password. Please check your password and try again.";
          errorTitle = "Wrong Password";
        } else if (
          serverMessage?.toLowerCase().includes("email") ||
          serverMessage?.toLowerCase().includes("not found")
        ) {
          errorMessage = "No account found with this email address.";
          errorTitle = "Account Not Found";
        } else {
          errorMessage = serverMessage || "Invalid email or password.";
          errorTitle = "Login Failed";
        }
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
        errorTitle = "Server Error";
      } else if (error.message === "Network Error") {
        errorMessage =
          "Cannot connect to server. Please check your internet connection.";
        errorTitle = "Connection Error";
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      
      // Add friendly message property that components can use
      error.friendlyMessage = errorMessage;

      Toast.error(errorMessage, errorTitle, 6000);
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      Toast.success("Logout successful", "See you later!", 3000);
    } catch (error) {
      console.error("Error logging out:", error);
      // Even if logout fails on backend, clear the frontend state
      set({ authUser: null });
      Toast.warning("Logged out locally", "Session cleared", 3000);
    }
  },
}));
