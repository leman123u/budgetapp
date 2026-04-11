import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import budgetReducer from "./budgetSlice";
import expenseReducer from "./expenseSlice";
import notificationReducer from "./notificationSlice";
import savingsGoalReducer from "./savingsGoalSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    budgets: budgetReducer,
    expenses: expenseReducer,
    notifications: notificationReducer,
    savingsGoals: savingsGoalReducer,
  },
});