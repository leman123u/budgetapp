import React from "react";
import { Box, Typography } from "@mui/material";

const SOFT_BG = "#E8E2DB";
const REMAIN = "rgba(0,0,0,0.08)";

const StackedBarChart = ({ spent, remaining, total, color, height = 18 }) => {
  const spentPercent = total > 0 ? (spent / total) * 100 : 0;
  const remainingPercent = total > 0 ? (remaining / total) * 100 : 0;

  const used = Math.min(spentPercent, 100);
  const left = Math.min(remainingPercent, 100 - used);

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
      <Box
        sx={{
          flex: 1,
          height,
          borderRadius: 999,
          overflow: "hidden",
          display: "flex",
          bgcolor: SOFT_BG,
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.12)",
        }}
      >
        {used > 0 && (
          <Box
            sx={{
              width: `${used}%`,
              height: "100%",
              bgcolor: color,
              transition: "width .35s ease",
            }}
          />
        )}

        {left > 0 && (
          <Box
            sx={{
              width: `${left}%`,
              height: "100%",
              bgcolor: REMAIN,
              transition: "width .35s ease",
            }}
          />
        )}
      </Box>

      <Typography
        sx={{
          minWidth: 42,
          fontWeight: 600,
          fontSize: 13,
          color: "text.secondary",
          textAlign: "right",
        }}
      >
        {used.toFixed(0)}%
      </Typography>
    </Box>
  );
};

export default StackedBarChart;
