import { test, expect } from '@playwright/test';

test.describe('Cursor — magnetic reset', () => {
  test('releases the hover state after selecting a menu item', async ({ page, isMobile }) => {
    test.skip(isMobile, 'custom cursor is desktop-only');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // The custom cursor should be mounted on a fine-pointer desktop.
    await expect(page.locator('body')).toHaveClass(/has-custom-cursor/);

    // Open the menu.
    await page.locator('#hamburger-btn').click();
    await expect(page.locator('#nav-overlay')).toBeVisible();

    const cursor = page.locator('#cursor');
    const link = page.locator('.nav-link[href="#background"]');

    // Hovering a link puts the cursor into the enlarged "hover" state.
    await link.hover();
    await expect(cursor).toHaveClass(/hover/);

    // Selecting the item closes the overlay without moving the pointer. The
    // cursor must drop its magnetic lock rather than stay stuck in the hover
    // state pulled toward the now-hidden menu (the reported burger-menu bug).
    await link.click();
    await expect(page.locator('#nav-overlay')).toBeHidden();
    await expect(cursor).not.toHaveClass(/hover/);
    await expect(cursor).not.toHaveClass(/project/);
  });

  test('does not hide the native cursor when unmounted (mobile)', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'guard only applies when the custom cursor is not created');

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // No custom cursor → the has-custom-cursor gate must be absent so CSS never
    // hides the native cursor.
    await expect(page.locator('body')).not.toHaveClass(/has-custom-cursor/);
  });
});
