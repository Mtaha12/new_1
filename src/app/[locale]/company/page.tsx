'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useState, useEffect } from 'react';

const MAX_CONTAINER_WIDTH = 'min(1140px, 100%)';

export default function CompanyPage() {
  const t = useTranslations('CompanyPage');
  const pathname = usePathname() ?? '/en';
  const currentLocale = pathname.split('/')[1] || 'en';
  const isArabic = currentLocale === 'ar';
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeTab, setActiveTab] = useState<'company' | 'code'>('company');

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
          minHeight: 'min(90vh, 800px)'
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
            src="/img/ihero.jpg"
            alt={isArabic ? "خلفية الشركة والكود" : "Company and Code hero background"}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              filter: 'brightness(0.5)'
            }}
            priority
          />
        </div>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(10, 14, 61, 0.9) 0%, rgba(19, 70, 163, 0.8) 100%)',
            zIndex: 1
          }}
        />
        <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
            fontWeight: '800',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
            textShadow: '0 4px 8px rgba(0,0,0,0.4)',
            letterSpacing: '-0.02em'
          }}>
            {t('hero.title')}
          </h1>
          <p style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)',
            lineHeight: 1.6,
            maxWidth: '900px',
            margin: '0 auto 2rem',
            opacity: 0.98,
            fontWeight: '300'
          }}>
            {t('hero.subtitle')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('company')}
              style={{
                padding: 'clamp(0.8rem, 2vw, 1.1rem) clamp(1.5rem, 4vw, 2.5rem)',
                background: activeTab === 'company' ? '#69E8E1' : 'rgba(255,255,255,0.2)',
                color: activeTab === 'company' ? '#0a0e3d' : '#fff',
                border: 'none',
                borderRadius: '999px',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'company') {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'company') {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {t('tabs.company')}
            </button>
            <button
              onClick={() => setActiveTab('code')}
              style={{
                padding: 'clamp(0.8rem, 2vw, 1.1rem) clamp(1.5rem, 4vw, 2.5rem)',
                background: activeTab === 'code' ? '#69E8E1' : 'rgba(255,255,255,0.2)',
                color: activeTab === 'code' ? '#0a0e3d' : '#fff',
                border: 'none',
                borderRadius: '999px',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== 'code') {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== 'code') {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              {t('tabs.code')}
            </button>
          </div>
        </div>
      </section>

      {/* Company Section */}
      {activeTab === 'company' && (
        <section style={{
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 1 }}>

            {/* Vision Section */}
            <div 
              className="fade-section delay-1"
              style={{
                display: 'grid',
                gridTemplateColumns: isDesktop ? (isArabic ? '1.2fr 1fr' : '1fr 1.2fr') : '1fr',
                gap: 'clamp(2rem, 4vw, 4rem)',
                alignItems: 'center',
                direction: isArabic ? 'rtl' : 'ltr',
                minHeight: '400px',
                marginBottom: '4rem'
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
                  }}>{t('vision.title')}</span>
                  <span style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: isDesktop ? (isArabic ? 'auto' : '0') : '50%',
                    right: isDesktop ? (isArabic ? '0' : 'auto') : 'auto',
                    transform: isDesktop ? 'none' : 'translateX(-50%)',
                    width: '100px',
                    height: '5px',
                    background: 'linear-gradient(90deg, #1368ff, #69E8E1)',
                    borderRadius: '3px'
                  }} />
                </h2>
                <h3 style={{
                  fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                  fontWeight: '700',
                  color: '#1368ff',
                  lineHeight: '1.3',
                  marginBottom: '1.8rem'
                }}>
                  {t('vision.subtitle')}
                </h3>
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  lineHeight: '1.8',
                  color: '#475569',
                  marginBottom: '1.5rem',
                  fontWeight: '400'
                }}>
                  {t('vision.para1')}
                </p>
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  lineHeight: '1.8',
                  color: '#475569',
                  marginBottom: '1.5rem',
                  fontWeight: '400'
                }}>
                  {t('vision.para2')}
                </p>
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  lineHeight: '1.8',
                  color: '#475569',
                  fontWeight: '400'
                }}>
                  {t('vision.para3')}
                </p>
              </div>

              {/* Right Side Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '450px',
                overflow: 'hidden',
                borderRadius: '24px'
              }}>
                <Image
                  src="/img/s1.jpg"
                  alt={isArabic ? "رؤية الشركة" : "Company vision"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '24px',
                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>
            </div>

            {/* What We Do Section */}
            <div style={{
              marginBottom: '4rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                fontWeight: '800',
                color: '#0a0e3d',
                lineHeight: '1.2',
                marginBottom: '3.5rem',
                textAlign: 'center'
              }}>
                {t('whatWeDo.title')}
              </h2>

              <div 
                className="fade-section delay-2"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                  gap: '2.5rem'
                }}>
                {/* Strategic Resourcing */}
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(10, 14, 61, 0.06)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.1), rgba(19, 104, 255, 0.1))',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '2rem',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    💼
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#0a0e3d',
                    marginBottom: '1rem'
                  }}>
                    {t('whatWeDo.strategicResourcing.title')}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#666'
                  }}>
                    {t('whatWeDo.strategicResourcing.description')}
                  </p>
                </div>

                {/* Expert Guidance */}
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(10, 14, 61, 0.06)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.1), rgba(19, 104, 255, 0.1))',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '2rem',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    🎯
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#0a0e3d',
                    marginBottom: '1rem'
                  }}>
                    {t('whatWeDo.expertGuidance.title')}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#666'
                  }}>
                    {t('whatWeDo.expertGuidance.description')}
                  </p>
                </div>

                {/* License Management */}
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(10, 14, 61, 0.06)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.1), rgba(19, 104, 255, 0.1))',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '2rem',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    📋
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#0a0e3d',
                    marginBottom: '1rem'
                  }}>
                    {t('whatWeDo.licenseManagement.title')}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#666'
                  }}>
                    {t('whatWeDo.licenseManagement.description')}
                  </p>
                </div>

                {/* Seamless Supply Chain */}
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(10, 14, 61, 0.06)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.1), rgba(19, 104, 255, 0.1))',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '2rem',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    ⚡
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#0a0e3d',
                    marginBottom: '1rem'
                  }}>
                    {t('whatWeDo.seamlessSupplyChain.title')}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#666'
                  }}>
                    {t('whatWeDo.seamlessSupplyChain.description')}
                  </p>
                </div>

                {/* Installation and Negotiation */}
                <div style={{
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(10, 14, 61, 0.06)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.1), rgba(19, 104, 255, 0.1))',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '2rem',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    🛠️
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#0a0e3d',
                    marginBottom: '1rem'
                  }}>
                    {t('whatWeDo.installationNegotiation.title')}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#666'
                  }}>
                    {t('whatWeDo.installationNegotiation.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* ROI Section */}
            <div 
              className="fade-section delay-3"
              style={{
                background: 'linear-gradient(135deg, #0a0e3d 0%, #1346a3 50%, #1a70d4 100%)',
                borderRadius: '28px',
                padding: 'clamp(3.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 3rem)',
                textAlign: 'center',
                color: '#fff',
                marginBottom: '4rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-10%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(105, 232, 225, 0.15) 0%, transparent 70%)',
                borderRadius: '50%'
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{
                  fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                  fontWeight: '800',
                  lineHeight: '1.2',
                  marginBottom: '1.8rem'
                }}>
                  {t('roi.title')}
                </h2>
                <p style={{
                  fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                  lineHeight: '1.8',
                  maxWidth: '950px',
                  margin: '0 auto',
                  opacity: 0.97
                }}>
                  {t('roi.description')}
                </p>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div 
              className="fade-section delay-4"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 250, 252, 1) 100%)',
                borderRadius: '28px',
                padding: 'clamp(3.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 3rem)',
                marginBottom: '4rem',
                border: '2px solid rgba(19, 104, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
              <h2 style={{
                fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                fontWeight: '800',
                color: '#0a0e3d',
                lineHeight: '1.2',
                marginBottom: '1.8rem',
                textAlign: 'center'
              }}>
                {t('whyChooseUs.title')}
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                lineHeight: '1.8',
                color: '#475569',
                maxWidth: '900px',
                margin: '0 auto',
                textAlign: 'center'
              }}>
                {t('whyChooseUs.description')}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Code Section */}
      {activeTab === 'code' && (
        <section style={{
          padding: 'clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
          background: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ maxWidth: MAX_CONTAINER_WIDTH, margin: '0 auto', position: 'relative', zIndex: 1 }}>
            
            {/* Code Philosophy */}
            <div 
              className="fade-section delay-1"
              style={{
                display: 'grid',
                gridTemplateColumns: isDesktop ? (isArabic ? '1fr 1.2fr' : '1.2fr 1fr') : '1fr',
                gap: 'clamp(2rem, 4vw, 4rem)',
                alignItems: 'center',
                direction: isArabic ? 'rtl' : 'ltr',
                minHeight: '400px',
                marginBottom: '4rem'
              }}>
              {/* Left Side Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: '450px',
                overflow: 'hidden',
                borderRadius: '24px',
                order: isDesktop ? (isArabic ? 2 : 1) : 1
              }}>
                <Image
                  src="/img/s2.jpg"
                  alt={isArabic ? "فلسفة الكود" : "Code philosophy"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '24px',
                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.3)'
                  }}
                />
              </div>

              {/* Content */}
              <div style={{
                ...isDesktop ? {} : { margin: '0 auto', textAlign: 'center' },
                maxWidth: '650px',
                padding: isDesktop ? '0' : '0 1rem',
                order: isDesktop ? (isArabic ? 1 : 2) : 2
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
                  }}>{t('code.title')}</span>
                  <span style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: isDesktop ? (isArabic ? 'auto' : '0') : '50%',
                    right: isDesktop ? (isArabic ? '0' : 'auto') : 'auto',
                    transform: isDesktop ? 'none' : 'translateX(-50%)',
                    width: '100px',
                    height: '5px',
                    background: 'linear-gradient(90deg, #1368ff, #69E8E1)',
                    borderRadius: '3px'
                  }} />
                </h2>
                <h3 style={{
                  fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                  fontWeight: '700',
                  color: '#1368ff',
                  lineHeight: '1.3',
                  marginBottom: '1.8rem'
                }}>
                  {t('code.subtitle')}
                </h3>
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  lineHeight: '1.8',
                  color: '#475569',
                  marginBottom: '1.5rem',
                  fontWeight: '400'
                }}>
                  {t('code.para1')}
                </p>
                <p style={{
                  fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                  lineHeight: '1.8',
                  color: '#475569',
                  fontWeight: '400'
                }}>
                  {t('code.para2')}
                </p>
              </div>
            </div>

            {/* Our Approach */}
            <div style={{
              marginBottom: '4rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                fontWeight: '800',
                color: '#0a0e3d',
                lineHeight: '1.2',
                marginBottom: '3.5rem',
                textAlign: 'center'
              }}>
                {t('code.approach.title')}
              </h2>

              <div 
                className="fade-section delay-2"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
                  gap: '2.5rem'
                }}>
                {/* Clean Code */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.08) 0%, rgba(19, 104, 255, 0.08) 100%)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(19, 104, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.1), rgba(19, 104, 255, 0.1))',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '2rem',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    ✨
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#0a0e3d',
                    marginBottom: '1rem'
                  }}>
                    {t('code.approach.cleanCode.title')}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#666'
                  }}>
                    {t('code.approach.cleanCode.description')}
                  </p>
                </div>

                {/* Security First */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.08) 0%, rgba(19, 104, 255, 0.08) 100%)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(19, 104, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.1), rgba(19, 104, 255, 0.1))',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '2rem',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    🔐
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#0a0e3d',
                    marginBottom: '1rem'
                  }}>
                    {t('code.approach.securityFirst.title')}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#666'
                  }}>
                    {t('code.approach.securityFirst.description')}
                  </p>
                </div>

                {/* Performance */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.08) 0%, rgba(19, 104, 255, 0.08) 100%)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(19, 104, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.1), rgba(19, 104, 255, 0.1))',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '2rem',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    ⚡
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#0a0e3d',
                    marginBottom: '1rem'
                  }}>
                    {t('code.approach.performance.title')}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#666'
                  }}>
                    {t('code.approach.performance.description')}
                  </p>
                </div>

                {/* Scalability */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.08) 0%, rgba(19, 104, 255, 0.08) 100%)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(19, 104, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.1), rgba(19, 104, 255, 0.1))',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '2rem',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    📈
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#0a0e3d',
                    marginBottom: '1rem'
                  }}>
                    {t('code.approach.scalability.title')}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#666'
                  }}>
                    {t('code.approach.scalability.description')}
                  </p>
                </div>

                {/* Maintainability */}
                <div style={{
                  background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.08) 0%, rgba(19, 104, 255, 0.08) 100%)',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(19, 104, 255, 0.1)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)';
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.1), rgba(19, 104, 255, 0.1))',
                    borderRadius: '50%'
                  }} />
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.8rem',
                    fontSize: '2rem',
                    color: '#fff',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    🔧
                  </div>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#0a0e3d',
                    marginBottom: '1rem'
                  }}>
                    {t('code.approach.maintainability.title')}
                  </h3>
                  <p style={{
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    color: '#666'
                  }}>
                    {t('code.approach.maintainability.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Code Promise */}
            <div 
              className="fade-section delay-3"
              style={{
                background: 'linear-gradient(135deg, rgba(105, 232, 225, 0.15) 0%, rgba(19, 104, 255, 0.15) 100%)',
                borderRadius: '28px',
                padding: 'clamp(3.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 3rem)',
                textAlign: 'center',
                border: '2px solid rgba(19, 104, 255, 0.2)'
              }}>
              <h2 style={{
                fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
                fontWeight: '800',
                color: '#0a0e3d',
                lineHeight: '1.2',
                marginBottom: '1.8rem'
              }}>
                {t('code.promise.title')}
              </h2>
              <p style={{
                fontSize: 'clamp(1rem, 1.6vw, 1.2rem)',
                lineHeight: '1.8',
                color: '#475569',
                maxWidth: '900px',
                margin: '0 auto'
              }}>
                {t('code.promise.description')}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Resources Section */}
      <section style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        background: '#f8fafc',
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
            {t('resources.title')}
          </h2>
          <p style={{
            color: '#666',
            lineHeight: '1.8',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            textAlign: 'center'
          }}>
            {t('resources.description')}
          </p>
          <div 
            className="fade-section delay-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '2rem'
            }}>
            {[1, 2, 3].map((index) => (
              <Link
                key={index}
                href={`/${currentLocale}/blog`}
                prefetch={false}
                className={`tilt-card delay-${(index % 3) + 1}`}
                style={{
                  textDecoration: 'none',
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16/9',
                  overflow: 'hidden',
                  borderRadius: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                  cursor: 'pointer',
                  display: 'block',
                  transition: 'all 0.3s ease'
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
                <Image
                  src={`/img/resource${index}.jpg`}
                  alt={`Resource ${index}`}
                  fill
                  style={{ 
                    objectFit: 'cover'
                  }}
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </Link>
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
            borderRadius: '28px',
            padding: 'clamp(3.5rem, 6vw, 4.5rem) clamp(2rem, 5vw, 3rem)',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0,0,0,0.25)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.9rem, 4vw, 2.6rem)',
              fontWeight: '800',
              lineHeight: '1.2',
              marginBottom: '1.2rem',
              color: '#0a0e3d'
            }}>
              {t('cta.title')}
            </h2>
            <p style={{
              fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
              lineHeight: '1.7',
              marginBottom: '2.5rem',
              color: '#666',
              maxWidth: '700px',
              margin: '0 auto 2.5rem'
            }}>
              {t('cta.description')}
            </p>
            <Link
              href={`/${currentLocale}/contact`}
              style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #1368ff 0%, #0a3fa0 100%)',
                color: '#fff',
                border: 'none',
                padding: 'clamp(0.9rem, 2vw, 1.15rem) clamp(2.5rem, 5vw, 3.5rem)',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                fontWeight: '600',
                borderRadius: '999px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 12px 32px rgba(19, 104, 255, 0.35)',
                textDecoration: 'none',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(19, 104, 255, 0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(19, 104, 255, 0.35)';
              }}
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
