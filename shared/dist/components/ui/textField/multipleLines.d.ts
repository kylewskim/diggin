export interface MultipleLinesTextFieldProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    size: 'md' | 'lg';
    isDisabled: boolean;
    error: boolean;
    placeholder: string;
}
export declare const MultipleLinesTextField: import("react").ForwardRefExoticComponent<MultipleLinesTextFieldProps & import("react").RefAttributes<HTMLTextAreaElement>>;
