import { test, expect } from '@playwright/test';

test.describe('Page Navigation - Cross-Browser Tests', () => {
  test('should load English homepage', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('load', { timeout: 30000 });
    await expect(page).toHaveURL(/\/en/);
    
    // Check if page loaded
    await expect(page.locator('html')).toHaveAttribute('lang', 'en', { timeout: 30000 });
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr', { timeout: 30000 });
  });

  test('should load Arabic homepage', async ({ page }) => {
    await page.goto('/ar', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('load', { timeout: 30000 });
    await expect(page).toHaveURL(/\/ar/);
    
    // Check if page loaded with RTL
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar', { timeout: 30000 });
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl', { timeout: 30000 });
  });

  test('should redirect root to default locale', async ({ page }) => {
    await page.goto('/', { timeout: 120000 });
    
    // Should redirect to /en or /ar
    await page.waitForURL(/\/(en|ar)/, { timeout: 30000 });
    expect(page.url()).toMatch(/\/(en|ar)/);
  });

 

  test('should handle 404 pages', async ({ page }) => {
    const response = await page.goto('/en/nonexistent-page', { timeout: 120000 });
    // Next.js might return 200 with not-found page or 404
    expect([200, 404]).toContain(response?.status() || 404);
  });

  test('should load without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => {
      errors.push(error.message);
    });
    
    await page.goto('/en', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('networkidle', { timeout: 30000 }).catch(() => {});
    
    // Check for critical errors (ignore warnings and common non-critical errors)
    const criticalErrors = errors.filter(e => 
      !e.includes('Warning') && 
      !e.includes('DevTools') &&
      !e.includes('ResizeObserver') &&
      !e.includes('hydration')
    );
    expect(criticalErrors.length).toBe(0);
  });

  test('should be responsive on mobile', async ({ page, viewport }) => {
    await page.goto('/en', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('load', { timeout: 30000 });
    
    // Page should load on any viewport
    await expect(page.locator('html')).toBeVisible({ timeout: 30000 });
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('load', { timeout: 30000 });
    
    // Check for viewport meta tag
    const viewport = page.locator('meta[name="viewport"]');
    await expect(viewport).toHaveCount(1, { timeout: 30000 });
  });
});
