import type { Meta, StoryObj } from '@storybook/react';
import { MultipleLinesTextField } from './multipleLines';

const meta = {
  title: 'Components/TextField/MultipleLines',
  component: MultipleLinesTextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['md', 'lg'],
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
    }
  },
} satisfies Meta<typeof MultipleLinesTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const longText = `This is a long text that demonstrates the scrolling behavior of the multiple lines text field.
It contains multiple lines to show how the component handles overflow content.
Line 3 of the content
Line 4 of the content
Line 5 of the content
Line 6 of the content
Line 7 of the content
Line 8 of the content
Line 9 of the content
Line 10 of the content`;

export const Default: Story = {
  args: {
    placeholder: 'Enter text here',
    size: 'md',
    isDisabled: false,
    error: false
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Enter text here',
    size: 'lg',
    isDisabled: false,
    error: false
  },
};

export const WithLongContent: Story = {
  args: {
    placeholder: 'Enter text here',
    size: 'md',
    defaultValue: longText,
    isDisabled: false,
    error: false
  },
};

export const LargeWithLongContent: Story = {
  args: {
    placeholder: 'Enter text here',
    size: 'lg',
    defaultValue: longText,
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