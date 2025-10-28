"use client";

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

// Types
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'danger';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  asChild?: boolean;
}

// Variant styles
const variantStyles = {
  // Primary
  primary: 'bg-primary text-white hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary/50',
  // Secondary
  secondary: 'bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-2 focus-visible:ring-secondary/50',
  // Outline
  outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800',
  // Ghost
  ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
  // Link
  link: 'text-primary underline-offset-4 hover:underline',
  // Danger
  danger: 'bg-error text-white hover:bg-error/90 focus-visible:ring-2 focus-visible:ring-error/50',
} as const;

// Size styles
const sizeStyles = {
  xs: 'h-7 rounded px-2 text-xs',
  sm: 'h-9 rounded-md px-3 text-sm',
  md: 'h-10 rounded-lg px-4 py-2 text-base',
  lg: 'h-11 rounded-lg px-8 text-lg',
  xl: 'h-14 rounded-xl px-10 text-xl',
} as const;

// Icon sizes
const iconSizes = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
} as const;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || isLoading;
    const iconSize = iconSizes[size];

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={twMerge(
          'inline-flex items-center justify-center font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50',
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 h-4 w-4 animate-spin">
            <svg
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
        {leftIcon && !isLoading && (
          <span className={twMerge('mr-2', iconSize)}>{leftIcon}</span>
        )}
        {children}
        {rightIcon && (
          <span className={twMerge('ml-2', iconSize)}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;