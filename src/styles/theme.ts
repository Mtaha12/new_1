// Design Tokens
export const colors = {
  // Primary brand colors
  primary: {
    DEFAULT: '#0a0e3d',
    light: '#69E8E1',
    dark: '#060926',
    contrast: '#ffffff',
  },
  // Secondary brand colors
  secondary: {
    DEFAULT: '#59078F',
    light: '#8307FF',
    dark: '#3D0563',
  },
  // Status colors
  success: {
    DEFAULT: '#06C79A',
    light: '#E6F9F4',
    dark: '#059B7A',
  },
  warning: {
    DEFAULT: '#F7B500',
    light: '#FFEFCC',
    dark: '#CC9400',
  },
  error: {
    DEFAULT: '#F53D5C',
    light: '#FEE8EC',
    dark: '#CC2D46',
  },
  info: {
    DEFAULT: '#0063F7',
    light: '#E6F0FF',
    dark: '#004EC4',
  },
  // Neutral colors
  neutral: {
    50: '#F8F9FA',
    100: '#F1F3F5',
    200: '#E9ECEF',
    300: '#DEE2E6',
    400: '#CED4DA',
    500: '#ADB5BD',
    600: '#868E96',
    700: '#495057',
    800: '#343A40',
    900: '#212529',
  },
};

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  DEFAULT: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  '2xl': '0 30px 60px -15px rgba(0, 0, 0, 0.3)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  none: 'none',
  glow: '0 0 15px rgba(105, 232, 225, 0.5)',
};

export const typography = {
  h1: 'text-4xl md:text-5xl font-extrabold tracking-tight',
  h2: 'text-3xl md:text-4xl font-bold tracking-tight',
  h3: 'text-2xl md:text-3xl font-bold',
  h4: 'text-xl md:text-2xl font-semibold',
  h5: 'text-lg md:text-xl font-semibold',
  h6: 'text-base md:text-lg font-semibold',
  body: 'text-base text-neutral-700',
  small: 'text-sm text-neutral-500',
  caption: 'text-xs text-neutral-400',
};

export const transitions = {
  default: 'all 0.3s ease-in-out',
  fast: 'all 0.15s ease-in-out',
  slow: 'all 0.5s ease-in-out',
};

export const borderRadii = {
  none: '0',
  sm: '0.25rem',
  DEFAULT: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
};

export const spacing = {
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
  '40': '10rem',
  '48': '12rem',
  '56': '14rem',
  '64': '16rem',
};

// Common component styles
export const buttonStyles = {
  base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
  variants: {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary',
    outline: 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus:ring-primary',
    ghost: 'bg-transparent hover:bg-neutral-100 text-neutral-700 focus:ring-primary',
    link: 'bg-transparent text-primary hover:underline focus:ring-primary',
  },
};

export const cardStyles = {
  base: 'bg-white rounded-lg overflow-hidden',
  shadow: 'shadow-md hover:shadow-lg transition-shadow duration-300',
  bordered: 'border border-neutral-200',
  padding: 'p-6',
};

export const inputStyles = {
  base: 'w-full px-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors',
  error: 'border-error focus:ring-error',
  disabled: 'bg-neutral-100 cursor-not-allowed',
};

// Animation keyframes
export const keyframes = {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  },
  slideIn: {
    '0%': { transform: 'translateY(20px)', opacity: '0' },
    '100%': { transform: 'translateY(0)', opacity: '1' },
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
};

// Animation utilities
export const animation = {
  fadeIn: 'fadeIn 0.5s ease-out',
  slideIn: 'slideIn 0.5s ease-out',
  pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
};

// Z-index scale
export const zIndex = {
  hide: '-1',
  auto: 'auto',
  base: '0',
  docked: '10',
  dropdown: '1000',
  sticky: '1100',
  banner: '1200',
  overlay: '1300',
  modal: '1400',
  popover: '1500',
  skipLink: '1600',
  toast: '1700',
  tooltip: '1800',
};

// Export all design tokens
export default {
  colors,
  shadows,
  typography,
  transitions,
  borderRadii,
  spacing,
  buttonStyles,
  cardStyles,
  inputStyles,
  keyframes,
  animation,
  zIndex,
};
