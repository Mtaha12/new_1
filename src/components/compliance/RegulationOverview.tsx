'use client';

import { useTranslations } from 'next-intl';

export default function RegulationOverview() {
  const t = useTranslations('CompliancePage.regulations');
  const cards = t.raw('cards') as Array<{
    slug: string;
    title: string;
    summary: string;
    keyPoints: string[];
    cmsSlug: string;
  }>;

  return (
    <section style={{ padding: 'clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)', background: '#f8f9fa' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#0a0e3d', marginBottom: '2.5rem', textAlign: 'center' }}>
          {t('title')}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '2rem' }}>
          {cards.map((card) => (
            <div key={card.slug} style={{ background: '#fff', borderRadius: '18px', padding: '2rem', border: '1px solid rgba(10,14,61,0.08)', boxShadow: '0 12px 30px rgba(10, 14, 61, 0.08)' }}>
              <h3 style={{ fontSize: 'clamp(1.15rem, 2vw, 1.35rem)', fontWeight: 700, color: '#0a0e3d', marginBottom: '0.75rem' }}>
                {card.title}
              </h3>
              <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '1rem' }}>{card.summary}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.6rem', color: '#555' }}>
                {card.keyPoints.map((point, idx) => (
                  <li key={idx}>
                    <span style={{ color: '#69E8E1', marginRight: '0.5rem' }}>•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
