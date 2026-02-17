import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:8080/api/v1/app_users/forgot-password",
        { email }
      );

      setSent(true);
    } catch (err) {
      console.log("ERROR:", err.response);
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ p: 3, width: 360 }}>
        <Typography fontWeight={600} mb={2}>
          Forgot password
        </Typography>

        {sent ? (
          <Alert severity="success">
            If this email exists, a reset link was sent.
          </Alert>
        ) : (
          <form onSubmit={submit}>
            <TextField
              fullWidth
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        )}

        <Typography mt={2} fontSize={13}>
          <Link to="/login">Back to login</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
