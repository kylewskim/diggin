import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { IconSelector } from './IconSelector';
import { FolderIcon, ImageIcon, FileTextIcon } from 'lucide-react';

const meta = {
  title: 'UI/IconSelector',
  component: IconSelector,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'Icon component to display (ReactNode)'
    },
    selected: {
      control: 'boolean',
      description: 'Whether the icon is selected'
    },
    className: {
      control: 'text',
      description: 'Additional class names'
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof IconSelector>;

export default meta;
type Story = StoryObj<typeof IconSelector>;

export const Default: Story = {
  args: {
    icon: <FolderIcon size={20} />,
    selected: false,
  },
};

export const Selected: Story = {
  args: {
    icon: <FolderIcon size={20} />,
    selected: true,
  },
};

export const ImageIconExample: Story = {
  args: {
    icon: <ImageIcon size={20} />,
    selected: false,
  },
};

export const FileIconExample: Story = {
  args: {
    icon: <FileTextIcon size={20} />,
    selected: true,
  },
};

export const IconGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <IconSelector icon={<FolderIcon size={20} />} />
      <IconSelector icon={<ImageIcon size={20} />} />
      <IconSelector icon={<FileTextIcon size={20} />} />
      <IconSelector icon={<FolderIcon size={20} />} selected />
      <IconSelector icon={<ImageIcon size={20} />} selected />
      <IconSelector icon={<FileTextIcon size={20} />} selected />
    </div>
  ),
};