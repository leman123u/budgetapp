import React, { useMemo, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  LinearProgress,
  AppBar,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Sidebar from "../components/dashboard/Sidebar";

const UI = {
  primary: "#1A3263",
  secondary: "#547792",
  accent: "#FAB95B",
  soft: "#E8E2DB",
};

const budgetData = [
  { id: 1, category: "Food", budgeted: 1200, spent: 900, remaining: 300 },
  { id: 2, category: "Bills", budgeted: 1500, spent: 1500, remaining: 0 },
  { id: 3, category: "Entertainment", budgeted: 800, spent: 200, remaining: 600 },
  { id: 4, category: "Travel", budgeted: 900, spent: 600, remaining: 300 },
];

export default function Budgets() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Budgets", path: "/budgets" },
    { label: "Expenses", path: "/expenses" },
    { label: "Goals", path: "/goals" },
    { label: "Profile", path: "/profile" },
  ];

  const totals = useMemo(
    () =>
      budgetData.reduce(
        (a, b) => ({
          budgeted: a.budgeted + b.budgeted,
          spent: a.spent + b.spent,
          remaining: a.remaining + b.remaining,
        }),
        { budgeted: 0, spent: 0, remaining: 0 }
      ),
    []
  );

  const chartData = [
    { name: "Budget", value: totals.budgeted, color: UI.primary },
    { name: "Spent", value: totals.spent, color: UI.secondary },
    { name: "Remaining", value: totals.remaining, color: UI.accent },
  ];

  const money = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
      {/* ===== TOP MENU ===== */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: "#1F2937" }}>
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
          <Box
            component="img"
            src="/logo.png.png"
            alt=""
            sx={{ height: 40, cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          />

          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
                sx={{ bgcolor: "#fff", borderRadius: "8px", width: 160 }}
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
                  borderRadius: "8px",
                  textTransform: "none",
                }}
              >
                Logout
              </Button>
            </Box>
          )}

          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                size="small"
                placeholder="Search"
                sx={{ bgcolor: "#fff", borderRadius: "8px", width: 120 }}
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
                  borderRadius: "8px",
                  fontSize: 12,
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

      {/* MOBILE MENU */}
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

      {/* ===== PAGE BODY (unchanged) ===== */}
      <Box sx={{ display: "flex", pt: 12 }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar />
        </Box>

        <Box sx={{ flex: 1, ml: { xs: 0, md: "260px" }, p: { xs: 2, md: 4 } }}>
          <Typography fontSize={{ xs: 26, md: 32 }} mb={3} color={UI.primary} fontWeight={700}>
            Budgets
          </Typography>

          {/* SUMMARY */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3,1fr)" },
              gap: 2,
              mb: 3,
            }}
          >
            {[
              { label: "Budgeted", value: totals.budgeted, color: UI.primary },
              { label: "Spent", value: totals.spent, color: UI.secondary },
              { label: "Remaining", value: totals.remaining, color: UI.accent },
            ].map((item, i) => (
              <Paper key={i} sx={{ p: 2.5, borderRadius: 2, border: `1px solid ${UI.soft}` }}>
                <Typography color="text.secondary">{item.label}</Typography>
                <Typography fontSize={24} fontWeight={700} color={item.color}>
                  {money(item.value)}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              gap: 3,
            }}
          >
            <Paper sx={{ p: 2.5, borderRadius: 2, border: `1px solid ${UI.soft}` }}>
              <Table>
                <TableBody>
                  {budgetData.map((b) => {
                    const percent = (b.spent / b.budgeted) * 100;
                    const over = b.spent > b.budgeted;

                    return (
                      <TableRow key={b.id}>
                        <TableCell>{b.category}</TableCell>
                        <TableCell>{money(b.budgeted)}</TableCell>
                        <TableCell sx={{ color: UI.secondary }}>
                          {money(b.spent)}
                        </TableCell>
                        <TableCell width={140}>
                          <LinearProgress
                            value={percent}
                            variant="determinate"
                            sx={{
                              height: 8,
                              borderRadius: 6,
                              bgcolor: UI.soft,
                              "& .MuiLinearProgress-bar": {
                                bgcolor: over
                                  ? "#c62828"
                                  : percent >= 80
                                  ? UI.accent
                                  : UI.secondary,
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell sx={{ color: UI.accent }}>
                          {money(b.remaining)}
                        </TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<Visibility />}>
                            View
                          </Button>
                          <Button size="small" startIcon={<Edit />}>
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>

            <Paper
              sx={{
                p: 2.5,
                borderRadius: 2,
                border: `1px solid ${UI.soft}`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" innerRadius={55} outerRadius={85}>
                    {chartData.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => money(v)} />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
