import { createSlice } from "@reduxjs/toolkit";

const personalBudgetSlice = createSlice({
  name: "personalBudget",
  initialState: {
    totalBudget: 0,
    totalExpenses: 0,
  },
  reducers: {
    setTotals: (state, action) => {
      state.totalBudget = action.payload.totalBudget;
      state.totalExpenses = action.payload.totalExpenses;
    },
  },
});

export const { setTotals } = personalBudgetSlice.actions;
export default personalBudgetSlice.reducer;