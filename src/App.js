import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Pages
import Dashboard from './pages/Dashboard';
import DashboardMock from './pages/DashboardMock';
import Expenses from './pages/Expenses';
import Budgets from './pages/Budgets';
import SavingsGoals from './pages/SavingsGoals';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Profile from './pages/Profile';

// EXTRA PAGES
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword'; // ✅ ƏLAVƏ OLUNDU
import Insights from './pages/Insights';
import Premium from './pages/Premium';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4F7DFF', contrastText: '#FFFFFF' },
    success: { main: '#22C55E' },
    background: { default: '#F5F7FA', paper: '#FFFFFF' },
    text: { primary: '#1F2933', secondary: '#6B7280' },
    divider: '#E5E7EB',
  },
  shape: { borderRadius: 16 },
  typography: {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
  },
});

function App() {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>

          {/* AUTH */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} /> {/* ✅ BURASI */}

          {/* MAIN */}
          <Route path="/dashboard" element={<DashboardMock />} />
          <Route path="/dashboard-live" element={<Dashboard />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/goals" element={<SavingsGoals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/insights" element={<Insights />} />

          {/* PREMIUM */}
          <Route
            path="/premium"
            element={
              <Premium
                isPremium={isPremium}
                setIsPremium={setIsPremium}
              />
            }
          />

          {/* DEFAULT */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
