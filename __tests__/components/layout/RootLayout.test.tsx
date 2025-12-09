import { metadata } from '@/app/layout';

describe('Root Layout Component', () => {
  it('TC-211: should have title metadata', () => {
    expect(metadata.title).toBeDefined();
    if (typeof metadata.title === 'object' && metadata.title !== null && 'default' in metadata.title) {
      expect((metadata.title as any).default).toContain('SamurAI');
      expect((metadata.title as any).template).toContain('%s');
    }
  });

  it('TC-212: should have description metadata', () => {
    expect(metadata.description).toBeDefined();
    expect(metadata.description).toContain('cyber');
  });

  it('TC-213: should have keywords metadata', () => {
    expect(metadata.keywords).toBeDefined();
    expect(Array.isArray(metadata.keywords)).toBe(true);
    expect((metadata.keywords as any).length).toBeGreaterThan(0);
  });

  it('TC-214: should have OpenGraph metadata', () => {
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.openGraph?.type).toBe('website');
    expect(metadata.openGraph?.locale).toBe('en_US');
    expect(metadata.openGraph?.siteName).toContain('SamurAI');
  });

  it('TC-215: should have Twitter metadata', () => {
    expect(metadata.twitter).toBeDefined();
    expect(metadata.twitter?.card).toBe('summary_large_image');
  });

  it('TC-216: should have robots configuration', () => {
    expect(metadata.robots).toBeDefined();
    if (typeof metadata.robots === 'object' && metadata.robots !== null) {
      expect((metadata.robots as any).index).toBe(true);
      expect((metadata.robots as any).follow).toBe(true);
    }
  });

  it('TC-217: should have authors metadata', () => {
    expect(metadata.authors).toBeDefined();
    expect(Array.isArray(metadata.authors)).toBe(true);
  });

  it('TC-218: should have all required metadata properties', () => {
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
    expect(metadata.keywords).toBeDefined();
    expect(metadata.authors).toBeDefined();
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.twitter).toBeDefined();
    expect(metadata.robots).toBeDefined();
  });
});
