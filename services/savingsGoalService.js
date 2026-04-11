import axiosInstance, { API_ENDPOINTS } from "../config/api";

const API_URL = API_ENDPOINTS.SAVINGS_GOALS;

export const getGoals = (userId) => axiosInstance.get(`${API_URL}/user/${userId}`);
export const addGoal = (data) => axiosInstance.post(API_URL, data);
export const updateGoal = (id, data) => axiosInstance.put(`${API_URL}/${id}`, data);
export const deleteGoal = (id) => axiosInstance.delete(`${API_URL}/${id}`);
