'use client';

import CallbackWidget from '@/components/ui/CallbackWidget';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget';
import DeferredChatWidget from '@/components/chat/DeferredChatWidget';
import ScrollToTopButton from '@/components/layout/ScrollToTopButton';

const slotStyle: React.CSSProperties = {
  width: 56,
  height: 56,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'auto'
};

export default function ClientWidgets() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        alignItems: 'flex-end',
        zIndex: 997,
        pointerEvents: 'auto'
      }}
    >
      <div style={slotStyle}>
        <CallbackWidget />
      </div>
      <div style={slotStyle}>
        <ScrollToTopButton />
      </div>
      <div style={slotStyle}>
        <WhatsAppWidget />
      </div>
      <div style={slotStyle}>
        <DeferredChatWidget />
      </div>
    </div>
  );
}
