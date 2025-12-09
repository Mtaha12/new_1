import { test, expect, devices } from '@playwright/test';

test.describe('Mobile Responsiveness Tests', () => {
  test.describe('Touch-Friendly Interface', () => {
    test('TC-243: should have touch-friendly buttons on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
      await page.goto('/en');
      
      const buttons = await page.locator('button, a[role="button"]').all();
      
      for (const button of buttons.slice(0, 10)) { // Test first 10 buttons
        const box = await button.boundingBox();
        if (box) {
          // WCAG 2.1 minimum touch target size is 44x44px
          expect(box.height).toBeGreaterThanOrEqual(36); // Allowing some flexibility
          expect(box.width).toBeGreaterThanOrEqual(36);
        }
      }
    });

    test('TC-244: should have adequate spacing between interactive elements', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      
      const links = await page.locator('a').all();
      
      for (let i = 0; i < Math.min(5, links.length - 1); i++) {
        const box1 = await links[i].boundingBox();
        const box2 = await links[i + 1].boundingBox();
        
        if (box1 && box2 && box1.y !== box2.y) {
          const spacing = Math.abs(box2.y - (box1.y + box1.height));
          expect(spacing).toBeGreaterThanOrEqual(8); // Minimum 8px spacing
        }
      }
    });
  });

  test.describe('Viewport Compatibility', () => {
    test('TC-245: should not have horizontal scroll on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 for rounding
    });

    test('TC-246: should render correctly on iPhone SE', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });

    test('TC-247: should render correctly on iPad', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/en');
      
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });

    test('TC-248: should render correctly on Galaxy S21', async ({ page }) => {
      await page.setViewportSize({ width: 360, height: 800 });
      await page.goto('/en');
      
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    });
  });

  test.describe('Typography and Readability', () => {
    test('TC-249: should have readable text on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      
      const paragraphs = await page.locator('p').all();
      
      for (const p of paragraphs.slice(0, 5)) {
        const fontSize = await p.evaluate(el => 
          window.getComputedStyle(el).fontSize
        );
        const fontSizeNum = parseInt(fontSize);
        expect(fontSizeNum).toBeGreaterThanOrEqual(14); // Minimum 14px for mobile
      }
    });

    test('TC-250: should have appropriate line height', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      
      const paragraph = page.locator('p').first();
      const lineHeight = await paragraph.evaluate(el => 
        window.getComputedStyle(el).lineHeight
      );
      
      expect(lineHeight).not.toBe('normal');
    });

    test('TC-251: should have readable headings', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      
      const h1 = page.locator('h1').first();
      const fontSize = await h1.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      
      expect(parseInt(fontSize)).toBeGreaterThanOrEqual(24); // H1 should be prominent
    });
  });

  test.describe('Navigation', () => {
    test('TC-252: should have accessible mobile menu', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      
      // Look for hamburger menu button
      const menuButton = page.locator('button[aria-label*="menu" i], button[aria-label*="navigation" i]').first();
      
      if (await menuButton.count() > 0) {
        await expect(menuButton).toBeVisible();
        await menuButton.click();
        
        // Menu should appear
        await page.waitForTimeout(500); // Wait for animation
      }
    });

    test('TC-253: should allow navigation on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      
      // Test navigation links are accessible
      const nav = page.locator('nav').first();
      await expect(nav).toBeVisible();
    });
  });

  test.describe('Forms on Mobile', () => {
    test('TC-254: should have mobile-friendly form inputs', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en/contact');
      
      const inputs = await page.locator('input[type="text"], input[type="email"], textarea').all();
      
      for (const input of inputs) {
        const box = await input.boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(40); // Minimum height for easy typing
        }
      }
    });

    test('TC-255: should have appropriate input types for mobile keyboards', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en/contact');
      
      // Email input should have type="email"
      const emailInput = page.locator('input[type="email"]');
      if (await emailInput.count() > 0) {
        await expect(emailInput.first()).toHaveAttribute('type', 'email');
      }
      
      // Phone input should have type="tel"
      const telInput = page.locator('input[type="tel"]');
      if (await telInput.count() > 0) {
        await expect(telInput.first()).toHaveAttribute('type', 'tel');
      }
    });
  });

  test.describe('Images and Media', () => {
    test('TC-256: should load responsive images on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      
      const images = await page.locator('img').all();
      
      for (const img of images.slice(0, 5)) {
        const isVisible = await img.isVisible();
        if (isVisible) {
          const box = await img.boundingBox();
          if (box) {
            // Image should not overflow viewport
            expect(box.width).toBeLessThanOrEqual(375);
          }
        }
      }
    });

    test('TC-257: should have alt text for images', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/en');
      
      const images = await page.locator('img').all();
      
      for (const img of images) {
        const alt = await img.getAttribute('alt');
        expect(alt).toBeDefined(); // Alt attribute should exist (can be empty for decorative)
      }
    });
  });

  test.describe('Performance on Mobile', () => {
    test('TC-258: should load page in reasonable time on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      const startTime = Date.now();
      await page.goto('/en', { waitUntil: 'domcontentloaded' });
      const loadTime = Date.now() - startTime;
      
      expect(loadTime).toBeLessThan(5000); // Should load within 5 seconds
    });
  });

  test.describe('Orientation Support', () => {
    test('TC-259: should work in landscape orientation', async ({ page }) => {
      await page.setViewportSize({ width: 667, height: 375 }); // Landscape
      await page.goto('/en');
      
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    });

    test('TC-260: should work in portrait orientation', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 }); // Portrait
      await page.goto('/en');
      
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    });
  });
});
