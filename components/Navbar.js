import React, { useState, useEffect } from "react";
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
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { Search, Notifications, Menu, Close } from "@mui/icons-material";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((s) => s.user);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) setOpen(false);
  }, [isMobile]);

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

          {/* Mobile: menu opens full navigation + account actions */}
          {isMobile && (
            <IconButton
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              sx={{ ml: "auto", p: 0.5 }}
            >
              <Menu />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile: full navigation drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "min(100vw - 48px, 320px)", sm: 300 },
            maxWidth: "100vw",
            pt: "env(safe-area-inset-top, 0px)",
            pb: "env(safe-area-inset-bottom, 0px)",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
            borderBottom: "1px solid #E5E7EB",
            flexShrink: 0,
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
            Menu
          </Typography>
          <IconButton
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            size="small"
            sx={{ color: "#6B7280" }}
          >
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, overflow: "auto", px: 1.5, py: 1 }}>
          <List disablePadding>
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <ListItemButton
                  key={link.path}
                  component={RouterLink}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  selected={active}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    py: 1.25,
                    "&.Mui-selected": {
                      bgcolor: "rgba(17, 24, 39, 0.06)",
                    },
                  }}
                >
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{
                      fontWeight: active ? 600 : 400,
                      fontSize: 15,
                      color: active ? "#111827" : "#6B7280",
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          {user && (
            <>
              <Divider sx={{ my: 2 }} />
              <Typography
                variant="caption"
                sx={{ px: 1, mb: 1, display: "block", color: "#9CA3AF", fontWeight: 600 }}
              >
                Quick actions
              </Typography>
              <TextField
                fullWidth
                placeholder="Search"
                size="small"
                sx={{ mb: 2, px: 0.5 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search fontSize="small" sx={{ color: "#9CA3AF" }} />
                    </InputAdornment>
                  ),
                }}
              />
              <List disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: 1,
                    py: 1.25,
                    color: "#374151",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: "#6B7280" }}>
                    <Notifications fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Notifications"
                    primaryTypographyProps={{ fontSize: 15 }}
                  />
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  sx={{
                    borderRadius: 1,
                    mt: 0.5,
                    py: 1.25,
                    color: "#B91C1C",
                  }}
                >
                  <ListItemText
                    primary="Log out"
                    primaryTypographyProps={{ fontWeight: 600, fontSize: 15 }}
                  />
                </ListItemButton>
              </List>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
