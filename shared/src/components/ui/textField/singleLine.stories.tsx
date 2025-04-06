import type { Meta, StoryObj } from '@storybook/react';
import { SingleLineTextField } from './singleLine';

const meta = {
  title: 'Components/TextField/SingleLine',
  component: SingleLineTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the text field'
    },
    error: {
      control: 'boolean',
      description: 'Whether the text field has an error'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the text field is disabled'
    },
    value: {
      control: 'text',
      description: 'The value of the text field'
    }
  },
} satisfies Meta<typeof SingleLineTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
    size: 'md',
    isDisabled: false,
    error: false
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter text here',
    size: 'md',
    value: 'Hello World',
    isDisabled: false,
    error: false
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small text field',
    size: 'sm',
    isDisabled: false,
    error: false
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large text field',
    size: 'lg',
    isDisabled: false,
    error: false
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled text field',
    size: 'md',
    isDisabled: true,
    error: false
  },
};

export const WithError: Story = {
  args: {
    placeholder: 'Error text field',
    size: 'md',
    isDisabled: false,
    error: true
  },
}; 