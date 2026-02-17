import axiosInstance, { API_ENDPOINTS } from "../config/api";

const API_URL = API_ENDPOINTS.BUDGETS;

export const getBudget = (userId) => axiosInstance.get(`${API_URL}/user/${userId}`);
export const getBudgets = () => axiosInstance.get(API_URL);
export const addBudget = (data) => axiosInstance.post(API_URL, data);
export const updateBudget = (id, data) => axiosInstance.put(`${API_URL}/${id}`, data);

const budgetService = {
  getBudget,
  getBudgets,
  addBudget,
  updateBudget,
};

export default budgetService;
