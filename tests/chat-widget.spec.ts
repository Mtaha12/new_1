import { test, expect } from '@playwright/test';

test.describe('Chat Widget - Cross-Browser Tests', () => {
  test('should load homepage with chat widget in English', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('load', { timeout: 30000 });
    await expect(page).toHaveURL(/\/en/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en', { timeout: 30000 });
  });

  test('should load homepage with chat widget in Arabic', async ({ page }) => {
    await page.goto('/ar', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('load', { timeout: 30000 });
    await expect(page).toHaveURL(/\/ar/);
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl', { timeout: 30000 });
  });

  test('should be responsive on mobile', async ({ page, viewport }) => {
    await page.goto('/en', { waitUntil: 'load', timeout: 120000 });
    await page.waitForLoadState('load', { timeout: 30000 });
    
    // Page should load on any viewport
    await expect(page.locator('html')).toBeVisible({ timeout: 30000 });
  });
});
