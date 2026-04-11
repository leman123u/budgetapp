import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as savingsGoalService from "../services/savingsGoalService";

export const getSavingsGoals = createAsyncThunk(
  "savingsGoal/getSavingsGoals",
  async (userId, thunkAPI) => {
    try {
      const response = await savingsGoalService.getGoals(userId);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addSavingsGoal = createAsyncThunk(
  "savingsGoal/addSavingsGoal",
  async (data, thunkAPI) => {
    try {
      const response = await savingsGoalService.addGoal(data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateSavingsGoal = createAsyncThunk(
  "savingsGoal/updateSavingsGoal",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await savingsGoalService.updateGoal(id, data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteSavingsGoal = createAsyncThunk(
  "savingsGoal/deleteSavingsGoal",
  async (id, thunkAPI) => {
    try {
      await savingsGoalService.deleteGoal(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const savingsGoalSlice = createSlice({
  name: "savingsGoal",
  initialState: {
    goals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get Goals
      .addCase(getSavingsGoals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSavingsGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload;
      })
      .addCase(getSavingsGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add Goal
      .addCase(addSavingsGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSavingsGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.goals.push(action.payload);
      })
      .addCase(addSavingsGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Goal
      .addCase(updateSavingsGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSavingsGoal.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.goals.findIndex((goal) => goal.id === action.payload.id);
        if (index !== -1) {
          state.goals[index] = action.payload;
        }
      })
      .addCase(updateSavingsGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Goal
      .addCase(deleteSavingsGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteSavingsGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = state.goals.filter((goal) => goal.id !== action.payload);
      })
      .addCase(deleteSavingsGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default savingsGoalSlice.reducer;

