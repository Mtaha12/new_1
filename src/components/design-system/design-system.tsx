import { ReactNode } from 'react';
import { colors, shadows, typography, transitions, borderRadii, spacing } from '@/styles/theme';

// Button Component with consistent styling
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border border-neutral-300 bg-transparent hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800',
    ghost: 'hover:bg-neutral-100 dark:hover:bg-neutral-800',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 py-2 px-4',
    lg: 'h-11 px-6 text-lg',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Card Component with consistent styling
export const Card = ({
  children,
  className = '',
  ...props
}: {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}) => (
  <div
    className={`bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Input Component with consistent styling
export const Input = ({
  label,
  error,
  className = '',
  ...props
}: {
  label?: string;
  error?: string;
  className?: string;
  [key: string]: any;
}) => (
  <div className={`w-full ${className}`}>
    {label && (
      <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
        {label}
      </label>
    )}
    <input
      className={`w-full px-3 py-2 border ${
        error ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'
      } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white`}
      {...props}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

// Container Component with consistent max-width and padding
export const Container = ({
  children,
  size = 'lg',
  className = '',
  ...props
}: {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  [key: string]: any;
}) => {
  const maxWidth = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    '2xl': 'max-w-screen-2xl',
    '3xl': 'max-w-screen-3xl',
  }[size];

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${maxWidth} ${className}`} {...props}>
      {children}
    </div>
  );
};

// Typography Components
export const H1 = ({ children, className = '', ...props }: { children: ReactNode; className?: string; [key: string]: any }) => (
  <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight ${className}`} {...props}>
    {children}
  </h1>
);

export const H2 = ({ children, className = '', ...props }: { children: ReactNode; className?: string; [key: string]: any }) => (
  <h2 className={`text-3xl font-bold tracking-tight ${className}`} {...props}>
    {children}
  </h2>
);

export const H3 = ({ children, className = '', ...props }: { children: ReactNode; className?: string; [key: string]: any }) => (
  <h3 className={`text-2xl font-bold ${className}`} {...props}>
    {children}
  </h3>
);

export const P = ({ children, className = '', ...props }: { children: ReactNode; className?: string; [key: string]: any }) => (
  <p className={`text-base text-neutral-700 dark:text-neutral-300 ${className}`} {...props}>
    {children}
  </p>
);

// Section Component with consistent spacing
export const Section = ({
  children,
  className = '',
  padding = 'md',
  ...props
}: {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  [key: string]: any;
}) => {
  const paddingMap = {
    none: 'py-0',
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-20',
    xl: 'py-24',
    '2xl': 'py-32',
  };

  return (
    <section className={`${paddingMap[padding]} ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
};

// Export all design tokens for direct usage
export const theme = {
  colors,
  shadows,
  typography,
  transitions,
  borderRadii,
  spacing,
};

// Export all components
export default {
  Button,
  Card,
  Input,
  Container,
  H1,
  H2,
  H3,
  P,
  Section,
  theme,
};
