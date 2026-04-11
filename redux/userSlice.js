import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../services/userService";

const USER_STORAGE_KEY = "user";

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Map common API shapes to { token, user } */
function normalizeAuthResponse(data) {
  if (!data) return data;
  const token =
    data.token ?? data.accessToken ?? data.access_token ?? data.jwt;
  let user = data.user ?? null;
  if (!user && data.id != null) {
    user = data;
  }
  if (user && user.id == null && user._id != null) {
    user = { ...user, id: user._id };
  }
  return { token, user };
}

// ================= LOGIN =================
export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await loginUser(data);
      return normalizeAuthResponse(res.data);
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
    user: readStoredUser(),
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },

  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem(USER_STORAGE_KEY);
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

        state.user = action.payload.user ?? null;
        state.token = action.payload.token ?? null;

        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        } else {
          localStorage.removeItem("token");
        }
        if (action.payload.user) {
          localStorage.setItem(
            USER_STORAGE_KEY,
            JSON.stringify(action.payload.user)
          );
        } else {
          localStorage.removeItem(USER_STORAGE_KEY);
        }
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
        const u = action.payload.user || action.payload;
        state.user = u;
        if (u && typeof u === "object") {
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(u));
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Register error";
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;