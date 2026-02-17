import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";

export default function Premium() {
  const [billing, setBilling] = useState("monthly");
  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
        py: { xs: 3, md: 6 }
      }}
    >
      <Container maxWidth="md">
        
        {/* HEADER */}
        <Box textAlign="center" mb={4}>
          <Typography
            fontSize={{ xs: 22, md: 30 }}
            fontWeight={800}
            color="#1F2933"
          >
            Upgrade to Premium
          </Typography>

          <Typography color="#6B7280" mt={1} fontSize={14}>
            Choose a plan that works best for you.
          </Typography>

          <ToggleButtonGroup
            value={billing}
            exclusive
            onChange={(e, v) => v && setBilling(v)}
            sx={{
              mt: 2,
              bgcolor: "#fff",
              borderRadius: "30px",
              height: 36
            }}
          >
            <ToggleButton value="monthly" sx={{ px: 3 }}>
              Monthly
            </ToggleButton>
            <ToggleButton value="yearly" sx={{ px: 3 }}>
              Yearly
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <Grid container spacing={3} justifyContent="center">

          {/* FREE PLAN */}
          <Grid item xs={12} md={4.5}>
            <Paper
              sx={{
                p: 3,
                borderRadius: "25px",
                textAlign: "center",
              }}
            >
              <Typography fontSize={18} fontWeight={700}>
                Free
              </Typography>

              <Typography fontSize={32} fontWeight={800} my={1.5}>
                $0
              </Typography>

              <Box mt={2} textAlign="left">
                <Typography fontSize={14}>✓ Limited Goals</Typography>
                <Typography fontSize={14}>✓ Basic Insights</Typography>
                <Typography fontSize={14}>✓ Ads Included</Typography>
              </Box>
            </Paper>
          </Grid>

          {/* PREMIUM PLAN */}
          <Grid item xs={12} md={4.5}>
            <Paper
              sx={{
                p: 3,
                borderRadius: "25px",
                textAlign: "center",
                border: "2px solid #4F7DFF",
                boxShadow: "0 10px 30px rgba(79,125,255,0.2)",
                position: "relative"
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: -10,
                  right: 15,
                  bgcolor: "#22C55E",
                  color: "#fff",
                  px: 2,
                  py: 0.4,
                  borderRadius: "20px",
                  fontSize: 10,
                  fontWeight: 700
                }}
              >
                MOST POPULAR
              </Box>

              <Typography fontSize={18} fontWeight={700}>
                Premium
              </Typography>

              <Typography fontSize={32} fontWeight={800} my={1.5}>
                {billing === "monthly" ? "$9.99" : "$99"}
              </Typography>

              <Typography color="#6B7280" fontSize={13}>
                {billing === "monthly" ? "per month" : "per year"}
              </Typography>

              <Box mt={2} textAlign="left">
                <Typography fontSize={14}>✓ Smart Analytics</Typography>
                <Typography fontSize={14}>✓ Unlimited Goals</Typography>
                <Typography fontSize={14}>✓ PDF / Excel Export</Typography>
                <Typography fontSize={14}>✓ Ad-Free Experience</Typography>
              </Box>

              <Button
                fullWidth
                onClick={() => setOpen(true)}
                sx={{
                  mt: 3,
                  borderRadius: "40px",
                  py: 1.2,
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#fff",
                  background:
                    "linear-gradient(90deg, #4F7DFF 0%, #2563EB 100%)",
                  boxShadow: "0 8px 20px rgba(79,125,255,0.3)"
                }}
              >
                SUBSCRIBE NOW
              </Button>
            </Paper>
          </Grid>

        </Grid>
      </Container>

      {/* PAYMENT MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle fontWeight={700}>
          Complete Your Payment
        </DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Expiry Date"
            placeholder="MM/YY"
            margin="normal"
          />
          <TextField
            fullWidth
            label="CVC"
            placeholder="123"
            margin="normal"
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              borderRadius: "30px",
              background:
                "linear-gradient(90deg, #4F7DFF 0%, #2563EB 100%)"
            }}
          >
            Pay Now
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
