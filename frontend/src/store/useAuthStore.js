import { create } from "zustand";
import { axiosInstance } from "../libs/axios";
import { Toast } from "./useToastStore";

export const useAuthStore = create((set) => ({
  authUser: null,
  isLoggingIn: false,
  isCheckingAuth: false,
  isSigningUp: false,
  // Token fallback for environments where cookies don't work
  authToken: null,
  tokenExpiry: null,

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
      
      // Check for token fallback first (if cookies failed)
      const { authToken, tokenExpiry } = useAuthStore.getState();
      const isTokenValid = authToken && tokenExpiry && Date.now() < tokenExpiry;
      
      // If we have a valid token in memory, use it
      if (isTokenValid) {
        console.log("🔑 Using stored token for auth");
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      }
      
      try {
        const response = await axiosInstance.get("/auth/me");
        set({ authUser: response.data.user });
        console.log("✅ User authenticated successfully:", response.data.user.email);
        return true;
      } catch (authError) {
        // If we get a token expired error, try to refresh the token
        if (authError.response?.status === 401 && 
            (authError.response?.data?.code === "TOKEN_EXPIRED" || 
             authError.response?.data?.code === "UNAUTHORIZED")) {
          console.log("🔄 Token expired, attempting to refresh...");
          
          try {
            // Try to refresh the token
            const refreshResponse = await axiosInstance.post("/auth/refresh");
            console.log("✅ Token refreshed successfully");
            
            // Check for auth token in refresh response
            if (refreshResponse.data.auth?.token) {
              console.log("🔄 Updated token fallback");
              // Update stored token
              set({ 
                authToken: refreshResponse.data.auth.token,
                tokenExpiry: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
              });
              
              // Update authorization header
              axiosInstance.defaults.headers.common['Authorization'] = 
                `Bearer ${refreshResponse.data.auth.token}`;
            }
            
            // Retry the original auth check with the new token
            const retryResponse = await axiosInstance.get("/auth/me");
            set({ authUser: retryResponse.data.user });
            console.log("✅ User re-authenticated after token refresh");
            return true;
          } catch (refreshError) {
            console.error("❌ Failed to refresh token:", refreshError.message);
            // Clear token and auth state
            set({ authUser: null, authToken: null, tokenExpiry: null });
            delete axiosInstance.defaults.headers.common['Authorization'];
            throw refreshError;
          }
        } else {
          // For other auth errors, propagate the error
          throw authError;
        }
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      
      // Enhance error message based on specific error conditions
      if (error.response) {
        // Server responded with error
        const status = error.response.status;
        const data = error.response.data;
        
        if (status === 401) {
          console.log("👤 Authentication required: User not logged in");
          error.friendlyMessage = 'You need to log in to continue.';
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
      
      // Check if email verification is required
      if (response.data.requiresVerification) {
        console.log("📧 Email verification required");
        Toast.success(
          "Account created! Please check your email for verification code.",
          "Verification Required",
          5000
        );
        
        // Return the response so the component can handle navigation
        return {
          requiresVerification: true,
          email: data.email,
          user: response.data.user
        };
      }
      
      // If no verification required, set the user
      set({ authUser: response.data.user });
      Toast.success(
        "Account created successfully!",
        "Welcome to CodeFusion!",
        4000
      );
      
      return {
        requiresVerification: false,
        user: response.data.user
      };
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

      // Check for auth token in response (fallback for cookie issues)
      if (response.data.auth?.token) {
        console.log("🔑 Using token fallback mechanism");
        // Store token in memory (not persistent)
        set({ 
          authToken: response.data.auth.token,
          tokenExpiry: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days
        });
        
        // Setup authorization header for future requests
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.auth.token}`;
      }

      // Enhanced login success popup with username
      const userName = response.data.user?.name || 'User';
      Toast.success(
        `Welcome back, ${userName}! You've successfully logged in.`,
        "Login Successful",
        5000,
        { position: "top-center", style: { backgroundColor: "#4ade80", borderRadius: "10px" } }
      );
      set({ authUser: response.data.user });
    } catch (error) {
      console.error("Error logging in:", error);
      
      // Check if it's an email verification error and throw with proper data
      if (error.response?.data?.code === "EMAIL_NOT_VERIFIED") {
        // Preserve the error response data for the component to handle
        const enhancedError = new Error(error.response.data.message);
        enhancedError.response = error.response;
        throw enhancedError;
      }

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
      // Clear all auth state including token fallback
      set({ authUser: null, authToken: null, tokenExpiry: null });
      // Remove Authorization header
      delete axiosInstance.defaults.headers.common['Authorization'];
      Toast.success("Logout successful", "See you later!", 3000);
    } catch (error) {
      console.error("Error logging out:", error);
      // Even if logout fails on backend, clear the frontend state
      set({ authUser: null, authToken: null, tokenExpiry: null });
      // Remove Authorization header
      delete axiosInstance.defaults.headers.common['Authorization'];
      Toast.warning("Logged out locally", "Session cleared", 3000);
    }
  },
}));
