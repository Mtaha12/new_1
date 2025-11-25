import { cn, createVariant, spacing, staggerDelay, textStyle } from '@/lib/class-utils';

describe('class-utils cn', () => {
  it('merges class names and keeps the last conflicting utility', () => {
    expect(cn('px-4', null, 'px-2')).toBe('px-2');
  });
});

describe('createVariant', () => {
  const buttonVariant = createVariant({
    base: 'inline-flex items-center gap-2',
    variants: {
      intent: {
        primary: 'bg-primary text-white',
        secondary: 'bg-muted text-neutral-900'
      },
      size: {
        sm: 'text-sm py-1.5 px-3',
        md: 'text-base py-2 px-4'
      }
    }
  });

  it('generates class names using supplied variants', () => {
    const result = buttonVariant({ intent: 'primary', size: 'sm', className: 'rounded-full' });
    expect(result).toContain('inline-flex');
    expect(result).toContain('items-center');
    expect(result).toContain('bg-primary');
    expect(result).toContain('text-sm');
    expect(result).toContain('rounded-full');
  });

  it('omits variant classes when not provided', () => {
    const result = buttonVariant({});
    expect(result).toBe('inline-flex items-center gap-2');
  });
});

describe('spacing', () => {
  it('builds tailwind spacing strings', () => {
    expect(spacing('mt', 4)).toBe('mt-4');
    expect(spacing('px', '6')).toBe('px-6');
  });
});

describe('staggerDelay', () => {
  it('returns CSS variable with computed delay', () => {
    expect(staggerDelay(3, 150)).toEqual({ '--stagger-delay': '450ms' });
  });
});

describe('textStyle', () => {
  it('returns predefined tokens for requested variant', () => {
    const heading = textStyle('heading', 'text-white');
    expect(heading).toContain('text-3xl');
    expect(heading).toContain('text-white');
  });

  it('supports body variant without extra class', () => {
    expect(textStyle('body')).toContain('text-base');
  });
});
