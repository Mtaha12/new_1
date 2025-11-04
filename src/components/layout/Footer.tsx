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
      icon: '☎️',
      label: t('phoneLabel'),
      value: t('phone'),
      href: `tel:${t('phone').replace(/[^\d+]/g, '')}`
    },
    {
      icon: '✉️',
      label: t('emailLabel'),
      value: t('email'),
      href: `mailto:${t('email')}`
    },
    {
      icon: '📍',
      label: t('addressLabel'),
      value: t('address'),
      href: undefined
    }
  ];

  const socialLinks = [
    {
      label: 'Facebook',
      href: 'https://facebook.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 4.99 3.66 9.13 8.44 9.93v-7.03H8.08v-2.9h2.36V9.41c0-2.33 1.4-3.62 3.53-3.62 1.02 0 2.09.18 2.09.18v2.3h-1.18c-1.17 0-1.54.73-1.54 1.48v1.78h2.62l-.42 2.9h-2.2V22c4.78-.8 8.44-4.94 8.44-9.93Z" />
        </svg>
      )
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M7 2C4.239 2 2 4.239 2 7v10c0 2.761 2.239 5 5 5h10c2.761 0 5-2.239 5-5V7c0-2.761-2.239-5-5-5H7Zm0 2h10c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3Zm10 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM12 7a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 7Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
        </svg>
      )
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M22 5.92c-.77.34-1.6.57-2.47.67a4.26 4.26 0 0 0 1.88-2.35 8.44 8.44 0 0 1-2.7 1.04 4.21 4.21 0 0 0-7.3 2.88c0 .33.04.66.11.97-3.5-.18-6.62-1.86-8.7-4.42a4.22 4.22 0 0 0-.57 2.13 4.2 4.2 0 0 0 1.87 3.5 4.18 4.18 0 0 1-1.9-.52v.05c0 2.03 1.44 3.72 3.36 4.1-.35.09-.72.14-1.1.14-.27 0-.53-.03-.78-.07a4.23 4.23 0 0 0 3.94 2.93A8.45 8.45 0 0 1 2 19.54a11.9 11.9 0 0 0 6.45 1.89c7.75 0 11.99-6.42 11.99-11.99 0-.18-.01-.36-.02-.54A8.5 8.5 0 0 0 22 5.92Z" />
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5ZM3 9h3.96v12H3V9Zm6.75 0H14v1.71h.05c.69-1.31 2.37-2.69 4.88-2.69 5.22 0 6.18 3.43 6.18 7.88V21H21v-4.87c0-1.16-.02-2.64-.81-3.6-.82-1-1.95-1.18-3.01-1.18-2.39 0-3.56 1.71-3.56 4.24V21h-4.87V9Z" />
        </svg>
      )
    },
    {
      label: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21.6 7.2c-.25-.94-.98-1.68-1.91-1.93C17.54 5 12 5 12 5s-5.54 0-7.69.27c-.93.25-1.66.99-1.91 1.93C2 9.35 2 12 2 12s0 2.65.4 4.8c.25.94.98 1.68 1.91 1.93C6.46 19 12 19 12 19s5.54 0 7.69-.27c.93-.25 1.66-.99 1.91-1.93.4-2.15.4-4.8.4-4.8s0-2.65-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
        </svg>
      )
    }
  ];

  return (
    <>
      <footer
        style={{
          background: '#0a0e3d',
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
                width={72}
                height={72}
                style={{
                  width: 'clamp(48px, 8vw, 72px)',
                  height: 'clamp(48px, 8vw, 72px)',
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
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  prefetch={false}
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
              {contactItems.map(({ icon, label, value, href }) => {
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
                      {icon}
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