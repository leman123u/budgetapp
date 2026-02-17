/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#2563EB',
          light: '#DBEAFE',
          dark: '#1D4ED8',
          lighter: '#EFF6FF',
        },
        success: {
          main: '#10B981',
          light: '#D1FAE5',
          dark: '#059669',
        },
        error: {
          main: '#EF4444',
          light: '#FEE2E2',
          dark: '#DC2626',
        },
        warning: {
          main: '#F59E0B',
          light: '#FEF3C7',
          dark: '#D97706',
        },
        grey: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      spacing: {
        // 8px base unit for consistent spacing
        'spacing-1': '8px',
        'spacing-2': '16px',
        'spacing-3': '24px',
        'spacing-4': '32px',
        'spacing-5': '40px',
        'spacing-6': '48px',
      },
      borderRadius: {
        'theme': '16px', // Consistent 16px border radius
        'theme-sm': '8px',
      },
    },
  },
  plugins: [],
};

