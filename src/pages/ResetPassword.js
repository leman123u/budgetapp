import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";

export default function ResetPassword() {

  const [params] = useSearchParams();
  const navigate = useNavigate();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    setError("");
    setMessage("");

    if (!token) {
      setError("Invalid reset link");
      return;
    }

    if (!password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://127.0.0.1:8080/reset-password", {
        token,
        password
      });

      setMessage("Password successfully reset!");

      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {

      if (err.response?.data)
        setError(err.response.data);
      else
        setError("Invalid or expired token");

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f4f6f8"
    }}>
      <Paper elevation={4} sx={{ padding: 4, width: 350, borderRadius: 4 }}>

        <Typography variant="h5" mb={2} textAlign="center">
          Reset Password
        </Typography>

        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
        />

        {error && (
          <Typography color="error" mt={1}>
            {error}
          </Typography>
        )}

        {message && (
          <Typography color="success.main" mt={1}>
            {message}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Processing..." : "Reset Password"}
        </Button>

      </Paper>
    </Box>
  );
}
