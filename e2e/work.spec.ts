import { expect, test } from '@playwright/test';

test.describe('Case study pages', () => {
  test('micro-frontend platform renders template sections', async ({ page }) => {
    await page.goto('/work/micro-frontend-platform');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Micro-Frontend Platform');
    await expect(page.getByRole('heading', { name: /^context$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^constraints$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /approach \/ architecture/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^my role$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^outcomes$/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /^lessons$/i })).toBeVisible();
    await expect(page.getByText('Draft: detail to add').first()).toBeVisible();
    await expect(page.getByText('40% reduction in initial load time')).toBeVisible();
  });

  test('prev and next links are present', async ({ page }) => {
    await page.goto('/work/micro-frontend-platform');

    await expect(page.getByRole('link', { name: 'React Native Migration' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Digital Orders Dashboard' })).toBeVisible();
  });
});
