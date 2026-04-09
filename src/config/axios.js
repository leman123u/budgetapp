import axios from "axios";

const baseURL =
  (typeof process !== "undefined" &&
    process.env.REACT_APP_API_URL &&
    process.env.REACT_APP_API_URL.trim()) ||
  "https://backendrender-3-ehrl.onrender.com/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  // Keep full AxiosError so callers can inspect error.response/status/data
  (error) => Promise.reject(error)
);

// endpoints
export const API_ENDPOINTS = {
  LOGIN: "/app_users/login",
  REGISTER: "/app_users/register",
  FORGOT_PASSWORD: "/app_users/forgot-password",
  RESET_PASSWORD: "/app_users/reset-password",
};

export default axiosInstance;