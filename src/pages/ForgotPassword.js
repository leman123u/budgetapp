import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/userService";

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
      await forgotPassword(email);
      setSent(true);
    } catch (err) {
      const data = err?.response?.data;
      const msg =
        (typeof data === "string" && data) ||
        data?.message ||
        data?.error ||
        err?.message ||
        "Something went wrong";
      setError(msg);
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