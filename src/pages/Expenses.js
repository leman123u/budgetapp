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
  AppBar,
  Toolbar,
  InputAdornment,
  Drawer,
  List,
  ListItem,
  ListItemText,
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

const mockExpenses = [
  { id: 1, date: "15/04/2024", category: "Food", description: "Dinner at Restaurant", amount: 60 },
  { id: 2, date: "12/04/2024", category: "Transport", description: "Taxi Ride", amount: -12 },
  { id: 3, date: "09/04/2024", category: "Shopping", description: "New Shoes", amount: -80 },
  { id: 4, date: "08/04/2024", category: "Entertainment", description: "Cinema Tickets", amount: -25 },
  { id: 5, date: "05/04/2024", category: "Groceries", description: "Supermarket", amount: -45 },
];

export default function Expenses() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

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

  const filteredExpenses = useMemo(() => {
    if (selectedCategory === "All Categories") return mockExpenses;
    return mockExpenses.filter((e) => e.category === selectedCategory);
  }, [selectedCategory]);

  const monthlyTotal = useMemo(
    () => filteredExpenses.reduce((s, e) => s + e.amount, 0),
    [filteredExpenses]
  );

  const money = (v) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(v);

  const categories = [
    "All Categories",
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Groceries",
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fafafa" }}>
      {/* ===== TOP MENU (əlavə edildi) ===== */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: "#1F2937" }}>
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
          <Box
            component="img"
            src="/logo.png.png"
            alt=""
            sx={{ height: 40, cursor: "pointer", objectFit: "contain" }}
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

      {/* ===== PAGE BODY (toxunulmayıb) ===== */}
      <Box sx={{ display: "flex", pt: 12 }}>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <Sidebar />
        </Box>

        <Box sx={{ flex: 1, ml: { xs: 0, md: "260px" }, p: { xs: 2, md: 4 } }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mb: 3 }}>
            <Typography fontSize={{ xs: 24, md: 32 }} fontWeight={700} color={UI.primary}>
              Expenses
            </Typography>

            <Typography color="text.secondary">
              Track and manage your expenses
            </Typography>

            <Button
              variant="contained"
              startIcon={<Add />}
              sx={{
                bgcolor: UI.primary,
                borderRadius: 2,
                textTransform: "none",
                width: "100%",
              }}
            >
              Add Expense
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
              gap: 3,
            }}
          >
            <Paper sx={{ borderRadius: 3, border: `1px solid ${UI.soft}` }}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: UI.soft }}>
                      {["Date", "Category", "Description", "Amount", "Actions"].map((h) => (
                        <TableCell key={h} sx={{ fontWeight: 600 }}>
                          {h}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredExpenses.map((e) => (
                      <TableRow key={e.id} hover>
                        <TableCell>{e.date}</TableCell>
                        <TableCell>{e.category}</TableCell>
                        <TableCell>{e.description}</TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 600,
                            color: e.amount >= 0 ? UI.secondary : UI.accent,
                          }}
                        >
                          {money(e.amount)}
                        </TableCell>
                        <TableCell>
                          <Button size="small" startIcon={<Edit />}>
                            Edit
                          </Button>
                          <IconButton sx={{ color: UI.accent }}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            <Paper sx={{ borderRadius: 3, border: `1px solid ${UI.soft}`, p: 2.5 }}>
              <Typography fontWeight={600} mb={2}>
                Summary
              </Typography>

              <Paper sx={{ p: 2.5, mb: 2, borderRadius: 2, border: `1px solid ${UI.soft}` }}>
                <Typography fontSize={12} color="text.secondary">
                  Monthly Total
                </Typography>
                <Typography
                  fontSize={26}
                  fontWeight={700}
                  color={monthlyTotal >= 0 ? UI.secondary : UI.accent}
                >
                  {money(monthlyTotal)}
                </Typography>
              </Paper>

              <FormControl fullWidth size="small">
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <TextField size="small" placeholder="From date" />
                <TextField size="small" placeholder="To date" />
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
