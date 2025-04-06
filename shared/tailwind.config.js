import { getTailwindColors } from './src/constants/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // class 기반 다크모드 사용
  theme: {
    extend: {
      colors: getTailwindColors(),
    },
  },
  plugins: [],
} 