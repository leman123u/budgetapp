import axios from "axios";

const baseURL =
  (typeof process !== "undefined" &&
    process.env.REACT_APP_API_URL &&
    process.env.REACT_APP_API_URL.trim()) ||
  "https://backendrender-3-ehrl.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response) {

      // Only force logout when an authenticated request was denied (avoid 401 on login, etc.)
      if (
        error.response.status === 401 &&
        error.config?.headers?.Authorization
      ) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);


export const API_ENDPOINTS = {

  USERS: "/app_users",

  LOGIN: "/app_users/login",

  REGISTER: "/app_users/register",

  FORGOT_PASSWORD: "/app_users/forgot-password",

  RESET_PASSWORD: "/app_users/reset-password", // ✅ əlavə etdim

  BUDGETS: "/budgets",

  EXPENSES: "/expenses",

  SAVINGS_GOALS: "/savings_goals",

  NOTIFICATIONS: "/notifications",
};

export default axiosInstance;