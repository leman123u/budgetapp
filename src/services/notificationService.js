import axiosInstance, { API_ENDPOINTS } from "../config/api";

const API_URL = API_ENDPOINTS.NOTIFICATIONS;

export const getNotifications = (userId) => axiosInstance.get(`${API_URL}/user/${userId}`);
export const markAsRead = (id) => axiosInstance.put(`${API_URL}/${id}/read`);
