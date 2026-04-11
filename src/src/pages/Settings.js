import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Avatar,
  useMediaQuery,
  Switch,
  Stack,
  Select,
  MenuItem,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import Sidebar from "../components/dashboard/Sidebar";
import { setLanguage } from "../i18n";
import { TextField, Button } from "@mui/material";


import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LANGUAGES = [
  { code: "en", label: "English", sub: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
  { code: "en-us", label: "English", sub: "United States", flag: "https://flagcdn.com/w40/us.png" },
  { code: "de", label: "German", sub: "Deutschland", flag: "https://flagcdn.com/w40/de.png" },
  { code: "fr", label: "French", sub: "France", flag: "https://flagcdn.com/w40/fr.png" },
  { code: "es", label: "Spanish", sub: "España", flag: "https://flagcdn.com/w40/es.png" },
  { code: "it", label: "Italian", sub: "Italia", flag: "https://flagcdn.com/w40/it.png" },
  { code: "pt", label: "Portuguese", sub: "Portugal", flag: "https://flagcdn.com/w40/pt.png" },
  { code: "nl", label: "Dutch", sub: "Netherlands", flag: "https://flagcdn.com/w40/nl.png" },
  { code: "pl", label: "Polish", sub: "Polska", flag: "https://flagcdn.com/w40/pl.png" },
  { code: "ru", label: "Russian", sub: "Россия", flag: "https://flagcdn.com/w40/ru.png" },
  { code: "az", label: "Azerbaijani", sub: "Azərbaycan", flag: "https://flagcdn.com/w40/az.png" },
  { code: "tr", label: "Turkish", sub: "Türkiye", flag: "https://flagcdn.com/w40/tr.png" },
  { code: "ar", label: "Arabic", sub: "العربية", flag: "https://flagcdn.com/w40/sa.png" },
  { code: "hi", label: "Hindi", sub: "भारत", flag: "https://flagcdn.com/w40/in.png" },
  { code: "zh", label: "Chinese", sub: "中国", flag: "https://flagcdn.com/w40/cn.png" },
  { code: "ja", label: "Japanese", sub: "日本", flag: "https://flagcdn.com/w40/jp.png" },
  { code: "ko", label: "Korean", sub: "대한민국", flag: "https://flagcdn.com/w40/kr.png" },
];

export default function Settings() {
  const [languageOpen, setLanguageOpen] = useState(false);
  
  const [currentLang, setCurrentLang] = useState("en");
  const [currency, setCurrency] = useState("USD");
  const [aboutOpen, setAboutOpen] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [expenseAlerts, setExpenseAlerts] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [monthlySummary, setMonthlySummary] = useState(true);
  const [email, setEmail] = useState("");
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

const handleSupportSubmit = async () => {
  try {
    setLoading(true);

    const response = await fetch(  "https://backendrender-3-ehrl.onrender.com/api/app_users/support",
 {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, message }),
    });

    if (!response.ok) throw new Error();

    alert("Message sent successfully!");
    setEmail("");
    setMessage("");
  } catch (error) {
    alert("Error sending message");
  } finally {
    setLoading(false);
  }
};
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const saved = localStorage.getItem("app_language");
    if (saved) {
      setCurrentLang(saved);
      setLanguage(saved);
    }

    const savedCurrency = localStorage.getItem("app_currency");
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  useEffect(() => {
    const n = localStorage.getItem("app_notifications");
    const e = localStorage.getItem("expense_alerts");
    const b = localStorage.getItem("budget_alerts");
    const m = localStorage.getItem("monthly_summary");

    if (n !== null) setNotifications(n === "true");
    if (e !== null) setExpenseAlerts(e === "true");
    if (b !== null) setBudgetAlerts(b === "true");
    if (m !== null) setMonthlySummary(m === "true");
  }, []);

  const handleSelect = (lang) => {
    setCurrentLang(lang.code);
    setLanguage(lang.code);
    localStorage.setItem("app_language", lang.code);
    setLanguageOpen(false);
  };

  const selected = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f7f8fa" }}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Box>

      <Box sx={{ flex: 1, ml: { xs: 0, md: "260px" }, p: { xs: 2, md: 4 } }}>
        <Typography fontSize={{ xs: 24, md: 32 }} fontWeight={700} mb={1}>
          Settings
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Manage your application preferences
        </Typography>

        {/* LANGUAGE */}
        <Paper
          onClick={() => setLanguageOpen(true)}
          sx={{
            p: 3,
            borderRadius: 3,
            border: "1px solid #E8E2DB",
            maxWidth: 600,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography fontWeight={600}>Language</Typography>
            <Typography color="text.secondary" fontSize={14}>
              {selected.sub}
            </Typography>
          </Box>
          <Avatar src={selected.flag} sx={{ width: 28, height: 28 }} />
        </Paper>

        {/* CURRENCY */}
        <Paper
          sx={{
            p: 3,
            mt: 2,
            borderRadius: 3,
            border: "1px solid #E8E2DB",
            maxWidth: 600,
          }}
        >
          <Typography fontWeight={600} mb={1}>
            Currency
          </Typography>
          <Select
            fullWidth
            value={currency}
            onChange={(e) => {
              setCurrency(e.target.value);
              localStorage.setItem("app_currency", e.target.value);
            }}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="EUR">EUR</MenuItem>
          </Select>
        </Paper>

        {/* NOTIFICATIONS */}
        <Paper
          sx={{
            p: 3,
            mt: 2,
            borderRadius: 3,
            border: "1px solid #E8E2DB",
            maxWidth: 600,
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography fontWeight={600}>Show notifications</Typography>
              <Typography color="text.secondary" fontSize={14}>
                Alerts about expenses, budgets and summaries
              </Typography>
            </Box>
            <Switch
              checked={notifications}
              onChange={(e) => {
                setNotifications(e.target.checked);
                localStorage.setItem("app_notifications", e.target.checked);
              }}
            />
          </Stack>

          {notifications && (
            <Box mt={2}>
              <Typography fontSize={12} color="text.secondary" mb={1}>
                GENERAL
              </Typography>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontSize={14}>Expense alerts</Typography>
                <Switch
                  size="small"
                  checked={expenseAlerts}
                  onChange={(e) => {
                    setExpenseAlerts(e.target.checked);
                    localStorage.setItem("expense_alerts", e.target.checked);
                  }}
                />
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                <Typography fontSize={14}>Budget limit alerts</Typography>
                <Switch
                  size="small"
                  checked={budgetAlerts}
                  onChange={(e) => {
                    setBudgetAlerts(e.target.checked);
                    localStorage.setItem("budget_alerts", e.target.checked);
                  }}
                />
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center" mt={1}>
                <Typography fontSize={14}>Monthly summary</Typography>
                <Switch
                  size="small"
                  checked={monthlySummary}
                  onChange={(e) => {
                    setMonthlySummary(e.target.checked);
                    localStorage.setItem("monthly_summary", e.target.checked);
                  }}
                />
              </Stack>
            </Box>
          )}
        </Paper>

    
       {/* ABOUT & SUPPORT */}
<Paper
  onClick={() => setAboutOpen(true)}
  sx={{
    p: 0,
    mt: 2,
    borderRadius: 3,
    border: "1px solid #E8E2DB",
    maxWidth: 600,
    cursor: "pointer",
  }}
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      px: 3,
      py: 2,
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <InfoOutlinedIcon sx={{ color: "#555" }} />
      <Typography fontWeight={500}>
        About & Support
      </Typography>
    </Box>

    <ChevronRightIcon sx={{ color: "#999" }} />
  </Box>
</Paper>

{/* ABOUT & SUPPORT DIALOG */}
<Dialog
 open={aboutOpen}
  onClose={() => setAboutOpen(false)}
  fullWidth
  fullScreen={isMobile}
>
  <DialogTitle sx={{ fontWeight: 700 }}>
    About & Support
  </DialogTitle>

  <DialogContent>

    <List>

      {/* VERSION */}
      <ListItemText
        primary="Version"
        secondary="0.1.0"
        sx={{ mb: 2 }}
      />

      {/* PRIVACY POLICY */}
      <ListItemButton
        onClick={() => window.open("/privacy-policy", "_blank")}
      >
        <ListItemText primary="Privacy Policy" />
        <ChevronRightIcon />
      </ListItemButton>

      {/* PLATFORM RULES */}
      <ListItemButton
        onClick={() => window.open("/platform-rules", "_blank")}
      >
        <ListItemText primary="Platform Rules" />
        <ChevronRightIcon />
      </ListItemButton>

    </List>

    <Divider sx={{ my: 2 }} />

    {/* 🔥 SUPPORT FORM */}
    <Typography fontWeight={600} mb={1}>
      Contact Support
    </Typography>

    <TextField
      label="Your Email"
      fullWidth
      margin="normal"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <TextField
      label="Message"
      fullWidth
      multiline
      rows={4}
      margin="normal"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
    />

    <Button
      variant="contained"
      fullWidth
      sx={{ mt: 2 }}
      onClick={handleSupportSubmit}
      disabled={loading}
    >
      {loading ? "Sending..." : "Send Message"}
    </Button>

  </DialogContent>
</Dialog>


        {/* LANGUAGE MODAL */}
        <Dialog
          open={languageOpen}
          onClose={() => setLanguageOpen(false)}
          fullWidth
          fullScreen={isMobile}
        >
          <DialogTitle>Select your language</DialogTitle>
          <DialogContent>
            <List>
              {LANGUAGES.map((lang) => {
                const active = lang.code === currentLang;
                return (
                  <ListItemButton
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      backgroundColor: active ? "#E8EDFF" : "transparent",
                    }}
                  >
                    <Avatar src={lang.flag} sx={{ mr: 2, width: 28, height: 28 }} />
                    <ListItemText
                      primary={lang.label}
                      secondary={lang.sub}
                      primaryTypographyProps={{ fontWeight: active ? 600 : 500 }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </DialogContent>
        </Dialog>
      </Box>
    </Box>
  );
}