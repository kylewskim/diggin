import { colors } from '../../color';
import { join, dirname } from 'path';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pop_up/index.html',
    './pop_up/**/*.{js,ts,jsx,tsx}',
    join(dirname(require.resolve('ui')), 'dist/**/*.js'),
  ],
  theme: {
    extend: {
      colors,
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        'spin-fast': 'spin 0.4s linear infinite',
        'bounce-fast': 'spin 0.4s linear infinite',
        tilt: 'tilt 1000ms ease-in-out',
        'tilt-dice': 'tiltDice 0.3s ease-out forwards',
        'untilt-dice': 'untiltDice 0.3s ease-out forwards',
        'fade-in': 'fade-in 300ms linear',
        'fade-in-slow': 'fade-in 10000ms linear',
        'roll-dice': 'rollDice 1s cubic-bezier(0.9, 0.885, 0.32, 1.275) forwards',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        tilt: {
          // '0%': { transform: 'rotate(-0deg)' },
          '100%': { transform: 'rotate(30deg)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        tiltDice: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(30deg)',
          },
        },
        untiltDice: {
          '0%': {
            transform: 'rotate(30deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
        rollDice: {
          '0%, 100%': {
            transform: 'translateY(0) rotate(0deg)',
          },
          '25%': {
            transform: 'translateY(-35px) translateX(-2px) rotate(-5540deg)',
          },
          '50%': {
            transform: 'translateY(0) translateX(-4px) rotate(5deg)',
          },
          '65%': {
            transform: 'translateY(-20px) translateX(0px) rotate(3360deg)',
          },
          '80%': {
            transform: 'translateY(0px) translateX(4px) rotate(-5deg)',
          },
          '90%': {
            transform: 'translateY(-10px) translateX(2px) rotate(-1880deg)',
          },
          '100%': {
            transform: 'translateY(0) translateX(0px) rotate(0deg)',
          },
        },
      },
    },
  },
  plugins: [
    //
    require('tailwind-scrollbar-hide'),
    require('tailwind-scrollbar'),
  ],
};
