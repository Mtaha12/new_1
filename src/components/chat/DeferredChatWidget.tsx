'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ChatWidgetLazy = dynamic(() => import('./ChatWidget'), {
  ssr: false,
  loading: () => null
});

export default function DeferredChatWidget() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const scheduleRender = () => setShouldRender(true);

    const anyWindow = window as typeof window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    if (typeof anyWindow.requestIdleCallback === 'function') {
      const idleHandle = anyWindow.requestIdleCallback(scheduleRender, { timeout: 500 });
      return () => {
        anyWindow.cancelIdleCallback?.(idleHandle);
      };
    }

    const timeoutHandle = window.setTimeout(scheduleRender, 500);
    return () => window.clearTimeout(timeoutHandle);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <ChatWidgetLazy />;
}
