import { test, expect } from '@playwright/test';

test.describe('Blog — Index Page', () => {
  test('blog index loads successfully', async ({ page }) => {
    await page.goto('/blog/');
    await expect(page).toHaveTitle(/Blog.*Mohammed Yasin/i);
  });

  test('respects theme from localStorage', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('theme', 'dark');
    });
    await page.goto('/blog/');
    const theme = await page.locator('html').getAttribute('data-theme');
    expect(theme).toBe('dark');
  });

  test('lists blog posts with titles and dates', async ({ page }) => {
    await page.goto('/blog/');

    const posts = page.locator('.blog-post-item');
    const count = await posts.count();
    expect(count).toBeGreaterThanOrEqual(4);

    const firstTitle = posts.first().locator('h3');
    await expect(firstTitle).not.toBeEmpty();

    const firstDate = posts.first().locator('.blog-post-date');
    await expect(firstDate).not.toBeEmpty();
  });

  test('clicking a post navigates to post page', async ({ page }) => {
    await page.goto('/blog/');

    const firstPost = page.locator('.blog-post-item').first();
    const title = await firstPost.locator('h3').textContent();

    await firstPost.click();
    await page.waitForLoadState('networkidle');

    const heading = page.locator('.blog-post-page-title, h1').first();
    await expect(heading).toContainText(title);
  });

  test('post page has article content', async ({ page }) => {
    await page.goto('/blog/posts/hello-world.html');
    await page.waitForLoadState('networkidle');

    const article = page.locator('.blog-post-content, article');
    await expect(article).toBeVisible();

    const paragraphs = article.locator('p');
    const count = await paragraphs.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('back link returns to blog index', async ({ page }) => {
    await page.goto('/blog/posts/hello-world.html');
    await page.waitForLoadState('networkidle');

    const backLink = page.locator('.blog-post-back, a[href*="/blog/"]').first();
    await backLink.click();
    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/\/blog\/?$/);
  });
});

test.describe('Blog — Styling', () => {
  test('uses editorial font family', async ({ page }) => {
    await page.goto('/blog/');

    const title = page.locator('.blog-page-title');
    const fontFamily = await title.evaluate((el) =>
      window.getComputedStyle(el).fontFamily
    );
    expect(fontFamily).toContain('Fraunces');
  });

  test('no horizontal overflow on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/blog/');

    const overflow = await page.evaluate(() => {
      return document.body.scrollWidth > document.body.clientWidth;
    });
    expect(overflow).toBe(false);
  });
});
