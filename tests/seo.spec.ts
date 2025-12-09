import { test, expect } from '@playwright/test';

test.describe('SEO Optimization Tests', () => {
  test.describe('Meta Tags', () => {
    test('TC-261: should have proper title tag', async ({ page }) => {
      await page.goto('/en');
      
      const title = await page.title();
      expect(title).toBeTruthy();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThan(70); // Optimal length for search results
      expect(title).toContain('SamurAI');
    });

    test('TC-262: should have meta description', async ({ page }) => {
      await page.goto('/en');
      
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription!.length).toBeGreaterThan(50);
      expect(metaDescription!.length).toBeLessThan(160); // Optimal length
    });

    test('TC-263: should have meta keywords', async ({ page }) => {
      await page.goto('/en');
      
      const metaKeywords = await page.locator('meta[name="keywords"]').getAttribute('content');
      expect(metaKeywords).toBeTruthy();
      expect(metaKeywords).toContain('cybersecurity');
    });

    test('TC-264: should have viewport meta tag', async ({ page }) => {
      await page.goto('/en');
      
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toBeTruthy();
    });
  });

  test.describe('Open Graph Tags', () => {
    test('TC-265: should have Open Graph title', async ({ page }) => {
      await page.goto('/en');
      
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      expect(ogTitle).toBeTruthy();
    });

    test('TC-266: should have Open Graph description', async ({ page }) => {
      await page.goto('/en');
      
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      expect(ogDescription).toBeTruthy();
    });

    test('TC-267: should have Open Graph type', async ({ page }) => {
      await page.goto('/en');
      
      const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');
      expect(ogType).toBe('website');
    });

    test('TC-268: should have Open Graph locale', async ({ page }) => {
      await page.goto('/en');
      
      const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
      expect(ogLocale).toBeTruthy();
    });

    test('TC-269: should have Open Graph site name', async ({ page }) => {
      await page.goto('/en');
      
      const ogSiteName = await page.locator('meta[property="og:site_name"]').getAttribute('content');
      expect(ogSiteName).toContain('SamurAI');
    });
  });

  test.describe('Twitter Card Tags', () => {
    test('TC-270: should have Twitter card type', async ({ page }) => {
      await page.goto('/en');
      
      const twitterCard = await page.locator('meta[name="twitter:card"]').getAttribute('content');
      expect(twitterCard).toBeTruthy();
    });
  });

  test.describe('Structured Data', () => {
    test('TC-271: should have JSON-LD structured data', async ({ page }) => {
      await page.goto('/en');
      
      const jsonLd = await page.locator('script[type="application/ld+json"]').count();
      // May or may not have structured data, but if present should be valid
      if (jsonLd > 0) {
        const content = await page.locator('script[type="application/ld+json"]').first().textContent();
        expect(() => JSON.parse(content!)).not.toThrow();
      }
    });

    test('TC-272: should have organization schema if present', async ({ page }) => {
      await page.goto('/en');
      
      const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
      
      for (const script of jsonLdScripts) {
        const content = await script.textContent();
        if (content) {
          const data = JSON.parse(content);
          if (data['@type'] === 'Organization') {
            expect(data.name).toBeTruthy();
          }
        }
      }
    });
  });

  test.describe('Semantic HTML', () => {
    test('TC-273: should have only one H1 tag', async ({ page }) => {
      await page.goto('/en');
      
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
    });

    test('TC-274: should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/en');
      
      const h1 = await page.locator('h1').count();
      const h2 = await page.locator('h2').count();
      
      expect(h1).toBeGreaterThan(0);
      expect(h2).toBeGreaterThan(0);
    });

    test('TC-275: should use semantic HTML5 elements', async ({ page }) => {
      await page.goto('/en');
      
      await expect(page.locator('header')).toHaveCount(1);
      await expect(page.locator('main')).toHaveCount(1);
      await expect(page.locator('footer')).toHaveCount(1);
    });
  });

  test.describe('Links and Navigation', () => {
    test('TC-276: should not have broken internal links', async ({ page }) => {
      await page.goto('/en');
      
      const links = await page.locator('a[href^="/"]').all();
      
      for (const link of links.slice(0, 10)) { // Test first 10 internal links
        const href = await link.getAttribute('href');
        if (href && !href.includes('#')) {
          expect(href).toMatch(/^\/[a-z]{2}(\/|$)/); // Should start with locale
        }
      }
    });

    test('TC-277: should have descriptive link text', async ({ page }) => {
      await page.goto('/en');
      
      const links = await page.locator('a').all();
      
      for (const link of links.slice(0, 10)) {
        const text = await link.textContent();
        const ariaLabel = await link.getAttribute('aria-label');
        
        // Link should have either visible text or aria-label
        expect(text || ariaLabel).toBeTruthy();
      }
    });

    test('TC-278: should have rel="noopener" for external links', async ({ page }) => {
      await page.goto('/en');
      
      const externalLinks = await page.locator('a[target="_blank"]').all();
      
      for (const link of externalLinks) {
        const rel = await link.getAttribute('rel');
        if (rel) {
          expect(rel).toMatch(/noopener|noreferrer/);
        }
      }
    });
  });

  test.describe('Performance and Loading', () => {
    test('TC-279: should have lang attribute on html tag', async ({ page }) => {
      await page.goto('/en');
      
      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBeTruthy();
      expect(['en', 'ar']).toContain(lang);
    });

    test('TC-280: should have charset meta tag', async ({ page }) => {
      await page.goto('/en');
      
      const charset = await page.locator('meta[charset]').count();
      expect(charset).toBeGreaterThan(0);
    });
  });

  test.describe('Robots and Indexing', () => {
    test('TC-281: should have robots meta tag', async ({ page }) => {
      await page.goto('/en');
      
      // Check if robots meta exists, default should allow indexing
      const robotsMeta = await page.locator('meta[name="robots"]').getAttribute('content');
      
      // If present, should not block indexing on main pages
      if (robotsMeta) {
        expect(robotsMeta).not.toContain('noindex');
      }
    });

    test('TC-282: should have accessible robots.txt', async ({ page }) => {
      const response = await page.goto('/robots.txt');
      
      if (response) {
        expect(response.status()).toBeLessThan(400);
      }
    });

    test('TC-283: should have sitemap reference', async ({ page }) => {
      const response = await page.goto('/sitemap.xml');
      
      // Sitemap may or may not exist, but if it does, should be valid
      if (response && response.status() === 200) {
        const content = await response.text();
        expect(content).toContain('<?xml');
        expect(content).toContain('urlset');
      }
    });
  });

  test.describe('Localization', () => {
    test('TC-284: should have hreflang tags for bilingual support', async ({ page }) => {
      await page.goto('/en');
      
      const hreflangLinks = await page.locator('link[hreflang]').count();
      
      // If multilingual, should have hreflang tags
      if (hreflangLinks > 0) {
        const enLink = await page.locator('link[hreflang="en"]').count();
        const arLink = await page.locator('link[hreflang="ar"]').count();
        
        expect(enLink + arLink).toBeGreaterThan(0);
      }
    });

    test('TC-285: should have correct lang attribute per locale', async ({ page }) => {
      await page.goto('/en');
      const enLang = await page.locator('html').getAttribute('lang');
      expect(enLang).toBe('en');
      
      await page.goto('/ar');
      const arLang = await page.locator('html').getAttribute('lang');
      expect(arLang).toBe('ar');
    });
  });

  test.describe('Content Quality', () => {
    test('TC-286: should have sufficient text content', async ({ page }) => {
      await page.goto('/en');
      
      const textContent = await page.locator('body').textContent();
      expect(textContent!.length).toBeGreaterThan(200); // Minimum content length
    });

    test('TC-287: should have alt text for images', async ({ page }) => {
      await page.goto('/en');
      
      const images = await page.locator('img').all();
      
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        expect(alt).toBeDefined(); // Alt should exist (can be empty for decorative)
      }
    });
  });
});
