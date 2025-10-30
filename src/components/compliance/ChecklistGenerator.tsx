'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ChecklistGenerator({ locale }: { locale: string }) {
  const t = useTranslations('CompliancePage.checklist');
  const domains = t.raw('domains') as Array<{ id: string; label: string; items: string[] }>;
  const [selected, setSelected] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [message, setMessage] = useState('');

  const toggleDomain = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const handleGenerate = async () => {
    if (selected.length === 0) return;
    setGenerating(true);
    setMessage('');
    try {
      const res = await fetch('/api/compliance/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domains: selected, locale })
      });
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `compliance-checklist-${Date.now()}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        setMessage(t('success'));
      } else {
        setMessage(t('error'));
      }
    } catch {
      setMessage(t('error'));
    } finally {
      setGenerating(false);
    }
  };

  return (
    <section id="checklist" style={{ padding: 'clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)', background: '#0a0e3d', color: '#fff' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, marginBottom: '1rem', textAlign: 'center' }}>{t('title')}</h2>
        <p style={{ textAlign: 'center', opacity: 0.85, marginBottom: '2.5rem' }}>{t('intro')}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {domains.map((domain) => (
            <div key={domain.id} onClick={() => toggleDomain(domain.id)} style={{ background: selected.includes(domain.id) ? '#69E8E1' : '#1a1f71', color: selected.includes(domain.id) ? '#0a0e3d' : '#fff', borderRadius: '16px', padding: '1.5rem', cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.3s ease' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>{domain.label}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem', fontSize: '0.9rem', opacity: 0.9 }}>
                {domain.items.map((item, idx) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          <button onClick={handleGenerate} disabled={selected.length === 0 || generating} style={{ background: selected.length === 0 || generating ? '#555' : '#69E8E1', color: '#0a0e3d', padding: '1rem 2.5rem', borderRadius: '30px', fontWeight: 700, fontSize: '1rem', border: 'none', cursor: selected.length === 0 || generating ? 'not-allowed' : 'pointer' }}>
            {generating ? t('generating') : t('generate')}
          </button>
          {message && <p style={{ marginTop: '1rem', color: message === t('success') ? '#69E8E1' : '#ff6b6b' }}>{message}</p>}
        </div>
      </div>
    </section>
  );
}
