import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 667 } });

test.describe('Mobile — Layout', () => {
  test('no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const overflow = await page.evaluate(() => {
      return document.body.scrollWidth > document.body.clientWidth;
    });
    expect(overflow).toBe(false);
  });

  test('no horizontal overflow on blog', async ({ page }) => {
    await page.goto('/blog/');

    const overflow = await page.evaluate(() => {
      return document.body.scrollWidth > document.body.clientWidth;
    });
    expect(overflow).toBe(false);
  });
});

test.describe('Mobile — Navigation', () => {
  test('hamburger menu opens and closes', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator('.hamburger, .menu-toggle, [aria-label*="menu"]').first();
    if (await hamburger.count() > 0) {
      await hamburger.click();
      const overlay = page.locator('.nav-overlay, .menu-overlay').first();
      await expect(overlay).toBeVisible({ timeout: 3000 });

      const close = page.locator('.nav-close, .menu-close, [aria-label*="close"]').first();
      if (await close.count() > 0) {
        await close.click();
        await expect(overlay).toBeHidden({ timeout: 3000 });
      }
    }
  });
});

test.describe('Mobile — Accessibility', () => {
  test('custom cursor is hidden on mobile', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const cursor = page.locator('.cursor, .custom-cursor');
    if (await cursor.count() > 0) {
      const isVisible = await cursor.first().isVisible();
      if (isVisible) {
        const display = await cursor.first().evaluate((el) =>
          window.getComputedStyle(el).display
        );
        expect(display).toBe('none');
      }
    }
  });

  test('hamburger menu is clickable', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator('.hamburger, .menu-toggle, [aria-label*="menu"]').first();
    if (await hamburger.count() > 0) {
      await expect(hamburger).toBeVisible();
      await hamburger.click();
      const overlay = page.locator('.nav-overlay, .menu-overlay').first();
      await expect(overlay).toBeVisible({ timeout: 3000 });
    }
  });
});
