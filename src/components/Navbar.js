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
  const isMobile = useMediaQuery("(max-width:768px)", { noSsr: true });
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleMenuToggle = (e) => {
    e?.stopPropagation?.();
    setOpen((v) => !v);
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
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            px: { xs: 1.5, md: 2 },
            display: "flex",
            alignItems: "center",
            width: "100%",
            flexWrap: "nowrap",
            overflow: "hidden",
            gap: 1,
          }}
        >
          <Typography
            component={RouterLink}
            to="/dashboard"
            sx={{
              fontWeight: 700,
              color: "#111827",
              textDecoration: "none",
              fontSize: { xs: 14, md: 18 },
              whiteSpace: "nowrap",
              flexShrink: 1,
              minWidth: 0,
            }}
          >
            MyBudget
          </Typography>

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
                  <Button type="button" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </Box>
          )}

          {isMobile && (
            <IconButton
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={handleMenuToggle}
              sx={{
                ml: "auto",
                p: 0.5,
                flexShrink: 0,
                position: "relative",
                zIndex: 2,
                touchAction: "manipulation",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <Menu />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
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
