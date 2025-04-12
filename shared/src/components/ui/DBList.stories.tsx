import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { DBList } from './DBList';
import { FolderIcon } from 'lucide-react';

const meta = {
  title: 'UI/DBList',
  component: DBList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: { 
      control: false,
      description: "Icon to display on the left"
    },
    name: { 
      control: 'text',
      description: "Name of the list item"
    },
    insightCount: { 
      control: 'number',
      description: "Number of insights"
    },
    selected: {
      control: 'boolean',
      description: "Whether the item is selected"
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof DBList>;

export default meta;
type Story = StoryObj<typeof DBList>;

export const Default: Story = {
  args: {
    icon: FolderIcon,
    name: 'Photography Foundation',
    insightCount: 0,
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    icon: FolderIcon,
    name: 'Photography Foundation',
    insightCount: 0,
    selected: true,
  },
};

export const WithInsights: Story = {
  args: {
    icon: FolderIcon,
    name: 'Research Materials',
    insightCount: 24,
    selected: false,
  },
}; 