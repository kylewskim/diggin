import type { StoryObj } from '@storybook/react';
declare const meta: {
    title: string;
    component: import("react").ForwardRefExoticComponent<import("./button").ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        variant: {
            control: "select";
            options: string[];
        };
        size: {
            control: "select";
            options: string[];
        };
        disabled: {
            control: "boolean";
        };
        showLeftIcon: {
            control: "boolean";
        };
        showRightIcon: {
            control: "boolean";
        };
        showTooltip: {
            control: "boolean";
        };
        tooltip: {
            control: "text";
            if: {
                arg: string;
            };
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Tertiary: Story;
export declare const SizeVariants: Story;
