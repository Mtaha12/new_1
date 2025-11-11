import { getRequestConfig } from 'next-intl/server';
import { defineRouting } from 'next-intl/routing';
import enMessages from './messages/en.json';
import arMessages from './messages/ar.json';

// Define locales
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Define routing
export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en'
});

export const messagesByLocale: Record<Locale, Record<string, unknown>> = {
  en: enMessages as Record<string, unknown>,
  ar: arMessages as Record<string, unknown>
};

export function getMessagesForLocale(rawLocale: string | undefined | null) {
  const resolved: Locale = rawLocale && locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : defaultLocale;

  return {
    locale: resolved,
    messages: messagesByLocale[resolved] ?? messagesByLocale[defaultLocale]
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  const { locale: resolvedLocale, messages } = getMessagesForLocale(locale);

  return {
    locale: resolvedLocale,
    messages
  };
});