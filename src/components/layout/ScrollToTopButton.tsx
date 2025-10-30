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

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className="hover-glow"
      style={{
        width: '56px',
        height: '56px',
        borderRadius: '9999px',
        background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 70%)',
        color: '#ffffff',
        border: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        boxShadow: '0 8px 24px rgba(10, 14, 61, 0.25)',
        cursor: isVisible ? 'pointer' : 'default',
        transition: 'all 250ms ease',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transform: isVisible ? 'scale(1)' : 'scale(0.9)'
      }}
    >
      ↑
    </button>
  );
}
