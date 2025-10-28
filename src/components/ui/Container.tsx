import { ElementType, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type ContainerProps<T extends ElementType = 'div'> = {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  as?: T;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full';
} & React.ComponentPropsWithoutRef<T>;

const maxWidthMap = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  '3xl': 'max-w-[1600px]',
  '4xl': 'max-w-[1800px]',
  '5xl': 'max-w-[2000px]',
  '6xl': 'max-w-[2200px]',
  '7xl': 'max-w-[2400px]',
  full: 'max-w-full',
};

const paddingMap = {
  none: 'p-0',
  sm: 'p-4 sm:p-6',
  md: 'p-6 sm:p-8',
  lg: 'p-8 sm:p-10',
  xl: 'p-10 sm:p-12',
  '2xl': 'p-12 sm:p-16',
};

export function Container<T extends ElementType = 'div'>({
  children,
  className,
  size = 'lg',
  as: Component = 'div' as T,
  padding = 'md',
  maxWidth = '2xl',
  ...props
}: ContainerProps<T>) {
  return (
    <Component
      className={twMerge(
        'w-full mx-auto',
        maxWidth && maxWidthMap[maxWidth],
        padding && paddingMap[padding],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function SectionContainer({
  children,
  className,
  ...props
}: Omit<ContainerProps, 'size'>) {
  return (
    <Container
      as="section"
      className={twMerge('py-12 md:py-16 lg:py-20 xl:py-24', className)}
      {...props}
    >
      {children}
    </Container>
  );
}

export function PageContainer({
  children,
  className,
  ...props
}: Omit<ContainerProps, 'size'>) {
  return (
    <Container
      as="main"
      className={twMerge('min-h-screen py-8 sm:py-12', className)}
      {...props}
    >
      {children}
    </Container>
  );
}
