import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { defaultLocale, routing } from './i18n';

const intlMiddleware = createMiddleware(routing);
const SUPPORTED_LOCALES = new Set<string>(routing.locales);
const LEGACY_PREFIXES = ['/services', '/case-studies'];

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  const collapsed = pathname.replace(/\/+/, '/');
  return collapsed.endsWith('/') ? collapsed.slice(0, -1) : collapsed;
}

function getFirstSegment(pathname: string): string | null {
  const segments = pathname.split('/').filter(Boolean);
  return segments.length > 0 ? segments[0] : null;
}

function resolveLegacyPath(pathname: string): string | null {
  for (const prefix of LEGACY_PREFIXES) {
    if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
      return `/${defaultLocale}${pathname}`;
    }
  }
  return null;
}

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const normalizedPath = normalizePathname(pathname);

  if (normalizedPath !== pathname) {
    request.nextUrl.pathname = normalizedPath;
  }

  const localeSegment = getFirstSegment(request.nextUrl.pathname);
  if (!localeSegment || !SUPPORTED_LOCALES.has(localeSegment)) {
    const legacyPath = resolveLegacyPath(request.nextUrl.pathname);
    if (legacyPath) {
      request.nextUrl.pathname = legacyPath;
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(ar|en)/:path*',
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};