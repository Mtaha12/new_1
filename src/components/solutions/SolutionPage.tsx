'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type Highlight = {
  icon?: string;
  title: string;
  description: string;
};

type UseCase = {
  icon?: string;
  title: string;
  description: string;
};

const cardStyles = {
  borderRadius: '18px',
  padding: '2rem',
  border: '1px solid rgba(10,14,61,0.08)',
  background: '#fff',
  boxShadow: '0 12px 30px rgba(10, 14, 61, 0.08)'
};

type SolutionPageProps = {
  namespace: string;
};

function buildLocalizedHref(href: string, locale: string) {
  if (!href) return '#';
  if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }

  const normalized = href.startsWith('/') ? href.slice(1) : href;
  return `/${locale}/${normalized}`;
}

export default function SolutionPage({ namespace }: SolutionPageProps) {
  const t = useTranslations(namespace);
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const overviewParagraphs = (t.raw('overviewParagraphs') as string[]) || [];
  const highlights = (t.raw('highlights') as Highlight[]) || [];
  const useCases = (t.raw('useCases') as UseCase[]) || [];

  const primaryCtaHref = buildLocalizedHref(t('primaryCtaHref'), currentLocale);
  const secondaryCtaHref = buildLocalizedHref(t('secondaryCtaHref'), currentLocale);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        <section
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
              background: 'radial-gradient(circle at 30% 50%, rgba(105, 232, 225, 0.25) 0%, transparent 55%)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: '920px', margin: '0 auto' }}>
            <h1
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: 800,
                marginBottom: '1.25rem'
              }}
            >
              {t('heroTitle')}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: 1.8,
                opacity: 0.9,
                marginBottom: '1.5rem'
              }}
            >
              {t('heroSubtitle')}
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                lineHeight: 1.7,
                opacity: 0.85,
                marginBottom: '2.5rem'
              }}
            >
              {t('heroSupporting')}
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '1rem'
              }}
            >
              <Link
                href={primaryCtaHref}
                prefetch={false}
                style={{
                  background: '#69E8E1',
                  color: '#0a0e3d',
                  padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 4vw, 2.8rem)',
                  borderRadius: '30px',
                  fontWeight: 700,
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                  textDecoration: 'none',
                  boxShadow: '0 15px 40px rgba(105, 232, 225, 0.25)'
                }}
              >
                {t('primaryCta')}
              </Link>
              <Link
                href={secondaryCtaHref}
                prefetch={false}
                style={{
                  background: 'transparent',
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.7)',
                  padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 4vw, 2.8rem)',
                  borderRadius: '30px',
                  fontWeight: 600,
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                  textDecoration: 'none',
                  transition: 'background 0.3s ease, color 0.3s ease'
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  event.currentTarget.style.color = '#69E8E1';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.background = 'transparent';
                  event.currentTarget.style.color = '#fff';
                }}
              >
                {t('secondaryCta')}
              </Link>
            </div>
          </div>
        </section>

        <section
          style={{
            padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
              fontWeight: 800,
              color: '#0a0e3d',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}
          >
            {t('overviewTitle')}
          </h2>
          <div
            style={{
              display: 'grid',
              gap: '1.5rem',
              color: '#555',
              fontSize: 'clamp(0.98rem, 1.6vw, 1.05rem)',
              lineHeight: 1.8
            }}
          >
            {overviewParagraphs.map((paragraph, index) => (
              <p key={index} style={{ margin: 0 }}>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {highlights.length > 0 && (
          <section
            style={{
              background: '#f8f9fa',
              padding: 'clamp(3rem, 9vw, 6.5rem) clamp(1.5rem, 6vw, 3.5rem)'
            }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h3
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#0a0e3d',
                  marginBottom: 'clamp(2rem, 5vw, 3rem)',
                  textAlign: 'center'
                }}
              >
                {t('highlightsTitle')}
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: 'clamp(1.5rem, 4vw, 2.5rem)'
                }}
              >
                {highlights.map((highlight, index) => (
                  <div key={index} style={cardStyles}>
                    {highlight.icon && (
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '14px',
                          background: '#0a0e3d',
                          color: '#69E8E1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.8rem',
                          marginBottom: '1.25rem'
                        }}
                      >
                        {highlight.icon}
                      </div>
                    )}
                    <h4
                      style={{
                        fontSize: 'clamp(1.15rem, 2vw, 1.35rem)',
                        fontWeight: 700,
                        color: '#0a0e3d',
                        marginBottom: '0.75rem'
                      }}
                    >
                      {highlight.title}
                    </h4>
                    <p
                      style={{
                        color: '#555',
                        fontSize: '0.98rem',
                        lineHeight: 1.7
                      }}
                    >
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {useCases.length > 0 && (
          <section
            style={{
              padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)',
              background: '#0a0e3d'
            }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h3
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 'clamp(2rem, 5vw, 3rem)',
                  textAlign: 'center'
                }}
              >
                {t('useCasesTitle')}
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                  gap: 'clamp(1.5rem, 4vw, 2.5rem)'
                }}
              >
                {useCases.map((useCase, index) => (
                  <div
                    key={index}
                    style={{
                      borderRadius: '16px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      background: 'rgba(26, 31, 113, 0.75)',
                      padding: '2rem',
                      color: '#fff'
                    }}
                  >
                    {useCase.icon && (
                      <div
                        style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '50%',
                          background: 'rgba(105, 232, 225, 0.18)',
                          color: '#69E8E1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.6rem',
                          marginBottom: '1.25rem'
                        }}
                      >
                        {useCase.icon}
                      </div>
                    )}
                    <h4
                      style={{
                        fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                        fontWeight: 700,
                        marginBottom: '0.75rem'
                      }}
                    >
                      {useCase.title}
                    </h4>
                    <p style={{ lineHeight: 1.7, opacity: 0.85 }}>{useCase.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section
          style={{
            background: '#f8f9fa',
            padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              maxWidth: '760px',
              margin: '0 auto',
              background: '#fff',
              borderRadius: '24px',
              padding: 'clamp(2.5rem, 6vw, 3.5rem)',
              boxShadow: '0 20px 45px rgba(10, 14, 61, 0.12)'
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.3rem)',
                fontWeight: 800,
                color: '#0a0e3d',
                marginBottom: '1rem'
              }}
            >
              {t('ctaTitle')}
            </h3>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
                color: '#555',
                lineHeight: 1.7,
                marginBottom: '2rem'
              }}
            >
              {t('ctaSubtitle')}
            </p>
            <Link
              href={primaryCtaHref}
              prefetch={false}
              style={{
                background: '#0a0e3d',
                color: '#fff',
                padding: 'clamp(0.85rem, 2vw, 1.05rem) clamp(2.2rem, 4vw, 3rem)',
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                textDecoration: 'none',
                boxShadow: '0 12px 32px rgba(10, 14, 61, 0.25)'
              }}
            >
              {t('ctaButton')}
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
