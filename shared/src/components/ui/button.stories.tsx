import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'
import { SearchIcon, FilterIcon } from '../../icons'
import * as Icons from '../../icons';


const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    showLeftIcon: {
      control: 'boolean',
    },
    showRightIcon: {
      control: 'boolean',
    },
    showTooltip: {
      control: 'boolean',
    },
    tooltip: {
      control: 'text',
      if: { arg: 'showTooltip' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Primary Button Stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
    showLeftIcon: true,
    showRightIcon: true,
    leftIcon: <Icons.CheckIcon />,
    rightIcon: <Icons.CheckIcon />,
  },
}

// Secondary Button Stories
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    children: 'Button',
    showLeftIcon: true,
    showRightIcon: true,
    leftIcon: <Icons.CheckIcon />,
    rightIcon: <Icons.CheckIcon />,
  },
}

// Tertiary Button Stories
export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    size: 'md',
    children: 'Button',
    showLeftIcon: true,
    showRightIcon: true,
    leftIcon: <Icons.CheckIcon />,
    rightIcon: <Icons.CheckIcon />,
  },
}

// Size Variants
export const SizeVariants: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button',
    showLeftIcon: true,
    showRightIcon: true,
    leftIcon: <Icons.CheckIcon />,
    rightIcon: <Icons.CheckIcon />,
  },
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Button {...args} size="sm" />
      <Button {...args} size="md" />
    </div>
  ),
} 
