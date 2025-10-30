'use client';

import { useState } from 'react';

export default function CallbackWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/callback-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      if (res.ok) {
        setStatus('success');
        setTimeout(() => { setIsOpen(false); setStatus('idle'); setPhone(''); }, 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            background: '#0a0e3d',
            color: '#ffffff',
            borderRadius: '9999px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(10, 14, 61, 0.4)',
            width: '56px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            transition: 'all 250ms ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0) scale(1)')}
        >
          📞
        </button>
      )}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '100px',
            right: '24px',
            zIndex: 1001,
            background: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
            padding: '32px',
            width: '320px',
            border: '1px solid #E9ECEF'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0a0e3d' }}>Request a Callback</h3>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#868E96', transition: 'all 250ms ease' }} onMouseEnter={(e) => e.currentTarget.style.color = '#212529'} onMouseLeave={(e) => e.currentTarget.style.color = '#868E96'}>×</button>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" required style={{ width: '100%', padding: '16px', borderRadius: '8px', border: '1px solid #DEE2E6', marginBottom: '24px', fontSize: '16px', transition: 'all 250ms ease', outline: 'none' }} onFocus={(e) => e.currentTarget.style.borderColor = '#69E8E1'} onBlur={(e) => e.currentTarget.style.borderColor = '#DEE2E6'} />
            <button type="submit" disabled={status === 'loading'} style={{ width: '100%', padding: '16px', borderRadius: '8px', border: 'none', background: status === 'loading' ? '#CED4DA' : '#69E8E1', color: '#0a0e3d', fontWeight: 600, cursor: status === 'loading' ? 'not-allowed' : 'pointer', fontSize: '16px', transition: 'all 250ms ease', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.08)' }} onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.transform = 'translateY(-2px)')} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Success!' : 'Call Me Back'}
            </button>
            {status === 'error' && <p style={{ color: '#F53D5C', fontSize: '14px', marginTop: '8px', margin: 0 }}>Failed to submit. Please try again.</p>}
          </form>
        </div>
      )}
    </>
  );
}
