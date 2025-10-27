
import { getRequestConfig } from 'next-intl/server';
import { defineRouting } from 'next-intl/routing';

// Define locales
export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Define routing
export const routing = defineRouting({
  locales: ['en', 'ar'],
  defaultLocale: 'en'
});

export default getRequestConfig(async ({ requestLocale }) => {
  // Wait for the locale to be available
  let locale = await requestLocale;
  
  // Validate and resolve locale
  const resolvedLocale: Locale = locale && locales.includes(locale as Locale)
    ? locale as Locale
    : defaultLocale;

  try {
    // Dynamically import messages with error handling
    const messages = (await import(`./messages/${resolvedLocale}.json`)).default;
    
    console.log(`✅ i18n.ts loaded messages for locale: ${resolvedLocale}`, Object.keys(messages));
    
    return {
      locale: resolvedLocale,
      messages
    };
  } catch (error) {
    console.error(`❌ Failed to load messages for locale: ${resolvedLocale}`, error);
    
    // Fallback to default locale if messages fail to load
    const fallbackMessages = (await import(`./messages/${defaultLocale}.json`)).default;
    
    return {
      locale: defaultLocale,
      messages: fallbackMessages
    };
  }
});