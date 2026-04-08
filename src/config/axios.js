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
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// response interceptor — keep full AxiosError so callers can read response/status
axiosInstance.interceptors.response.use(
  (response) => response,
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