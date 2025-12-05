'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('Footer');
  const navT = useTranslations('Navigation');
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';

  const quickLinks = [
    { label: navT('home'), href: `/${currentLocale}` },
    { label: navT('about'), href: `/${currentLocale}#about` },
    { label: navT('services'), href: `/${currentLocale}/services` },
    { label: navT('solutions'), href: `/${currentLocale}/solutions` },
    { label: navT('blog'), href: `/${currentLocale}/blog` },
    { label: navT('faq'), href: `/${currentLocale}/faq` },
    { label: navT('terms'), href: `/${currentLocale}/terms` },
    { label: navT('contact'), href: `/${currentLocale}/contact` },
    { label: navT('login'), href: `/${currentLocale}/auth/login` },
    { label: navT('signup'), href: `/${currentLocale}/auth/signup` }
  ];

  const supportLinks = [
    { label: navT('servicesMenu.consulting'), href: `/${currentLocale}/services/consulting` },
    { label: navT('servicesMenu.devsecops'), href: `/${currentLocale}/services/devsecops` },
    { label: navT('solutionsMenu.overview'), href: `/${currentLocale}/solutions` },
    { label: navT('servicesMenu.managed'), href: `/${currentLocale}/services/managed-it` },
    { label: navT('servicesMenu.infrastructure'), href: `/${currentLocale}/services/infrastructure` },
    { label: navT('servicesMenu.resourcing'), href: `/${currentLocale}/services/resourcing` },
    { label: navT('servicesMenu.training'), href: `/${currentLocale}/services/training` }
  ];

  const contactItems = [
    {
      iconSrc: '/img/phone.png',
      label: t('phoneLabel'),
      value: t('phone'),
      href: `tel:${t('phone').replace(/[^\d+]/g, '')}`
    },
    {
      iconSrc: '/img/email.png',
      label: t('emailLabel'),
      value: t('email'),
      href: `mailto:${t('email')}`
    },
    {
      iconSrc: '/img/office.png',
      label: t('addressLabel'),
      value: t('address'),
      href: undefined
    }
  ];

  const socialLinks = [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/thesamurai/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9h3.96v12H3V9Zm6.75 0H14v1.71h.05c.69-1.31 2.37-2.69 4.88-2.69 5.22 0 6.18 3.43 6.18 7.88V21H21v-4.87c0-1.16-.02-2.64-.81-3.6-.82-1-1.95-1.18-3.01-1.18-2.39 0-3.56 1.71-3.56 4.24V21h-4.87V9Z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <footer
        style={{
          background: 'linear-gradient(180deg, #050a24 0%, #0a1b48 45%, #153d8a 75%, #1c6fc4 100%)',
          color: '#fff',
          padding: 'clamp(8rem, 12vw, 10rem) clamp(1.5rem, 5vw, 3rem) clamp(2rem, 5vw, 3rem)'
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: 'clamp(2rem, 5vw, 3rem)'
          }}
        >
          <div>
            <Link
              href={`/${currentLocale}`}
              prefetch={false}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginBottom: '1.25rem'
              }}
            >
              <Image
                src="/logo.png"
                alt={t('company')}
                width={96}
                height={96}
                style={{
                  width: 'clamp(64px, 10vw, 96px)',
                  height: 'clamp(64px, 10vw, 96px)',
                  objectFit: 'contain'
                }}
              />
            </Link>
            <p
              style={{
                color: 'rgba(255,255,255,0.75)',
                lineHeight: '1.8',
                fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
                marginBottom: '1.5rem',
                maxWidth: '420px'
              }}
            >
              {t('description')}
            </p>
            <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}>
              {socialLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '42px',
                    height: '42px',
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    transition: 'transform 0.3s ease, background 0.3s ease'
                  }}
                  onMouseEnter={(event) => {
                    event.currentTarget.style.transform = 'translateY(-3px)';
                    event.currentTarget.style.background = 'rgba(255,255,255,0.25)';
                  }}
                  onMouseLeave={(event) => {
                    event.currentTarget.style.transform = 'translateY(0)';
                    event.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  }}
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}
            >
              {t('quickLinks')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {quickLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  prefetch={false}
                  className="hover-underline"
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}
            >
              {t('supportLinks')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {supportLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  prefetch={false}
                  className="hover-underline"
                  style={{
                    color: 'rgba(255,255,255,0.8)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '1rem'
              }}
            >
              {t('contactLinks')}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {contactItems.map(({ iconSrc, label, value, href }) => {
                const content = (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span
                      aria-hidden
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'rgba(105, 232, 225, 0.15)',
                        color: '#69E8E1',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem'
                      }}
                    >
                      <Image src={iconSrc} alt="" width={20} height={20} style={{ width: '20px', height: '20px' }} />
                    </span>
                    <div style={{ display: 'grid', gap: '0.2rem' }}>
                      <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>{label}</span>
                      <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>{value}</span>
                    </div>
                  </div>
                );

                if (href) {
                  return (
                    <Link
                      key={label}
                      href={href}
                      prefetch={false}
                      style={{
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'transform 0.3s ease, color 0.3s ease'
                      }}
                      className="hover-underline"
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <div
                    key={label}
                    style={{
                      transition: 'transform 0.3s ease'
                    }}
                    className="hover-underline"
                  >
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: '2rem',
            textAlign: 'center',
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.6)'
          }}
        >
          <p>
            &copy; 2025 {t('company')}. {t('rights')}
          </p>
          <p>
            {t('contactUs')}{' '}
            <Link href={`mailto:${t('email')}`} style={{ color: 'rgba(255,255,255,0.8)' }}>
              {t('email')}
            </Link>{' '}
            | {t('phoneLabel')}{' '}
            <Link href={`tel:${t('phone').replace(/[^\d+]/g, '')}`} style={{ color: 'rgba(255,255,255,0.8)' }}>
              {t('phone')}
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}