import { cn, pickLocalized } from '@/lib/util';

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
