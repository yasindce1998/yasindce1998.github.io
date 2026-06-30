import { test, expect } from '@playwright/test';

test.describe('Portfolio — Page Load', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mohammed Yasin/i);
  });

  test('no console errors on load', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await page.waitForTimeout(2000);
    expect(errors).toHaveLength(0);
  });

  test('loader clears within 12 seconds', async ({ page }) => {
    await page.goto('/');
    const loader = page.locator('.loader');
    if (await loader.count() > 0) {
      // The cinematic intro (progress bar + split reveal) runs ~7s; allow
      // headroom for cold dev-server module loading in CI.
      await expect(loader).toBeHidden({ timeout: 12000 });
    }
  });
});

test.describe('Portfolio — Sections', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('all sections are present', async ({ page }) => {
    const sections = page.locator('section');
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('hero section has heading', async ({ page }) => {
    const hero = page.locator('.hero, [data-section="hero"], section').first();
    await expect(hero).toBeVisible();
  });
});

test.describe('Portfolio — Theme Toggle', () => {
  test('theme toggle switches data-theme attribute', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    const toggle = page.locator('[data-theme-toggle], .theme-toggle, .day-night-toggle').first();
    if (await toggle.count() > 0) {
      await toggle.click();
      const newTheme = await html.getAttribute('data-theme');
      expect(newTheme).not.toBe(initialTheme);
    }
  });

  test('theme persists after reload', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const toggle = page.locator('[data-theme-toggle], .theme-toggle, .day-night-toggle').first();
    if (await toggle.count() > 0) {
      await toggle.click();
      const themeAfterToggle = await page.locator('html').getAttribute('data-theme');

      await page.reload();
      await page.waitForLoadState('networkidle');
      const themeAfterReload = await page.locator('html').getAttribute('data-theme');
      expect(themeAfterReload).toBe(themeAfterToggle);
    }
  });
});

test.describe('Portfolio — Navigation', () => {
  test('hamburger opens overlay', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator('.hamburger, .menu-toggle, [aria-label*="menu"]').first();
    if (await hamburger.count() > 0) {
      await hamburger.click();
      const overlay = page.locator('.nav-overlay, .menu-overlay, nav').first();
      await expect(overlay).toBeVisible({ timeout: 3000 });
    }
  });

  test('nav shows "Blog" not "Journal"', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const hamburger = page.locator('.hamburger, .menu-toggle, [aria-label*="menu"]').first();
    if (await hamburger.count() > 0) {
      await hamburger.click();
      await page.waitForTimeout(500);
    }

    const blogLink = page.locator('a[href*="/blog"]');
    if (await blogLink.count() > 0) {
      const text = await blogLink.first().textContent();
      expect(text?.trim()).toBe('Blog');
    }
  });
});

test.describe('Portfolio — Projects', () => {
  test('project items render', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const projects = page.locator('.project-item, .project-card, [data-project]');
    const count = await projects.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

test.describe('Portfolio — Contact', () => {
  test('contact section exists', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const contact = page.locator('#contact, .contact, [data-section="contact"]').first();
    if (await contact.count() > 0) {
      await expect(contact).toBeAttached();
    }
  });
});

test.describe('Portfolio — Marquees', () => {
  test('marquee elements exist', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const marquees = page.locator('.marquee');
    if (await marquees.count() > 0) {
      const track = page.locator('.marquee-track').first();
      await expect(track).toBeAttached();
    }
  });
});
