import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backendrender-3-ehrl.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false // 🔥 FIX
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(
        error.response.data?.message ||
        error.response.data?.error ||
        "Server error"
      );
    }
    return Promise.reject("Network error");
  }
);

// endpoints
export const API_ENDPOINTS = {
  LOGIN: "/app_users/login",
  REGISTER: "/app_users/register",
  FORGOT_PASSWORD: "/app_users/forgot-password",
  RESET_PASSWORD: "/app_users/reset-password",
};

export default axiosInstance;