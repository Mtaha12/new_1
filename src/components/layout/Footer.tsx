'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const t = useTranslations('Footer');
  const navT = useTranslations('Navigation');
  const commonT = useTranslations('Common');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const quickLinks = [
    { label: navT('home'), href: `/${currentLocale}` },
    { label: navT('about'), href: `/${currentLocale}#about` },
    { label: navT('services'), href: `/${currentLocale}/services` },
    { label: navT('blog'), href: `/${currentLocale}/blog` },
    { label: navT('contact'), href: `/${currentLocale}/contact` },
    { label: navT('login'), href: `/${currentLocale}/auth/login` },
    { label: navT('signup'), href: `/${currentLocale}/auth/signup` }
  ];

  return (
    <footer
      style={{
        background: '#0a0e3d',
        color: '#fff',
        padding: 'clamp(3rem, 6vw, 4rem) clamp(1.5rem, 5vw, 3rem) clamp(2rem, 5vw, 3rem)'
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
          <h3
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: '700',
              marginBottom: '1rem'
            }}
          >
            {t('company')}
          </h3>
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
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['F', 'T', 'L'].map((icon) => (
              <div
                key={icon}
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'rgba(255,255,255,0.12)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  letterSpacing: '0.05em'
                }}
              >
                {icon}
              </div>
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
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.color = '#69E8E1';
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            background: '#1a1f71',
            borderRadius: '16px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem'
          }}
        >
          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: '700',
                marginBottom: '0.85rem'
              }}
            >
              {t('contactUs')}
            </h4>
            <div
              style={{
                display: 'grid',
                gap: '0.85rem',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '0.95rem'
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span
                  aria-hidden
                  style={{
                    background: 'rgba(105, 232, 225, 0.2)',
                    color: '#69E8E1',
                    width: '36px',
                    height: '36px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}
                >
                  ✉️
                </span>
                <div style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ opacity: 0.7 }}>{t('emailLabel')}</span>
                  <Link
                    href={`mailto:${t('email')}`}
                    style={{ color: '#69E8E1', textDecoration: 'none', fontWeight: 600 }}
                  >
                    {t('email')}
                  </Link>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <span
                  aria-hidden
                  style={{
                    background: 'rgba(105, 232, 225, 0.2)',
                    color: '#69E8E1',
                    width: '36px',
                    height: '36px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem'
                  }}
                >
                  ☎️
                </span>
                <div style={{ display: 'grid', gap: '0.2rem' }}>
                  <span style={{ opacity: 0.7 }}>{t('phoneLabel')}</span>
                  <Link
                    href={`tel:${t('phone').replace(/[^\d+]/g, '')}`}
                    style={{ color: '#69E8E1', textDecoration: 'none', fontWeight: 600 }}
                  >
                    {t('phone')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link
            href={`/${currentLocale}/contact`}
            prefetch={false}
            style={{
              alignSelf: 'flex-start',
              background: '#69E8E1',
              color: '#0a0e3d',
              textDecoration: 'none',
              padding: '0.75rem 1.75rem',
              borderRadius: '999px',
              fontWeight: '600',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(event) => {
              event.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {navT('contact')}
          </Link>
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
  );
}