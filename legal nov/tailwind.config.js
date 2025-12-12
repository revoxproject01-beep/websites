/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#ECFEFF',
        background: '#FFFFFF',
        text: '#0F172A',
        // Premium theme colors
        premiumPrimary: '#4F46E5',
        premiumSecondary: '#7C3AED',
        premiumAccent: '#A5B4FC',
        premiumBackground: '#F1F5F9',
        premiumText: '#0F172A',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}