// app/layout.tsx - Root Layout (passes through to locale-specific layout)
import './globals.css';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-noto-sans-arabic'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoSansArabic.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}