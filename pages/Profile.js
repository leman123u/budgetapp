import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Chip,
} from "@mui/material";
import {
  Person,
  Edit,
  Save,
  Cancel,
  CheckCircle,
} from "@mui/icons-material";
import Sidebar from "../components/dashboard/Sidebar";
import AppHeaderBar from "../components/AppHeaderBar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const UI = {
  primary: "#1A3263",
  secondary: "#547792",
  accent: "#FAB95B",
  soft: "#E8E2DB",
};

const profileChartData = [
  { name: "Food", value: 420, color: UI.primary },
  { name: "Bills", value: 280, color: UI.secondary },
  { name: "Other", value: 200, color: UI.accent },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ username: "", email: "" });

  useEffect(() => {
    if (!user) navigate("/login");
    else setFormData({ username: user.name || "", email: user.email || "" });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f7f8fa" }}>
      <AppHeaderBar />

      {/* ===== PAGE BODY (toxunulmayıb) ===== */}
      <Box sx={{ display: "flex", pt: 12 }}>
        {/* Sidebar hidden on mobile */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar />
        </Box>

        <Box
          sx={{
            flex: 1,
            ml: { xs: 0, md: "260px" },
            p: { xs: 2, md: 4 },
            width: "100%",
          }}
        >
          <Typography fontSize={{ xs: 26, md: 32 }} fontWeight={700} mb={1}>
            Profile
          </Typography>
          <Typography color="text.secondary" mb={3}>
            Manage your account settings and information
          </Typography>

          <Grid container spacing={{ xs: 2, md: 4 }}>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ borderRadius: 3, border: `1px solid ${UI.soft}` }}>
                <Box
                  sx={{
                    p: { xs: 2.5, md: 4 },
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderBottom: `1px solid ${UI.soft}`,
                  }}
                >
                  <Avatar
                    sx={{
                      width: { xs: 56, md: 78 },
                      height: { xs: 56, md: 78 },
                      bgcolor: UI.primary,
                    }}
                  >
                    <Person />
                  </Avatar>

                  <Box>
                    <Typography fontSize={{ xs: 18, md: 24 }} fontWeight={700}>
                      {user.name || "User"}
                    </Typography>
                    <Typography color="text.secondary">
                      {user.email}
                    </Typography>

                    <Chip
                      icon={<CheckCircle />}
                      label="Active Account"
                      size="small"
                      sx={{
                        mt: 1,
                        bgcolor: "#E6F4EA",
                        color: "#1E7F43",
                        fontWeight: 600,
                      }}
                    />
                  </Box>
                </Box>

                <Box sx={{ p: { xs: 2.5, md: 4 } }}>
                  <Grid container spacing={2.5}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Username"
                        size="small"
                        disabled={!isEditing}
                        value={formData.username}
                        onChange={(e) =>
                          setFormData({ ...formData, username: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Email"
                        size="small"
                        disabled={!isEditing}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Box sx={{ display: "flex", gap: 1.5 }}>
                        {isEditing ? (
                          <>
                            <Button
                              variant="contained"
                              startIcon={<Save />}
                              sx={{ bgcolor: UI.primary }}
                              onClick={() => setIsEditing(false)}
                            >
                              Save
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<Cancel />}
                              onClick={() => setIsEditing(false)}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            startIcon={<Edit />}
                            sx={{ bgcolor: UI.primary }}
                            onClick={() => setIsEditing(true)}
                          >
                            Edit Profile
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} lg={4}>
              <Paper sx={{ borderRadius: 3, border: `1px solid ${UI.soft}`, p: 2.5 }}>
                <Typography fontWeight={600} mb={2}>
                  Account Details
                </Typography>

                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: `1px solid ${UI.soft}`,
                    bgcolor: "#fafafa",
                  }}
                >
                  <Typography fontSize={12} color="text.secondary">
                    Status
                  </Typography>
                  <Typography fontWeight={700} color="#1E7F43">
                    Active
                  </Typography>
                </Box>

                <Box sx={{ mt: 2, width: "100%" }}>
                  <Typography fontWeight={600} mb={1} fontSize={14}>
                    Spending overview
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={profileChartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={55}
                        outerRadius={85}
                      >
                        {profileChartData.map((d, i) => (
                          <Cell key={i} fill={d.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
