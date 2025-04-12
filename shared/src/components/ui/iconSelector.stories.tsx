import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { IconSelector } from './IconSelector';
import { Search } from "lucide-react";

const meta: Meta<typeof IconSelector> = {
  title: 'UI/IconSelector',
  component: IconSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: "The icon to display",
    },
    selected: {
      control: "boolean",
      description: "Whether the icon is selected",
    },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof IconSelector>;

export default meta;
type Story = StoryObj<typeof IconSelector>;

export const Default: Story = {
  args: {
    icon: <Search size={24} />,
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    icon: <Search size={24} />,
    selected: true,
  },
}; 