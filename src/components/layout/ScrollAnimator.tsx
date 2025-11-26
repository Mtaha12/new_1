'use client';

import { useEffect } from 'react';

const SELECTORS = [
  '.fade-section',
  '.tilt-card',
  '.glow-button',
  '.pulse-border',
  '.parallax-wrap',
  '.rise-in',
  '.glow-card'
].join(',');

export default function ScrollAnimator() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const root = document.documentElement;
    const elements = () => Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));
    const revealInView = () => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      elements().forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportHeight * 0.9 && rect.bottom >= viewportHeight * -0.05) {
          element.classList.add('is-visible');
        }
      });
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      elements().forEach((element) => {
        element.classList.add('is-visible');
      });
      return;
    }

    root.classList.add('has-animations');
    revealInView();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -12%'
      }
    );

    const register = () => {
      elements().forEach((element) => {
        if (!element.classList.contains('is-visible')) {
          observer.observe(element);
        }
      });
    };

    register();

    const mutationObserver = new MutationObserver(() => {
      revealInView();
      register();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      mutationObserver.disconnect();
      elements().forEach((element) => observer.unobserve(element));
      observer.disconnect();
      root.classList.remove('has-animations');
    };
  }, []);

  return null;
}
