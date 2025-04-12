import React from 'react'
import { cn } from '@/utils'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant: 'primary' | 'secondary' | 'tertiary'
  size: 'sm' | 'md' | 'lg'
  disabled?: boolean
  isIconOnly?: boolean
  showTooltip?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  showLeftIcon?: boolean
  showRightIcon?: boolean
  tooltip?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    disabled = false,
    isIconOnly = false,
    showTooltip = false,
    leftIcon,
    rightIcon,
    showLeftIcon = false,
    showRightIcon = false,
    tooltip,
    className,
    children,
    ...props
  }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center rounded-lg transition-colors duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-line-primary-light dark:focus-visible:ring-line-primary-dark focus-visible:ring-offset-2',
      'relative group'
    )

    const variantStyles = {
      primary: cn(
        'bg-fill-primary-light dark:bg-fill-primary-dark',
        'text-text-inverted-light dark:text-text-inverted-dark',
        'hover:bg-gray-850 dark:hover:bg-gray-100',
        'disabled:bg-fill-disabled-light dark:disabled:bg-fill-disabled-dark',
        'disabled:text-text-disabled-light dark:disabled:text-text-disabled-dark',
        'disabled:cursor-not-allowed'
      ),
      secondary: cn(
        'bg-fill-secondary-light dark:bg-fill-secondary-dark',
        'text-text-primary-light dark:text-text-primary-dark',
        'border border-line-secondary-light dark:border-line-secondary-dark',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        'disabled:text-text-disabled-light dark:disabled:text-text-disabled-dark',
        'disabled:border-line-disabled-light dark:disabled:border-line-disabled-dark',
        'disabled:cursor-not-allowed'
      ),
      tertiary: cn(
        'bg-transparent',
        'text-text-primary-light dark:text-text-primary-dark',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        'disabled:text-text-disabled-light dark:disabled:text-text-disabled-dark',
        'disabled:cursor-not-allowed'
      )
    }

    const sizeStyles = {
      sm: isIconOnly
        ? 'w-7 h-7'  // 28px x 28px
        : cn(
            'px-4',
            'h-[32px] min-w-[100px]',
            'text-body-md-md leading-none gap-1.5'
          ),
      md: isIconOnly
        ? 'w-9 h-9'  // 28px x 28px
        : cn(
            'px-4',
            'h-[40px] min-w-[100px]',
            'text-body-md-md leading-none gap-2'
          ),
      lg: isIconOnly
        ? 'w-9 h-9'  // 36px x 36px
        : cn(
            'px-5',
            'h-[48px] min-w-[100px]',
            'text-body-lg-md leading-none gap-2'
          )
    }

    // const iconColorStyles = {
    //   primary: cn(
    //     '[&_svg]:text-icon-inverted-light dark:[&_svg]:text-icon-inverted-dark',
    //     'disabled:[&_svg]:text-icon-disabled-light dark:disabled:[&_svg]:text-icon-disabled-dark'
    //   ),
    //   secondary: cn(
    //     '[&_svg]:text-icon-primary-light dark:[&_svg]:text-icon-primary-dark',
    //     'disabled:[&_svg]:text-icon-disabled-light dark:disabled:[&_svg]:text-icon-disabled-dark'
    //   ),
    //   tertiary: cn(
    //     '[&_svg]:text-icon-primary-light dark:[&_svg]:text-icon-primary-dark',
    //     'disabled:[&_svg]:text-icon-disabled-light dark:disabled:[&_svg]:text-icon-disabled-dark'
    //   )
    // }
    const iconColorStyles = {
      primary: cn(
        '[&_svg]:text-icon-inverted-light dark:[&_svg]:text-icon-inverted-dark',
        'disabled:[&_svg]:text-icon-disabled-light dark:disabled:[&_svg]:text-icon-disabled-dark'
      ),
      secondary: cn(
        '[&_svg]:text-icon-primary-light dark:[&_svg]:text-icon-primary-dark',
        'disabled:[&_svg]:text-icon-disabled-light dark:disabled:[&_svg]:text-icon-disabled-dark'
      ),
      tertiary: cn(
        '[&_svg]:text-icon-primary-light dark:[&_svg]:text-icon-primary-dark',
        'disabled:[&_svg]:text-icon-disabled-light dark:disabled:[&_svg]:text-icon-disabled-dark'
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          iconColorStyles[variant],
          isIconOnly && 'flex items-center justify-center p-0',
          isIconOnly ? (
            size === 'sm' ? '[&_svg]:w-4 [&_svg]:h-4' : 
            size === 'md' ? '[&_svg]:w-5 [&_svg]:h-5' : 
            '[&_svg]:w-6 [&_svg]:h-6'
          ) : '[&_svg]:w-4 [&_svg]:h-4',
          className
        )}
        {...props}
      >
        {showLeftIcon && leftIcon && !isIconOnly && (
          <span className="flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        {!isIconOnly && children}
        {isIconOnly && leftIcon && (
          <span className="flex items-center justify-center">
            {leftIcon}
          </span>
        )}
        {showRightIcon && rightIcon && !isIconOnly && (
          <span className="flex items-center justify-center">
            {rightIcon}
          </span>
        )}
        {isIconOnly && showTooltip && tooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-fill-dim50-light/50 dark:bg-fill-dim50-dark/50 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-text-inverted-light dark:text-text-inverted-dark text-xs font-medium leading-none whitespace-nowrap">
              {tooltip}
            </span>
          </div>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button' 