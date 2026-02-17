import axios from "axios";

// Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CORS üçün
});

// ---------------- Request interceptor ----------------
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------------- Response interceptor ----------------
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ---------------- API endpoints ----------------
export const API_ENDPOINTS = {
  USERS: "/app_users",                 // /api/v1/app_users
  LOGIN: "/app_users/login",           // /api/v1/app_users/login
  BUDGETS: "/budgets",
  EXPENSES: "/expenses",
  SAVINGS_GOALS: "/savings_goals",
  NOTIFICATIONS: "/notifications",
};

export default axiosInstance;
