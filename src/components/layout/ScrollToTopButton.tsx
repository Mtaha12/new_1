'use client';

import { useCallback, useEffect, useState } from 'react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback(() => {
    const shouldShow = window.scrollY > 240;
    setIsVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    if (typeof window === 'undefined') {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="hover-glow"
      style={{
        position: 'fixed',
        bottom: 'calc(2rem + 80px)',
        right: '2rem',
        zIndex: 1000,
        width: '48px',
        height: '48px',
        borderRadius: '999px',
        background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 70%)',
        color: '#fff',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        boxShadow: '0 16px 32px rgba(10, 14, 61, 0.25)'
      }}
    >
      ↑
    </button>
  );
}
