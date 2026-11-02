import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows main sections', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Abhishek');
    await expect(page.getByText('Director, AI & Analytics Practice at Rhombuz LLC').first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /^experience$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^work$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^expertise$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^now$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^clients$/i })).toBeVisible();
  });

  test('resume link points to PDF', async ({ page }) => {
    await page.goto('/');

    const resumeLink = page.getByRole('link', { name: /resume/i }).first();
    await expect(resumeLink).toBeVisible();
    const href = await resumeLink.getAttribute('href');
    expect(href?.endsWith('resume.pdf')).toBeTruthy();
  });

  test('skip to main content link is present', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveAttribute('href', '#main');
  });

  test('brand link targets main content', async ({ page }) => {
    await page.goto('/');

    const brand = page.getByRole('link', { name: /back to main content/i });
    await expect(brand).toHaveAttribute('href', '#main');
  });

  test('primary navigation landmark is labeled', async ({ page }) => {
    await page.goto('/');

    const nav = page.getByRole('navigation', { name: /^primary$/i });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: /^experience$/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /^work$/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /^now$/i })).toBeVisible();
    await expect(nav.getByRole('link', { name: /^contact$/i })).toBeVisible();
  });

  test('social links announce opening in a new tab', async ({ page }) => {
    await page.goto('/');

    const social = page.getByRole('link', { name: /opens in new tab/i });
    await expect(social.first()).toBeVisible();
  });

  test('mobile menu exposes dialog semantics and Escape closes it', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const menuBtn = page.getByRole('button', { name: /open menu|close menu/i });
    await expect(menuBtn).toBeVisible();
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');

    await menuBtn.click();
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('dialog', { name: /site menu/i })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menuBtn).toHaveAttribute('aria-expanded', 'false');
  });
});
