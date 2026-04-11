import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import Sidebar from "../components/dashboard/Sidebar";

export default function Insights() {

  const expenses = [
    { amount: 120, category: "Food" },
    { amount: 300, category: "Shopping" },
    { amount: 80, category: "Food" },
    { amount: 150, category: "Transport" },
  ];

  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const categoryStats = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {});

  const topCategory = Object.entries(categoryStats)
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f7f8fa" }}>
      
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Box>

      <Box sx={{ flex: 1, ml: { xs: 0, md: "260px" }, p: { xs: 2, md: 4 } }}>
        <Typography fontSize={{ xs: 24, md: 32 }} fontWeight={700} mb={3}>
          Smart Analytics
        </Typography>

        <Paper sx={{ p: 3, mb: 3, borderRadius: "24px" }}>
          <Typography fontWeight={600}>Total Spending</Typography>
          <Typography fontSize={22}>${total}</Typography>
        </Paper>

        <Paper sx={{ p: 3, mb: 3, borderRadius: "24px" }}>
          <Typography fontWeight={600}>Top Category</Typography>
          <Typography fontSize={18}>
            {topCategory[0]} — ${topCategory[1]}
          </Typography>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: "24px"}}>
          <Typography fontWeight={600}>Recommendation</Typography>
          <Typography>
            You are spending most on {topCategory[0]}. Consider reducing it.
          </Typography>
        </Paper>

      </Box>
    </Box>
  );
}
