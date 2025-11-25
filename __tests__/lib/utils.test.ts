import { cn, pickLocalized } from '@/lib/util';
import {
  createUrl,
  formatDate,
  truncate,
  debounce,
  generateId,
  safeJsonParse,
  objectToQueryString,
  queryStringToObject,
  formatNumber,
  memoize,
  fetchContentBySlug
} from '@/lib/utils';

describe('cn', () => {
  it('merges class names while removing falsy values', () => {
    expect(cn('px-4', null, undefined, 'text-lg', false, 'font-bold')).toBe('px-4 text-lg font-bold');
  });

  it('prefers the last conflicting Tailwind utility', () => {
    expect(cn('px-2', 'px-4', 'px-6')).toBe('px-6');
  });
});

describe('pickLocalized', () => {
  const documentStub = {
    en: { title: 'Hello' },
    ar: { title: 'مرحبا' }
  };

  it('returns localized object when available', () => {
    expect(pickLocalized(documentStub, 'en')).toEqual({ title: 'Hello' });
    expect(pickLocalized(documentStub, 'ar')).toEqual({ title: 'مرحبا' });
  });

  it('returns null if locale entry missing', () => {
    expect(pickLocalized({}, 'en')).toBeNull();
  });

  it('returns null when document is nullish', () => {
    expect(pickLocalized(null, 'en')).toBeNull();
    expect(pickLocalized(undefined, 'ar')).toBeNull();
  });
});

describe('createUrl', () => {
  it('builds query strings and omits undefined values', () => {
    expect(createUrl('/api/items', { page: 2, search: 'samurai', filter: undefined })).toBe('/api/items?page=2&search=samurai');
    expect(createUrl('/api/items', {})).toBe('/api/items');
  });
});

describe('formatDate', () => {
  it('formats dates using Intl options', () => {
    const formatted = formatDate(new Date(Date.UTC(2024, 0, 15)), 'en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    expect(formatted).toBe('January 15, 2024');
  });
});

describe('truncate', () => {
  it('shortens text and appends ellipsis when needed', () => {
    expect(truncate('The SamurAI', 4)).toBe('The ...');
    expect(truncate('AI', 10)).toBe('AI');
  });
});

describe('debounce', () => {
  jest.useFakeTimers();

  it('delays execution until after wait interval', () => {
    const spy = jest.fn();
    const debounced = debounce(spy, 200);

    debounced('first');
    debounced('second');

    jest.advanceTimersByTime(199);
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('second');
  });
});

describe('generateId', () => {
  it('returns ids with prefix and random suffix', () => {
    const id = generateId('test');
    expect(id.startsWith('test-')).toBe(true);
    expect(id.length).toBeGreaterThan('test-'.length);
  });
});

describe('safeJsonParse', () => {
  it('parses valid JSON and returns null for invalid JSON', () => {
    expect(safeJsonParse<{ ok: boolean }>('{"ok":true}')).toEqual({ ok: true });
    expect(safeJsonParse('not-json')).toBeNull();
  });
});

describe('query helpers', () => {
  it('converts objects to query strings', () => {
    expect(objectToQueryString({ search: 'zero-trust', page: 3 })).toBe('search=zero-trust&page=3');
  });

  it('converts query strings back to objects', () => {
    expect(queryStringToObject('?search=zero-trust&page=3')).toEqual({ search: 'zero-trust', page: '3' });
  });
});

describe('formatNumber', () => {
  it('adds locale-aware separators', () => {
    expect(formatNumber(1234567, 'en-US')).toBe('1,234,567');
  });
});

describe('memoize', () => {
  it('caches results for identical arguments', () => {
    const heavyFn = jest.fn((a: number, b: number) => a + b);
    const memoized = memoize(heavyFn);

    expect(memoized(2, 3)).toBe(5);
    expect(memoized(2, 3)).toBe(5);
    expect(heavyFn).toHaveBeenCalledTimes(1);

    expect(memoized(4, 1)).toBe(5);
    expect(heavyFn).toHaveBeenCalledTimes(2);
  });
});

describe('fetchContentBySlug', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockReset();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('returns item payload when response is OK', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ item: { slug: 'ai-security' } })
    });

    const result = await fetchContentBySlug('ai-security');
    expect(global.fetch).toHaveBeenCalledWith('/api/content/ai-security', expect.any(Object));
    expect(result).toEqual({ slug: 'ai-security' });
  });

  it('returns null when response is not OK', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });

    await expect(fetchContentBySlug('bad-slug')).resolves.toBeNull();
  });

  it('returns null when fetch throws', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('network error'));

    await expect(fetchContentBySlug('error-slug')).resolves.toBeNull();
  });
});
