import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { AccountBalance, CreditCard, Savings } from "@mui/icons-material";

const formatMoney = (value, currency) => {
  const n = Number(value || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0,
  }).format(n);
};

const CARD_HEIGHT = 150;

const StatCard = ({ label, value, icon, active = false }) => (
  <Paper
    elevation={0}
    sx={{
      height: CARD_HEIGHT,
      p: 3,
      borderRadius: 4,   // ✅ soft rounded (professional look)
      bgcolor: "background.paper",

      boxShadow: active
        ? "0 12px 28px rgba(79,125,255,0.18)"
        : "0 8px 22px rgba(0,0,0,0.06)",

      border: "none",

      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",

      transition: "all .25s ease",

      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 14px 32px rgba(0,0,0,0.08)",
      },
    }}
  >
    <Box>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "text.secondary",
          mb: 1,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          fontSize: 34,
          fontWeight: 700,
          color: "text.primary",
          lineHeight: 1.15,
        }}
      >
        {value}
      </Typography>
    </Box>

    <Box sx={{ alignSelf: "flex-end", opacity: active ? 0.25 : 0.15 }}>
      {React.cloneElement(icon, {
        sx: {
          fontSize: 34,
          color: active ? "primary.main" : "text.secondary",
        },
      })}
    </Box>
  </Paper>
);

const OverviewCards = ({
  totalMonthlyBudget,
  totalExpenses,
  savings,
  budgetsLoading,
  expensesLoading,
  currency = "USD",
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <StatCard
          label="Total Budget"
          value={budgetsLoading ? "—" : formatMoney(totalMonthlyBudget, currency)}
          icon={<AccountBalance />}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <StatCard
          label="Total Expenses"
          value={expensesLoading ? "—" : formatMoney(totalExpenses, currency)}
          icon={<CreditCard />}
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <StatCard
          label="Savings"
          value={
            budgetsLoading || expensesLoading
              ? "—"
              : formatMoney(savings, currency)
          }
          icon={<Savings />}
          active
        />
      </Grid>
    </Grid>
  );
};

export default OverviewCards;
