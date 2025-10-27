// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import ChatWidget from '@/components/chat/ChatWidget';
import LocaleHtmlAttributes from '@/components/layout/LocaleHtmlAttributes';
import '../globals.css';
import ScrollAnimator from '@/components/layout/ScrollAnimator';

// Language Switcher Component
function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: '#f7fafc',
      padding: '0.5rem',
      borderRadius: '8px',
      border: '1px solid #e2e8f0'
    }}>
      <Link 
        href="/en"
        style={{
          padding: '0.5rem 1rem',
          background: currentLocale === 'en' ? '#69E8E1' : 'transparent',
          color: currentLocale === 'en' ? '#333A3C' : '#4a5568',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
          textDecoration: 'none'
        }}
      >
        EN
      </Link>
      <span style={{ color: '#cbd5e0' }}>|</span>
      <Link 
        href="/ar"
        style={{
          padding: '0.5rem 1rem',
          background: currentLocale === 'ar' ? '#69E8E1' : 'transparent',
          color: currentLocale === 'ar' ? '#333A3C' : '#4a5568',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
          textDecoration: 'none'
        }}
      >
        AR
      </Link>
    </div>
  );
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  console.log('📍 Layout processing for locale:', locale);

  // Ensure the locale is supported
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Set the locale for this request - this tells next-intl which locale to use
  setRequestLocale(locale);
  
  // Get messages from next-intl (it will use the locale we just set)
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider 
      messages={messages}
      locale={locale}
    >
      <LocaleHtmlAttributes locale={locale} />
      <div
        data-locale={locale}
        dir={locale === 'ar' ? 'rtl' : 'ltr'}
        style={{
          margin: 0,
          padding: 0,
          width: '100%',
          maxWidth: '100%',
          overflowX: 'hidden',
          WebkitTextSizeAdjust: '100%',
          textSizeAdjust: '100%'
        }}
      >
        {children}
        <ScrollAnimator />
        <ChatWidget />
      </div>
    </NextIntlClientProvider>
  );
}

// Pre-render localized routes to ensure each locale has its own static page and messages
export function generateStaticParams() {
  return routing.locales.map((loc) => ({ locale: loc }));
}