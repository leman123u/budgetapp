import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";

export default function PrivacyPolicy() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: "auto" }}>

      <Typography variant="h4" fontWeight={700} mb={1}>
        Privacy Policy
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Last updated: March 2026
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3 }}>

        {/* INTRODUCTION */}
        <Typography variant="body1" mb={3}>
          Personal Budget respects your privacy and is committed to protecting
          your personal and financial information. This Privacy Policy explains
          how we collect, use and safeguard your information when you use the
          Personal Budget application.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* INFORMATION WE COLLECT */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          1. Information We Collect
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          When you use the Personal Budget application we may collect the
          following information:
        </Typography>

        <Typography variant="body2" color="text.secondary">
          • Account information such as your email address and profile data.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          • Financial information including expenses, budgets and savings goals.
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          • Usage data to improve application performance and user experience.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* HOW WE USE DATA */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          2. How We Use Your Information
        </Typography>

        <Typography variant="body2" color="text.secondary">
          We use your information to:
        </Typography>

        <Typography variant="body2" color="text.secondary">
          • Provide budgeting tools and financial insights.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          • Improve the functionality and performance of the application.
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          • Provide customer support and respond to user inquiries.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* DATA SECURITY */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          3. Data Security
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          We implement appropriate security measures to protect your financial
          and personal data. All information is stored securely and protected
          against unauthorized access or disclosure.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* USER RIGHTS */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          4. Your Rights
        </Typography>

        <Typography variant="body2" color="text.secondary">
          As a user you have the right to:
        </Typography>

        <Typography variant="body2" color="text.secondary">
          • Access your personal data.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          • Request correction or deletion of your information.
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          • Contact support regarding privacy concerns.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* POLICY CHANGES */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          5. Changes to This Policy
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          We may update this Privacy Policy from time to time to reflect
          changes in our services or legal requirements. Updates will be
          posted on this page.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* CONTACT */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          6. Contact Us
        </Typography>

        <Typography variant="body2" color="text.secondary">
          If you have any questions regarding this Privacy Policy,
          please contact us at:
        </Typography>

        <Typography variant="body2" fontWeight={600} mt={1}>
          support@personalbudget.com
        </Typography>

      </Paper>
    </Box>
  );
}