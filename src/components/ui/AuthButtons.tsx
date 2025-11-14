'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

interface AuthButtonsProps {
  variant?: 'default' | 'minimal';
  className?: string;
}

export function LoginButton({ variant = 'default', className = '' }: AuthButtonsProps) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  
  const baseStyles = {
    default: 'bg-gradient-to-r from-[#69E8E1] to-[#38bdf8] text-[#001F3F] hover:shadow-lg hover:scale-105',
    minimal: 'bg-transparent text-[#69E8E1] border border-[#69E8E1] hover:bg-[#69E8E1]/10',
  };

  return (
    <Link 
      href={`/${currentLocale}/auth/login`} 
      className={`inline-flex items-center justify-center rounded-full font-bold cursor-pointer transition-all duration-200 whitespace-nowrap
        ${variant === 'default' ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs'}
        ${baseStyles[variant]} ${className}`}
    >
      {t('login')}
    </Link>
  );
}

export function SignupButton({ variant = 'default', className = '' }: AuthButtonsProps) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  
  const baseStyles = {
    default: 'bg-gradient-to-r from-[#69E8E1] to-[#38bdf8] text-[#001F3F] hover:shadow-lg hover:scale-105',
    minimal: 'bg-transparent text-[#69E8E1] border border-[#69E8E1] hover:bg-[#69E8E1]/10',
  };

  return (
    <Link 
      href={`/${currentLocale}/auth/signup`} 
      className={`inline-flex items-center justify-center rounded-full font-bold cursor-pointer transition-all duration-200 whitespace-nowrap
        ${variant === 'default' ? 'px-4 py-2 text-sm' : 'px-3 py-1.5 text-xs'}
        ${baseStyles[variant]} ${className}`}
    >
      {t('signup')}
    </Link>
  );
}

export function AuthButtons({ variant = 'default', className = '' }: AuthButtonsProps) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'en';
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Link 
        href={`/${currentLocale}/auth/login`} 
        className="text-sm font-medium text-gray-200 hover:text-white transition-colors"
      >
        {t('login')}
      </Link>
      <Link 
        href={`/${currentLocale}/auth/signup`}
        className="bg-[#69E8E1] hover:bg-[#69E8E1]/90 text-[#001F3F] font-bold py-2 px-4 rounded-full text-sm transition-colors"
      >
        {t('signup')}
      </Link>
    </div>
  );
}
