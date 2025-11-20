'use client';

import { useEffect, useState } from 'react';

import DeferredChatWidget from '../chat/DeferredChatWidget';
import ScrollAnimator from './ScrollAnimator';
import ScrollToTopButton from './ScrollToTopButton';

export default function ProgressivePageEnhancements() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const anyWindow = window as typeof window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    let timeout: number | null = null;
    let idleHandle: number | null = null;

    const activate = () => setShouldRender(true);

    if (typeof anyWindow.requestIdleCallback === 'function') {
      idleHandle = anyWindow.requestIdleCallback(activate, { timeout: 1800 });
    } else {
      timeout = window.setTimeout(activate, 900);
    }

    return () => {
      if (idleHandle !== null) {
        anyWindow.cancelIdleCallback?.(idleHandle);
      }
      if (timeout !== null) {
        window.clearTimeout(timeout);
      }
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      <ScrollAnimator />
      <ScrollToTopButton />
      <DeferredChatWidget />
    </>
  );
}
