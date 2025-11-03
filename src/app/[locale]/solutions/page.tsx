'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslations } from 'next-intl';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const MAX_CONTAINER_WIDTH = 'min(1140px, 100%)';

type Pillar = {
  icon?: string;
  title: string;
  description: string;
};

type SolutionCard = {
  id: string;
  title: string;
  summary: string;
  href: string;
  highlights?: string[];
};

type ApproachStep = {
  icon?: string;
  title: string;
  description: string;
};

type Metric = {
  value: string;
  label: string;
  description: string;
};

type ResourceCard = {
  title: string;
  tag?: string;
  image?: string;
  href?: string;
};

export default function SolutionsOverviewPage() {
  const t = useTranslations('SolutionsOverview');
  const pathname = usePathname() ?? '/en';
  const params = useParams<{ locale?: string }>();
  const localeFromParams = params?.locale;
  const currentLocale = (Array.isArray(localeFromParams) ? localeFromParams[0] : localeFromParams) || pathname.split('/')[1] || 'en';
  const localePrefix = `/${currentLocale}`;
  const isArabic = currentLocale === 'ar';

  const buildHref = (href: string | undefined) => {
    if (!href) return '#';
    if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) {
      return href;
    }
    const normalized = href.startsWith('/') ? href : `/${href}`;
    return `${localePrefix}${normalized}`;
  };

  const heroTitle = t('heroTitle');
  const heroSubtitle = t('heroSubtitle');
  const heroSupporting = t('heroSupporting');
  const primaryCta = t('primaryCta');
  const primaryCtaHref = t('primaryCtaHref');
  const secondaryCta = t('secondaryCta');
  const secondaryCtaHref = t('secondaryCtaHref');
  const pillars = (t.raw('pillars') as Pillar[]) || [];
  const solutions = (t.raw('solutions') as SolutionCard[]) || [];
  const approachSteps = (t.raw('approachSteps') as ApproachStep[]) || [];
  const metrics = (t.raw('metrics') as Metric[]) || [];
  const resources = (t.raw('resourcesCards') as ResourceCard[]) || [];
  const solutionsTitle = t('solutionsTitle');
  const solutionsSubtitle = t('solutionsSubtitle');
  const pillarsTitle = t('pillarsTitle');
  const approachTitle = t('approachTitle');
  const approachSubtitle = t('approachSubtitle');
  const metricsTitle = t('metricsTitle');
  const ctaTitle = t('ctaTitle');
  const ctaSubtitle = t('ctaSubtitle');
  const ctaPrimary = t('ctaPrimary');
  const ctaPrimaryHref = t('ctaPrimaryHref');
  const ctaSecondary = t('ctaSecondary');
  const ctaSecondaryHref = t('ctaSecondaryHref');
  const solutionCardCta = t('solutionCardCta');
  const resourcesTitle = t('resourcesTitle');
  const resourcesSubtitle = t('resourcesSubtitle');
  const resourcesCTA = t('resourcesCTA');
  const metricsSubtitle = t('metricsSubtitle');

  const solutionMedia: Record<string, { image: string; badge: string; accent: string }> = {
    'ai-security': {
      image: '/img/s1.jpg',
      badge: '🤖',
      accent: 'linear-gradient(135deg, rgba(9, 31, 90, 0.8) 0%, rgba(13, 78, 176, 0.85) 100%)'
    },
    'identity-management': {
      image: '/img/s4.jpg',
      badge: '🪪',
      accent: 'linear-gradient(135deg, rgba(8, 25, 70, 0.82) 0%, rgba(16, 104, 160, 0.82) 100%)'
    },
    'zero-trust': {
      image: '/img/s2.jpg',
      badge: '🛡️',
      accent: 'linear-gradient(135deg, rgba(7, 31, 95, 0.85) 0%, rgba(52, 187, 197, 0.82) 100%)'
    },
    'cloud-security': {
      image: '/img/s3.jpg',
      badge: '☁️',
      accent: 'linear-gradient(135deg, rgba(6, 24, 84, 0.85) 0%, rgba(57, 135, 255, 0.82) 100%)'
    },
    'network-security': {
      image: '/img/s10.jpg',
      badge: '🌐',
      accent: 'linear-gradient(135deg, rgba(5, 20, 82, 0.82) 0%, rgba(105, 232, 225, 0.8) 100%)'
    },
    'endpoint-security': {
      image: '/img/s6.jpg',
      badge: '💻',
      accent: 'linear-gradient(135deg, rgba(4, 16, 66, 0.82) 0%, rgba(62, 169, 219, 0.82) 100%)'
    }
  };

  return (
    <div style={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <section
          className="parallax-wrap fade-section"
          style={{
            background: 'linear-gradient(135deg, rgba(5, 12, 40, 0.96) 0%, rgba(12, 47, 108, 0.93) 50%, rgba(20, 103, 255, 0.78) 100%)',
            color: '#fff',
            padding: 'clamp(4.2rem, 9vw, 7rem) clamp(1.5rem, 6vw, 3.5rem)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 25% 30%, rgba(105, 232, 225, 0.25) 0%, transparent 55%)',
              pointerEvents: 'none'
            }}
          />
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div
              style={{
                display: 'grid',
                gap: 'clamp(2rem, 5vw, 3.5rem)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))',
                alignItems: 'center'
              }}
            >
              <div className="fade-section delay-1">
                <h1
                  style={{
                    fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
                    fontWeight: 800,
                    marginBottom: '1.3rem',
                    lineHeight: 1.08
                  }}
                >
                  {heroTitle}
                </h1>
                <p
                  className="fade-section delay-2"
                  style={{
                    fontSize: 'clamp(1.05rem, 1.9vw, 1.2rem)',
                    lineHeight: 1.8,
                    opacity: 0.9,
                    marginBottom: '1.5rem'
                  }}
                >
                  {heroSubtitle}
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
                  {heroSupporting}
                </p>
                <div
                  className="fade-section delay-4"
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: isArabic ? 'flex-end' : 'flex-start' }}
                >
                  <Link
                    className="glow-button hero-cta"
                    href={buildHref(primaryCtaHref)}
                    prefetch={false}
                    style={{
                      background: '#69E8E1',
                      color: '#0a0e3d',
                      padding: 'clamp(0.85rem, 2vw, 1.05rem) clamp(2.2rem, 4vw, 3rem)',
                      borderRadius: '30px',
                      fontWeight: 700,
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                      textDecoration: 'none',
                      boxShadow: '0 18px 42px rgba(105, 232, 225, 0.28)'
                    }}
                  >
                    {primaryCta}
                  </Link>
                  <Link
                    className="glow-button hero-cta"
                    href={buildHref(secondaryCtaHref)}
                    prefetch={false}
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
                    {secondaryCta}
                  </Link>
                </div>
              </div>
              <div
                className="tilt-card fade-section delay-2"
                style={{ position: 'relative', minHeight: '320px', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 45px 75px rgba(5, 12, 40, 0.35)' }}
              >
                <Image src="/img/s12.jpg" alt={heroTitle} fill priority sizes="(max-width: 768px) 100vw, 540px" style={{ objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,12,40,0) 0%, rgba(4,12,40,0.65) 100%)' }} />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.6rem',
                    left: isArabic ? 'unset' : '1.6rem',
                    right: isArabic ? '1.6rem' : 'unset',
                    color: 'rgba(255,255,255,0.9)',
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    maxWidth: 'clamp(240px, 50%, 320px)'
                  }}
                >
                  {t('heroSupporting')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="fade-section delay-2"
          style={{
            padding: 'clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)'
          }}
        >
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 3.6vw, 2.6rem)',
                fontWeight: 800,
                color: '#0a0e3d',
                marginBottom: 'clamp(1.5rem, 5vw, 2.5rem)',
                textAlign: 'center'
              }}
            >
              {pillarsTitle}
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
                gap: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              {pillars.map((pillar, index) => (
                <div
                  className={`tilt-card glow-card gradient-border rise-in delay-${(index % 5) + 1}`}
                  key={`${pillar.title}-${index}`}
                  style={{
                    background: '#fff',
                    borderRadius: '18px',
                    padding: '2rem',
                    border: '1px solid rgba(10,14,61,0.08)',
                    boxShadow: '0 12px 30px rgba(10, 14, 61, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.9rem'
                  }}
                >
                  {pillar.icon && (
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: '#0a0e3d',
                        color: '#69E8E1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.6rem'
                      }}
                    >
                      {pillar.icon}
                    </div>
                  )}
                  <h3
                    style={{
                      fontSize: 'clamp(1.15rem, 2vw, 1.4rem)',
                      fontWeight: 700,
                      color: '#0a0e3d',
                      marginBottom: '0.35rem'
                    }}
                  >
                    {pillar.title}
                  </h3>
                  <p style={{ color: '#4d5566', lineHeight: 1.75, margin: 0 }}>{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="fade-section delay-2"
          style={{
            padding: 'clamp(3rem, 7vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)',
            background: '#f4f7ff'
          }}
        >
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.9rem, 3.8vw, 2.8rem)',
                  fontWeight: 800,
                  color: '#0a0e3d',
                  marginBottom: '0.75rem'
                }}
              >
                {solutionsTitle}
              </h2>
              <p style={{ color: '#4d5566', lineHeight: 1.8, maxWidth: '800px', margin: '0 auto' }}>{solutionsSubtitle}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1.8rem, 4vw, 2.6rem)'
              }}
            >
              {solutions.map((solution, index) => {
                const media = solutionMedia[solution.id] ?? {
                  image: '/img/s2.jpg',
                  badge: '⭐',
                  accent: 'linear-gradient(135deg, rgba(10,15,70,0.85) 0%, rgba(14,58,120,0.8) 100%)'
                };
                return (
                  <div
                    key={`${solution.id}-${index}`}
                    className={`tilt-card glow-card gradient-border rise-in delay-${(index % 5) + 1}`}
                    style={{
                      background: '#fff',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', height: '220px' }}>
                      <Image src={media.image} alt={solution.title} fill sizes="(max-width: 768px) 100vw, 420px" style={{ objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(4,12,40,0) 30%, rgba(4,12,40,0.7) 100%)' }} />
                      <div
                        style={{
                          position: 'absolute',
                          top: '1.1rem',
                          left: isArabic ? 'unset' : '1.2rem',
                          right: isArabic ? '1.2rem' : 'unset',
                          width: '54px',
                          height: '54px',
                          borderRadius: '16px',
                          background: 'rgba(255,255,255,0.22)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.8rem',
                          color: '#fff'
                        }}
                      >
                        {media.badge}
                      </div>
                    </div>
                    <div style={{ padding: 'clamp(1.8rem, 5vw, 2.2rem)', display: 'grid', gap: '1rem', flex: 1 }}>
                      <div>
                        <h3 style={{ fontSize: 'clamp(1.2rem, 2vw, 1.45rem)', fontWeight: 800, color: '#0a0e3d', marginBottom: '0.4rem' }}>{solution.title}</h3>
                        <p style={{ color: '#4a5568', lineHeight: 1.7, margin: 0 }}>{solution.summary}</p>
                      </div>
                      {solution.highlights && solution.highlights.length > 0 && (
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.6rem', fontSize: '0.95rem', color: '#3f4859' }}>
                          {solution.highlights.map((highlight, highlightIndex) => (
                            <li key={`${solution.id}-highlight-${highlightIndex}`} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start' }}>
                              <span aria-hidden style={{ color: '#69E8E1', fontWeight: 700 }}>•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link
                        href={buildHref(solution.href)}
                        prefetch={false}
                        className="hover-underline"
                        style={{
                          marginTop: 'auto',
                          alignSelf: isArabic ? 'flex-start' : 'flex-end',
                          color: '#0a53ff',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        {solutionCardCta}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="fade-section delay-3"
          style={{
            padding: 'clamp(3.2rem, 8vw, 5.8rem) clamp(1.5rem, 6vw, 3.5rem)',
            direction: isArabic ? 'rtl' : 'ltr'
          }}
        >
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', display: 'grid', gap: 'clamp(2rem, 5vw, 3rem)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 360px), 1fr))' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.9rem, 3.7vw, 2.7rem)',
                  fontWeight: 800,
                  color: '#0a0e3d'
                }}
              >
                {approachTitle}
              </h2>
              <p style={{ color: '#4a5568', lineHeight: 1.8 }}>{approachSubtitle}</p>
            </div>
            <div
              style={{
                display: 'grid',
                gap: '1.4rem'
              }}
            >
              {approachSteps.map((step, index) => (
                <div
                  key={`${step.title}-${index}`}
                  className="tilt-card rise-in"
                  style={{
                    background: '#f8faff',
                    borderRadius: '18px',
                    padding: '1.6rem',
                    border: '1px solid rgba(10,14,61,0.08)',
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: '1rem',
                    alignItems: 'flex-start'
                  }}
                >
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: '14px',
                      background: '#0a0e3d',
                      color: '#69E8E1',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.6rem',
                      fontWeight: 700
                    }}
                  >
                    {step.icon ?? index + 1}
                  </div>
                  <div style={{ display: 'grid', gap: '0.4rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0a0e3d', margin: 0 }}>{step.title}</h3>
                    <p style={{ color: '#4a5568', margin: 0, lineHeight: 1.7 }}>{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="fade-section delay-3"
          style={{
            background: '#050b3d',
            padding: 'clamp(3.5rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)',
            color: '#fff'
          }}
        >
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.7vw, 2.6rem)', fontWeight: 800, marginBottom: '0.75rem' }}>{metricsTitle}</h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '760px', margin: '0 auto clamp(2rem, 6vw, 3rem)', lineHeight: 1.8 }}>
              {metricsSubtitle}
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              {metrics.map((metric, index) => (
                <div
                  key={`${metric.label}-${index}`}
                  className="tilt-card"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    borderRadius: '18px',
                    padding: '2rem',
                    display: 'grid',
                    gap: '0.6rem',
                    border: '1px solid rgba(255,255,255,0.12)'
                  }}
                >
                  <span style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)', fontWeight: 800, color: '#69E8E1' }}>{metric.value}</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>{metric.label}</span>
                  <p style={{ margin: 0, lineHeight: 1.6, color: 'rgba(255,255,255,0.75)' }}>{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="fade-section delay-3"
          style={{
            padding: 'clamp(3.5rem, 9vw, 6.5rem) clamp(1.5rem, 5vw, 3rem) clamp(4.5rem, 10vw, 7rem)',
            background: '#f4f7ff',
            direction: isArabic ? 'rtl' : 'ltr'
          }}
        >
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2.25rem, 6vw, 3.5rem)' }}>
              <h2
                style={{
                  fontSize: 'clamp(2.1rem, 5vw, 3.1rem)',
                  fontWeight: 800,
                  color: '#0a0e3d',
                  marginBottom: '0.75rem'
                }}
              >
                {resourcesTitle}
              </h2>
              <p style={{ color: '#516074', lineHeight: 1.8, maxWidth: '720px', margin: '0 auto', fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)' }}>
                {resourcesSubtitle}
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1.5rem, 4vw, 2.5rem)'
              }}
            >
              {resources.map((resource, index) => (
                <Link
                  key={`${resource.title}-${index}`}
                  href={buildHref(resource.href)}
                  prefetch={false}
                  className={`tilt-card resource-card delay-${(index % 3) + 1}`}
                  style={{
                    borderRadius: '20px',
                    boxShadow: '0 22px 45px rgba(10, 14, 61, 0.22)',
                    background: '#0a0e3d',
                    overflow: 'hidden',
                    textDecoration: 'none'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', paddingBottom: '65%', overflow: 'hidden' }}>
                    <Image
                      src={resource.image || '/img/resource1.jpg'}
                      alt={resource.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      style={{ objectFit: 'cover' }}
                    />
                    {resource.tag && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '1rem',
                          ...(isArabic ? { right: '1rem' } : { left: '1rem' }),
                          padding: '0.35rem 0.9rem',
                          borderRadius: '999px',
                          background: 'rgba(255,255,255,0.18)',
                          color: '#fff',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          letterSpacing: '0.04em'
                        }}
                      >
                        {resource.tag}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '1.6rem', display: 'grid', gap: '0.75rem', color: '#fff' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>{resource.title}</h3>
                    <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{resourcesCTA}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          className="fade-section delay-3"
          style={{
            background: 'linear-gradient(180deg, #f4f7ff 0%, #f4f7ff 52%, #050b3d 52%, #050b3d 100%)',
            padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem) clamp(7rem, 11vw, 9rem)',
            direction: isArabic ? 'rtl' : 'ltr'
          }}
        >
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
            <div
              style={{
                background: '#fff',
                borderRadius: '26px',
                padding: 'clamp(3rem, 6vw, 4rem) clamp(2rem, 5vw, 3rem)',
                textAlign: 'center',
                boxShadow: '0 35px 65px rgba(0, 0, 0, 0.25)',
                transform: 'translateY(-18%)',
                margin: '0 auto'
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                  fontWeight: 800,
                  color: '#0a0e3d',
                  marginBottom: '1rem'
                }}
              >
                {ctaTitle}
              </h2>
              <p
                style={{
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                  lineHeight: 1.6,
                  marginBottom: '2rem',
                  color: '#55617d',
                  maxWidth: '640px',
                  margin: '0 auto 2rem'
                }}
              >
                {ctaSubtitle}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
                <Link
                  href={buildHref(ctaPrimaryHref)}
                  prefetch={false}
                  className="hover-glow"
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #0a53ff 0%, #3e8bff 100%)',
                    color: '#fff',
                    padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(2.4rem, 5vw, 3.2rem)',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                    fontWeight: 600,
                    borderRadius: '999px',
                    textDecoration: 'none'
                  }}
                >
                  {ctaPrimary}
                </Link>
                <Link
                  href={buildHref(ctaSecondaryHref)}
                  prefetch={false}
                  className="hover-outline"
                  style={{
                    display: 'inline-block',
                    background: 'transparent',
                    border: '2px solid rgba(10,83,255,0.25)',
                    color: '#0a53ff',
                    padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(2.4rem, 5vw, 3.2rem)',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                    fontWeight: 600,
                    borderRadius: '999px',
                    textDecoration: 'none'
                  }}
                >
                  {ctaSecondary}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
