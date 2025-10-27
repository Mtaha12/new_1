// app/[locale]/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const common = useTranslations('Common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';
  const isArabic = currentLocale === 'ar';
  const heroPillars = (t.raw('heroPillars') as string[]) || [];
  type Testimonial = {
    quote: string;
    client: string;
    role: string;
    caseStudyLabel: string;
    caseStudySlug: string;
  };
  const testimonials = (t.raw('testimonialsList') as Testimonial[]) || [];
  const testimonialsCtaSlug = t('testimonialsCtaSlug');
  const testimonialsCtaHref = testimonialsCtaSlug
    ? `/${currentLocale}/${testimonialsCtaSlug}`
    : `/${currentLocale}`;
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const activeTestimonialData = testimonials[activeTestimonial] ?? null;
  useEffect(() => {
    if (!testimonials.length) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveTestimonial((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => window.clearInterval(interval);
  }, [testimonials.length]);
  type TeamMember = {
    name: string;
    role: string;
    bio: string;
    photo?: string;
  };
  type TeamValue = {
    title: string;
    description: string;
  };
  const teamMembers = (t.raw('team.members') as TeamMember[]) || [];
  const teamMissionTitle = t('team.missionTitle');
  const teamMissionDescription = t('team.missionDescription');
  const teamValues = (t.raw('team.values') as TeamValue[]) || [];
  const gatedAssetPoints = (t.raw('gatedAsset.points') as string[]) || [];
  const contactItems = (t.raw('contactBlock.items') as { label: string; value: string }[]) || [];
  type ResourceCard = {
    title: string;
    description: string;
    emoji: string;
    slug: string;
    cta: string;
  };
  const resourceCards = (t.raw('resourcesCards') as ResourceCard[]) || [];

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');
  const [gatedAssetStatus, setGatedAssetStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [gatedAssetMessage, setGatedAssetMessage] = useState('');

  const handleNewsletterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewsletterEmail(event.target.value);
    if (newsletterStatus !== 'idle') {
      setNewsletterStatus('idle');
      setNewsletterMessage('');
    }
  };

  const handleGatedAssetSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (gatedAssetStatus === 'loading') {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get('name') as string | null)?.trim() || '';
    const email = (formData.get('email') as string | null)?.trim() || '';
    const company = (formData.get('company') as string | null)?.trim() || '';
    const role = (formData.get('role') as string | null)?.trim() || '';

    if (!name || !email) {
      setGatedAssetStatus('error');
      setGatedAssetMessage(t('gatedAsset.form.required'));
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setGatedAssetStatus('error');
      setGatedAssetMessage(t('gatedAsset.form.invalidEmail'));
      return;
    }

    setGatedAssetStatus('loading');
    setGatedAssetMessage(t('gatedAsset.form.loading'));

    try {
      const response = await fetch('/api/gated-asset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          company: company || undefined,
          role: role || undefined,
          locale: currentLocale,
          assetSlug: 'miercom-2024-security-benchmark',
          assetTitle: t('gatedAsset.title')
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.success) {
        setGatedAssetStatus('success');
        setGatedAssetMessage(data.message || t('gatedAsset.form.success'));
        form.reset();

        if (data.downloadUrl && typeof window !== 'undefined') {
          window.open(data.downloadUrl, '_blank', 'noopener');
        }
        return;
      }

      setGatedAssetStatus('error');
      setGatedAssetMessage(data?.error || t('gatedAsset.form.error'));
    } catch (error) {
      setGatedAssetStatus('error');
      setGatedAssetMessage(t('gatedAsset.form.error'));
    }
  };

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newsletterStatus === 'loading') {
      return;
    }

    const email = newsletterEmail.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setNewsletterStatus('error');
      setNewsletterMessage(t('newsletter.invalidEmail'));
      return;
    }

    setNewsletterStatus('loading');
    setNewsletterMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          locale: currentLocale,
          source: 'homepage'
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.success) {
        setNewsletterStatus('success');
        setNewsletterMessage(data.message || t('newsletter.success'));
        setNewsletterEmail('');
        return;
      }

      if (response.status === 409) {
        setNewsletterStatus('success');
        setNewsletterMessage(data.message || t('newsletter.existing'));
        setNewsletterEmail('');
        return;
      }

      setNewsletterStatus('error');
      setNewsletterMessage(data?.error || t('newsletter.error'));
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage(t('newsletter.error'));
    }
  };

  const buildLocaleHref = (href: string) => {
    if (!href) return '#';
    if (href.startsWith('#') || href.startsWith('http://') || href.startsWith('https://')) {
      return href;
    }
    const normalized = href.startsWith('/') ? href.slice(1) : href;
    return `/${currentLocale}/${normalized}`;
  };

  const contactCtaHref = buildLocaleHref(t('contactBlock.ctaHref'));
  const gatedAssetFormId = 'gated-report-form';

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
    <div style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />

      {/* Hero Section */}
      <section
        className="parallax-wrap fade-section"
        style={{
          background: 'linear-gradient(135deg, #1a1f71 0%, #0a0e3d 50%, #00bcd4 100%)',
          padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 3rem)',
          textAlign: 'center',
          color: '#fff',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(0, 188, 212, 0.2) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        
        <h1 style={{
          fontSize: 'clamp(2rem, 6vw, 4rem)',
          fontWeight: '800',
          marginBottom: '1.25rem',
          position: 'relative',
          zIndex: 1,
          lineHeight: 1.15
        }}>
          {t('heroTitle')}
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          maxWidth: '760px',
          margin: '0 auto 1.5rem',
          lineHeight: 1.8,
          opacity: 0.9,
          position: 'relative',
          zIndex: 1,
          padding: '0 1rem'
        }}>
          {t('heroSubtitle')}
        </p>

        <p style={{
          fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
          maxWidth: '640px',
          margin: '0 auto 2rem',
          lineHeight: 1.7,
          opacity: 0.85,
          position: 'relative',
          zIndex: 1,
          padding: '0 1rem'
        }}>
          {t('heroSupporting')}
        </p>

        {heroPillars.length > 0 && (
          <div
            className="fade-section delay-1"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              marginBottom: '2.5rem',
              position: 'relative',
              zIndex: 1,
              padding: '0 1rem'
            }}
          >
            {heroPillars.map((pillar) => (
              <span
                key={pillar}
                style={{
                  padding: '0.55rem 1.4rem',
                  borderRadius: '999px',
                  background: 'rgba(105, 232, 225, 0.18)',
                  color: '#69E8E1',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.03em'
                }}
              >
                {pillar}
              </span>
            ))}
          </div>
        )}

        <div
          className="fade-section delay-2"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1rem',
            position: 'relative',
            zIndex: 1,
            marginBottom: '1rem'
          }}
        >
          <Link
            className="glow-button ripple-button"
            href={heroPillars.length ? '#miercom-report' : '#resources'}
            prefetch={false}
            style={{
              background: '#0a0e3d',
              color: '#fff',
              border: 'none',
              padding: 'clamp(0.75rem, 1.8vw, 0.9rem) clamp(1.8rem, 4vw, 2.6rem)',
              borderRadius: '30px',
              fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
              fontWeight: 700,
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 10px 30px rgba(10, 14, 61, 0.18)'
            }}
          >
            {t('heroPrimaryCta')}
          </Link>
          <Link
            href={`/${currentLocale}/contact`}
            prefetch={false}
            style={{
              background: 'transparent',
              color: '#fff',
              border: '2px solid rgba(255,255,255,0.7)',
              padding: 'clamp(0.75rem, 1.8vw, 0.9rem) clamp(1.8rem, 4vw, 2.6rem)',
              borderRadius: '30px',
              fontSize: 'clamp(0.9rem, 1.4vw, 1rem)',
              fontWeight: 600,
              cursor: 'pointer',
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
            {t('heroSecondaryCta')}
          </Link>
        </div>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.6,
            position: 'relative',
            zIndex: 1,
            padding: '0 1rem'
          }}
        >
          {t('heroPrimaryCtaNote')}
        </p>
      </section>

      {/* Partners Section */}
      <section
        id="industries"
        className="fade-section delay-1"
        style={{
          background: '#0a0e3d',
          padding: 'clamp(2.5rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem)'
        }}
      >
        <div style={{
          maxWidth: '1180px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(1.5rem, 4vw, 2.5rem)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '0.75rem'
            }}>
              {t('partnersHeadline')}
            </h2>
            <p style={{
              color: 'rgba(255,255,255,0.75)',
              maxWidth: '720px',
              lineHeight: 1.7,
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              margin: '0 auto'
            }}>
              {t('partnersSubheadline')}
            </p>
          </div>

          <div
            className="fade-section delay-2"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'clamp(1rem, 3vw, 2.5rem)'
            }}
          >
            {['ForgeRock', 'Microsoft Azure', 'SentinelOne', 'PingIdentity', 'THALES', 'okta'].map((partner) => (
              <div
                key={partner}
                className="tilt-card subtle-card"
                style={{
                  color: '#fff',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  fontWeight: '600',
                  opacity: 0.85,
                  letterSpacing: '0.04em',
                  padding: '0.75rem 1.4rem'
                }}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && activeTestimonialData && (
        <section
          className="fade-section delay-2"
          style={{
            background: '#f8f9fa',
            padding: 'clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)'
          }}
        >
          <div
            style={{
              maxWidth: '1100px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: 'clamp(2rem, 5vw, 3rem)',
              alignItems: 'center'
            }}
          >
            <div className="fade-section delay-2 testimonial-card-frame" style={{ position: 'relative' }}>
              <div
                className="pulse-border"
                style={{
                  position: 'absolute',
                  inset: '-18px',
                  borderRadius: '32px',
                  border: '1px solid rgba(10, 14, 61, 0.08)',
                  opacity: 0.3,
                  pointerEvents: 'none'
                }}
              ></div>
              <p
                style={{
                  color: '#00bcd4',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem'
                }}
              >
                {t('testimonialsTitle')}
              </p>
              <h2
                style={{
                  fontSize: 'clamp(1.8rem, 4vw, 2.6rem)',
                  fontWeight: 800,
                  color: '#0a0e3d',
                  marginBottom: '1rem'
                }}
              >
                {activeTestimonialData.client}
              </h2>
              <p
                style={{
                  color: '#555',
                  lineHeight: 1.7,
                  fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)',
                  marginBottom: '0.75rem'
                }}
              >
                {activeTestimonialData.role}
              </p>
              <p
                style={{
                  color: '#666',
                  lineHeight: 1.8,
                  fontSize: 'clamp(1.05rem, 1.9vw, 1.2rem)',
                  fontStyle: 'italic',
                  marginBottom: '2rem'
                }}
              >
                “{activeTestimonialData.quote}”
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'center'
                }}
              >
                <Link
                  className="glow-button ripple-button"
                  href={testimonialsCtaHref}
                  prefetch={false}
                  style={{
                    background: '#0a0e3d',
                    color: '#fff',
                    borderRadius: '30px',
                    padding: '0.85rem 2.4rem',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    boxShadow: '0 14px 32px rgba(10, 14, 61, 0.18)'
                  }}
                >
                  {t('testimonialsCtaLabel')}
                </Link>
                <Link
                  href={`/${currentLocale}/${activeTestimonialData.caseStudySlug}`}
                  prefetch={false}
                  style={{
                    color: '#00bcd4',
                    fontWeight: 600,
                    textDecoration: 'none',
                    fontSize: '0.95rem'
                  }}
                >
                  {activeTestimonialData.caseStudyLabel}
                </Link>
              </div>
            </div>

            <div
              className="tilt-card delay-3 testimonial-card-frame"
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: 'clamp(2.5rem, 6vw, 3.5rem)',
                boxShadow: '0 20px 45px rgba(10, 14, 61, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '-80px',
                  right: '-40px',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(105, 232, 225, 0.25), transparent 60%)'
                }}
              ></span>
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: '-60px',
                  left: '-30px',
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(10, 14, 61, 0.15), transparent 60%)'
                }}
              ></span>
              <p
                className="testimonial-quote-area"
                style={{
                  fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                  lineHeight: 1.8,
                  color: '#0a0e3d'
                }}
              >
                “{activeTestimonialData.quote}”
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === 0 ? testimonials.length - 1 : prev - 1
                    )
                  }
                  style={{
                    background: '#0a0e3d',
                    color: '#fff',
                    border: 'none',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                  aria-label="Previous testimonial"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonial((prev) =>
                      prev === testimonials.length - 1 ? 0 : prev + 1
                    )
                  }
                  style={{
                    background: '#69E8E1',
                    color: '#0a0e3d',
                    border: 'none',
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    boxShadow: '0 12px 26px rgba(105, 232, 225, 0.3)'
                  }}
                  aria-label="Next testimonial"
                >
                  ›
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '0.45rem'
                }}
              >
                {testimonials.map((_, index) => (
                  <span
                    key={index}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background:
                        index === activeTestimonial ? '#0a0e3d' : 'rgba(10,14,61,0.2)'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Who We Are Section */}
      <section id="about" style={{
        padding: 'clamp(3rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
        gap: 'clamp(2rem, 5vw, 4rem)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div>
          <p style={{ color: '#666', fontSize: 'clamp(0.9rem, 1.2vw, 0.95rem)', marginBottom: '0.5rem' }}>Who We Are</p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            color: '#0a0e3d',
            lineHeight: '1.2',
            marginBottom: '2rem'
          }}>
            Defenders Of<br />Your Digital Realm
          </h2>
          <p style={{ color: '#666', lineHeight: '1.8', fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)' }}>
            {t('aboutDescription')}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Cybersecurity Card */}
          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: '#0a0e3d',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#00bcd4',
              fontSize: '1.5rem'
            }}>🔒</div>
            <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: '700', color: '#0a0e3d', marginBottom: '0.75rem' }}>
              {t('cybersecurityTitle')}
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}>
              {t('cybersecurityDescription')}
            </p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)' }}>
              {t('cybersecurityDetail')}
            </p>
            <button style={{
              background: 'transparent',
              border: 'none',
              color: '#00bcd4',
              fontSize: '2rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}>→</button>
          </div>

          {/* IT Consultation Card */}
          <div style={{
            background: '#fff',
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              background: '#0a0e3d',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
              color: '#00bcd4',
              fontSize: '1.5rem'
            }}>💡</div>
            <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', fontWeight: '700', color: '#0a0e3d', marginBottom: '0.75rem' }}>
              {t('consultationTitle')}
            </h3>
            <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '1rem', fontSize: 'clamp(0.9rem, 1.2vw, 1rem)' }}>
              {t('consultationDescription')}
            </p>
            <p style={{ color: '#666', lineHeight: '1.6', fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)' }}>
              {t('consultationButton')}
            </p>
            <button style={{
              background: 'transparent',
              border: 'none',
              color: '#00bcd4',
              fontSize: '2rem',
              cursor: 'pointer',
              marginTop: '1rem'
            }}>→</button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      {(teamMembers.length > 0 || teamValues.length > 0) && (
        <section
          className="fade-section delay-2"
          style={{
            padding: 'clamp(3.2rem, 8vw, 6rem) clamp(1.5rem, 5vw, 3rem)',
            background: '#f8f9fa'
          }}
        >
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2
              style={{
                fontSize: 'clamp(1.9rem, 4vw, 2.7rem)',
                fontWeight: 800,
                color: '#0a0e3d',
                textAlign: 'center',
                marginBottom: '1rem'
              }}
            >
              {t('team.title')}
            </h2>
            <p
              style={{
                color: '#555',
                textAlign: 'center',
                maxWidth: '820px',
                margin: '0 auto clamp(2.5rem, 5vw, 3.5rem)',
                lineHeight: 1.8,
                fontSize: 'clamp(0.95rem, 1.6vw, 1.05rem)'
              }}
            >
              {t('team.subtitle')}
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(1.75rem, 4vw, 3rem)',
                alignItems: 'start',
                textAlign: isArabic ? 'right' : 'left'
              }}
            >
              <div
                className="tilt-card"
                style={{
                  background: '#fff',
                  borderRadius: '24px',
                  padding: 'clamp(2rem, 5vw, 2.6rem)',
                  boxShadow: '0 18px 40px rgba(10, 14, 61, 0.08)',
                  border: '1px solid rgba(10,14,61,0.06)',
                  display: 'grid',
                  gap: '1.6rem',
                  textAlign: isArabic ? 'right' : 'left'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: 'clamp(1.4rem, 3vw, 1.85rem)',
                      fontWeight: 800,
                      color: '#0a0e3d',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {teamMissionTitle}
                  </h3>
                  <p style={{ color: '#404060', lineHeight: 1.7, textAlign: isArabic ? 'right' : 'left' }}>{teamMissionDescription}</p>
                </div>

                {teamValues.length > 0 && (
                  <div>
                    <h4
                      style={{
                        fontSize: 'clamp(1.1rem, 2.4vw, 1.35rem)',
                        fontWeight: 700,
                        color: '#0a0e3d',
                        marginBottom: '1rem'
                      }}
                    >
                      {t('team.valuesTitle')}
                    </h4>
                    <div style={{ display: 'grid', gap: '1rem', textAlign: isArabic ? 'right' : 'left' }}>
                      {teamValues.map((value, index) => (
                        <div
                          className={`tilt-card subtle-card delay-${index + 1}`}
                          key={value.title}
                          style={{
                            border: '1px solid rgba(10,14,61,0.08)',
                            borderRadius: '18px',
                            padding: '1.2rem 1.4rem',
                            background: '#f5f7ff',
                            textAlign: isArabic ? 'right' : 'left'
                          }}
                        >
                          <p
                            style={{
                              fontWeight: 700,
                              color: '#0a0e3d',
                              marginBottom: '0.35rem',
                              fontSize: '1rem',
                              textAlign: isArabic ? 'right' : 'left'
                            }}
                          >
                            {value.title}
                          </p>
                          <p style={{ color: '#4c4c66', lineHeight: 1.6, textAlign: isArabic ? 'right' : 'left' }}>{value.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {teamMembers.length > 0 && (
                <div
                  className="team-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
                    gap: 'clamp(1.4rem, 3vw, 2rem)',
                    textAlign: isArabic ? 'right' : 'left'
                  }}
                >
                  {teamMembers.map((member, index) => (
                    <div
                      className={`tilt-card delay-${index + 1}`}
                      key={member.name}
                      style={{
                        background: '#fff',
                        borderRadius: '20px',
                        padding: '2rem',
                        border: '1px solid rgba(10,14,61,0.08)',
                        boxShadow: '0 16px 36px rgba(10, 14, 61, 0.08)',
                        display: 'grid',
                        gap: '0.9rem',
                        textAlign: isArabic ? 'right' : 'left'
                      }}
                    >
                      <div
                        className="pulse-border"
                        style={{
                          width: '72px',
                          height: '72px',
                          borderRadius: '18px',
                          overflow: 'hidden',
                          background: '#0a0e3d',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginInline: isArabic ? '0 0 auto' : '0 auto 0'
                        }}
                      >
                        {member.photo ? (
                          <Image
                            src={member.photo}
                            alt={member.role ? `${member.name}, ${member.role}` : member.name}
                            width={72}
                            height={72}
                            sizes="72px"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <span
                            style={{
                              color: '#69E8E1',
                              fontWeight: 700,
                              fontSize: '1.4rem'
                            }}
                          >
                            {member.name
                              .split(' ')
                              .map((part) => part[0])
                              .join('')
                              .slice(0, 2)}
                          </span>
                        )}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                            fontWeight: 700,
                            color: '#0a0e3d',
                            textAlign: isArabic ? 'right' : 'left'
                          }}
                        >
                          {member.name}
                        </p>
                        <p style={{ color: '#00bcd4', fontWeight: 600, marginBottom: '0.5rem', textAlign: isArabic ? 'right' : 'left' }}>
                          {member.role}
                        </p>
                        <p style={{ color: '#4c4c66', lineHeight: 1.7, textAlign: isArabic ? 'right' : 'left' }}>{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section
        className="fade-section delay-3"
        style={{
          background: '#f5fbfb',
          padding: 'clamp(3rem, 9vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)'
        }}
      >
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: '#fff',
            borderRadius: '24px',
            padding: 'clamp(2.2rem, 6vw, 3rem)',
            boxShadow: '0 20px 40px rgba(10, 14, 61, 0.08)',
            textAlign: isArabic ? 'right' : 'left'
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.3rem)',
              fontWeight: 800,
              color: '#0a0e3d',
              marginBottom: '1rem',
              transition: 'all 0.3s ease-in-out'
            }}
          >
            {t('newsletter.title')}
          </h3>
          <p
            style={{
              color: '#555',
              lineHeight: 1.8,
              fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
              marginBottom: '1.75rem',
              transition: 'all 0.3s ease-in-out',
              textAlign: isArabic ? 'right' : 'left'
            }}
          >
            {t('newsletter.subtitle')}
          </p>
          <form
            className="fade-section delay-3"
            onSubmit={handleNewsletterSubmit}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
              alignItems: 'center',
              direction: isArabic ? 'rtl' : 'ltr'
            }}
          >
            <input
              type="email"
              name="newsletter-email"
              value={newsletterEmail}
              onChange={handleNewsletterChange}
              placeholder={t('newsletter.emailPlaceholder')}
              style={{
                padding: '0.9rem 1.2rem',
                borderRadius: '999px',
                border: '1px solid #dce0f5',
                fontSize: '0.95rem',
                transition: 'all 0.3s ease-in-out',
                textAlign: isArabic ? 'right' : 'left',
                color: '#0a0e3d'
              }}
              required
            />
            <button
              className="glow-button"
              type="submit"
              disabled={newsletterStatus === 'loading'}
              style={{
                background: '#00bcd4',
                color: '#fff',
                border: 'none',
                borderRadius: '999px',
                padding: '0.9rem 2.5rem',
                fontWeight: 700,
                fontSize: '0.95rem',
                cursor: newsletterStatus === 'loading' ? 'not-allowed' : 'pointer',
                opacity: newsletterStatus === 'loading' ? 0.8 : 1,
                transition: 'all 0.3s ease-in-out',
                alignSelf: isArabic ? 'flex-end' : 'flex-start'
              }}
            >
              {newsletterStatus === 'loading' ? t('newsletter.loading') : t('newsletter.cta')}
            </button>
          </form>
          {newsletterStatus !== 'idle' && (
            <div
              role="status"
              aria-live="polite"
              style={{
                minHeight: '1.5rem',
                marginTop: '0.5rem',
                color: newsletterStatus === 'success' ? '#0a8f44' : '#d03c3c',
                fontSize: '0.85rem',
                textAlign: isArabic ? 'right' : 'left'
              }}
            >
              {newsletterMessage}
            </div>
          )}
          <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '1rem', textAlign: isArabic ? 'right' : 'left' }}>
            {t('newsletter.privacy')}
          </p>
        </div>
      </section>

      {/* Contact Block */}
      <section
        style={{
          padding: 'clamp(3rem, 8vw, 5.5rem) clamp(1.5rem, 6vw, 3.5rem)'
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            background: '#0a0e3d',
            borderRadius: '24px',
            padding: 'clamp(2.5rem, 6vw, 3.5rem)',
            color: '#fff',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(1.8rem, 5vw, 2.5rem)',
            textAlign: isArabic ? 'right' : 'left'
          }}
        >
          <div>
            <h3
              style={{
                fontSize: 'clamp(1.7rem, 3.5vw, 2.3rem)',
                fontWeight: 800,
                marginBottom: '0.75rem',
                textAlign: isArabic ? 'right' : 'left'
              }}
            >
              {t('contactBlock.title')}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
              {t('contactBlock.subtitle')}
            </p>
          </div>

          <div style={{ display: 'grid', gap: '0.75rem', direction: isArabic ? 'rtl' : 'ltr' }}>
            {contactItems.map((item) => (
              <div key={item.label} style={{ color: 'rgba(255,255,255,0.75)' }}>
                <span style={{ color: '#69E8E1', fontWeight: 600 }}>{item.label}</span>
                <br />
                <span>{item.value}</span>
              </div>
            ))}
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.5rem',
              alignItems: isArabic ? 'flex-end' : 'flex-start'
            }}
          >
            <Link
              href={contactCtaHref}
              prefetch={false}
              style={{
                alignSelf: isArabic ? 'flex-end' : 'flex-start',
                background: '#69E8E1',
                color: '#0a0e3d',
                padding: '0.95rem 2.6rem',
                borderRadius: '30px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.95rem'
              }}
            >
              {t('contactBlock.ctaLabel')}
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              {t('contactBlock.note')}
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
