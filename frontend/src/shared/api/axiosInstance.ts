import axios, {
  type AxiosInstance,
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "/api";

// Centralized Axios instance with auth header + 401/403 handling.
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      // Session expired - redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login?reason=session_expired";
      return Promise.reject(error);
    }

    if (status === 403) {
      // Permission denied - handle silently
    }

    // Handle error silently without exposing details
    return Promise.reject(error);
  },
);

export default apiClient;
