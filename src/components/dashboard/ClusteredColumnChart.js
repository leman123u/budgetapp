import React from "react";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PRIMARY = "#1A3263";   // Budget
const SECONDARY = "#547792"; // Actual
const SOFT_GRID = "#E8E2DB";

const ClusteredColumnChart = ({ data, loading, currency = "USD" }) => {
  const formatMoney = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(value || 0));

  if (loading || !data?.length) {
    return (
      <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="text.secondary">Loading...</Typography>
      </Box>
    );
  }

  const maxValue = Math.max(
    ...data.flatMap((d) => [d.budget || 0, d.actual || 0]),
    1000
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
      >
        <CartesianGrid stroke={SOFT_GRID} strokeDasharray="3 3" />

        <XAxis
          dataKey="month"
          tick={{ fill: "#547792", fontSize: 12 }}
          axisLine={false}
        />

        <YAxis
          domain={[0, Math.ceil(maxValue / 200) * 200]}
          tick={{ fill: "#547792", fontSize: 12 }}
          axisLine={false}
          tickFormatter={formatMoney}
        />

        <Tooltip
          formatter={(v) => formatMoney(v)}
          contentStyle={{
            borderRadius: 14,
            border: "none",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
          }}
        />

        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 13, paddingTop: 10 }}
        />

        <Bar
          dataKey="budget"
          name="Budget"
          fill={PRIMARY}
          radius={[6, 6, 0, 0]}
        />

        <Bar
          dataKey="actual"
          name="Actual"
          fill={SECONDARY}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ClusteredColumnChart;
