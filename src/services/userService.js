import axiosInstance from "../config/axios";

export const registerUser = (data) => {
  return axiosInstance.post("/app_users/register", data);
};

export const loginUser = (data) => {
  return axiosInstance.post("/app_users/login", data);
};
