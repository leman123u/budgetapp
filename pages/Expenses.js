import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// ICONS
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import InsightsOutlinedIcon from "@mui/icons-material/InsightsOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", path: "/dashboard-live", icon: <DashboardOutlinedIcon /> },
    { label: "Budgets", path: "/budgets", icon: <AccountBalanceWalletOutlinedIcon /> },
    { label: "Expenses", path: "/expenses", icon: <ReceiptLongOutlinedIcon /> },
    { label: "AI Assistant", path: "/ai", icon: <SmartToyOutlinedIcon /> },
    { label: "Goals", path: "/goals", icon: <FlagOutlinedIcon /> },
    { label: "Insights", path: "/insights", icon: <InsightsOutlinedIcon /> },
    { label: "Premium", path: "/premium", icon: <WorkspacePremiumOutlinedIcon /> },
    { label: "Help", path: "/help", icon: <InfoOutlinedIcon /> },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/dashboard-live") {
      return (
        location.pathname === "/dashboard-live" ||
        location.pathname === "/dashboard"
      );
    }
    return location.pathname === path;
  };

  const sidebarContent = (
    <Box
      sx={{
        width: { xs: 240, sm: 260 },
        height: "100vh",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box sx={{ p: { xs: 2, md: 3 }, borderBottom: "1px solid #E5E7EB" }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: 18, md: 20 } }}>
          Personal Budget
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#6B7280" }}>
          Smart Financial Management
        </Typography>
      </Box>

      {/* MENU */}
      <List sx={{ flex: 1, pt: { xs: 2, md: 3 }, px: { xs: 1.5, md: 2 } }}>
        {menuItems.map((item) => {
          const active = isActive(item.path);

          return (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setOpen(false);
                }}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  py: { xs: 1, md: 1.2 },
                  color: active ? "#111827" : "#374151",
                  backgroundColor: active ? "#F3F4F6" : "transparent",
                  "&:hover": { backgroundColor: "#F3F4F6" },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    color: active ? "#111827" : "#6B7280",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active ? 600 : 500,
                    fontSize: { xs: 13, md: 14 },
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* FOOTER */}
      <Box sx={{ p: { xs: 1.5, md: 2 } }}>
        <ListItemButton onClick={() => navigate("/profile")}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <PersonOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/settings")}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton onClick={handleLogout}>
          <ListItemIcon sx={{ minWidth: 32 }}>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return isMobile ? (
    <>
      {/* 📱 MENU BUTTON */}
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          top: 12,
          left: 12,
          zIndex: 1400,
          bgcolor: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          "&:hover": { bgcolor: "#f3f4f6" },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* 📱 DRAWER */}
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: { xs: 240, sm: 260 } },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  ) : (
    <Box
      sx={{
        width: 260,
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        borderRight: "1px solid #E5E7EB",
      }}
    >
      {sidebarContent}
    </Box>
  );
};

export default Sidebar;
