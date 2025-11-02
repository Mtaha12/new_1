'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type HomeResourceCard = {
  title: string;
  description?: string;
  slug?: string;
  tag?: string;
  image?: string;
};

export default function HomePage() {
  const t = useTranslations('HomePage');
  const pathname = usePathname() ?? '/en';
  const currentLocale = pathname.split('/')[1] || 'en';
  const isArabic = currentLocale === 'ar';
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [shouldPlayHeroVideo, setShouldPlayHeroVideo] = useState(false);
  const [canUseHeroVideo, setCanUseHeroVideo] = useState(false);
  const [isSmallViewport, setIsSmallViewport] = useState(false);
  const whoWeAreCards = [
    { icon: '🔒', title: t('cybersecurityTitle'), desc: t('cybersecurityDescription') },
    { icon: '💡', title: t('itConsultationTitle'), desc: t('itConsultationDescription') }
  ];

  const blogData = [
    { text: 'Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an un.' },
    { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
  ];

  const MAX_CONTAINER_WIDTH = 'min(1140px, 100%)';

  const services = [
    {
      key: 'consulting',
      title: t('services.consulting'),
      desc: t('services.consultingDesc'),
      href: `/${currentLocale}/services/consulting`,
      icon: '🤝',
      gradient: 'linear-gradient(135deg, #0a1f63 0%, #1346a3 50%, #0fd4e8 100%)'
    },
    {
      key: 'infrastructure',
      title: t('services.infrastructure'),
      desc: t('services.infrastructureDesc'),
      href: `/${currentLocale}/services/infrastructure`,
      icon: '🧠',
      gradient: 'linear-gradient(135deg, #101c62 0%, #372874 50%, #5ac3ff 100%)'
    },
    {
      key: 'resourcing',
      title: t('services.resourcing'),
      desc: t('services.resourcingDesc'),
      href: `/${currentLocale}/services/resourcing`,
      icon: '🛡️',
      gradient: 'linear-gradient(135deg, #0b2269 0%, #293c8a 45%, #2dd6c6 100%)'
    },
    {
      key: 'training',
      title: t('services.training'),
      desc: t('services.trainingDesc'),
      href: `/${currentLocale}/services/training`,
      icon: '🧪',
      gradient: 'linear-gradient(135deg, #052650 0%, #1b3f8a 55%, #66e0ff 100%)'
    },
    {
      key: 'managed',
      title: t('services.managed'),
      desc: t('services.managedDesc'),
      href: `/${currentLocale}/services/managed-it`,
      icon: '🧰',
      gradient: 'linear-gradient(135deg, #071f5b 0%, #2b2d74 50%, #3cd4e1 100%)'
    },
    {
      key: 'devsecops',
      title: t('services.devsecops'),
      desc: t('services.devsecopsDesc'),
      href: `/${currentLocale}/services/devsecops`,
      icon: '⚙️',
      gradient: 'linear-gradient(135deg, #0a1f60 0%, #3a2175 55%, #69e8e1 100%)'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBlogIndex((prev) => (prev + 1) % blogData.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleResize = () => {
      setIsSmallViewport(window.innerWidth < 768);
    };

    const handleMotionChange = () => {
      setCanUseHeroVideo(!motionMedia.matches);
    };

    handleResize();
    handleMotionChange();
    window.addEventListener('resize', handleResize);
    motionMedia.addEventListener?.('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      motionMedia.removeEventListener?.('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    if (!canUseHeroVideo) {
      setShouldPlayHeroVideo(false);
      return undefined;
    }

    const timeout = window.setTimeout(() => setShouldPlayHeroVideo(true), 250);
    return () => window.clearTimeout(timeout);
  }, [canUseHeroVideo]);

  const scrollToCard = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      setCurrentCardIndex((prev) => (prev + 1) % whoWeAreCards.length);
    } else {
      setCurrentCardIndex((prev) => (prev - 1 + whoWeAreCards.length) % whoWeAreCards.length);
    }
  };

  const visibleCards = whoWeAreCards.length
    ? Array.from({ length: Math.min(2, whoWeAreCards.length) }, (_, offset) =>
        whoWeAreCards[(currentCardIndex + offset) % whoWeAreCards.length]
      )
    : [];

  const resourcesTitle = t('resourcesTitle');
  const resourcesDescription = t('resourcesDescription');
  const resourcesRaw = t.raw('resourcesCards');
  const resourcesCards: HomeResourceCard[] = Array.isArray(resourcesRaw)
    ? (resourcesRaw as HomeResourceCard[])
    : [];
  const ctaTitle = t('ctaTitle');
  const ctaDescription = t('ctaDescription');
  const ctaButton = t('ctaButton');

  return (
    <div style={{ minHeight: '100vh', background: '#fff', direction: isArabic ? 'rtl' : 'ltr' }}>
      <Header />

      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(5rem, 12vw, 9rem) clamp(1.5rem, 5vw, 3rem)',
          textAlign: 'center',
          color: '#fff',
          background: 'linear-gradient(135deg, #0a0e3d 0%, #1346a3 100%)',
          minHeight: 'min(80vh, 720px)'
        }}
      >
        {shouldPlayHeroVideo && (
          <video
            src="/img/herosection.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/img/bg1.jpg"
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              willChange: 'opacity'
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(10, 14, 61, 0.92) 0%, rgba(19, 70, 163, 0.68) 100%)',
            zIndex: 1
          }}
        />
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: 1.2
          }}>
            {t('heroTitle')}
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            opacity: 0.9
          }}>
            {t('heroSubtitle')}
          </p>
          <Link
            href={`/${currentLocale}/contact`}
            className="glow-button hero-cta"
            style={{
              display: 'inline-block',
              background: '#00bcd4',
              color: '#fff',
              padding: '1rem 2.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(0, 188, 212, 0.3)'
            }}
          >
            {t('heroCta') || 'Get Started'}
          </Link>
        </div>
      </section>

      {/* Partners Section */}
      <section
        id="partners"
        style={{
          background: 'transparent',
          padding: '1.5rem clamp(1rem, 4vw, 3rem) clamp(3rem, 8vw, 6.5rem)',
          marginTop: '-6.5rem',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 5
        }}
      >
        <div
          style={{
            maxWidth: MAX_CONTAINER_WIDTH,
            margin: '0 auto',
            position: 'relative',
            zIndex: 6
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #09153d 0%, #050b23 45%, #01030d 100%)',
              borderRadius: '32px',
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              boxShadow: '0 45px 75px rgba(5, 12, 40, 0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 'clamp(1rem, 2.5vw, 2.5rem)',
              flexWrap: 'wrap',
              position: 'relative',
              zIndex: 7
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 'clamp(0.75rem, 3vw, 1.5rem)',
                color: 'rgba(255,255,255,0.35)',
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                lineHeight: 1
              }}
              aria-hidden
            >
              ‹
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'clamp(1rem, 2.5vw, 2.25rem)',
                flex: '1 1 100%',
                padding: '0 clamp(0.5rem, 3vw, 2rem)',
                flexWrap: 'wrap',
                rowGap: '1rem'
              }}
            >
              {['ForgeRock', 'Microsoft Azure', 'SentinelOne', 'PingIdentity', 'THALES', 'okta'].map((partner, index) => (
                <div
                  key={partner}
                  className={`partner-chip delay-${(index % 5) + 1}`}
                  style={{
                    color: '#ffffff',
                    fontWeight: 600,
                    fontSize: 'clamp(0.85rem, 1.6vw, 1.05rem)',
                    letterSpacing: '0.06em',
                    opacity: 0.9,
                    animation: `fadeIn 0.5s ease-out ${index * 0.08}s backwards`
                  }}
                >
                  {partner}
                </div>
              ))}
            </div>
            <span
              style={{
                position: 'absolute',
                right: 'clamp(0.75rem, 3vw, 1.5rem)',
                color: 'rgba(255,255,255,0.35)',
                fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                lineHeight: 1
              }}
              aria-hidden
            >
              ›
            </span>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section id="who-we-are" style={{
        padding: 'clamp(3rem, 7vw, 6.5rem) clamp(1.25rem, 5vw, 3.5rem)',
        background: '#fff',
        direction: isArabic ? 'rtl' : 'ltr'
      }}>
        <div style={{
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isSmallViewport ? '1fr' : 'minmax(0, 1fr) minmax(0, 1fr)',
          gap: isSmallViewport ? '2.5rem' : 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center'
        }}>
          <div>
            <p style={{
              color: '#55617d',
              fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
              marginBottom: '0.5rem',
              textAlign: isArabic ? 'right' : 'left',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600
            }}>
              {t('whoWeAre') || 'Who We Are'}
            </p>
            <h2 style={{
              fontSize: isSmallViewport ? 'clamp(2rem, 7vw, 2.8rem)' : 'clamp(2.4rem, 5vw, 3.4rem)',
              fontWeight: 800,
              color: '#0a0e3d',
              lineHeight: 1.15,
              marginBottom: '1.75rem'
            }}>
              {t('defendersTitle')}
            </h2>
            <div style={{
              color: '#4d5566',
              lineHeight: 1.8,
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              textAlign: isArabic ? 'right' : 'left'
            }}>
              <p style={{ margin: 0 }}>{t('defendersDescription') || t('aboutDescription')}</p>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              display: 'flex',
              gap: isSmallViewport ? '1.75rem' : 'clamp(1.5rem, 4vw, 2.5rem)',
              justifyContent: 'center',
              flexDirection: isSmallViewport ? 'column' : 'row',
              alignItems: isSmallViewport ? 'stretch' : 'center'
            }}>
              {visibleCards.map((card, idx) => (
                <div
                  key={`${card.title}-${idx}`}
                  className={`who-card tilt-card hover-glow delay-${(idx % 3) + 1}`}
                  style={{
                    width: isSmallViewport ? '100%' : 'clamp(240px, 38vw, 320px)',
                    background: '#fff',
                    borderRadius: '18px',
                    border: '1px solid #e6ecf5',
                    padding: '2.25rem 2rem',
                    boxShadow: '0 25px 40px rgba(10, 14, 61, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.25rem'
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, #0a0e3d 0%, #1f3a85 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#69E8E1',
                    fontSize: '1.7rem',
                    alignSelf: isArabic ? 'flex-end' : 'flex-start'
                  }}>
                    {card.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: 'clamp(1.2rem, 2.2vw, 1.4rem)',
                      fontWeight: 700,
                      color: '#0a0e3d',
                      marginBottom: '0.75rem'
                    }}>
                      {card.title}
                    </h3>
                    <p style={{
                      color: '#4d5566',
                      lineHeight: 1.7,
                      fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)',
                      margin: 0
                    }}>
                      {card.desc}
                    </p>
                  </div>
                  {!isSmallViewport && (
                    <button
                      onClick={() => scrollToCard('next')}
                      style={{
                        alignSelf: isArabic ? 'flex-start' : 'flex-end',
                        background: 'transparent',
                        border: 'none',
                        color: '#00bcd4',
                        fontSize: '1.5rem',
                        cursor: 'pointer'
                      }}
                      aria-label={t('heroCta') || 'Next'}
                    >
                      →
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div style={{
              position: 'absolute',
              top: '50%',
              left: isSmallViewport ? 'auto' : (isArabic ? 'auto' : '-2rem'),
              right: isSmallViewport ? 'auto' : (isArabic ? '-2rem' : 'auto'),
              transform: 'translateY(-50%)',
              display: !isSmallViewport && whoWeAreCards.length > 2 ? 'flex' : 'none',
              gap: '1rem'
            }}>
              <button
                onClick={() => scrollToCard('prev')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(10, 14, 61, 0.15)',
                  background: '#fff',
                  color: '#0a0e3d',
                  cursor: 'pointer',
                  boxShadow: '0 12px 20px rgba(10, 14, 61, 0.08)'
                }}
                aria-label="Previous"
              >
                {isArabic ? '→' : '←'}
              </button>
              <button
                onClick={() => scrollToCard('next')}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid rgba(10, 14, 61, 0.15)',
                  background: '#fff',
                  color: '#0a0e3d',
                  cursor: 'pointer',
                  boxShadow: '0 12px 20px rgba(10, 14, 61, 0.08)'
                }}
                aria-label="Next"
              >
                {isArabic ? '←' : '→'}
              </button>
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.65rem',
          marginTop: '2.5rem'
        }}>
          {whoWeAreCards.map((_, index) => (
            <div
              key={index}
              style={{
                width: currentCardIndex === index ? '12px' : '10px',
                height: currentCardIndex === index ? '12px' : '10px',
                borderRadius: '50%',
                background: currentCardIndex === index ? '#0a0e3d' : '#d2d8e3',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onClick={() => setCurrentCardIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Cybersecurity Solutions Section */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem)',
        background: 'linear-gradient(135deg, #0a0e3d 0%, #1a237e 100%)',
        animation: 'fadeIn 1s ease-in'
      }}>
        <div style={{
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center'
        }}>
          <div>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#fff',
              lineHeight: '1.2',
              marginBottom: '2rem'
            }}>
              {t('cybersecuritySolutionsTitle')}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.8', fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', marginBottom: '2rem', textAlign: isArabic ? 'right' : 'left' }}>
              {t('cybersecuritySolutionsDescription')}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { key: 'aiSecurity', name: 'AI Security For LLMs', highlight: true },
                { key: 'identity', name: t('solutions.identity'), highlight: false },
                { key: 'lorem', name: t('solutions.lorem'), highlight: false },
                { key: 'zeroTrust', name: t('solutions.zeroTrust'), highlight: false },
                { key: 'networkSecurity', name: t('solutions.networkSecurity'), highlight: false },
                { key: 'cloudSecurity', name: t('solutions.cloudSecurity'), highlight: false },
                { key: 'endpointSecurity', name: t('solutions.endpointSecurity'), highlight: false }
              ].map((solution) => (
                <div
                  key={solution.key}
                  className={`solution-chip ${solution.highlight ? 'solution-chip--highlight' : ''}`}
                  style={{
                    background: solution.highlight ? '#69E8E1' : 'rgba(255,255,255,0.05)',
                    padding: '1rem 1.5rem',
                    borderRadius: '8px',
                    color: solution.highlight ? '#0a0e3d' : '#fff',
                    fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                    fontWeight: solution.highlight ? '600' : '400'
                  }}
                >
                  {solution.name}
                </div>
              ))}
            </div>
          </div>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <Image
              src="/img/cybersolution.jpg"
              alt="Cybersecurity Solutions"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 5vw, 2rem)',
        background: 'linear-gradient(135deg, #0a0e3d 0%, #1a237e 100%)',
        animation: 'fadeIn 1s ease-in',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/img/bg1.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          zIndex: 0
        }} />
        <div style={{
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
          color: '#fff'
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            color: '#fff',
            lineHeight: '1.2',
            marginBottom: '1rem'
          }}>
            {t('ourServicesTitle')}
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)'
          }}>
            {t('ourServicesDescription')}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2.25rem'
          }}>
            {services.map((service) => (
              <Link
                key={service.key}
                href={service.href}
                prefetch={false}
                className="service-card service-card--home"
                style={{
                  background: service.gradient,
                  padding: '2.2rem',
                  borderRadius: '22px',
                  color: '#fff',
                  boxShadow: '0 24px 45px rgba(4, 11, 38, 0.35)',
                  position: 'relative',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}
              >
                <div style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '22px',
                  background: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.25)'
                }}>
                  {service.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: 'clamp(1.25rem, 2.4vw, 1.45rem)',
                    fontWeight: 700,
                    marginBottom: '0.75rem'
                  }}>
                    {service.title}
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.8,
                    fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)'
                  }}>
                    {service.desc}
                  </p>
                </div>
                <span style={{
                  alignSelf: 'flex-end',
                  marginTop: 'auto',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#69E8E1',
                  fontSize: '1.2rem',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.25)'
                }}>
                  {isArabic ? '←' : '→'}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{
        background: '#fff',
        animation: 'fadeIn 1s ease-in'
      }}>
        <div style={{
          background: '#69E8E1',
          padding: 'clamp(3rem, 20vw, 3rem) clamp(3rem, 20vw, 2rem)'
        }}>
          <div style={{
            maxWidth: MAX_CONTAINER_WIDTH,
            margin: '0 auto'
          }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#0a0e3d',
              lineHeight: '3.2',
              marginBottom: '0'
            }}>
              {t('coreValuesTitle')}
            </h2>
          </div>
        </div>
        <div style={{
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto',
          padding: 'clamp(3rem, 5vw, 4rem) clamp(1rem, 5vw, 2rem)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: '900',
              color: '#0a0e3d',
              lineHeight: '1',
              marginBottom: '2rem'
            }}>&ldquo;</div>
            <p style={{ 
              color: '#333', 
              lineHeight: '1.8', 
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)', 
              textAlign: isArabic ? 'right' : 'left',
              fontStyle: 'italic',
              marginBottom: '2rem'
            }}>
              {blogData[currentBlogIndex].text}
            </p>
            <div style={{
              background: '#f0f0f0',
              padding: '1rem',
              borderLeft: '3px solid #69E8E1',
              marginBottom: '2rem'
            }}>
              <p style={{ 
                color: '#666', 
                fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)',
                margin: 0,
                fontStyle: 'italic'
              }}>
                Lorem ipsum is simply dummy text<br />of the printing and type
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {blogData.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: currentBlogIndex === index ? '#69E8E1' : '#ccc',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setCurrentBlogIndex(index)}
                />
              ))}
            </div>
          </div>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '500px',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <Image
              src="/img/corevalue.jpg"
              alt="Core Values"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        background: '#fff',
        direction: isArabic ? 'rtl' : 'ltr'
      }}>
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            color: '#0a0e3d',
            lineHeight: '1.2',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {resourcesTitle}
          </h2>
          <p style={{
            color: '#666',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            textAlign: 'center'
          }}>
            {resourcesDescription}
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2rem'
          }}>
            {resourcesCards.map((resource, index) => (
              <div
                key={index}
                className={`resource-card tilt-card delay-${(index % 3) + 1}`}
                style={{
                  background: '#0a0e3d',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '200px'
                }}>
                  <Image
                    src={resource.image || '/img/resource1.jpg'}
                    alt={resource.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    ...(isArabic ? { right: '1rem' } : { left: '1rem' }),
                    background: '#fff',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#0a0e3d'
                  }}>
                    {resource.tag ?? ''}
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                    fontWeight: '700',
                    color: '#fff',
                    lineHeight: '1.4',
                    marginBottom: resource.description ? '0.75rem' : '0',
                    textAlign: isArabic ? 'right' : 'left'
                  }}>
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p
                      style={{
                        color: 'rgba(255,255,255,0.85)',
                        lineHeight: 1.6,
                        margin: 0,
                        textAlign: isArabic ? 'right' : 'left',
                        fontSize: '0.9rem'
                      }}
                    >
                      {resource.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        position: 'relative',
        padding: '0 clamp(1.5rem, 5vw, 3rem)',
        marginBottom: '-5rem',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: MAX_CONTAINER_WIDTH,
          margin: '0 auto'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '24px',
            padding: 'clamp(3rem, 6vw, 4rem) clamp(2rem, 5vw, 3rem)',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '1rem',
              color: '#0a0e3d'
            }}>
              {ctaTitle}
            </h2>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto 2rem'
            }}>
              {ctaDescription}
            </p>
            <Link
              href={`/${currentLocale}/contact`}
              style={{
                display: 'inline-block',
                background: '#1368ff',
                color: '#fff',
                border: 'none',
                padding: 'clamp(0.8rem, 2vw, 1rem) clamp(2rem, 5vw, 3rem)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                fontWeight: '600',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 20px rgba(19, 104, 255, 0.3)',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(19, 104, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(19, 104, 255, 0.3)';
              }}
            >
              {ctaButton}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
