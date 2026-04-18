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
      {/* TOP MENU */}
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
                sx={{ bgcolor: "#fff", borderRadius: "8px", width: { xs: 80, sm: 120 } }}
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

      <Box sx={{ display: "flex", pt: { xs: 8, md: 10 } }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar />
        </Box>

        <Box
          sx={{
            flex: 1,
            ml: { xs: 0, md: "260px" },
            p: { xs: 1.5, md: 4 },
          }}
        >
          <Typography fontSize={{ xs: 24, md: 32 }} mb={3} color={UI.primary} fontWeight={700}>
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
              <Paper key={i} sx={{ p: { xs: 1.5, md: 2.5 }, borderRadius: 2 }}>
                <Typography color="text.secondary">{item.label}</Typography>
                <Typography fontSize={22} fontWeight={700} color={item.color}>
                  {money(item.value)}
                </Typography>
              </Paper>
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              gap: { xs: 2, md: 3 },
            }}
          >
            <Paper sx={{ p: { xs: 1.5, md: 2.5 }, overflowX: "auto" }}>
              <Table>
                <TableBody>
                  {budgetData.map((b) => {
                    const percent = b.budgeted
                      ? Math.min((b.spent / b.budgeted) * 100, 100)
                      : 0;

                    return (
                      <TableRow key={b.id}>
                        <TableCell>{b.category}</TableCell>
                        <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                          {money(b.budgeted)}
                        </TableCell>
                        <TableCell>{money(b.spent)}</TableCell>
                        <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
                          <LinearProgress value={percent} variant="determinate" />
                        </TableCell>
                        <TableCell>{money(b.remaining)}</TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
                            <Button size="small">View</Button>
                            <Button size="small">Edit</Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>

            {/* CHART */}
            <Paper sx={{ p: { xs: 1.5, md: 2.5 } }}>
              <Box sx={{ width: "100%", height: { xs: 260, md: 240 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      innerRadius={isMobile ? 45 : 55}
                      outerRadius={isMobile ? 70 : 85}
                    >
                      {chartData.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => money(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
