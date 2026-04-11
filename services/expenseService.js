import axiosInstance, { API_ENDPOINTS } from "../config/api";

const API_URL = API_ENDPOINTS.EXPENSES;

export const getExpenses = (userId) => {
  if (userId) {
    return axiosInstance.get(`${API_URL}/user/${userId}`);
  }
  return axiosInstance.get(API_URL);
};
export const addExpense = (data) => axiosInstance.post(API_URL, data);
export const updateExpense = (id, data) => axiosInstance.put(`${API_URL}/${id}`, data);
export const deleteExpense = (id) => axiosInstance.delete(`${API_URL}/${id}`);

// Default export for Redux slices
const expenseService = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
};

export default expenseService;
