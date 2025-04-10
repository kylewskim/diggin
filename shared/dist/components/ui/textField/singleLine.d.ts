export interface SingleLineTextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size: 'sm' | 'md' | 'lg';
    isDisabled: boolean;
    error: boolean;
    placeholder: string;
}
export declare const SingleLineTextField: import("react").ForwardRefExoticComponent<SingleLineTextFieldProps & import("react").RefAttributes<HTMLInputElement>>;
