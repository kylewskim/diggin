import { getTailwindColors } from './src/constants/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
    "./src/styles/**/*.{css}",
  ],
  safelist: [
    // Title
    'text-title-xlg',
    'text-title-lg',
    'text-title-md',
    'text-title-sm',
  
    // Body
    'text-body-lg',
    'text-body-lg-rg',
    'text-body-lg-md',
    'text-body-md',
    'text-body-md-rg',
    'text-body-md-md',
  
    // Caption
    'text-caption-md',
    'text-caption-md-rg',
    'text-caption-md-md',
  
    // (선택) 중간 유틸리티들이 purge되었을 경우를 대비한 안전망
    'text-[40px]',
    'text-[24px]',
    'text-[18px]',
    'text-[17px]',
    'text-[16px]',
    'text-[14px]',
    'text-[12px]',
  
    'leading-[50px]',
    'leading-[30px]',
    'leading-[24px]',
    'leading-[22px]',
    'leading-[18px]',
    'leading-[16px]',
  
    'tracking-[-0.4px]',
    'tracking-[-0.24px]',
    'tracking-[-0.18px]',
    'tracking-[-0.17px]',
    'tracking-[-0.16px]',
    'tracking-[-0.14px]',
    'tracking-[-0.12px]',
  
    'font-normal',
    'font-medium',
    'font-weight-400',
    'font-weight-500'
  ],
  darkMode: 'class', // class 기반 다크모드 사용
  theme: {
    extend: {
      colors: getTailwindColors(),
      // fontSize: {
      //   'title-xlg': ['40px', { lineHeight: '50px', letterSpacing: '-0.4px' }],
      //   'title-lg': ['24px', { lineHeight: '30px', letterSpacing: '-0.24px' }],
      //   'title-md': ['18px', { lineHeight: '24px', letterSpacing: '-0.18px' }],
      //   'title-sm': ['17px', { lineHeight: '22px', letterSpacing: '-0.17px' }],
      //   'body-lg': ['16px', { lineHeight: '22px', letterSpacing: '-0.16px' }],
      //   'body-md': ['14px', { lineHeight: '18px', letterSpacing: '-0.14px' }],
      //   'caption-md': ['12px', { lineHeight: '16px', letterSpacing: '-0.12px' }],
      // },
      // fontWeight: {
      //   rg: '400',
      //   md: '500',
      // },
    },
  },
  plugins: [],
} 