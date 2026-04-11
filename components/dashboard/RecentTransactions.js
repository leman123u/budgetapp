import React from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider
} from "@mui/material";

const RecentTransactions = ({ transactions, loading }) => {
  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(Number(n || 0));

  return (
    <Paper
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "grey.200",
        borderRadius: 2,
        overflow: "hidden",
        bgcolor: "background.paper",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 600,
            mb: 1.5,
            color: "text.primary",
            fontSize: "18px",
            lineHeight: 1.2,
          }}
        >
          Recent Transactions
        </Typography>

        {/* ✅ DIVIDER BURADA İSTİFADƏ OLUNDU */}
        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 6,
            }}
          >
            <Typography color="text.secondary">Loading...</Typography>
          </Box>
        ) : transactions.length > 0 ? (
          <TableContainer sx={{ borderRadius: 0, border: "none" }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "text.secondary",
                      fontSize: "12px",
                      py: 2,
                      borderBottom: "1px solid",
                      borderColor: "grey.200",
                      bgcolor: "grey.50",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      color: "text.secondary",
                      fontSize: "12px",
                      py: 2,
                      borderBottom: "1px solid",
                      borderColor: "grey.200",
                      bgcolor: "grey.50",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Description
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: 600,
                      color: "text.secondary",
                      fontSize: "12px",
                      py: 2,
                      borderBottom: "1px solid",
                      borderColor: "grey.200",
                      bgcolor: "grey.50",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow
                    key={transaction.id || index}
                    sx={{
                      "&:hover": { bgcolor: "grey.50" },
                      "&:last-child td": { border: 0 },
                      transition: "background-color 0.2s ease-in-out",
                      "& td": {
                        borderBottom: "1px solid",
                        borderColor: "grey.200",
                        py: 2,
                      },
                    }}
                  >
                    <TableCell
                      sx={{
                        color: "text.secondary",
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {transaction.date}
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "text.primary",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                    >
                      {transaction.description}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        fontSize: "15px",
                      }}
                    >
                      {fmt(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              py: 6,
            }}
          >
            <Typography color="text.secondary" align="center">
              No transactions found
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default RecentTransactions;
