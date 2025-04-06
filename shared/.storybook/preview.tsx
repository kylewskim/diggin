import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/styles/index.css'

const preview: Preview = {
  parameters: {
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
    (Story) => (
      <div className="light">
        <Story />
      </div>
    ),
  ],
};

export default preview; 