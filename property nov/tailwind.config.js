/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4169E1', // Royal Blue
        secondary: '#FFD700', // Gold
        accent: '#FFEC8B', // Light Gold
        dark: '#1F2937', // Dark Gray
        'dark-blue': '#1E3A8A', // Dark Blue
        'light-gray': '#F3F4F6' // Light Gray
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        }
      }
    },
  },
  plugins: [],
};
