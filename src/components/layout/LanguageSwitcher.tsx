// src/components/LanguageSwitcher.tsx
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();

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
          background: locale === 'en' ? '#69E8E1' : 'transparent',
          color: locale === 'en' ? '#333A3C' : '#4a5568',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          display: 'block'
        }}
      >
        EN
      </Link>
      <span style={{ color: '#cbd5e0' }}>|</span>
      <Link 
        href="/ar"
        style={{
          padding: '0.5rem 1rem',
          background: locale === 'ar' ? '#69E8E1' : 'transparent',
          color: locale === 'ar' ? '#333A3C' : '#4a5568',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500',
          transition: 'all 0.3s ease',
          textDecoration: 'none',
          display: 'block'
        }}
      >
        AR
      </Link>
    </div>
  );
}