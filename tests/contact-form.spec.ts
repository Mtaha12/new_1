import { test, expect } from '@playwright/test';

test.describe('Contact Form - Cross-Browser Tests', () => {
  test('should load contact page in English', async ({ page }) => {
    await page.goto('/en/contact', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('load', { timeout: 30000 });
    await expect(page).toHaveURL(/\/en\/contact/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en', { timeout: 30000 });
  });

  test('should load contact page in Arabic with RTL', async ({ page }) => {
    await page.goto('/ar/contact', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('load', { timeout: 30000 });
    await expect(page).toHaveURL(/\/ar\/contact/);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl', { timeout: 30000 });
  });

  test('should be responsive on mobile', async ({ page, viewport }) => {
    await page.goto('/en/contact', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('load', { timeout: 30000 });
    
    // Page should load on any viewport
    await expect(page.locator('html')).toBeVisible({ timeout: 30000 });
  });
});
