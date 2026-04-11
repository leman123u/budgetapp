import React, { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Search, Notifications, Menu } from "@mui/icons-material";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s) => s.user);
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

  return (
    <>
      <AppBar
        position="sticky"
        elevation={1}
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #E5E7EB",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 1.5, md: 2 },
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          {/* Logo */}
          <Typography
            component={RouterLink}
            to="/dashboard"
            sx={{
              fontWeight: 700,
              color: "#111827",
              textDecoration: "none",
              fontSize: { xs: 14, md: 18 },
              whiteSpace: "nowrap",
            }}
          >
            MyBudget
          </Typography>

          {/* Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: 3 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  sx={{
                    textTransform: "none",
                    fontSize: 14,
                    color:
                      location.pathname === link.path
                        ? "#111827"
                        : "#6B7280",
                    fontWeight:
                      location.pathname === link.path ? 600 : 400,
                  }}
                >
                  {link.label}
                </Button>
              ))}

              {user && (
                <>
                  <TextField
                    placeholder="Search"
                    size="small"
                    sx={{ width: 150 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search fontSize="small" />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <IconButton size="small">
                    <Notifications fontSize="small" />
                  </IconButton>
                  <Button onClick={handleLogout}>Logout</Button>
                </>
              )}
            </Box>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton
              onClick={() => setOpen(true)}
              sx={{ ml: "auto", p: 0.5 }}
            >
              <Menu />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 240, p: 2 }}>
          <List>
            {navLinks.map((link) => (
              <ListItem
                key={link.path}
                component={RouterLink}
                to={link.path}
                onClick={() => setOpen(false)}
                sx={{
                  color:
                    location.pathname === link.path
                      ? "#111827"
                      : "#6B7280",
                }}
              >
                <ListItemText primary={link.label} />
              </ListItem>
            ))}

            {user && (
              <ListItem onClick={handleLogout} sx={{ mt: 1 }}>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
