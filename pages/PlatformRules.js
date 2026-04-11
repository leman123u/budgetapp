import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";

export default function PlatformRules() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: "auto" }}>

      <Typography variant="h4" fontWeight={700} mb={1}>
        Platform Rules
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={3}>
        Last updated: March 2026
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 3 }}>

        {/* INTRO */}
        <Typography variant="body1" mb={3}>
          These Platform Rules outline the acceptable use of the Personal
          Budget application. By accessing or using this platform, you agree
          to follow the guidelines described below.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* ACCEPTABLE USE */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          1. Acceptable Use
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Personal Budget is designed to help users manage their personal
          finances effectively.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          You may use the application to:
        </Typography>

        <Typography variant="body2" color="text.secondary">
          • Track personal expenses and income
        </Typography>

        <Typography variant="body2" color="text.secondary">
          • Manage budgets and financial goals
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          • View financial insights and analytics
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* PROHIBITED ACTIVITIES */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          2. Prohibited Activities
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Users must not engage in the following activities:
        </Typography>

        <Typography variant="body2" color="text.secondary">
          • Uploading malicious software or harmful code
        </Typography>

        <Typography variant="body2" color="text.secondary">
          • Using the application for illegal or fraudulent purposes
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          • Attempting to access data belonging to other users
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* USER RESPONSIBILITY */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          3. User Responsibilities
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Users are responsible for maintaining the confidentiality of their
          account credentials and for ensuring that the information they
          provide in the application is accurate.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* SERVICE AVAILABILITY */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          4. Service Availability
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          We strive to keep the Personal Budget platform available and
          functional at all times. However, maintenance, updates or technical
          issues may temporarily affect service availability.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* CHANGES */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          5. Changes to the Rules
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          We may update these Platform Rules periodically. When changes are
          made, the updated version will be published on this page with a
          revised "Last updated" date.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* CONTACT */}
        <Typography variant="h6" fontWeight={600} mb={1}>
          6. Contact
        </Typography>

        <Typography variant="body2" color="text.secondary">
          If you have any questions regarding these Platform Rules,
          please contact us at:
        </Typography>

        <Typography variant="body2" fontWeight={600} mt={1}>
          support@personalbudget.com
        </Typography>

      </Paper>
    </Box>
  );
}