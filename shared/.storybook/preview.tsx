import type { Preview } from '@storybook/react'
import '../src/styles/index.css'
import React from 'react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#FFFFFF',
        },
        {
          name: 'dark',
          value: '#1A1A1A',
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isDarkMode = context.globals.backgrounds?.value === '#1A1A1A';
      return (
        <div className={`font-pretendard ${isDarkMode ? 'dark' : ''}`}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview; 
 
 
 
 
 
 