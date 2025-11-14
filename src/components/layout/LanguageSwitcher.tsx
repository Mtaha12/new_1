// src/components/LanguageSwitcher.tsx
'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface LanguageSwitcherProps {
  size?: number;
}

export default function LanguageSwitcher({ size = 16 }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  
  // Function to generate the target path with the new locale
  const getLocalizedPath = (newLocale: string) => {
    if (!pathname) return `/${newLocale}`;
    const segments = pathname.split('/');
    segments[1] = newLocale; // Replace the locale segment
    return segments.join('/');
  };

  const buttonStyle = useMemo(() => ({
    padding: '0.25rem 0.5rem',
    fontSize: `${size * 0.7}px`,
    minWidth: `${size * 1.5}px`,
    height: `${size * 1.5}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    fontWeight: 500,
    lineHeight: 1,
  }), [size]);

  const activeStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(105, 232, 225, 0.2)',
    color: '#69E8E1',
  };

  const inactiveStyle: React.CSSProperties = {
    ...buttonStyle,
    color: '#94a3b8',
  };
  
  const inactiveHoverStyle: React.CSSProperties = {
    color: '#69E8E1',
    backgroundColor: 'rgba(105, 232, 225, 0.1)',
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '2px',
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '2px',
      borderRadius: '6px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      height: `${size * 1.5}px`,
    }}>
      <Link 
        href={getLocalizedPath('en')}
        style={{
          ...(locale === 'en' ? activeStyle : inactiveStyle),
          ...(locale !== 'en' ? { ':hover': inactiveHoverStyle } : {})
        } as React.CSSProperties}
        onClick={(e) => locale === 'en' && e.preventDefault()}
      >
        EN
      </Link>
      <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>|</span>
      <Link 
        href={getLocalizedPath('ar')}
        style={{
          ...(locale === 'ar' ? activeStyle : inactiveStyle),
          ...(locale !== 'ar' ? { ':hover': inactiveHoverStyle } : {})
        } as React.CSSProperties}
        onClick={(e) => locale === 'ar' && e.preventDefault()}
      >
        AR
      </Link>
    </div>
  );
}