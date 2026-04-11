import axiosInstance from "../config/api";

export const registerUser = (data) => {
  return axiosInstance.post("/app_users/register", data);
};

export const loginUser = (data) => {
  return axiosInstance.post("/app_users/login", data);
};

export const forgotPassword = (email) => {
  return axiosInstance.post("/app_users/forgot-password", {
    email,
  });
};

export const resetPassword = (token, password) => {
  return axiosInstance.post("/app_users/reset-password", null, {
    params: { token, password },
  });
};

export const sendSupport = (data) => {
  return axiosInstance.post("/app_users/support", data);
};