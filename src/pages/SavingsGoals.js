import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  IconButton,
  LinearProgress,
  Chip,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
} from "@mui/material";

import { Edit, Delete, Add } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

import Sidebar from "../components/dashboard/Sidebar";

const UI = {
  primary: "#1A3263",
  secondary: "#547792",
  accent: "#FAB95B",
  soft: "#E8E2DB",
};

const goals = [
  { id: 1, name: "Save for Vacation", current: 500, target: 1000, unit: "M", deadline: "01/06/2024", status: "In Progress" },
  { id: 2, name: "Buy a New Laptop", current: 1800, target: 2000, unit: "M", deadline: "01/05/2024", status: "Completed" },
  { id: 3, name: "Exercise Regularly", current: 3, target: 10, unit: "sessions", deadline: "01/07/2024", status: "In Progress" },
  { id: 4, name: "Read 12 Books", current: 10, target: 12, unit: "books", deadline: "01/12/2024", status: "Completed" },
];

export default function Goals() {
  const [status, setStatus] = useState("All");
  const [open, setOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Budgets", path: "/budgets" },
    { label: "Expenses", path: "/expenses" },
    { label: "Goals", path: "/goals" },
    { label: "Profile", path: "/profile" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filtered = useMemo(() => {
    if (status === "All") return goals;
    return goals.filter((g) => g.status === status);
  }, [status]);

  const progress = (g) => Math.min((g.current / g.target) * 100, 100);
  const completed = goals.filter((g) => g.status === "Completed").length;

  return (
    <>
      {/* ===== HEADER ===== */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: "#1F2937" }}>
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>

          {/* LOGO */}
          <Box
            component="img"
            src="/logo.png.png"
            sx={{ height: 40, cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          />

          {/* DESKTOP */}
          {!isMobile && (
            <Box display="flex" alignItems="center" gap={2}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    color: "#fff",
                    textTransform: "none",
                    fontWeight:
                      location.pathname === link.path ? 700 : 400,
                  }}
                >
                  {link.label}
                </Button>
              ))}

              <TextField
                size="small"
                placeholder="Search"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  width: 160,
                  "& fieldset": { border: "none" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                onClick={handleLogout}
                sx={{
                  bgcolor: "#374151",
                  color: "#fff",
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Logout
              </Button>
            </Box>
          )}

          {/* MOBILE */}
          {isMobile && (
            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                size="small"
                placeholder="Search"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: 2,
                  width: 120,
                  "& fieldset": { border: "none" },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                onClick={handleLogout}
                sx={{
                  bgcolor: "#374151",
                  color: "#fff",
                  px: 1.5,
                  borderRadius: 2,
                  fontSize: 12,
                  textTransform: "none",
                }}
              >
                Logout
              </Button>

              <IconButton onClick={() => setOpen(true)} sx={{ color: "#fff" }}>
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240, p: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                component={RouterLink}
                to={link.path}
                onClick={() => setOpen(false)}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* ===== GOALS CONTENT ===== */}
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#fafafa", pt: 10 }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar />
        </Box>

        <Box sx={{ flex: 1, ml: { xs: 0, md: "260px" }, p: { xs: 2, md: 4 } }}>
          <Box display="flex" justifyContent="space-between" mb={3} flexWrap="wrap" gap={2}>
            <Box>
              <Typography fontSize={32} fontWeight={700} color={UI.primary}>
                Goals
              </Typography>
              <Typography color="text.secondary">
                Track your savings and personal goals
              </Typography>
            </Box>

            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                bgcolor: UI.primary,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Add Goal
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              gap: 3,
            }}
          >
            {/* TABLE */}
            <Paper sx={{ p: 2.5, borderRadius: 3 }}>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      {["Goal", "Progress", "Deadline", "Status", "Actions"].map((h) => (
                        <TableCell key={h} sx={{ fontWeight: 600 }}>
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filtered.map((g) => {
                      const p = progress(g);

                      return (
                        <TableRow key={g.id} hover>
                          <TableCell>{g.name}</TableCell>

                          <TableCell>
                            <Typography fontSize={12}>
                              {g.current} / {g.target} {g.unit}
                            </Typography>

                            <LinearProgress
                              value={p}
                              variant="determinate"
                              sx={{
                                mt: 0.5,
                                height: 6,
                                borderRadius: 6,
                                bgcolor: UI.soft,
                                "& .MuiLinearProgress-bar": {
                                  bgcolor:
                                    g.status === "Completed"
                                      ? UI.primary
                                      : UI.secondary,
                                },
                              }}
                            />

                            <Typography fontSize={11} color="text.secondary">
                              {p.toFixed(1)}%
                            </Typography>
                          </TableCell>

                          <TableCell>{g.deadline}</TableCell>

                          <TableCell>
                            <Chip
                              size="small"
                              label={g.status}
                              sx={{
                                bgcolor:
                                  g.status === "Completed" ? UI.soft : "#DBEAFE",
                                color:
                                  g.status === "Completed"
                                    ? UI.primary
                                    : UI.secondary,
                                fontWeight: 600,
                              }}
                            />
                          </TableCell>

                          <TableCell>
                            <IconButton size="small">
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton size="small" color="error">
                              <Delete fontSize="small" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            {/* SUMMARY */}
            <Paper sx={{ p: 2.5, borderRadius: 3 }}>
              <Typography fontSize={12}>TOTAL GOALS</Typography>
              <Typography fontSize={28} fontWeight={700}>
                {goals.length}
              </Typography>

              <Typography mt={2} fontSize={12}>
                COMPLETED
              </Typography>

              <Typography fontSize={28} fontWeight={700} color={UI.primary}>
                {completed}
              </Typography>

              <Typography fontSize={12}>
                {Math.round((completed / goals.length) * 100)}% completed
              </Typography>

              <Typography mt={3} fontWeight={600}>
                Filter by Status
              </Typography>

              <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </Select>
              </FormControl>

              <Box mt={2} display="flex" flexDirection="column" gap={1.5}>
                <TextField size="small" placeholder="From" />
                <TextField size="small" placeholder="To" />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );
}
