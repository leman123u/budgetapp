import React from "react";
import { Box, Typography } from "@mui/material";
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Customized,
  Line,
} from "recharts";

const PRIMARY = "#1A3263";
const SECONDARY = "#547792";
const ACCENT = "#FAB95B";

const CandlestickChart = ({ data, loading, currency = "USD" }) => {
  const formatMoney = (value, { decimals = 0 } = {}) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: decimals,
    }).format(Number(value || 0));

  const chartData = (Array.isArray(data) ? data : []).map((e) => {
    const budget = Number(e.budget || 0);
    const actual = Number(e.actual || 0);

    return {
      ...e,
      open: budget,
      close: actual,
      high: Math.max(budget, actual),
      low: Math.min(budget, actual),
    };
  });

  if (loading || !chartData.length) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", minHeight: 200 }}>
        <Typography color="text.secondary">Loading...</Typography>
      </Box>
    );
  }

  const Candles = ({ xAxisMap, yAxisMap, data }) => {
    const x = Object.values(xAxisMap)[0].scale;
    const y = Object.values(yAxisMap)[0].scale;
    const bw = x.bandwidth?.() || 0;

    const body = Math.max(8, bw * 0.45); // mobil üçün nazik

    return (
      <g>
        {data.map((d, i) => {
          const cx = x(d.month) + bw / 2;
          const top = Math.min(y(d.open), y(d.close));
          const height = Math.max(Math.abs(y(d.open) - y(d.close)), 2);

          const positive = d.close <= d.open;

          return (
            <g key={i}>
              <line
                x1={cx}
                x2={cx}
                y1={y(d.high)}
                y2={y(d.low)}
                stroke={SECONDARY}
                strokeWidth={1.6}
                opacity={0.4}
              />
              <rect
                x={cx - body / 2}
                y={top}
                width={body}
                height={height}
                rx={3}
                fill={positive ? PRIMARY : ACCENT}
                opacity={0.9}
              />
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: { xs: 200, md: 260 }, // 📱 yalnız mobil override
      }}
    >
      <ResponsiveContainer>
        <ComposedChart
          data={chartData}
          margin={{
            top: { xs: 6, md: 12 },
            bottom: { xs: 20, md: 36 },
          }}
        >
          <CartesianGrid stroke="rgba(0,0,0,0.04)" />

          <XAxis
            dataKey="month"
            tick={{
              fill: "#64748B",
              fontSize: { xs: 9, md: 11 }, // 📱 mobil kiçik
            }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: "#64748B",
              fontSize: { xs: 9, md: 11 },
            }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => formatMoney(v)}
          />

          <Tooltip
            formatter={(v) => formatMoney(v)}
            contentStyle={{
              borderRadius: 12,
              border: "none",
              boxShadow: "0 8px 22px rgba(0,0,0,0.08)",
              fontSize: 12,
            }}
          />

          <Line dataKey="open" stroke={PRIMARY} strokeOpacity={0} dot={false} />
          <Line dataKey="close" stroke={PRIMARY} strokeOpacity={0} dot={false} />

          <Customized component={Candles} />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CandlestickChart;
