'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function CountrySelector() {
  const t = useTranslations('CompliancePage.countrySelector');
  const options = t.raw('options') as Array<{ id: string; label: string; badge: string }>;
  const [selected, setSelected] = useState('');

  return (
    <section style={{ padding: 'clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <label htmlFor="country-select" style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)', fontWeight: 700, color: '#0a0e3d', display: 'block', marginBottom: '1rem' }}>
          {t('label')}
        </label>
        <select id="country-select" value={selected} onChange={(e) => setSelected(e.target.value)} style={{ padding: '1rem 1.5rem', fontSize: '1rem', borderRadius: '12px', border: '2px solid #e2e8f0', background: '#fff', color: '#0a0e3d', cursor: 'pointer', minWidth: '300px', maxWidth: '100%' }}>
          <option value="">{t('placeholder')}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.label} — {opt.badge}</option>
          ))}
        </select>
      </div>
    </section>
  );
}
