'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslations } from 'next-intl';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';

export default function LoginPage() {
  const t = useTranslations('Auth');
  const pathname = usePathname();
  const params = useParams<{ locale?: string }>();
  const localeFromParams = params?.locale;
  const currentLocale = useMemo(() => {
    if (Array.isArray(localeFromParams)) {
      return localeFromParams[0];
    }
    return localeFromParams || pathname.split('/')[1] || 'en';
  }, [localeFromParams, pathname]);
  const localePrefix = `/${currentLocale}`;
  const isArabic = currentLocale === 'ar';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const persistUser = (user: unknown) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (user && typeof user === 'object') {
      window.localStorage.setItem('samuraiUser', JSON.stringify(user));
    } else {
      window.localStorage.removeItem('samuraiUser');
    }

    const authEvent = new CustomEvent('samurai-auth-changed', {
      detail: user && typeof user === 'object' ? user : null
    });
    window.dispatchEvent(authEvent);
  };

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 2800);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const toastAlignment = isArabic
    ? { left: 'clamp(1rem, 4vw, 2.5rem)', right: 'auto' }
    : { right: 'clamp(1rem, 4vw, 2.5rem)', left: 'auto' };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'loading') {
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    setToast(null);

    if (!trimmedEmail || !trimmedPassword) {
      setStatus('error');
      setMessage(t('genericError'));
      persistUser(null);
      setToast({ message: t('genericError'), type: 'error' });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail)) {
      setStatus('error');
      setMessage(t('invalidEmail'));
      persistUser(null);
      setToast({ message: t('invalidEmail'), type: 'error' });
      return;
    }

    if (trimmedPassword.length < 8) {
      setStatus('error');
      setMessage(t('passwordRequirements'));
      persistUser(null);
      setToast({ message: t('passwordRequirements'), type: 'error' });
      return;
    }

    setStatus('loading');
    setMessage(t('formSubmitting'));

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
          rememberMe
        })
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data?.success) {
        setStatus('success');
        setMessage('');
        persistUser(data?.user ?? null);
        setToast({ message: data?.message || t('successLogin'), type: 'success' });
        setPassword('');
      } else {
        setStatus('error');
        const errorMessage = data?.error || t('genericError');
        setMessage(errorMessage);
        persistUser(null);
        setToast({ message: errorMessage, type: 'error' });
      }
    } catch (error) {
      setStatus('error');
      setMessage(t('serverError'));
      persistUser(null);
      setToast({ message: t('serverError'), type: 'error' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#000814' }} dir={isArabic ? 'rtl' : 'ltr'}>
      {toast && (
        <div
          className="toast-fixed"
          style={{
            position: 'fixed',
            top: 'clamp(1rem, 4vw, 2.5rem)',
            zIndex: 1100,
            padding: '0.95rem 1.4rem',
            borderRadius: '18px',
            backdropFilter: 'blur(12px)',
            fontWeight: 600,
            fontSize: '0.95rem',
            color: toast.type === 'success' ? '#022c22' : '#7f1d1d',
            background:
              toast.type === 'success'
                ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(16, 185, 129, 0.85) 100%)'
                : 'linear-gradient(135deg, rgba(248, 113, 113, 0.9) 0%, rgba(239, 68, 68, 0.85) 100%)',
            boxShadow: toast.type === 'success'
              ? '0 18px 32px rgba(16, 185, 129, 0.28)'
              : '0 18px 32px rgba(239, 68, 68, 0.28)',
            colorScheme: toast.type === 'success' ? 'light' : 'dark',
            ...toastAlignment
          }}
        >
          {toast.message}
        </div>
      )}
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
              {t('loginTitle')}
            </h1>
            <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)', lineHeight: 1.7, opacity: 0.85 }}>
              {t('loginSubtitle')}
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

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}
              >
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', color: '#475569' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    style={{ width: '18px', height: '18px' }}
                  />
                  <span style={{ fontSize: '0.95rem' }}>{t('rememberMe')}</span>
                </label>
                <Link
                  href="#"
                  style={{ color: '#0ea5e9', fontWeight: 600, textDecoration: 'none', fontSize: '0.95rem' }}
                >
                  {t('forgotPassword')}
                </Link>
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
                {status === 'loading' ? t('formSubmitting') : t('loginCta')}
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
              <span>{t('noAccount')}</span>
              <Link
                href={`${localePrefix}/auth/signup`}
                style={{ color: '#0ea5e9', fontWeight: 600, textDecoration: 'none' }}
              >
                {t('signupCta')}
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
