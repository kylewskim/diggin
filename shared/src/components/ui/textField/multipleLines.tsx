import { forwardRef } from 'react';
import { cn } from '../../../utils/cn';

export interface MultipleLinesTextFieldProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  size: 'md' | 'lg';
  isDisabled: boolean;
  error: boolean;
  placeholder: string;
}

const sizeStyles = {
  md: 'w-[304px] h-[96px] text-body-md-rg', // 96px height
  lg: 'w-[304px] h-[168px] text-body-md-rg' // 168px height
};

const statusStyles = {
  default: 'bg-fill-onsurface-light dark:bg-fill-onsurface-dark text-text-primary-light dark:text-text-primary-dark placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark',
  disabled: 'bg-fill-disabled-light dark:bg-fill-disabled-dark placeholder:text-text-disabled-light dark:placeholder:text-text-disabled-dark cursor-not-allowed'
};

export const MultipleLinesTextField = forwardRef<HTMLTextAreaElement, MultipleLinesTextFieldProps>(
  ({ size = 'md', className, isDisabled, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          // Base styles
          'text-body-md-rg',
          'w-[304px] p-3 rounded-lg outline-none transition-colors',
          'resize-none overflow-y-auto',
          // Size styles
          sizeStyles[size],
          // Status styles
          isDisabled ? statusStyles.disabled : statusStyles.default,
          // Error styles
          error && 'border-border-error-light dark:border-border-error-dark',
          // Scrollbar styles
          'scrollbar scrollbar-w-1 scrollbar-track-transparent scrollbar-thumb-border-primary-light dark:scrollbar-thumb-border-primary-dark hover:scrollbar-thumb-border-secondary-light dark:hover:scrollbar-thumb-border-secondary-dark',
          className
        )}
        disabled={isDisabled}
        {...props}
      />
    );
  }
);

MultipleLinesTextField.displayName = 'MultipleLinesTextField'; 