import React from "react";
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import OverviewCards from "../components/dashboard/OverviewCards";
import ChartsSection from "../components/dashboard/ChartsSection";
import RecentTransactions from "../components/dashboard/RecentTransactions";

export default function DashboardMock() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = React.useState(false);

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

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      {/* HEADER */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: "#1F2937" }}>
        <Toolbar sx={{ justifyContent: "space-between", px: 2 }}>
          {/* LOGO — transparent PNG */}
          <Box
            component="img"
            src="/logo.png.png"
            alt=""
            sx={{ height: 40, cursor: "pointer", objectFit: "contain" }}
            onClick={() => navigate("/dashboard")}
          />

          {/* DESKTOP */}
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
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
                  width: 160,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                  disableUnderline: true,
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

          {/* MOBILE */}
          {isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TextField
                size="small"
                placeholder="Search"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
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

      {/* CONTENT */}
      <Container maxWidth="xl" sx={{ pt: 12 }}>
        <Typography fontSize={40} fontWeight={700} mb={3}>
          Dashboard
        </Typography>

        <OverviewCards
          totalMonthlyBudget={1200}
          totalExpenses={826}
          savings={200}
          budgetsLoading={false}
          expensesLoading={false}
          currency="USD"
        />

        <Box sx={{ my: 4 }}>
          <ChartsSection
            expensesByCategory={[
              { name: "Food", value: 420 },
              { name: "Travel", value: 160 },
              { name: "Bills", value: 180 },
              { name: "Shopping", value: 66 },
            ]}
            monthlyData={[
              { month: "Jan", budget: 900, actual: 750 },
              { month: "Feb", budget: 1000, actual: 780 },
              { month: "Mar", budget: 1100, actual: 820 },
              { month: "Apr", budget: 1000, actual: 900 },
              { month: "May", budget: 1050, actual: 880 },
            ]}
            expensesLoading={false}
            budgetsLoading={false}
            currency="USD"
          />
        </Box>

        <RecentTransactions
          transactions={[
            { id: 1, date: "Jan 12", description: "Groceries", amount: 54 },
          ]}
          loading={false}
        />
      </Container>
    </Box>
  );
}
