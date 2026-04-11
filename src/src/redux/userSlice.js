import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../services/userService";

// ================= LOGIN =================
export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginUser(data);
      return res.data;
    } catch (error) {
      let message = "Login failed";
      const data = error.response?.data;

      if (typeof data === "string" && data.trim()) {
        message = data;
      } else if (data?.message) {
        message = data.message;
      } else if (data?.error) {
        message = typeof data.error === "string" ? data.error : message;
      } else if (error.response?.status === 401) {
        message = "Invalid email or password";
      } else if (!error.response) {
        message = "Cannot connect to server";
      }

      return rejectWithValue(message);
    }
  }
);

// ================= REGISTER =================
export const register = createAsyncThunk(
  "user/register",
  async (data, { rejectWithValue }) => {
    try {
      const res = await registerUser(data);
      return res.data;
    } catch (error) {
      let message = "Register failed";
      const data = error.response?.data;

      if (typeof data === "string" && data.trim()) {
        message = data;
      } else if (data?.message) {
        message = data.message;
      } else if (data?.error) {
        message = typeof data.error === "string" ? data.error : message;
      } else if (error.response?.status === 409) {
        message = "Email already exists";
      } else if (!error.response) {
        message = "Cannot connect to server";
      }

      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null, // 🔥 əlavə edildi
    loading: false,
    error: null,
  },

  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== LOGIN =====
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login error";
      })

      // ===== REGISTER =====
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user || action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register error";
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;