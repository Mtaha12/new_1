import { ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline';

type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

type TextAlign = 'left' | 'center' | 'right' | 'justify';

type TextColor = 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning' | 'info' | 'inherit';

interface TypographyProps {
  variant?: TextVariant;
  component?: ElementType;
  className?: string;
  children: ReactNode;
  weight?: TextWeight;
  align?: TextAlign;
  color?: TextColor;
  noWrap?: boolean;
  gutterBottom?: boolean;
  gutterTop?: boolean;
  transform?: 'uppercase' | 'lowercase' | 'capitalize' | 'normal-case';
}

const variantMapping: Record<TextVariant, { component: string; className: string }> = {
  h1: {
    component: 'h1',
    className: 'text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
  },
  h2: {
    component: 'h2',
    className: 'text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight',
  },
  h3: {
    component: 'h3',
    className: 'text-2xl md:text-3xl lg:text-4xl font-bold',
  },
  h4: {
    component: 'h4',
    className: 'text-xl md:text-2xl lg:text-3xl font-semibold',
  },
  h5: {
    component: 'h5',
    className: 'text-lg md:text-xl lg:text-2xl font-semibold',
  },
  h6: {
    component: 'h6',
    className: 'text-base md:text-lg lg:text-xl font-semibold',
  },
  subtitle1: {
    component: 'h6',
    className: 'text-lg font-medium text-gray-600 dark:text-gray-400',
  },
  subtitle2: {
    component: 'h6',
    className: 'text-base font-medium text-gray-600 dark:text-gray-400',
  },
  body1: {
    component: 'p',
    className: 'text-base leading-relaxed',
  },
  body2: {
    component: 'p',
    className: 'text-sm leading-relaxed',
  },
  caption: {
    component: 'span',
    className: 'text-xs text-gray-500 dark:text-gray-400',
  },
  overline: {
    component: 'span',
    className: 'text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400',
  },
};

const weightClasses: Record<TextWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
};

const colorClasses: Record<TextColor, string> = {
  primary: 'text-gray-900 dark:text-white',
  secondary: 'text-gray-600 dark:text-gray-300',
  muted: 'text-gray-500 dark:text-gray-400',
  error: 'text-red-600 dark:text-red-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
  info: 'text-blue-600 dark:text-blue-400',
  inherit: 'text-inherit',
};

export function Typography({
  variant = 'body1',
  component,
  className = '',
  children,
  weight,
  align = 'left',
  color = 'primary',
  noWrap = false,
  gutterBottom = false,
  gutterTop = false,
  transform,
  ...props
}: TypographyProps) {
  const Component = component || variantMapping[variant].component || 'span';

  const baseClasses = twMerge(
    variantMapping[variant]?.className || '',
    weight && weightClasses[weight],
    `text-${align}`,
    colorClasses[color],
    noWrap && 'whitespace-nowrap',
    gutterBottom && 'mb-4',
    gutterTop && 'mt-4',
    transform && transform,
    className
  );

  return (
    <Component className={baseClasses} {...props}>
      {children}
    </Component>
  );
}

// Convenience component exports
export const H1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" {...props} />
);

export const H2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" {...props} />
);

export const H3 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" {...props} />
);

export const H4 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h4" {...props} />
);

export const H5 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h5" {...props} />
);

export const H6 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h6" {...props} />
);

export const Subtitle1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtitle1" {...props} />
);

export const Subtitle2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtitle2" {...props} />
);

export const Body1 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body1" {...props} />
);

export const Body2 = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="body2" {...props} />
);

export const Caption = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="caption" {...props} />
);

export const Overline = (props: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="overline" {...props} />
);

export default Typography;
