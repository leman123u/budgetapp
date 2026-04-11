import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ClusteredColumnChart from "./ClusteredColumnChart";

const PRIMARY = "#1A3263";
const SECONDARY = "#547792";
const ACCENT = "#FAB95B";
const SOFT = "#E8E2DB";

const ChartsSection = ({
  expensesByCategory,
  monthlyData,
  expensesLoading,
  budgetsLoading,
  currency = "USD",
}) => {
  const COLORS = {
    Food: PRIMARY,
    Travel: SECONDARY,
    Bills: ACCENT,
    Shopping: "#8FAEC3",
  };

  const formatMoney = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  const CATEGORY_ORDER = ["Food", "Travel", "Bills", "Shopping"];

  const pieData = CATEGORY_ORDER.map((name) => {
    const found = expensesByCategory?.find((d) => d?.name === name);
    return { name, value: Number(found?.value || 0) };
  });

  const pieTotal = pieData.reduce((s, d) => s + d.value, 0);

  const Card = ({ title, children }) => (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        borderRadius: 4,                 // ⬅ less rounded (professional)
        overflow: "hidden",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ textAlign: "center", py: { xs: 1.5, md: 2 } }}>
        <Typography fontWeight={600} fontSize={{ xs: 14, md: 16 }}>
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          px: { xs: 2, md: 3 },
          pb: { xs: 2, md: 3 },
          pt: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </Paper>
  );

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "2fr 1.5fr" },
        gap: { xs: 2, md: 3 },
      }}
    >
      {/* PIE */}
      <Card title="Expenses by Category">
        {expensesLoading ? (
          <Typography color="text.secondary">Loading...</Typography>
        ) : (
          <>
            <Box sx={{ width: "100%", height: { xs: 180, md: 220 } }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieTotal ? pieData : [{ name: "No data", value: 1 }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={{ xs: 45, md: 60 }}
                    outerRadius={{ xs: 70, md: 85 }}
                    dataKey="value"
                  >
                    {(pieTotal ? pieData : [{ name: "No data", value: 1 }]).map(
                      (e, i) => (
                        <Cell key={i} fill={pieTotal ? COLORS[e.name] : SOFT} />
                      )
                    )}
                  </Pie>

                  {pieTotal > 0 && (
                    <Tooltip
                      formatter={(v) => formatMoney(v)}
                      contentStyle={{
                        borderRadius: 6,      // ⬅ softer tooltip corners
                        border: "none",
                        boxShadow: "0 8px 22px rgba(0,0,0,0.12)",
                        fontSize: 12,
                      }}
                    />
                  )}
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Typography fontWeight={700} mt={1}>
              {pieTotal > 0 && formatMoney(pieTotal)}
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: { xs: 1.5, md: 3 },
                mt: 2,
                flexWrap: "wrap",
              }}
            >
              {pieData.map((item) => (
                <Box
                  key={item.name}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      bgcolor: COLORS[item.name],
                    }}
                  />
                  <Typography fontSize={12} color="text.secondary">
                    {item.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Card>

      {/* BAR */}
      <Card title="Monthly Budget vs Actual">
        <Box
          sx={{
            width: "100%",
            height: { xs: 220, md: 260 },
            px: { xs: 0, md: 1 },
          }}
        >
          <ClusteredColumnChart
            data={monthlyData}
            loading={expensesLoading || budgetsLoading}
            currency={currency}
          />
        </Box>
      </Card>
    </Box>
  );
};

export default ChartsSection;
