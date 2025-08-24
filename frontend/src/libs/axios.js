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

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  response => {
    console.log(`✅ [API] Response from ${response.config.url}:`, { 
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    return response;
  },
  error => {
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
