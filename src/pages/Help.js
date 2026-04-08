import React, { useState } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Paper,
  InputAdornment
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import axiosInstance from "../config/api"; // ✅ əlavə etdim

export default function Help() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [bug, setBug] = useState("");

  const faq = [
    {
      question: "How do I create a budget?",
      answer:
        "Go to the Budgets page and click Create Budget. Enter the budget name, amount and category, then save it."
    },
    {
      question: "How do I add an expense?",
      answer:
        "Open the Expenses section and click Add Expense. Enter the amount, category, date and description, then save."
    },
    {
      question: "How do I edit or delete an expense?",
      answer:
        "Go to the Expenses page. Find the expense you want to modify and click Edit or Delete."
    },
    {
      question: "How can I track my spending?",
      answer:
        "Go to the Insights page to see charts and analytics of your spending."
    },
    {
      question: "Is my financial data secure?",
      answer:
        "Yes. Your financial data is encrypted and securely stored. We do not share your data with third parties."
    }
  ];

  const filteredFaq = faq.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

  const handleSupportSubmit = async () => {
    try {
      setLoading(true);

      await axiosInstance.post("/support", {
        email,
        message,
      });

      alert("Message sent successfully!");
      setEmail("");
      setMessage("");
    } catch (error) {
      alert("Error sending message");
    } finally {
      setLoading(false);
    }
  };

  const handleBugSubmit = () => {
    alert("Bug report submitted!");
    setBug("");
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Help & Support
      </Typography>

      {/* SEARCH BAR */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search help articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      {/* FAQ */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Typography fontWeight={600} mb={2}>
          Frequently Asked Questions
        </Typography>

        {filteredFaq.length === 0 ? (
          <Typography color="text.secondary">
            No results found.
          </Typography>
        ) : (
          filteredFaq.map((item, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{item.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{item.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))
        )}
      </Paper>

      {/* CONTACT SUPPORT */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Typography fontWeight={600} mb={2}>
          Contact Support
        </Typography>

        <TextField
          fullWidth
          label="Your Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          fullWidth
          label="Your Message"
          margin="normal"
          multiline
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSupportSubmit}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Message"}
        </Button>
      </Paper>

      {/* BUG REPORT */}
      <Paper sx={{ p: 3, borderRadius: 3, mb: 4 }}>
        <Typography fontWeight={600} mb={2}>
          Report a Bug
        </Typography>

        <TextField
          fullWidth
          label="Describe the issue"
          margin="normal"
          multiline
          rows={3}
          value={bug}
          onChange={(e) => setBug(e.target.value)}
        />

        <Button variant="outlined" component="label" sx={{ mt: 1 }}>
          Upload Screenshot
          <input type="file" hidden />
        </Button>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleBugSubmit}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
}