import { getTailwindColors } from '../shared/src/constants/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css}",
    "../shared/src/**/*.{js,ts,jsx,tsx,css}",
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
    'font-weight-500',
    
    // Button 관련 클래스들
    'text-text-inverted-light',
    'dark:text-text-inverted-dark',
    'bg-fill-primary-light',
    'dark:bg-fill-primary-dark',
    'hover:bg-gray-850',
    'dark:hover:bg-gray-100',
    'bg-color-surface-bg',
    'border-color-line-tertiary',
    'dark:border-color-line-tertiary',
    'dark:bg-color-surface-bg',
    'h-[32px]',
    'h-[40px]',
    'h-[48px]',
    'min-w-[100px]',
    'px-4',
    'px-5'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: getTailwindColors(),
      fontFamily: {
        'pretendard': ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 