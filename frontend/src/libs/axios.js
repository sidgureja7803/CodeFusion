import axios from "axios";

export const API_URL = import.meta.env.MODE === "production"
  ? import.meta.env.VITE_API_URL || import.meta.env.VITE_DEV_BACKEND_URL
  : import.meta.env.VITE_API_URL || "http://localhost:3000/api/v1";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Debug logging
console.log("🔧 Axios Configuration:");
console.log("Mode:", import.meta.env.MODE);
console.log("Base URL:", axiosInstance.defaults.baseURL);
console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
console.log("VITE_DEV_BACKEND_URL:", import.meta.env.VITE_DEV_BACKEND_URL);
