import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

// Icon component for demo purposes
const SearchIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 14L11.1 11.1"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const meta = {
  title: 'Components/Button',
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
    status: {
      control: 'select',
      options: ['default', 'hover', 'disabled'],
    },
    isIconOnly: {
      control: 'boolean',
    },
    showTooltip: {
      control: 'boolean',
    },
    showLeftIcon: {
      control: 'boolean',
    },
    showRightIcon: {
      control: 'boolean',
    },
    leftIcon: {
      control: { type: null },
      description: 'Left icon component',
    },
    rightIcon: {
      control: { type: null },
      description: 'Right icon component',
    },
    tooltip: {
      control: 'text',
      description: 'Tooltip text',
      if: { arg: 'showTooltip', truthy: true },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Primary Button Stories
export const PrimaryDefault: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    status: 'default',
    isIconOnly: false,
    leftIcon: <SearchIcon />,
    rightIcon: <SearchIcon />,
  },
}

export const PrimaryHover: Story = {
  args: {
    ...PrimaryDefault.args,
    status: 'hover',
  },
}

export const PrimaryDisabled: Story = {
  args: {
    ...PrimaryDefault.args,
    status: 'disabled',
  },
}

// Secondary Button Stories
export const SecondaryDefault: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    size: 'md',
    status: 'default',
    isIconOnly: false,
    leftIcon: <SearchIcon />,
    rightIcon: <SearchIcon />,
  },
}

export const SecondaryHover: Story = {
  args: {
    ...SecondaryDefault.args,
    status: 'hover',
  },
}

export const SecondaryDisabled: Story = {
  args: {
    ...SecondaryDefault.args,
    status: 'disabled',
  },
}

// Tertiary Button Stories
export const TertiaryDefault: Story = {
  args: {
    children: 'Button',
    variant: 'tertiary',
    size: 'md',
    status: 'default',
    isIconOnly: false,
    leftIcon: <SearchIcon />,
    rightIcon: <SearchIcon />,
  },
}

export const TertiaryHover: Story = {
  args: {
    ...TertiaryDefault.args,
    status: 'hover',
  },
}

export const TertiaryDisabled: Story = {
  args: {
    ...TertiaryDefault.args,
    status: 'disabled',
  },
}

// Icon Button Stories
export const IconOnlyPrimary: Story = {
  args: {
    leftIcon: <SearchIcon />,
    variant: 'primary',
    size: 'md',
    status: 'default',
    isIconOnly: true,
    showTooltip: true,
    tooltip: 'Search',
  },
}

export const WithLeftIcon: Story = {
  args: {
    children: 'Search',
    leftIcon: <SearchIcon />,
    showLeftIcon: true,
    variant: 'primary',
    size: 'md',
    status: 'default',
    isIconOnly: false,
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Search',
    rightIcon: <SearchIcon />,
    showRightIcon: true,
    variant: 'primary',
    size: 'md',
    status: 'default',
    isIconOnly: false,
  },
}

// Size Variants
export const Small: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'sm',
    status: 'default',
    isIconOnly: false,
    leftIcon: <SearchIcon />,
    rightIcon: <SearchIcon />,
  },
}

export const Medium: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    status: 'default',
    isIconOnly: false,
    leftIcon: <SearchIcon />,
    rightIcon: <SearchIcon />,
  },
}

export const Large: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'lg',
    status: 'default',
    isIconOnly: false,
    leftIcon: <SearchIcon />,
    rightIcon: <SearchIcon />,
  },
} 