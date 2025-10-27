// app/[locale]/case-studies/page.tsx
'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';

type Metric = {
  label: string;
  value: string;
  description: string;
};

type CaseStudy = {
  id: string;
  title: string;
  industry: string;
  summary: string;
  resultHeading: string;
  results: string[];
  ctaLabel: string;
  ctaHref: string;
};

const buildHref = (locale: string, href: string) => {
  if (!href) return '#';
  if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) {
    return href;
  }
  const normalized = href.startsWith('/') ? href : `/${href}`;
  return `/${locale}${normalized}`;
};

export default function CaseStudiesPage() {
  const locale = useLocale();
  const t = useTranslations('CaseStudies');

  const heroTitle = t('heroTitle');
  const heroSubtitle = t('heroSubtitle');
  const heroSupporting = t('heroSupporting');
  const metrics = (t.raw('featuredMetrics') as Metric[]) ?? [];
  const caseStudies = (t.raw('caseStudyList') as CaseStudy[]) ?? [];
  const ctaTitle = t('ctaTitle');
  const ctaSubtitle = t('ctaSubtitle');
  const ctaPrimaryLabel = t('ctaPrimaryLabel');
  const ctaPrimaryHref = t('ctaPrimaryHref');
  const ctaSecondaryLabel = t('ctaSecondaryLabel');
  const ctaSecondaryHref = t('ctaSecondaryHref');
  const filtersLabel = t('filtersLabel');

  const industries = useMemo(
    () => Array.from(new Set(caseStudies.map((caseStudy) => caseStudy.industry))).filter(Boolean),
    [caseStudies]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10%'
      }
    );

    const animatedElements = document.querySelectorAll('.fade-section, .tilt-card');
    animatedElements.forEach((element) => observer.observe(element));

    return () => {
      animatedElements.forEach((element) => observer.unobserve(element));
      observer.disconnect();
    };
  }, []);

  return (
    <div style={{ background: '#05060f', minHeight: '100vh', color: '#0a0e3d' }}>
      <Header />
      <main style={{ background: '#fff' }}>
        <section
          className="parallax-wrap fade-section"
          style={{
            background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 55%, #00bcd4 100%)',
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
              background: 'radial-gradient(circle at 25% 40%, rgba(105, 232, 225, 0.22) 0%, transparent 55%)',
              pointerEvents: 'none'
            }}
          />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto' }}>
            <h1
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 800,
                marginBottom: '1.2rem',
                lineHeight: 1.15
              }}
            >
              {heroTitle}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 2.4vw, 1.4rem)',
                lineHeight: 1.8,
                opacity: 0.92,
                marginBottom: '1.4rem'
              }}
            >
              {heroSubtitle}
            </p>
            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.6vw, 1.1rem)',
                opacity: 0.85,
                lineHeight: 1.75,
                marginBottom: '2.5rem'
              }}
            >
              {heroSupporting}
            </p>

            {metrics.length > 0 && (
              <div
                className="fade-section delay-1"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                  gap: 'clamp(1.5rem, 4vw, 2.5rem)'
                }}
              >
                {metrics.map((metric) => (
                  <div
                    className="tilt-card subtle-card glow-card gradient-border"
                    key={metric.label}
                    style={{
                      background: 'rgba(10, 14, 61, 0.55)',
                      borderRadius: '22px',
                      padding: '2rem',
                      border: '1px solid rgba(105, 232, 225, 0.25)',
                      backdropFilter: 'blur(6px)',
                      textAlign: locale === 'ar' ? 'right' : 'left',
                      display: 'grid',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ color: '#69E8E1', fontWeight: 700, letterSpacing: '0.05em' }}>{metric.label}</span>
                    <span style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800 }}>{metric.value}</span>
                    <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{metric.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section
          className="fade-section delay-1"
          style={{
            padding: 'clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)',
            background: '#f8f9fa'
          }}
        >
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {industries.length > 0 && (
              <div className="fade-section delay-2" style={{ marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
                <p
                  style={{
                    color: '#0a0e3d',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '1rem'
                  }}
                >
                  {filtersLabel}
                </p>
                <div
                  className="fade-section delay-3"
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  {industries.map((industry) => (
                    <span
                      key={industry}
                      style={{
                        padding: '0.55rem 1.4rem',
                        borderRadius: '999px',
                        background: '#fff',
                        color: '#0a0e3d',
                        fontWeight: 600,
                        border: '1px solid rgba(10,14,61,0.1)',
                        boxShadow: '0 10px 24px rgba(10, 14, 61, 0.06)'
                      }}
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div
              className="fade-section delay-2"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1.8rem, 4vw, 2.6rem)'
              }}
            >
              {caseStudies.map((caseStudy, index) => (
                <div
                  className="tilt-card glow-card gradient-border"
                  key={caseStudy.id}
                  style={{
                    background: '#fff',
                    borderRadius: '22px',
                    padding: 'clamp(2rem, 5vw, 2.6rem)',
                    border: '1px solid rgba(10,14,61,0.08)',
                    boxShadow: '0 22px 45px rgba(10, 14, 61, 0.08)',
                    display: 'grid',
                    gap: '1.2rem'
                  }}
                >
                  <div className={`fade-section delay-${(index % 3) + 1}`} style={{ display: 'grid', gap: '0.5rem' }}>
                    <span style={{ color: '#00bcd4', fontWeight: 700, letterSpacing: '0.05em' }}>{caseStudy.industry}</span>
                    <h2
                      style={{
                        fontSize: 'clamp(1.3rem, 2.4vw, 1.65rem)',
                        color: '#0a0e3d',
                        fontWeight: 800
                      }}
                    >
                      {caseStudy.title}
                    </h2>
                    <p style={{ color: '#555', lineHeight: 1.7 }}>{caseStudy.summary}</p>
                  </div>

                  <div
                    className={`fade-section delay-${((index + 1) % 3) + 1}`}
                    style={{
                      background: '#f5f7ff',
                      borderRadius: '18px',
                      padding: '1.4rem',
                      border: '1px solid rgba(105, 232, 225, 0.25)'
                    }}
                  >
                    <p
                      style={{
                        color: '#0a0e3d',
                        fontWeight: 700,
                        marginBottom: '0.8rem'
                      }}
                    >
                      {caseStudy.resultHeading}
                    </p>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'grid',
                        gap: '0.6rem',
                        color: '#404060'
                      }}
                    >
                      {caseStudy.results.map((result) => (
                        <li key={result} style={{ lineHeight: 1.6 }}>
                          <span style={{ color: '#69E8E1', margin: locale === 'ar' ? '0 0 0 0.5rem' : '0 0.5rem 0 0' }}>•</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    className="glow-button"
                    href={buildHref(locale, caseStudy.ctaHref)}
                    prefetch={false}
                    style={{
                      background: '#69E8E1',
                      color: '#0a0e3d',
                      textDecoration: 'none',
                      padding: '0.85rem 1.9rem',
                      borderRadius: '28px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      justifySelf: locale === 'ar' ? 'flex-end' : 'flex-start',
                      boxShadow: '0 16px 32px rgba(105, 232, 225, 0.2)'
                    }}
                  >
                    {caseStudy.ctaLabel}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="fade-section delay-3"
          style={{
            padding: 'clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)',
            background: '#0a0e3d'
          }}
        >
          <div
            style={{
              maxWidth: '960px',
              margin: '0 auto',
              textAlign: 'center',
              color: '#fff',
              display: 'grid',
              gap: '1.5rem'
            }}
          >
            <h2
              style={{
                fontSize: 'clamp(1.9rem, 3.5vw, 2.7rem)',
                fontWeight: 800
              }}
            >
              {ctaTitle}
            </h2>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: 1.8,
                opacity: 0.85
              }}
            >
              {ctaSubtitle}
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
                href={buildHref(locale, ctaPrimaryHref)}
                prefetch={false}
                style={{
                  background: '#69E8E1',
                  color: '#0a0e3d',
                  padding: '0.9rem 2.6rem',
                  borderRadius: '32px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  textDecoration: 'none',
                  boxShadow: '0 18px 40px rgba(105, 232, 225, 0.28)'
                }}
              >
                {ctaPrimaryLabel}
              </Link>
              <Link
                href={buildHref(locale, ctaSecondaryHref)}
                prefetch={false}
                style={{
                  color: '#69E8E1',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  textDecoration: 'none'
                }}
              >
                {ctaSecondaryLabel}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
