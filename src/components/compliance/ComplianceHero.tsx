'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface ComplianceHeroProps {
  locale: string;
}

export default function ComplianceHero({ locale }: ComplianceHeroProps) {
  const t = useTranslations('CompliancePage.hero');

  return (
    <section
      className="parallax-wrap fade-section"
      style={{
        background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 50%, #00bcd4 100%)',
        padding: 'clamp(4rem, 10vw, 7rem) clamp(1.5rem, 6vw, 3.5rem)',
        color: '#fff',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(105, 232, 225, 0.2) 0%, transparent 55%)',
          pointerEvents: 'none'
        }}
      />
      <div
        className="fade-section delay-1"
        style={{ position: 'relative', zIndex: 1, maxWidth: '920px', margin: '0 auto' }}
      >
        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            fontWeight: 800,
            marginBottom: '1.25rem'
          }}
        >
          {t('title')}
        </h1>
        <p
          className="fade-section delay-2"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            lineHeight: 1.8,
            opacity: 0.9,
            marginBottom: '1rem'
          }}
        >
          {t('subtitle')}
        </p>
        <p
          className="fade-section delay-3"
          style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
            opacity: 0.85,
            lineHeight: 1.7,
            marginBottom: '2.5rem'
          }}
        >
          {t('description')}
        </p>
        <div
          className="fade-section delay-4"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center'
          }}
        >
          <a
            href="#checklist"
            className="glow-button rise-in delay-1"
            style={{
              background: '#69E8E1',
              color: '#0a0e3d',
              padding: 'clamp(0.85rem, 2vw, 1.05rem) clamp(2.2rem, 4vw, 3rem)',
              borderRadius: '30px',
              fontWeight: 700,
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              textDecoration: 'none',
              boxShadow: '0 15px 38px rgba(105, 232, 225, 0.25)'
            }}
          >
            {t('primaryCta')}
          </a>
          <Link
            href={`/${locale}/${t('secondaryCtaHref')}`}
            prefetch={false}
            className="glow-button rise-in delay-2"
            style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.7)',
              padding: 'clamp(0.85rem, 2vw, 1.05rem) clamp(2.2rem, 4vw, 3rem)',
              borderRadius: '30px',
              fontWeight: 600,
              fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
              textDecoration: 'none'
            }}
          >
            {t('secondaryCta')}
          </Link>
        </div>
      </div>
    </section>
  );
}
