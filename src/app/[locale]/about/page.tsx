'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const MAX_CONTAINER_WIDTH = 'min(1140px, 100%)';

export default function AboutPage() {
  const t = useTranslations('AboutPage');
  const currentLocale = useLocale();
  const isArabic = currentLocale === 'ar';
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  if (!mounted) return null;

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
          background: 'linear-gradient(135deg, #0a0e3d 0%, #1346a3 100%)',
          minHeight: 'min(80vh, 720px)'
        }}
      >
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0
        }}>
          <Image
            src="/img/about1.jpg"
            alt={isArabic ? "خلفية من نحن" : "About us hero background"}
            fill
            style={{ objectFit: 'cover' }}
            quality={85}
            priority
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(10, 14, 61, 0.92) 0%, rgba(19, 70, 163, 0.68) 100%)',
            zIndex: 1
          }} />
        </div>
        
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: '700',
            marginBottom: '1.5rem',
            lineHeight: 1.2,
            background: 'linear-gradient(135deg, #ffffff 0%, #e0f2ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {t('hero.title')}
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
            lineHeight: '1.6',
            maxWidth: '800px',
            margin: '0 auto 2rem',
            opacity: 0.9,
            fontWeight: '400'
          }}>
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section 
        className="fade-section delay-1"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
          background: '#000733',
          direction: isArabic ? 'rtl' : 'ltr'
        }}>
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
          {/* Content on top */}
          <div style={{
            textAlign: 'center',
            maxWidth: '900px',
            margin: '0 auto 3rem'
          }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: '800',
              color: '#fff',
              lineHeight: '1.2',
              marginBottom: '2rem',
              position: 'relative',
              display: 'inline-block'
            }}>
              <span style={{
                position: 'relative',
                zIndex: 1
              }}>
                {t('whoWeAre.title')}
              </span>
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #1368ff, #69e8e1)',
                borderRadius: '2px'
              }} />
            </h2>
            
            <div style={{
              fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
              lineHeight: '1.8',
              color: '#fff',
              fontWeight: '400',
              textAlign: isArabic ? 'right' : 'left',
              whiteSpace: 'pre-line'
            }}>
              {t('whoWeAre.description')}
            </div>

            <div style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              padding: '1.5rem',
              borderRadius: '12px',
              borderLeft: isArabic ? 'none' : '4px solid #1368ff',
              borderRight: isArabic ? '4px solid #1368ff' : 'none',
              marginTop: '2rem',
              textAlign: isArabic ? 'right' : 'left'
            }}>
              <p style={{
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                lineHeight: '1.6',
                color: '#fff',
                fontWeight: '600',
                fontStyle: 'italic',
                margin: 0
              }}>
                {t('whoWeAre.statement')}
              </p>
            </div>
          </div>

          </div>
      </section>

      {/* Overlapping Image Between Sections */}
      <section style={{
        position: 'relative',
        padding: 0,
        background: 'linear-gradient(135deg, #ffffff 0%, #e6f3fcff 100%)',
        zIndex: 10
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%',
          height: '300px',
          margin: '0 auto',
          position: 'relative',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
          transform: 'translateY(-50px)',
          zIndex: 5
        }}>
          <Image
            src="/img/about2.png"
            alt={isArabic ? "فريق ذا ساموراي" : "The SamurAI Team"}
            fill
            style={{ objectFit: 'cover' }}
            quality={95}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(19, 104, 255, 0.15) 0%, rgba(105, 232, 225, 0.15) 100%)'
          }} />
        </div>
      </section>

      {/* What Do We Do Section */}
      <section 
        className="fade-section delay-2"
        style={{
          padding: '8rem clamp(1.5rem, 5vw, 3rem) clamp(4rem, 8vw, 6rem)',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          direction: isArabic ? 'rtl' : 'ltr'
        }}>
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: '800',
              color: '#0a0e3d',
              marginBottom: '1rem',
              position: 'relative',
              display: 'inline-block'
            }}>
              <span style={{
                position: 'relative',
                zIndex: 1
              }}>
                {t('whatWeDo.title')}
              </span>
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #1368ff, #69e8e1)',
                borderRadius: '2px'
              }} />
            </h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              lineHeight: '1.7',
              color: '#4a5568',
              maxWidth: '900px',
              margin: '0 auto',
              fontWeight: '400'
            }}>
              {t('whatWeDo.subtitle')}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {t.raw('whatWeDo.services').map((service: any, index: number) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  padding: '2rem',
                  borderRadius: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(19, 104, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(19, 104, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #1368ff, #69e8e1)'
                }} />
                <h3 style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)',
                  fontWeight: '700',
                  color: '#0a0e3d',
                  marginBottom: '1rem',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  lineHeight: '1.6',
                  color: '#4a5568',
                  fontWeight: '400',
                  margin: 0
                }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* How We Do It Section */}
      <section 
        className="fade-section delay-3"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
          background: 'linear-gradient(135deg, #0a0e3d 0%, #1346a3 100%)',
          color: '#fff',
          direction: isArabic ? 'rtl' : 'ltr'
      }}>
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '1rem',
              position: 'relative',
              display: 'inline-block'
            }}>
              <span style={{
                position: 'relative',
                zIndex: 1
              }}>
                {t('howWeDoIt.title')}
              </span>
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #69e8e1, #1368ff)',
                borderRadius: '2px'
              }} />
            </h2>
            <p style={{
              lineHeight: '1.7',
              maxWidth: '800px',
              margin: '0 auto',
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              fontWeight: '400',
              opacity: 0.9
            }}>
              {t('howWeDoIt.description')}
            </p>
          </div>

          {/* Content with Image Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr',
            gap: '4rem',
            alignItems: 'center'
          }}>
            {/* Process Steps - Left Side */}
            <div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
              }}>
                {t.raw('howWeDoIt.steps').map((step: any, index: number) => (
                  <div
                    key={index}
                    className="process-step"
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '12px',
                      padding: '2rem',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateX(8px)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateX(0)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {/* Step Number - Left Aligned */}
                    <div style={{
                      fontSize: 'clamp(2.5rem, 4vw, 3rem)',
                      fontWeight: '800',
                      color: '#69e8e1',
                      lineHeight: 1,
                      marginBottom: '1rem',
                      textAlign: 'left'
                    }}>
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    
                    {/* Step Content */}
                    <h3 style={{
                      fontSize: 'clamp(1.2rem, 2.5vw, 1.4rem)',
                      fontWeight: '700',
                      marginBottom: '0.75rem',
                      lineHeight: '1.3',
                      textAlign: 'left'
                    }}>
                      {step.title}
                    </h3>
                    <p style={{
                      lineHeight: '1.6',
                      fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                      opacity: 0.85,
                      fontWeight: '400',
                      margin: 0,
                      textAlign: 'left'
                    }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image - Right Side */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '600px',
              borderRadius: '16px',
              overflow: 'hidden'
            }}>
              <Image
                src="/img/about3.jpg"
                alt="Our Process"
                fill
                style={{ 
                  objectFit: 'cover',
                  borderRadius: '16px'
                }}
              />
              {/* Overlay gradient */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(10, 14, 61, 0.3) 0%, rgba(19, 70, 163, 0.1) 100%)',
                borderRadius: '16px'
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section 
        className="fade-section delay-4"
        style={{
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
          background: '#fff',
          direction: isArabic ? 'rtl' : 'ltr'
        }}>
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.2rem)',
              fontWeight: '800',
              color: '#0a0e3d',
              lineHeight: '1.2',
              marginBottom: '1rem',
              position: 'relative',
              display: 'inline-block'
            }}>
              <span style={{
                position: 'relative',
                zIndex: 1
              }}>
                {t('resourcesTitle')}
              </span>
              <span style={{
                position: 'absolute',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '100px',
                height: '4px',
                background: 'linear-gradient(90deg, #1368ff, #69e8e1)',
                borderRadius: '2px'
              }} />
            </h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              lineHeight: '1.7',
              color: '#4a5568',
              maxWidth: '800px',
              margin: '0 auto',
              fontWeight: '400'
            }}>
              {t('resourcesDescription')}
            </p>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: isDesktop ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr',
            gap: '2rem'
          }}>
            {t.raw('resourcesCards').map((resource: any, index: number) => (
              <div
                key={index}
                className={`resource-card tilt-card delay-${(index % 3) + 1}`}
                style={{
                  background: '#0a0e3d',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '250px'
                }}>
                  <Image
                    src={resource.image || '/img/resource1.jpg'}
                    alt={resource.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
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
            padding: 'clamp(3.5rem, 6vw, 5rem) clamp(2rem, 5vw, 3rem)',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #1368ff, #69e8e1)'
            }} />
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
              color: '#0a0e3d',
              position: 'relative',
              zIndex: 1
            }}>
              {t('ctaTitle')}
            </h2>
            <p style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
              lineHeight: '1.7',
              marginBottom: '2.5rem',
              color: '#4a5568',
              maxWidth: '700px',
              margin: '0 auto 2.5rem',
              fontWeight: '400'
            }}>
              {t('ctaDescription')}
            </p>
            <Link
              href={`/${currentLocale}/contact`}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #1368ff 0%, #0a7cc4 100%)',
                color: '#fff',
                border: 'none',
                padding: 'clamp(1rem, 2vw, 1.2rem) clamp(2.5rem, 5vw, 3.5rem)',
                fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                fontWeight: '700',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 10px 25px rgba(19, 104, 255, 0.3)',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(19, 104, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(19, 104, 255, 0.3)';
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>
                {t('ctaButton')}
              </span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
