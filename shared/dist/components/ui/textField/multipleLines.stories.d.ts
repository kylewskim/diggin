import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./multipleLines").MultipleLinesTextFieldProps & import("react").RefAttributes<HTMLTextAreaElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        size: {
            control: "select";
            options: string[];
            description: string;
        };
        error: {
            control: "boolean";
            description: string;
        };
        placeholder: {
            control: "text";
            description: string;
        };
        isDisabled: {
            control: "boolean";
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Large: Story;
export declare const WithLongContent: Story;
export declare const LargeWithLongContent: Story;
export declare const Disabled: Story;
export declare const WithError: Story;
