import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { analyzeBudget } from "../config/aiService";

export const fetchAIInsights = createAsyncThunk(
  "ai/fetchInsights",
  async (data) => {
    return await analyzeBudget(data);
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    insights: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIInsights.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAIInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.insights = action.payload;
      });
  },
});

export default aiSlice.reducer;






