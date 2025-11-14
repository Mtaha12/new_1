import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { spacing, borderRadii } from '@/styles/theme';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  p?: keyof typeof spacing;
  px?: keyof typeof spacing;
  py?: keyof typeof spacing;
  pt?: keyof typeof spacing;
  pr?: keyof typeof spacing;
  pb?: keyof typeof spacing;
  pl?: keyof typeof spacing;
  m?: keyof typeof spacing;
  mx?: keyof typeof spacing;
  my?: keyof typeof spacing;
  mt?: keyof typeof spacing;
  mr?: keyof typeof spacing;
  mb?: keyof typeof spacing;
  ml?: keyof typeof spacing;
  rounded?: keyof typeof borderRadii;
  className?: string;
  children?: React.ReactNode;
}

const Box = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      as: Component = 'div',
      p,
      px,
      py,
      pt,
      pr,
      pb,
      pl,
      m,
      mx,
      my,
      mt,
      mr,
      mb,
      ml,
      rounded = 'DEFAULT',
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const paddingClasses = [
      p && `p-${p}`,
      px && `px-${px}`,
      py && `py-${py}`,
      pt && `pt-${pt}`,
      pr && `pr-${pr}`,
      pb && `pb-${pb}`,
      pl && `pl-${pl}`,
    ].filter(Boolean);

    const marginClasses = [
      m && `m-${m}`,
      mx && `mx-${mx}`,
      my && `my-${my}`,
      mt && `mt-${mt}`,
      mr && `mr-${mr}`,
      mb && `mb-${mb}`,
      ml && `ml-${ml}`,
    ].filter(Boolean);

    const borderRadiusClass = `rounded-${rounded}`;

    return (
      <Component
        ref={ref}
        className={twMerge(
          'box-border',
          ...paddingClasses,
          ...marginClasses,
          borderRadiusClass,
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Box.displayName = 'Box';

export default Box;
