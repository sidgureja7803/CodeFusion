import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "production"
      ? import.meta.env.VITE_DEV_BACKEND_URL
      : import.meta.env.VITE_API_URL,
  withCredentials: true,
});
