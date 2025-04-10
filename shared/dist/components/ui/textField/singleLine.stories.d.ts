import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./singleLine").SingleLineTextFieldProps & import("react").RefAttributes<HTMLInputElement>>;
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
        value: {
            control: "text";
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const WithValue: Story;
export declare const Small: Story;
export declare const Large: Story;
export declare const Disabled: Story;
export declare const WithError: Story;
