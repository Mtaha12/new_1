'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslations } from 'next-intl';
import { usePathname, useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';

export default function SignupPage() {
  const t = useTranslations('Auth');
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();
  const router = useRouter();
  const localeFromParams = params?.locale;
  const currentLocale = useMemo(() => {
    if (Array.isArray(localeFromParams)) {
      return localeFromParams[0];
    }
    return localeFromParams || pathname.split('/')[1] || 'en';
  }, [localeFromParams, pathname]);
  const localePrefix = `/${currentLocale}`;
  const isArabic = currentLocale === 'ar';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading') {
      return;
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirm = confirmPassword.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword || !trimmedConfirm) {
      setStatus('error');
      setMessage(t('genericError'));
      return;
    }

    if (trimmedName.length < 2) {
      setStatus('error');
      setMessage(t('genericError'));
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setStatus('error');
      setMessage(t('invalidEmail'));
      return;
    }

    if (trimmedPassword.length < 8) {
      setStatus('error');
      setMessage(t('passwordRequirements'));
      return;
    }

    if (trimmedPassword !== trimmedConfirm) {
      setStatus('error');
      setMessage(t('passwordMismatch'));
      return;
    }

    setStatus('loading');
    setMessage(t('formSubmitting'));

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
          confirmPassword: trimmedConfirm
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.success) {
        setStatus('success');
        setMessage(data?.message || t('successSignup'));
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          router.push(`${localePrefix}/auth/login`);
        }, 1400);
      } else {
        setStatus('error');
        setMessage(data?.error || t('genericError'));
      }
    } catch (error) {
      setStatus('error');
      setMessage(t('serverError'));
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#000814' }} dir={isArabic ? 'rtl' : 'ltr'}>
      <Header />
      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(2rem, 6vw, 4rem) clamp(1rem, 4vw, 3rem)',
          background: 'radial-gradient(circle at top, rgba(105, 232, 225, 0.25) 0%, rgba(0, 8, 20, 0.95) 45%, #000814 100%)'
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            gap: 'clamp(2rem, 5vw, 3rem)',
            width: 'min(100%, 960px)',
            alignItems: 'stretch'
          }}
        >
          <section
            style={{
              background: 'linear-gradient(135deg, rgba(10, 14, 61, 0.92) 0%, rgba(0, 31, 63, 0.95) 100%)',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              color: '#e2e8f0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)'
            }}
          >
            <h1 style={{ fontSize: 'clamp(2rem, 3vw, 2.6rem)', fontWeight: 800, marginBottom: '1rem', color: '#69E8E1' }}>
              {t('signupTitle')}
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', lineHeight: 1.7, opacity: 0.85 }}>
              {t('signupSubtitle')}
            </p>
            <div
              style={{
                marginTop: '2rem',
                display: 'grid',
                gap: '1.5rem'
              }}
            >
              <div
                style={{
                  background: 'rgba(105, 232, 225, 0.1)',
                  padding: '1.5rem',
                  borderRadius: '18px',
                  border: '1px solid rgba(105, 232, 225, 0.3)'
                }}
              >
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem', color: '#ffffff' }}>
                  {t('privacyNotice')}
                </h2>
              </div>
            </div>
          </section>

          <section
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              boxShadow: '0 12px 40px rgba(8, 47, 73, 0.2)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <label htmlFor="name" style={{ fontWeight: 600, color: '#0a0e3d', fontSize: '0.95rem' }}>
                  {t('nameLabel')}
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  placeholder="Jane Doe"
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: '14px',
                    border: '1px solid #d1d5db',
                    background: '#f8fafc',
                    fontSize: '1rem',
                    color: '#0f172a'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <label htmlFor="email" style={{ fontWeight: 600, color: '#0a0e3d', fontSize: '0.95rem' }}>
                  {t('emailLabel')}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="name@company.com"
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: '14px',
                    border: '1px solid #d1d5db',
                    background: '#f8fafc',
                    fontSize: '1rem',
                    color: '#0f172a'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <label htmlFor="password" style={{ fontWeight: 600, color: '#0a0e3d', fontSize: '0.95rem' }}>
                  {t('passwordLabel')}
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  minLength={8}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: '14px',
                    border: '1px solid #d1d5db',
                    background: '#f8fafc',
                    fontSize: '1rem',
                    color: '#0f172a'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <label htmlFor="confirmPassword" style={{ fontWeight: 600, color: '#0a0e3d', fontSize: '0.95rem' }}>
                  {t('confirmPasswordLabel')}
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  required
                  minLength={8}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    borderRadius: '14px',
                    border: '1px solid #d1d5db',
                    background: '#f8fafc',
                    fontSize: '1rem',
                    color: '#0f172a'
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  background: status === 'loading' ? 'rgba(105, 232, 225, 0.6)' : 'linear-gradient(135deg, #69E8E1 0%, #38bdf8 100%)',
                  color: '#0f172a',
                  padding: '0.95rem',
                  borderRadius: '18px',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxShadow: '0 12px 24px rgba(56, 189, 248, 0.25)'
                }}
              >
                {status === 'loading' ? t('formSubmitting') : t('signupCta')}
              </button>

              {message && (
                <p
                  style={{
                    background: status === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(248, 113, 113, 0.15)',
                    color: status === 'success' ? '#166534' : '#991b1b',
                    padding: '0.9rem 1rem',
                    borderRadius: '14px',
                    fontSize: '0.95rem',
                    border: `1px solid ${status === 'success' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(248, 113, 113, 0.4)'}`
                  }}
                >
                  {message}
                </p>
              )}
            </form>

            <div
              style={{
                marginTop: '2rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.95rem',
                color: '#475569',
                flexWrap: 'wrap'
              }}
            >
              <span>{t('hasAccount')}</span>
              <Link
                href={`${localePrefix}/auth/login`}
                style={{ color: '#0ea5e9', fontWeight: 600, textDecoration: 'none' }}
              >
                {t('loginCta')}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
