import React, { ReactNode, CSSProperties } from 'react';
import { Container } from './Container';

interface HeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  height?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: ReactNode;
}

const heights = {
  sm: 'min-h-[40vh]',
  md: 'min-h-[50vh]',
  lg: 'min-h-[60vh]',
  xl: 'min-h-[75vh]',
  full: 'min-h-screen',
};

const alignments = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

export default function Hero({
  title,
  subtitle,
  backgroundImage,
  overlayOpacity = 0.7,
  height = 'md',
  align = 'center',
  className = '',
  children,
}: HeroProps) {
  const backgroundStyle: CSSProperties = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(10, 14, 61, ${overlayOpacity}), rgba(10, 14, 61, ${overlayOpacity * 0.8})), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative' as const,
        zIndex: 1,
        marginTop: '-1px', // Fix for potential 1px gap
        marginBottom: '-1px', // Fix for potential 1px gap
      }
    : {
        background: 'transparent',
      };

  return (
    <section
      className={`relative flex ${heights[height]} w-full items-center justify-center overflow-hidden text-white ${className}`}
      style={backgroundStyle}
    >
      <Container className={`relative z-10 ${alignments[align]}`} background="transparent">
        <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto max-w-2xl text-lg text-gray-200 sm:text-xl md:text-2xl">
            {subtitle}
          </p>
        )}
        {children}
      </Container>
    </section>
  );
}
