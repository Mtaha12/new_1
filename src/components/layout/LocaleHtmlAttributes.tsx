"use client";

import { useEffect } from 'react';

interface LocaleHtmlAttributesProps {
  locale: string;
}

export default function LocaleHtmlAttributes({ locale }: LocaleHtmlAttributesProps) {
  useEffect(() => {
    const html = document.documentElement;
    if (!html) {
      return;
    }

    const normalizedLocale = locale || 'en';
    const direction = normalizedLocale === 'ar' ? 'rtl' : 'ltr';

    html.setAttribute('lang', normalizedLocale);
    html.setAttribute('dir', direction);

    return () => {
      html.removeAttribute('dir');
      html.setAttribute('lang', 'en');
    };
  }, [locale]);

  return null;
}
