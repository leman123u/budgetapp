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
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined"; // ✅ PREMIUM ICON

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

  // ===== MAIN MENU =====
  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard-live",
      icon: <DashboardOutlinedIcon />,
    },
    {
      label: "Budgets",
      path: "/budgets",
      icon: <AccountBalanceWalletOutlinedIcon />,
    },
    {
      label: "Expenses",
      path: "/expenses",
      icon: <ReceiptLongOutlinedIcon />,
    },
    {
      label: "Goals",
      path: "/goals",
      icon: <FlagOutlinedIcon />,
    },
    {
      label: "Insights",
      path: "/insights",
      icon: <InsightsOutlinedIcon />,
    },
    {
      label: "Premium", // ✅ ƏLAVƏ EDİLDİ
      path: "/premium",
      icon: <WorkspacePremiumOutlinedIcon />,
    },
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
        width: 260,
        height: "100vh",
        bgcolor: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <Box sx={{ p: 3, borderBottom: "1px solid #E5E7EB" }}>
        <Typography sx={{ fontWeight: 800, fontSize: 20, color: "#111827" }}>
          Personal Budget
        </Typography>
        <Typography sx={{ fontSize: 12, color: "#6B7280" }}>
          Smart Financial Management
        </Typography>
      </Box>

      {/* ===== TOP MENU ===== */}
      <List sx={{ flex: 1, pt: 3, px: 2 }}>
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
                  color: active ? "#111827" : "#374151",
                  backgroundColor: active ? "#F3F4F6" : "transparent",
                  "&:hover": {
                    backgroundColor: "#F3F4F6",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: active ? "#111827" : "#6B7280",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: active ? 600 : 500,
                    fontSize: 14,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />

      {/* ===== BOTTOM MENU ===== */}
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={() => {
            navigate("/profile");
            if (isMobile) setOpen(false);
          }}
          sx={{ color: "#374151" }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "#6B7280" }}>
            <PersonOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItemButton>

        <ListItemButton
          onClick={() => {
            navigate("/settings");
            if (isMobile) setOpen(false);
          }}
          sx={{ color: "#374151" }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "#6B7280" }}>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>

        <ListItemButton onClick={handleLogout} sx={{ color: "#374151" }}>
          <ListItemIcon sx={{ minWidth: 36, color: "#6B7280" }}>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: "fixed", top: 15, left: 15, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
      )}

      {isMobile ? (
        <Drawer open={open} onClose={() => setOpen(false)}>
          {sidebarContent}
        </Drawer>
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
      )}
    </>
  );
};

export default Sidebar;
