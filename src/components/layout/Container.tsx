import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

// Container variants
const containerVariants = cva('mx-auto w-full', {
  variants: {
    size: {
      sm: 'max-w-3xl',
      md: 'max-w-4xl',
      lg: 'max-w-5xl',
      xl: 'max-w-6xl',
      '2xl': 'max-w-7xl',
      full: 'max-w-full',
    },
    paddingX: {
      none: 'px-0',
      xs: 'px-2 sm:px-4',
      sm: 'px-4 sm:px-6',
      md: 'px-6 sm:px-8',
      lg: 'px-8 sm:px-12',
      xl: 'px-12 sm:px-16',
    },
    paddingY: {
      none: 'py-0',
      xs: 'py-4 sm:py-6',
      sm: 'py-8 sm:py-10',
      md: 'py-12 sm:py-16',
      lg: 'py-16 sm:py-20',
      xl: 'py-20 sm:py-24',
      '2xl': 'py-24 sm:py-32',
    },
  },
  defaultVariants: {
    size: 'xl',
    paddingX: 'md',
    paddingY: 'md',
  },
});

// Background variants
const backgroundVariants = cva('', {
  variants: {
    background: {
      default: 'bg-white/90 backdrop-blur-sm',
      primary: 'bg-primary/90 backdrop-blur-sm text-primary-foreground',
      secondary: 'bg-secondary/90 backdrop-blur-sm text-secondary-foreground',
      muted: 'bg-muted/90 backdrop-blur-sm text-muted-foreground',
      accent: 'bg-accent/90 backdrop-blur-sm text-accent-foreground',
      destructive: 'bg-destructive/90 backdrop-blur-sm text-destructive-foreground',
      card: 'bg-card/90 backdrop-blur-sm text-card-foreground',
      popover: 'bg-popover/90 backdrop-blur-sm text-popover-foreground',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    background: 'default',
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants>,
    VariantProps<typeof backgroundVariants> {
  as?: React.ElementType;
  innerClassName?: string;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      as: Component = 'div',
      className,
      innerClassName,
      size,
      paddingX,
      paddingY,
      background,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'w-full transition-colors',
          backgroundVariants({ background }),
          className
        )}
        {...props}
      >
        <div
          className={cn(
            containerVariants({ size, paddingX, paddingY }),
            innerClassName
          )}
        >
          {children}
        </div>
      </Component>
    );
  }
);

Container.displayName = 'Container';

export { Container, containerVariants, backgroundVariants };
