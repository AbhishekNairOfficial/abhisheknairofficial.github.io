import { expect, test } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows main sections', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Abhishek');
    await expect(page.getByRole('heading', { name: /experience/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /clients/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /skills|what i bring/i })).toBeVisible();
  });

  test('resume link points to resume section or PDF', async ({ page }) => {
    await page.goto('/');

    const resumeLink = page.getByRole('link', { name: /resume/i }).first();
    await expect(resumeLink).toBeVisible();
    const href = await resumeLink.getAttribute('href');
    expect(href === '#resume' || href?.endsWith('resume.pdf')).toBeTruthy();
  });

  test('skip to main content link is present', async ({ page }) => {
    await page.goto('/');

    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toBeVisible();
    await expect(skipLink).toHaveAttribute('href', '#main');
  });
});
