import { getTailwindColors } from '@diggin/shared/src/constants/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../shared/src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'color-surface-bg': '#FFFFFF',
        'color-fill-primary': '#1D1D1D',
        'color-text-inverted': '#FFFFFF',
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 