import React, { useState } from "react";
import {
  Box,
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

const navLinks = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Budgets", path: "/budgets" },
  { label: "Expenses", path: "/expenses" },
  { label: "Goals", path: "/goals" },
  { label: "Profile", path: "/profile" },
];

export default function AppHeaderBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "#1F2937",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: 2,
            gap: 1,
            flexWrap: "nowrap",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src="/logo.png.png"
            alt=""
            sx={{
              height: 40,
              maxWidth: { xs: 96, sm: 140 },
              width: "auto",
              objectFit: "contain",
              cursor: "pointer",
              flexShrink: 1,
              minWidth: 0,
            }}
            onClick={() => navigate("/dashboard")}
          />

          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexShrink: 0,
                minWidth: 0,
              }}
            >
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
                }}
              />

              <Button
                type="button"
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                flexShrink: 0,
                position: "relative",
                zIndex: 2,
                ml: "auto",
                pl: 0.5,
              }}
            >
              <TextField
                size="small"
                placeholder="Search"
                sx={{
                  bgcolor: "#fff",
                  borderRadius: "8px",
                  width: { xs: "min(100px, 28vw)", sm: 120 },
                  minWidth: 0,
                  flex: "1 1 auto",
                  maxWidth: 140,
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
                type="button"
                onClick={handleLogout}
                sx={{
                  bgcolor: "#374151",
                  color: "#fff",
                  px: 1.5,
                  borderRadius: "8px",
                  fontSize: 12,
                  textTransform: "none",
                  flexShrink: 0,
                }}
              >
                Logout
              </Button>

              <IconButton
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-haspopup="true"
                onClick={handleMenuToggle}
                sx={{
                  color: "#fff",
                  flexShrink: 0,
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
      >
        <Box
          sx={{ width: 240, p: 2 }}
          role="navigation"
          aria-label="Main navigation"
        >
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
    </>
  );
}
