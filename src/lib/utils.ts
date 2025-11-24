import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind classes
 * @param inputs - Class names to be combined
 * @returns Merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Constructs a URL with query parameters
 * @param path - Base path
 * @param params - Query parameters as an object
 * @returns Formatted URL with query parameters
 */
export function createUrl(path: string, params: Record<string, string | number | boolean | undefined> = {}): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
}

/**
 * Formats a date string to a human-readable format
 * @param date - Date string or Date object
 * @param locale - Locale string (e.g., 'en-US', 'ar-EG')
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: string | Date,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Truncates text to a specified length and adds an ellipsis
 * @param text - Text to truncate
 * @param length - Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.substring(0, length)}...`;
}

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generates a unique ID
 * @param prefix - Optional prefix for the ID
 * @returns A unique ID string
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Safely parses JSON string
 * @param str - JSON string to parse
 * @returns Parsed object or null if parsing fails
 */
export function safeJsonParse<T = any>(str: string): T | null {
  try {
    return JSON.parse(str) as T;
  } catch (e) {
    return null;
  }
}

/**
 * Converts an object to a query string
 * @param obj - Object to convert
 * @returns Query string (without the leading '?')
 */
export function objectToQueryString(obj: Record<string, any>): string {
  return Object.entries(obj)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

/**
 * Converts a query string to an object
 * @param queryString - Query string (with or without the leading '?')
 * @returns Object with key-value pairs
 */
export function queryStringToObject(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString.startsWith('?') ? queryString.substring(1) : queryString);
  const obj: Record<string, string> = {};
  
  for (const [key, value] of params.entries()) {
    obj[key] = value;
  }
  
  return obj;
}

/**
 * Fetches content by slug from the API
 * @param slug - Content slug
 * @returns Promise with the fetched content or null
 */
export async function fetchContentBySlug(slug: string): Promise<any | null> {
  try {
    const res = await fetch(`/api/content/${slug}`, { 
      cache: 'no-store',
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch content for slug: ${slug}`);
    }

    const data = await res.json();
    return data.item ?? null;
  } catch (error) {
    console.error(`Failed to fetch content for slug "${slug}":`, error);
    return null;
  }
}

/**
 * Formats a number with thousands separators
 * @param num - Number to format
 * @param locale - Locale string (e.g., 'en-US')
 * @returns Formatted number string
 */
export function formatNumber(num: number, locale: string = 'en-US'): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Creates a memoized version of a function
 * @param fn - Function to memoize
 * @returns Memoized function
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

export default {
  cn,
  createUrl,
  formatDate,
  truncate,
  debounce,
  generateId,
  safeJsonParse,
  objectToQueryString,
  queryStringToObject,
  fetchContentBySlug,
  formatNumber,
  memoize,
};