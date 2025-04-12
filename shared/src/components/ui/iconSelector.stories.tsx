import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { IconSelector } from './IconSelector';
import { SearchIcon, AddIcon, EditIcon, TrashIcon } from '../../icons';

const meta = {
  title: 'UI/IconSelector',
  component: IconSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: 'select',
      options: ['search', 'add', 'edit', 'trash'],
      mapping: {
        search: <SearchIcon />,
        add: <AddIcon />,
        edit: <EditIcon />,
        trash: <TrashIcon />,
      },
      description: "The icon to display",
    },
    selected: {
      control: "boolean",
      description: "Whether the icon is selected",
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof IconSelector>;

export default meta;
type Story = StoryObj<typeof IconSelector>;

export const Default: Story = {
  args: {
    icon: <SearchIcon />,
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    icon: <SearchIcon />,
    selected: true,
  },
};

export const AddIconVariant: Story = {
  args: {
    icon: <AddIcon />,
    selected: false,
  },
};

export const EditIconVariant: Story = {
  args: {
    icon: <EditIcon />,
    selected: false,
  },
};

export const TrashIconVariant: Story = {
  args: {
    icon: <TrashIcon />,
    selected: false,
  },
};