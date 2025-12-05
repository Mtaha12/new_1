'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingCTA from '@/components/ui/FloatingCTA';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const MAX_CONTAINER_WIDTH = 'min(1140px, 100%)';

type TermsSection = {
  title: string;
  items: string[];
};

type ResourceCard = {
  title: string;
  tag?: string;
  image?: string;
  href?: string;
};

export default function TermsPage() {
  const t = useTranslations('TermsPage');
  const pathname = usePathname() ?? '/en';
  const params = useParams<{ locale?: string }>();
  const localeFromParams = params?.locale;
  const currentLocale =
    (Array.isArray(localeFromParams) ? localeFromParams[0] : localeFromParams) ||
    pathname.split('/')[1] ||
    'en';
  const localePrefix = `/${currentLocale}`;

  const buildHref = (href: string | undefined) => {
    if (!href) return '#';
    if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) {
      return href;
    }
    const normalized = href.startsWith('/') ? href : `/${href}`;
    return `${localePrefix}${normalized}`;
  };

  const heroEyebrow = t('heroEyebrow');
  const heroTitle = t('heroTitle');
  const heroSubtitle = t('heroSubtitle');
  const heroSupporting = t('heroSupporting');
  const primaryCta = t('primaryCta');
  const primaryCtaHref = t('primaryCtaHref');
  const secondaryCta = t('secondaryCta');
  const secondaryCtaHref = t('secondaryCtaHref');
  const badgeHighlights = (t.raw('badgeHighlights') as string[]) || [];
  const termsTitle = t('termsTitle');
  const termsSubtitle = t('termsSubtitle');
  const termsSections = (t.raw('termsSections') as TermsSection[]) || [];
  const resourcesTitle = t('resourcesTitle');
  const resourcesSubtitle = t('resourcesSubtitle');
  const resourcesCards = (t.raw('resourcesCards') as ResourceCard[]) || [];
  const ctaTitle = t('ctaTitle');
  const ctaSubtitle = t('ctaSubtitle');
  const ctaPrimary = t('ctaPrimary');
  const ctaPrimaryHref = t('ctaPrimaryHref');
  const ctaSecondary = t('ctaSecondary');
  const ctaSecondaryHref = t('ctaSecondaryHref');

  return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section
          className="parallax-wrap fade-section"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(5, 12, 40, 0.94) 0%, rgba(12, 47, 108, 0.85) 55%, rgba(19, 104, 255, 0.75) 100%), url(/img/bg1.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            color: '#fff',
            padding: 'clamp(4rem, 9vw, 7rem) clamp(1.5rem, 6vw, 3.5rem)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 25% 40%, rgba(105, 232, 225, 0.22) 0%, transparent 55%)',
              pointerEvents: 'none'
            }}
          />
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div className="fade-section delay-1" style={{ maxWidth: '880px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 1rem',
                  borderRadius: '999px',
                  background: 'rgba(105, 232, 225, 0.18)',
                  color: '#69E8E1',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  fontSize: '0.85rem'
                }}
              >
                {heroEyebrow}
              </span>
              <h1
                style={{
                  fontSize: 'clamp(2.3rem, 5vw, 3.7rem)',
                  fontWeight: 800,
                  marginTop: '1.25rem',
                  marginBottom: '1rem',
                  lineHeight: 1.08
                }}
              >
                {heroTitle}
              </h1>
              <p
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  lineHeight: 1.8,
                  opacity: 0.9,
                  marginBottom: '1.25rem'
                }}
              >
                {heroSubtitle}
              </p>
              <p style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)', opacity: 0.85, lineHeight: 1.7, marginBottom: '1.75rem' }}>
                {heroSupporting}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {badgeHighlights.map((badge) => (
                  <span
                    key={badge}
                    style={{
                      borderRadius: '999px',
                      background: 'rgba(255, 255, 255, 0.14)',
                      padding: '0.55rem 1.25rem',
                      fontSize: '0.9rem',
                      fontWeight: 600
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link
                  className="glow-button"
                  href={buildHref(primaryCtaHref)}
                  prefetch={false}
                  style={{
                    background: '#69E8E1',
                    color: '#0a0e3d',
                    padding: '0.9rem clamp(2.2rem, 4vw, 3rem)',
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    textDecoration: 'none',
                    boxShadow: '0 18px 40px rgba(105, 232, 225, 0.25)'
                  }}
                >
                  {primaryCta}
                </Link>
                <Link
                  className="hover-underline"
                  href={buildHref(secondaryCtaHref)}
                  prefetch={false}
                  style={{
                    background: 'transparent',
                    color: '#fff',
                    border: '2px solid rgba(255,255,255,0.65)',
                    padding: '0.9rem clamp(2.2rem, 4vw, 3rem)',
                    borderRadius: '30px',
                    fontWeight: 600,
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    textDecoration: 'none'
                  }}
                >
                  {secondaryCta}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="fade-section"
          style={{
            background: '#f4f7ff',
            padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)'
          }}
        >
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <p style={{ color: '#516074', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{termsTitle}</p>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 2.6rem)',
                  fontWeight: 800,
                  color: '#0a0e3d',
                  marginBottom: '0.75rem'
                }}
              >
                {termsSubtitle}
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              {termsSections.map((section, index) => (
                <div
                  key={section.title}
                  className={`gradient-border rise-in delay-${(index % 4) + 1}`}
                  style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(10,14,61,0.08)',
                    boxShadow: '0 18px 40px rgba(10, 14, 61, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}
                >
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 750, color: '#0a0e3d' }}>{section.title}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
                    {section.items.map((item) => (
                      <li key={item} style={{ color: '#4d5566', lineHeight: 1.6, display: 'flex', gap: '0.6rem' }}>
                        <span style={{ color: '#69E8E1' }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="fade-section"
          style={{
            padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)'
          }}
        >
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <p style={{ color: '#516074', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>{resourcesTitle}</p>
              <h2
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 2.6rem)',
                  fontWeight: 800,
                  color: '#0a0e3d',
                  marginBottom: '0.75rem'
                }}
              >
                {resourcesSubtitle}
              </h2>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(1.25rem, 3vw, 2rem)'
              }}
            >
              {resourcesCards.map((resource, index) => (
                <Link
                  key={`${resource.title}-${index}`}
                  href={buildHref(resource.href)}
                  prefetch={false}
                  className={`tilt-card delay-${(index % 3) + 1}`}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 18px 35px rgba(10, 14, 61, 0.15)'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                    <Image
                      src={resource.image || '/img/resource1.jpg'}
                      alt={resource.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FloatingCTA
          title={ctaTitle}
          description={ctaSubtitle}
          primaryLabel={ctaPrimary}
          primaryHref={buildHref(ctaPrimaryHref)}
          secondaryLabel={ctaSecondary}
          secondaryHref={buildHref(ctaSecondaryHref)}
          backgroundGradient="linear-gradient(180deg, #f8fbff 0%, #f8fbff 60%, #050b3d 60%, #050b3d 100%)"
        />
      </main>
      <Footer />
    </div>
  );
}
