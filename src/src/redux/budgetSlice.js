import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import budgetService from "../services/budgetService";

export const getBudgets = createAsyncThunk(
  "budget/getBudgets",
  async (userId, thunkAPI) => {
    try {
      const response = userId 
        ? await budgetService.getBudget(userId)
        : await budgetService.getBudgets();
      const data = response.data;
      // Handle both array and single object responses
      return Array.isArray(data) ? data : (data ? [data] : []);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addBudget = createAsyncThunk(
  "budget/addBudget",
  async (data, thunkAPI) => {
    try {
      const response = await budgetService.addBudget(data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateBudget = createAsyncThunk(
  "budget/updateBudget",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await budgetService.updateBudget(id, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const budgetSlice = createSlice({
  name: "budget",
  initialState: {
    budgets: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBudgets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBudgets.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(getBudgets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBudget.fulfilled, (state, action) => {
        state.loading = false;
        state.budgets.push(action.payload);
      })
      .addCase(addBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBudget.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBudget.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.budgets.findIndex((b) => b.id === action.payload.id);
        if (index !== -1) {
          state.budgets[index] = action.payload;
        }
      })
      .addCase(updateBudget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = budgetSlice.actions;
export default budgetSlice.reducer;