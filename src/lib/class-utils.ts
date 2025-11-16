import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind classes
 * @param inputs - Class names to be combined
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Creates a variant function for components with consistent styling
 * @param config - Configuration object with base classes and variants
 * @returns A function that generates class names based on props
 */
export function createVariant<T extends Record<string, any>>(config: {
  base: string;
  variants: T;
  defaultVariants?: { [K in keyof T]?: keyof T[K] };
}) {
  return (props: { [K in keyof T]?: keyof T[K] } & { className?: string }) => {
    const { className, ...variantProps } = props;
    const baseClasses = config.base.split(' ');
    const variantClasses = Object.entries(variantProps).map(([key, value]) => {
      if (value && config.variants[key as keyof T]?.[value as string]) {
        return config.variants[key as keyof T]?.[value as string];
      }
      return '';
    });

    return cn(...baseClasses, ...variantClasses, className);
  };
}

/**
 * Generates consistent spacing classes
 * @param direction - Direction of spacing (e.g., 'p', 'm', 'mt', 'px', etc.)
 * @param size - Size of the spacing (e.g., 1, 2, 3, 4, etc.)
 * @returns Tailwind class string for the spacing
 */
export function spacing(direction: string, size: number | string) {
  return `${direction}-${size}`;
}

/**
 * Creates a consistent animation delay for staggered animations
 * @param index - Index of the item in the list
 * @param baseDelay - Base delay in milliseconds (default: 100)
 * @returns CSS custom property for animation delay
 */
export function staggerDelay(index: number, baseDelay = 100) {
  return { '--stagger-delay': `${index * baseDelay}ms` } as React.CSSProperties;
}

/**
 * Generates consistent text styles based on the design system
 * @param variant - Text variant (e.g., 'heading', 'subheading', 'body', 'caption')
 * @param className - Additional classes to merge
 * @returns Combined class names string
 */
export function textStyle(
  variant: 'heading' | 'subheading' | 'title' | 'subtitle' | 'body' | 'caption' | 'button',
  className: string = ''
) {
  const styles = {
    heading: 'text-3xl md:text-4xl font-bold tracking-tight',
    subheading: 'text-xl md:text-2xl font-semibold',
    title: 'text-lg font-medium',
    subtitle: 'text-base text-neutral-600 dark:text-neutral-400',
    body: 'text-base text-neutral-700 dark:text-neutral-300',
    caption: 'text-sm text-neutral-500 dark:text-neutral-400',
    button: 'text-sm font-medium tracking-wide',
  };

  return cn(styles[variant], className);
}

// Export all utility functions
export default {
  cn,
  createVariant,
  spacing,
  staggerDelay,
  textStyle,
};
