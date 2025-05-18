import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ExtensionList } from './index';

const meta = {
  title: 'UI/List/ExtensionList',
  component: ExtensionList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'add', 'manage'],
      description: 'Type of list item',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'selected', 'active'],
      description: 'State of the list item',
    },
    label: {
      control: 'text',
      description: 'Text label to display',
    },
    count: {
      control: 'number',
      description: 'Count value (only for default type)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text (only for add type)',
    },
    value: {
      control: 'text',
      description: 'Input value (only for add type)',
    },
    onClick: { action: 'clicked' },
    onSubmit: { action: 'submitted' },
    onCancel: { action: 'canceled' },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof ExtensionList>;

export default meta;
type Story = StoryObj<typeof ExtensionList>;

// Default Type Stories
export const DefaultDefault: Story = {
  args: {
    type: 'default',
    state: 'default',
    label: 'Product Design Reference',
    count: 3,
  },
};

export const DefaultHover: Story = {
  args: {
    type: 'default',
    state: 'hover',
    label: 'Product Design Reference',
    count: 3,
  },
};

export const DefaultSelected: Story = {
  args: {
    type: 'default',
    state: 'selected',
    label: 'Product Design Reference',
    count: 3,
  },
};

export const DefaultNoCount: Story = {
  args: {
    type: 'default',
    state: 'default',
    label: 'Product Design Reference',
    count: 0,
  },
};

// Add Type Stories
export const AddDefault: Story = {
  args: {
    type: 'add',
    state: 'default',
    label: '',
    placeholder: 'Write a new session name',
    value: '',
  },
};

export const AddActive: Story = {
  args: {
    type: 'add',
    state: 'active',
    label: '',
    placeholder: 'Write a new session name',
    value: 'New Session Name',
  },
};

// Add Type with Interactive State
export const AddInteractive: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    
    return (
      <ExtensionList
        {...args}
        type="add"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onCancel={() => setValue('')}
        onSubmit={(val) => alert(`Submitted: ${val}`)}
      />
    );
  },
};

// Manage Type Stories
export const ManageDefault: Story = {
  args: {
    type: 'manage',
    state: 'default',
    label: 'Product Design Reference',
  },
};

export const ManageHover: Story = {
  args: {
    type: 'manage',
    state: 'hover',
    label: 'Product Design Reference',
  },
};

export const ManageActive: Story = {
  args: {
    type: 'manage',
    state: 'active',
    label: 'Product Design Reference',
  },
}; 
 
 
 
 
 