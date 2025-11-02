'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type ContentSection = {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  reversed?: boolean;
  paragraphs?: string[];
};

type ResourceCard = {
  title: string;
  description: string;
  href: string;
};

type HomepageResource = {
  title: string;
  tag?: string;
  image?: string;
};

function toArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) {
    return value as T[];
  }

  if (value && typeof value === 'object') {
    return Object.values(value as Record<string, T>);
  }

  return [];
}

const cardStyles = {
  borderRadius: '18px',
  padding: '2rem',
  border: '1px solid rgba(10,14,61,0.08)',
  background: '#fff',
  boxShadow: '0 12px 30px rgba(10, 14, 61, 0.08)'
};

const homepageResources = [
  {
    img: '/img/resource1.jpg',
    title: 'Top 10 Penetration Testing Tools Cybersecurity Experts Are Using Right Now',
    tag: 'Cybersecurity'
  },
  {
    img: '/img/resource2.jpg',
    title: 'Top Cybersecurity Services Businesses Need in 2025',
    tag: 'Cybersecurity'
  },
  {
    img: '/img/resource3.jpg',
    title: 'Black Hat USA 2025 Closes Out on a High Note in Las Vegas',
    tag: 'Black Hat'
  }
];

const MAX_CONTAINER_WIDTH = 'min(1140px, 100%)';

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
  const homeT = useTranslations('HomePage');
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  const isArabic = currentLocale === 'ar';

  const overviewParagraphs = toArray<string>(t.raw('overviewParagraphs'));
  const sections = toArray<ContentSection>(t.raw('sections'));
  const otherSolutions = toArray<ResourceCard>(t.raw('otherSolutions'));
  const localizedResourcesRaw = toArray<HomepageResource>(homeT.raw('resourcesCards'));
  const heroGradient = typeof t.raw('heroGradient') === 'string'
    ? (t.raw('heroGradient') as string)
    : 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 50%, #00bcd4 100%)';

  const primaryCtaHref = buildLocalizedHref(t('primaryCtaHref'), currentLocale);
  const secondaryCtaHref = buildLocalizedHref(t('secondaryCtaHref'), currentLocale);
  const resourcesTitle = homeT('resourcesTitle');
  const resourcesSubtitle = homeT('resourcesDescription');
  const ctaTitle = homeT('ctaTitle');
  const ctaSubtitle = homeT('ctaDescription');
  const ctaButton = homeT('ctaButton');

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <main style={{ flex: 1 }}>
        <section
          style={{
            background: heroGradient,
            padding: 'clamp(6rem, 12vw, 8.5rem) clamp(1.5rem, 6vw, 3.5rem) clamp(4rem, 10vw, 7rem)',
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
                className="hover-glow"
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
                className="hover-outline"
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
          <div style={{ display: 'grid', gap: 'clamp(3rem, 8vw, 4.5rem)' }}>
            <div>
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
                  lineHeight: 1.8,
                  textAlign: 'center'
                }}
              >
                {overviewParagraphs.map((paragraph, index) => (
                  <p key={index} style={{ margin: 0 }}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {sections.map((section, index) => (
              <div
                key={section.title}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                  gap: 'clamp(1.5rem, 4vw, 2.5rem)',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    order: section.reversed ? 2 : 1,
                    display: 'grid',
                    gap: '1rem'
                  }}
                >
                  <h3
                    style={{
                      fontSize: 'clamp(1.35rem, 3vw, 1.8rem)',
                      fontWeight: 700,
                      color: '#0a0e3d'
                    }}
                  >
                    {section.title}
                  </h3>
                  <div
                    style={{
                      display: 'grid',
                      gap: '0.85rem'
                    }}
                  >
                    {section.description && (
                      <p
                        style={{
                          color: '#4a5568',
                          fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                          lineHeight: 1.8,
                          margin: 0
                        }}
                      >
                        {section.description}
                      </p>
                    )}
                    {section.paragraphs?.map((paragraph, paragraphIndex) => (
                      <p
                        key={`${section.title}-paragraph-${paragraphIndex}`}
                        style={{
                          color: '#4a5568',
                          fontSize: 'clamp(0.9rem, 1.55vw, 1.02rem)',
                          lineHeight: 1.8,
                          margin: 0
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    order: section.reversed ? 1 : 2,
                    position: 'relative',
                    width: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    minHeight: '260px',
                    boxShadow: '0 25px 45px rgba(10, 14, 61, 0.09)'
                  }}
                >
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {otherSolutions.length > 0 && (
          <section
            style={{
              padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 6vw, 3.5rem)',
              background: 'linear-gradient(135deg, #003c63 0%, #046c78 100%)'
            }}
          >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <h3
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 800,
                  color: '#fff',
                  marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
                  textAlign: 'center'
                }}
              >
                {t('otherSolutionsTitle')}
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                  gap: 'clamp(1.25rem, 3vw, 2rem)'
                }}
              >
                {otherSolutions.map((solution) => (
                  <Link
                    key={solution.title}
                    href={buildLocalizedHref(solution.href, currentLocale)}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      className="hover-lift"
                      style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '20px',
                        padding: '1.75rem',
                        border: '1px solid rgba(255,255,255,0.18)',
                        color: '#f8fafc',
                        minHeight: '200px'
                      }}
                    >
                      <h4
                        style={{
                          fontSize: 'clamp(1.1rem, 2vw, 1.3rem)',
                          fontWeight: 700,
                          marginBottom: '0.75rem'
                        }}
                      >
                        {solution.title}
                      </h4>
                      <p
                        style={{
                          fontSize: '0.95rem',
                          lineHeight: 1.7,
                          opacity: 0.85
                        }}
                      >
                        {solution.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section
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
                  letterSpacing: '-0.02em',
                  marginBottom: '0.75rem'
                }}
              >
                {resourcesTitle}
              </h2>
              <p
                style={{
                  color: '#516074',
                  lineHeight: 1.8,
                  maxWidth: '720px',
                  margin: '0 auto',
                  fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)'
                }}
              >
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
              {localizedResourcesRaw.length > 0
                ? localizedResourcesRaw.map((resource, index) => (
                    <div
                      key={`${resource.title}-${index}`}
                      className={`tilt-card resource-card delay-${(index % 3) + 1}`}
                      style={{
                        borderRadius: '20px',
                        boxShadow: '0 22px 45px rgba(10, 14, 61, 0.25)',
                        background: '#0a0e3d'
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          paddingBottom: '65%',
                          borderRadius: '20px',
                          overflow: 'hidden'
                        }}
                      >
                        <Image
                          src={resource.image || '/img/resource1.jpg'}
                          alt={resource.title}
                          fill
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
                    </div>
                  ))
                : homepageResources.map((resource, index) => (
                    <div
                      key={`${resource.title}-${index}`}
                      className={`tilt-card resource-card delay-${(index % 3) + 1}`}
                      style={{
                        borderRadius: '20px',
                        boxShadow: '0 22px 45px rgba(10, 14, 61, 0.25)',
                        background: '#0a0e3d'
                      }}
                    >
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          paddingBottom: '65%',
                          borderRadius: '20px',
                          overflow: 'hidden'
                        }}
                      >
                        <Image src={resource.img} alt={resource.title} fill style={{ objectFit: 'cover' }} />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        <section
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
                transform: 'translateY(-22%)',
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
              <Link
                href={`/${currentLocale}/contact`}
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #0a53ff 0%, #3e8bff 100%)',
                  color: '#fff',
                  border: 'none',
                  padding: 'clamp(0.9rem, 2vw, 1.1rem) clamp(2.4rem, 5vw, 3.2rem)',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                  fontWeight: 600,
                  borderRadius: '999px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 15px 30px rgba(10, 83, 255, 0.35)',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 20px 35px rgba(10, 83, 255, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(10, 83, 255, 0.35)';
                }}
              >
                {ctaButton}
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
