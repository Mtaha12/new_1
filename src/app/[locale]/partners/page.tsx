'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState, useEffect } from 'react';

const MAX_CONTAINER_WIDTH = 'min(1140px, 100%)';

export default function PartnersPage() {
  const t = useTranslations('PartnersPage');
  const pathname = usePathname() ?? '/en';
  const currentLocale = pathname.split('/')[1] || 'en';
  const isArabic = currentLocale === 'ar';
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', direction: isArabic ? 'rtl' : 'ltr' }}>
      <Header />

      {/* Hero Section */}
      <section
        className="fade-section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(5rem, 12vw, 9rem) clamp(1.5rem, 5vw, 3rem)',
          textAlign: 'center',
          color: '#fff',
          background: 'linear-gradient(135deg, rgba(10, 14, 61, 0.95) 0%, rgba(19, 70, 163, 0.85) 100%)',
          minHeight: 'min(80vh, 720px)'
        }}
      >
        {/* Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0
          }}
        >
          <Image
            src="/img/partner1.jpg"
            alt={isArabic ? "خلفية شركاء" : "Partners hero background"}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.7)'
            }}
            priority
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(10, 14, 61, 0.85) 0%, rgba(19, 70, 163, 0.75) 100%)',
            zIndex: 1
          }}
        />
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {t('title')}
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.6,
            maxWidth: '800px',
            margin: '0 auto',
            opacity: 0.95
          }}>
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section style={{
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(19, 104, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(10, 14, 61, 0.05) 0%, transparent 50%)',
          zIndex: 0
        }} />
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 1 }}>

          {/* Introduction Section */}
          <div 
            className="fade-section delay-1"
            style={{
              display: 'grid',
              gridTemplateColumns: isDesktop ? (isArabic ? '1.5fr 1fr' : '1fr 1.5fr') : '1fr',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'center',
            direction: isArabic ? 'rtl' : 'ltr',
            minHeight: '400px'
          }}>
            {/* Content */}
            <div style={{
              ...isDesktop ? {} : { margin: '0 auto', textAlign: 'center' },
              maxWidth: '650px',
              padding: isDesktop ? '0' : '0 1rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '800',
                color: '#0a0e3d',
                lineHeight: '1.2',
                marginBottom: '1.5rem',
                position: 'relative'
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 2
                }}>{t('collaborativeTitle')}</span>
                <span style={{
                  position: 'absolute',
                  bottom: '-8px',
                  left: isDesktop ? (isArabic ? 'auto' : '0') : '50%',
                  right: isDesktop ? (isArabic ? '0' : 'auto') : 'auto',
                  transform: isDesktop ? 'none' : 'translateX(-50%)',
                  width: '80px',
                  height: '4px',
                  background: 'linear-gradient(90deg, #1368ff, #0a0e3d)',
                  borderRadius: '2px'
                }} />
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: '1.8',
                color: '#475569',
                marginBottom: '2rem',
                fontWeight: '400'
              }}>
                {t('collaborativeDescription')}
              </p>
              <p style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                lineHeight: '1.8',
                color: '#475569',
                marginBottom: '2rem',
                fontWeight: '400',
                fontStyle: 'italic'
              }}>
                {t('collaborativeStatement')}
              </p>
            </div>

            {/* Right Side Image */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '350px',
              overflow: 'hidden',
              borderRadius: '20px'
            }}>
              <Image
                src="/img/partner2.jpg"
                alt={isArabic ? "تعاون الشراكة" : "Partnership collaboration"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  borderRadius: '20px',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
                onError={(e) => {
                  console.log('Image failed to load:', e);
                }}
                onLoad={() => {
                  console.log('Image loaded successfully');
                }}
              />
              <div style={{
                position: 'absolute',
                inset: -2,
                background: 'linear-gradient(135deg, #1368ff, #0a0e3d)',
                borderRadius: '22px',
                zIndex: -1,
                opacity: 0.1
              }} />
            </div>
          </div>

          {/* Why Partnerships Matter Section */}
          <div style={{
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '800',
              color: '#0a0e3d',
              lineHeight: '1.2',
              marginBottom: '3rem',
              textAlign: 'center'
            }}>
              {t('whyPartnershipsTitle')}
            </h2>

            <div 
              className="fade-section delay-2"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                gap: '2.5rem'
              }}>
              {/* Diverse Expertise */}
              <div style={{
                background: '#f8f9fa',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  color: '#fff'
                }}>
                  🎯
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#0a0e3d',
                  marginBottom: '1rem'
                }}>
                  {t('diverseExpertiseTitle')}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  color: '#666'
                }}>
                  {t('diverseExpertiseDescription')}
                </p>
              </div>

              {/* Innovative Technologies */}
              <div style={{
                background: '#f8f9fa',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  color: '#fff'
                }}>
                  💡
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#0a0e3d',
                  marginBottom: '1rem'
                }}>
                  {t('innovativeTechnologiesTitle')}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  color: '#666'
                }}>
                  {t('innovativeTechnologiesDescription')}
                </p>
              </div>

              {/* Agility and Precision */}
              <div style={{
                background: '#f8f9fa',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  fontSize: '1.5rem',
                  color: '#fff'
                }}>
                  ⚡
                </div>
                <h3 style={{
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  color: '#0a0e3d',
                  marginBottom: '1rem'
                }}>
                  {t('agilityPrecisionTitle')}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.7',
                  color: '#666'
                }}>
                  {t('agilityPrecisionDescription')}
                </p>
              </div>
            </div>
          </div>

          {/* Join Us Section */}
          <div style={{
            background: 'linear-gradient(135deg, #0a0e3d 0%, #1346a3 100%)',
            borderRadius: '24px',
            padding: 'clamp(3rem, 6vw, 4rem) clamp(2rem, 5vw, 3rem)',
            textAlign: 'center',
            color: '#fff',
            marginBottom: '4rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '1.5rem'
            }}>
              {t('joinUsTitle')}
            </h2>
            <p style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              lineHeight: '1.7',
              marginBottom: '2rem',
              opacity: 0.95,
              maxWidth: '800px',
              margin: '0 auto 2rem'
            }}>
              {t('joinUsDescription')}
            </p>
            <p style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.3rem)',
              fontWeight: '600',
              lineHeight: '1.6',
              opacity: 0.9
            }}>
              {t('togetherStatement')}
            </p>
          </div>
        </div>
      </section>

      {/* Partners Section - Reused from Homepage */}
      <section
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

      {/* Resources Section - Reused from Homepage */}
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
            {t('resourcesTitle')}
          </h2>
          <p style={{
            color: '#666',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            textAlign: 'center'
          }}>
            {t('resourcesDescription')}
          </p>
          <div 
            className="fade-section delay-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '2rem'
            }}>
            {[1, 2, 3].map((index) => (
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
                  height: '250px'
                }}>
                  <Image
                    src={`/img/resource${index}.jpg`}
                    alt={`Resource ${index}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Reused from Homepage */}
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
              {t('ctaTitle')}
            </h2>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              lineHeight: '1.6',
              marginBottom: '2rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto 2rem'
            }}>
              {t('ctaDescription')}
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
              {t('ctaButton')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
