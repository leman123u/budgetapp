import React, { useState, useEffect } from "react";
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
import { Person, Email, Lock } from "@mui/icons-material";
import { register, clearError } from "../redux/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Əgər user artıq varsa → dashboard
  useEffect(() => {
    if (user && user.id) {
      navigate("/");
    }
  }, [user, navigate]);

  // Error auto-clear
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    // ✅ BACKEND-Ə UYĞUN DATA
    const registrationData = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    const result = await dispatch(register(registrationData));

    if (register.fulfilled.match(result)) {
      alert("Registration successful!");
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#E8F4FD",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Paper sx={{ width: "100%", maxWidth: 420, p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Register
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) =>
              setForm({ ...form, firstName: e.target.value })
            }
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) =>
              setForm({ ...form, lastName: e.target.value })
            }
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Typography sx={{ color: "red", mb: 2, fontSize: 14 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.4,
              mb: 2,
              bgcolor: "#52c41a",
              color: "white",
              "&:hover": { bgcolor: "#389e0d" },
            }}
          >
            {loading ? "Registering..." : "REGISTER"}
          </Button>

          <Typography sx={{ textAlign: "center", fontSize: 14 }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#4A90E2" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
