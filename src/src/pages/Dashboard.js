import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { getBudgets } from "../redux/budgetSlice";
import { getExpenses } from "../redux/expenseSlice";
import Sidebar from "../components/dashboard/Sidebar";
import OverviewCards from "../components/dashboard/OverviewCards";
import ChartsSection from "../components/dashboard/ChartsSection";
import RecentTransactions from "../components/dashboard/RecentTransactions";

// 🔴 ADD EDİLƏN SƏTR
import { t } from "../i18n";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(s => s.user);
  const { budgets } = useSelector(s => s.budgets);
  const { expenses, loading } = useSelector(s => s.expenses);

  useEffect(() => {
    if (!user?.id) return navigate("/login");
    dispatch(getBudgets(user.id));
    dispatch(getExpenses(user.id));
  }, [user, dispatch, navigate]);

  const totalBudget = useMemo(
    () => budgets?.reduce((s, b) => s + (+b.amount || 0), 0) || 0,
    [budgets]
  );

  const totalExpenses = useMemo(
    () => expenses?.reduce((s, e) => s + (+e.amount || 0), 0) || 0,
    [expenses]
  );

  const savings = totalBudget - totalExpenses;

  const expensesByCategory = useMemo(() => {
    const c = { Food: 0, Travel: 0, Bills: 0, Shopping: 0 };
    expenses?.forEach(e => {
      const k = (e.category || "").toLowerCase();
      const a = +e.amount || 0;
      if (k.includes("food")) c.Food += a;
      else if (k.includes("travel") || k.includes("transport")) c.Travel += a;
      else if (k.includes("bill")) c.Bills += a;
      else c.Shopping += a;
    });
    return Object.entries(c).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const monthlyData = useMemo(() => {
    const map = {};
    expenses?.forEach(e => {
      if (!e.date) return;
      const d = new Date(e.date);
      const k = `${d.getFullYear()}-${d.getMonth()}`;
      map[k] = (map[k] || 0) + (+e.amount || 0);
    });

    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(new Date().getFullYear(), new Date().getMonth() - (5 - i));
      return {
        month: d.toLocaleDateString("en-US", { month: "short" }),
        budget: totalBudget,
        actual: map[`${d.getFullYear()}-${d.getMonth()}`] || 0,
      };
    });
  }, [expenses, totalBudget]);

  const recent = useMemo(
    () =>
      expenses?.slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 10)
        .map(e => ({
          id: e.id,
          date: e.date
            ? new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })
            : "—",
          description: e.description || e.category || "Expense",
          amount: +e.amount || 0
        })) || [],
    [expenses]
  );

  if (!user) return null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Box>

      <Box sx={{ flex: 1, ml: { xs: 0, md: "260px" }, p: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            maxWidth: 1400,
            mx: "auto",
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "repeat(12,1fr)" },
            gap: 3.5
          }}
        >
          <Box sx={{ gridColumn: "1/-1" }}>
            {/* 🔴 BURDA TEXT DƏYİŞDİ */}
            <Typography fontSize={{ xs: 26, md: 32 }} fontWeight={700}>
              {t("dashboard")}
            </Typography>

            <Typography color="text.secondary">
              {t("overview")}
            </Typography>
          </Box>

          <Box sx={{ gridColumn: "1/-1" }}>
            <OverviewCards
              totalMonthlyBudget={totalBudget}
              totalExpenses={totalExpenses}
              savings={savings}
            />
          </Box>

          <Box
            sx={{
              gridColumn: { xs: "1/-1", lg: "1/9" },
              bgcolor: "background.paper",
              borderRadius: "12px",
              p: { xs: 2, md: 3 },
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)"
            }}
          >
            <ChartsSection
              expensesByCategory={expensesByCategory}
              monthlyData={monthlyData}
              expensesLoading={loading}
            />
          </Box>

          <Box
            sx={{
              gridColumn: { xs: "1/-1", lg: "9/-1" },
              bgcolor: "background.paper",
              borderRadius: "12px",
              p: { xs: 2, md: 3 },
              boxShadow: "0 10px 25px rgba(0,0,0,0.06)"
            }}
          >
            <RecentTransactions transactions={recent} loading={loading} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
