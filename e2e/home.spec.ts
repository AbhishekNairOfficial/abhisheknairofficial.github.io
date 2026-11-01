import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows main sections', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Abhishek');
    await expect(page.getByRole('heading', { name: /^experience$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^work$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^clients$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^get in touch$/i })).toBeVisible();
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
    await expect(skipLink).toHaveAttribute('href', '#main');
    await skipLink.focus();
    await expect(skipLink).toBeVisible();
  });

  test('brand link targets main content on compact header', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const brand = page.getByRole('link', { name: /back to main content/i });
    await expect(brand).toBeVisible();
    await expect(brand).toHaveAttribute('href', '#main');
  });

  test('primary navigation landmark is labeled', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('navigation', { name: /^primary$/i })).toBeVisible();
  });

  test('social links announce opening in a new tab', async ({ page }) => {
    await page.goto('/');

    const social = page.getByRole('link', { name: /opens in new tab/i });
    await expect(social.first()).toBeVisible();
  });

  test('section navigation is visible on mobile without a menu dialog', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    await expect(page.getByRole('button', { name: /open menu|close menu/i })).toHaveCount(0);
    await expect(page.getByRole('navigation', { name: /^primary$/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /^experience$/i })).toBeVisible();
  });

  test('h1 is visible in the server HTML', async ({ request }) => {
    const response = await request.get('/');
    const html = await response.text();
    expect(html).toMatch(/<h1[^>]*>[\s\S]*Abhishek Panthalingal[\s\S]*<\/h1>/);
    expect(html).not.toMatch(/<h1[^>]*opacity-0/);
  });
});
