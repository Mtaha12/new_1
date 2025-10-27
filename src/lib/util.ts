import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Locale = 'en' | 'ar';

export function pickLocalized<T extends Record<string, any>>(doc: any, locale: Locale): T | null {
  if (!doc) return null;
  const localized = doc[locale];
  return localized ?? null;
}