// app/layout.tsx - Root Layout (passes through to locale-specific layout)
import './globals.css';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import PageLoadingOverlay from '@/components/layout/PageLoadingOverlay';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
  fallback: ['system-ui', 'arial']
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-sans-arabic',
  preload: true,
  fallback: ['system-ui', 'arial']
});

export const metadata: Metadata = {
  title: {
    default: 'The SamurAI | AI-Powered Cybersecurity Consulting',
    template: '%s | The SamurAI'
  },
  description: 'The SamurAI blends elite consulting, AI-powered defenses, and rapid response teams to help enterprises outpace modern cyber threats.',
  keywords: ['cybersecurity', 'AI security', 'consulting', 'IT services', 'digital transformation'],
  authors: [{ name: 'The SamurAI' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_SA',
    siteName: 'The SamurAI'
  },
  twitter: {
    card: 'summary_large_image'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansArabic.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google.com" />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="min-h-screen flex flex-col">
          <PageLoadingOverlay />
          {children}
        </div>
      </body>
    </html>
  );
}