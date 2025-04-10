import React from 'react';
export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
    variant: 'primary' | 'secondary' | 'tertiary';
    size: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    isIconOnly?: boolean;
    showTooltip?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    showLeftIcon?: boolean;
    showRightIcon?: boolean;
    tooltip?: string;
}
export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;
