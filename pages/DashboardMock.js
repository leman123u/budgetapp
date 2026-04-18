import React from "react";
import { Box, Container, Typography } from "@mui/material";
import AppHeaderBar from "../components/AppHeaderBar";
import OverviewCards from "../components/dashboard/OverviewCards";
import ChartsSection from "../components/dashboard/ChartsSection";
import RecentTransactions from "../components/dashboard/RecentTransactions";

export default function DashboardMock() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#fff" }}>
      <AppHeaderBar />

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
