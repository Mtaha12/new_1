'use client';

import { useTranslations } from 'next-intl';

export default function TrustBadges() {
  const t = useTranslations('HomePage');
  const badges = t.raw('trustBadges') as Array<{ id: string; title: string; subtitle: string }>;

  if (!badges || badges.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem' }}>
      {badges.map((badge) => (
        <div key={badge.id} style={{ background: 'rgba(105, 232, 225, 0.1)', border: '1px solid rgba(105, 232, 225, 0.3)', borderRadius: '12px', padding: '1.25rem 1.75rem', textAlign: 'center', minWidth: '240px' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a0e3d', marginBottom: '0.5rem' }}>{badge.title}</div>
          <div style={{ fontSize: '0.9rem', color: '#555', lineHeight: 1.6 }}>{badge.subtitle}</div>
        </div>
      ))}
    </div>
  );
}
