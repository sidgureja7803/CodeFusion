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

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  config => {
    console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`, { 
      headers: config.headers,
      withCredentials: config.withCredentials
    });
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
    
    // Handle token expired errors
    if (error.response && error.response.status === 401 && error.response.data.code === "TOKEN_EXPIRED" && !originalRequest._retry) {
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
