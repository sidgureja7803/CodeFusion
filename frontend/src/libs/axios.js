import axios from "axios";

export const API_URL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_API_URL
    : "http://localhost:3000/api/v1";


// Create axios instance with enhanced configuration
export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  },
  // Increased timeout for slower connections
  timeout: 15000
});

// Add request interceptor for debugging and consistent auth handling
axiosInstance.interceptors.request.use(
  config => {
    // Log useful debug info but don't show sensitive headers
    const headersToLog = { ...config.headers };
    if (headersToLog.Authorization) {
      headersToLog.Authorization = 'Bearer [hidden]';
    }
    
    console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`, { 
      headers: headersToLog,
      withCredentials: config.withCredentials
    });
    
    // Special handling for AI requests - ensure they always go through even with token issues
    if (config.url?.startsWith('/ai/')) {
      console.log('🤖 AI request detected - ensuring token persistence');
      
      // For AI endpoints, specifically mark that this request shouldn't auto-redirect to login
      config._isAiRequest = true;
    }
    
    return config;
  },
  error => {
    console.error("❌ [API] Request Error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging and token refresh
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  response => {
    console.log(`✅ [API] Response from ${response.config.url}:`, { 
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    return response;
  },
  async error => {
    const originalRequest = error.config;
    
    // Special handling for AI requests with auth errors
    if (error.response && error.response.status === 401 && originalRequest._isAiRequest) {
      console.log("🤖 AI request encountered auth error - attempting to handle gracefully");
      
      // For AI requests, attempt to refresh token but don't redirect to login if it fails
      if (!originalRequest._aiRetried) {
        originalRequest._aiRetried = true;
        
        try {
          console.log("🔄 Attempting to refresh token for AI request");
          await axiosInstance.post("/auth/refresh");
          console.log("✅ Token refreshed successfully for AI request");
          return axiosInstance(originalRequest);
        } catch (refreshErr) {
          console.error("❌ Token refresh failed for AI request, proceeding with error", refreshErr);
          
          // Create a more friendly error object for AI requests
          const aiError = new Error("Authentication required for AI assistant");
          aiError.response = {
            status: 401,
            data: {
              message: "Authentication required for AI assistant. Please refresh the page and try again.",
              code: "AI_AUTH_REQUIRED"
            }
          };
          return Promise.reject(aiError);
        }
      }
      
      // If we already tried refreshing for this AI request, just return the error
      return Promise.reject(error);
    }
    
    // Handle token expired errors for non-AI requests
    else if (error.response && error.response.status === 401 && error.response.data.code === "TOKEN_EXPIRED" && !originalRequest._retry) {
      if (isRefreshing) {
        // If token refresh is in progress, queue this request
        try {
          // Wait for the token refresh to complete
          await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          // Retry the request with new token (will be attached via cookies)
          return axiosInstance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Try to refresh the token
        console.log("🔄 Attempting to refresh token");
        const refreshResponse = await axiosInstance.post("/auth/refresh");
        console.log("✅ Token refreshed successfully");
        
        // Process queued requests
        processQueue(null);
        
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, process queue with error
        processQueue(refreshError);
        
        // Handle refresh failure - redirect to login
        console.error("❌ Failed to refresh token, redirect to login page");
        
        // Clear login state
        if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
          console.log("🔀 Redirecting to login page");
          window.location.href = "/login";
        }
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response) {
      // The request was made and the server responded with an error status
      console.error(`❌ [API] Error ${error.response.status} from ${error.config?.url}:`, {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error("❌ [API] No response received:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("❌ [API] Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Debug logging
console.log("🔧 Axios Configuration:");
console.log("Mode:", import.meta.env.MODE);
console.log("Base URL:", axiosInstance.defaults.baseURL);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("VITE_DEV_BACKEND_URL:", import.meta.env.VITE_DEV_BACKEND_URL);
