import { ChangeEvent, forwardRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface SingleLineTextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size: 'sm' | 'md' | 'lg';
  isDisabled: boolean;
  error: boolean;
  placeholder: string;
}

const sizeStyles = {
  sm: 'h-8 text-body-md-regular pl-3 pr-[40px]',  // 32px height, left: 12px, right: 40px (12px + 28px)
  md: 'h-10 text-body-md-regular pl-3 pr-[40px]', // 40px height, left: 12px, right: 40px (12px + 28px)
  lg: 'h-12 text-body-md-regular pl-3 pr-[44px]'  // 48px height, left: 12px, right: 44px (16px + 28px)
};

const iconPositionStyles = {
  sm: 'right-3', // 12px from right
  md: 'right-3', // 12px from right
  lg: 'right-4'  // 16px from right
};

const statusStyles = {
  default: 'bg-fill-onsurface-light dark:bg-fill-onsurface-dark text-text-primary-light dark:text-text-primary-dark placeholder:text-text-tertiary-light dark:placeholder:text-text-tertiary-dark',
  disabled: 'bg-fill-disabled-light dark:bg-fill-disabled-dark placeholder:text-text-disabled-light dark:placeholder:text-text-disabled-dark cursor-not-allowed'
};

export const SingleLineTextField = forwardRef<HTMLInputElement, SingleLineTextFieldProps>(
  ({ size = 'md', className, isDisabled, error, onChange, value, defaultValue, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value || defaultValue || '');
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      setInputValue('');
      const event = new Event('input', { bubbles: true });
      const input = ref as React.MutableRefObject<HTMLInputElement>;
      if (input.current) {
        Object.defineProperty(event, 'target', { value: input.current });
        input.current.value = '';
        input.current.dispatchEvent(event);
      }
    };

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleChange}
          className={cn(
            // Base styles
            'w-full rounded-lg outline-none transition-colors',
            // Size styles
            sizeStyles[size],
            // Status styles
            isDisabled ? statusStyles.disabled : statusStyles.default,
            // Error styles
            error && 'border-border-error-light dark:border-border-error-dark',
            className
          )}
          disabled={isDisabled}
          {...props}
        />
        {inputValue && !isDisabled && (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              'absolute top-1/2 -translate-y-1/2',
              iconPositionStyles[size],
              'text-icon-secondary-light dark:text-icon-secondary-dark',
              'focus:outline-none'
            )}
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  }
);

SingleLineTextField.displayName = 'SingleLineTextField'; 