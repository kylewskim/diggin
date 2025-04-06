import React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  variant: 'primary' | 'secondary' | 'tertiary'
  size: 'lg' | 'md' | 'sm'
  status: 'default' | 'hover' | 'disabled'
  isIconOnly: boolean
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
    status = 'default',
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

    const variantStatusStyles = {
      primary: {
        default: cn(
          'bg-fill-primary-light dark:bg-fill-primary-dark',
          'text-text-inverted-light dark:text-text-inverted-dark',
          '[&_svg]:text-icon-inverted-light dark:[&_svg]:text-icon-inverted-dark'
        ),
        hover: cn(
          'bg-gray-850 dark:bg-gray-100',
          'text-text-inverted-light dark:text-text-inverted-dark',
          '[&_svg]:text-icon-inverted-light dark:[&_svg]:text-icon-inverted-dark'
        ),
        disabled: cn(
          'bg-fill-disabled-light dark:bg-fill-disabled-dark',
          'text-text-disabled-light dark:text-text-disabled-dark',
          '[&_svg]:text-icon-disabled-light dark:[&_svg]:text-icon-disabled-dark',
          'cursor-not-allowed'
        )
      },
      secondary: {
        default: cn(
          'bg-fill-secondary-light dark:bg-fill-secondary-dark',
          'text-text-primary-light dark:text-text-primary-dark',
          'border border-line-secondary-light dark:border-line-secondary-dark'
        ),
        hover: cn(
          'bg-gray-50 dark:bg-gray-800',
          'text-text-primary-light dark:text-text-primary-dark',
          'border border-line-secondary-light dark:border-line-secondary-dark'
        ),
        disabled: cn(
        //   'bg-fill-disabled-light dark:bg-fill-disabled-dark',
          'text-text-disabled-light dark:text-text-disabled-dark',
          'border border-line-disabled-light dark:border-line-disabled-dark',
          'cursor-not-allowed'
        )
      },
      tertiary: {
        default: cn(
          'bg-transparent',
          'text-text-primary-light dark:text-text-primary-dark'
        ),
        hover: cn(
          'bg-gray-50 dark:bg-gray-800',
          'text-text-primary-light dark:text-text-primary-dark'
        ),
        disabled: cn(
          'bg-transparent',
          'text-text-disabled-light dark:text-text-disabled-dark',
          'cursor-not-allowed'
        )
      }
    }

    const sizeStyles = {
      sm: isIconOnly
        ? 'w-7 h-7'  // 28px x 28px
        : cn(
            'px-3 py-[7px]',
            'min-h-[32px] min-w-[32px]',
            'text-xs font-medium leading-none gap-1.5'
          ),
      md: isIconOnly
        ? 'w-7 h-7'  // 28px x 28px
        : cn(
            'px-4 py-[9px]',
            'min-h-[40px] min-w-[40px]',
            'text-sm font-medium leading-none gap-2'
          ),
      lg: isIconOnly
        ? 'w-7 h-7'  // 28px x 28px
        : cn(
            'px-5 py-[11px]',
            'min-h-[48px] min-w-[48px]',
            'text-base font-medium leading-none gap-2'
          )
    }

    const iconColorStyles = {
      primary: {
        default: '[&_svg]:text-icon-inverted-light dark:[&_svg]:text-icon-inverted-dark',
        hover: '[&_svg]:text-icon-inverted-light dark:[&_svg]:text-icon-inverted-dark',
        disabled: '[&_svg]:text-icon-disabled-light dark:[&_svg]:text-icon-disabled-dark'
      },
      secondary: {
        default: '[&_svg]:text-icon-primary-light dark:[&_svg]:text-icon-primary-dark',
        hover: '[&_svg]:text-icon-primary-light dark:[&_svg]:text-icon-primary-dark',
        disabled: '[&_svg]:text-icon-disabled-light dark:[&_svg]:text-icon-disabled-dark'
      },
      tertiary: {
        default: '[&_svg]:text-icon-primary-light dark:[&_svg]:text-icon-primary-dark',
        hover: '[&_svg]:text-icon-primary-light dark:[&_svg]:text-icon-primary-dark',
        disabled: '[&_svg]:text-icon-disabled-light dark:[&_svg]:text-icon-disabled-dark'
      }
    }

    const iconSizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
      withText: 'w-4 h-4'
    }

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          baseStyles,
          variantStatusStyles[variant][status],
          sizeStyles[size],
          isIconOnly && 'flex items-center justify-center p-0',
          className
        )}
        {...props}
      >
        {showLeftIcon && leftIcon && !isIconOnly && (
          <span className={cn(
            iconSizeStyles.withText,
            iconColorStyles[variant][status],
            'flex items-center justify-center'
          )}>
            {leftIcon}
          </span>
        )}
        {!isIconOnly && children}
        {isIconOnly && leftIcon && (
          <span className={cn(
            'w-4 h-4',
            iconColorStyles[variant][status],
            'flex items-center justify-center'
          )}>
            {leftIcon}
          </span>
        )}
        {showRightIcon && rightIcon && !isIconOnly && (
          <span className={cn(
            iconSizeStyles.withText,
            iconColorStyles[variant][status],
            'flex items-center justify-center'
          )}>
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