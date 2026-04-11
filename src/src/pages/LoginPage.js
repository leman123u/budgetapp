import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { login, clearError } from "../redux/userSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (user?.id) navigate("/");
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => dispatch(clearError()), 4000);
      return () => clearTimeout(t);
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login(form));
    if (login.fulfilled?.match?.(result)) {
      result.payload?.token &&
        localStorage.setItem("token", result.payload.token);
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        bgcolor: "primary.lighter",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 2.5, md: 4 },
          borderRadius: 2,
          boxShadow: "0 4px 10px rgba(0,0,0,.08)",
        }}
      >
        <Typography fontSize={{ xs: 22, md: 24 }} fontWeight={600} mb={3}>
          Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="Email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
              error && dispatch(clearError());
            }}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
              error && dispatch(clearError());
            }}
            sx={{ mb: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ fontSize: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          {/* 🔴 ONLY ADDITION: FORGOT PASSWORD */}
          <Typography
            fontSize={13}
            textAlign="right"
            sx={{ mb: 2, cursor: "pointer" }}
          >
            <Link
              to="/forgot-password"
              style={{ color: "#4A90E2", textDecoration: "none" }}
            >
              Forgot password?
            </Link>
          </Typography>
          {/* 🔴 END */}

          {error && (
            <Box
              sx={{
                mb: 2,
                p: 1.2,
                bgcolor: "error.light",
                borderRadius: 1.5,
              }}
            >
              <Typography
                fontSize={13}
                color="error.main"
                textAlign="center"
              >
                {error}
              </Typography>
            </Box>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.3,
              mb: 2.5,
              bgcolor: "#52c41a",
              color: "#fff",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": { bgcolor: "#389e0d" },
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Typography fontSize={13} textAlign="center" color="text.secondary">
            Don’t have an account?{" "}
            <Link
              to="/register"
              style={{ color: "#4A90E2", textDecoration: "none" }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}
