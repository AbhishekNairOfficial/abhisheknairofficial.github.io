import { expect, test } from '@playwright/test';

test('defaults to Original and keeps per-project selection independent', async ({ page }) => {
  await page.goto('/');
  const group = page.getByRole('group', { name: 'Summary view for Fixture One' });
  await expect(group.getByRole('radio', { name: 'Original', exact: true })).toBeChecked();
  await group.getByRole('radio', { name: 'Technical', exact: true }).check();
  await expect(
    page.getByRole('group', { name: 'Summary view for Fixture Two' })
      .getByRole('radio', { name: 'Original', exact: true }),
  ).toBeChecked();
});

test('switching back to Original restores original copy', async ({ page }) => {
  await page.goto('/');
  const group = page.getByRole('group', { name: 'Summary view for Fixture One' });
  await group.getByRole('radio', { name: 'Recruiter', exact: true }).check();
  await expect(page.getByText('The assigned role was Fictional Harbor Clerk')).toBeVisible();
  await group.getByRole('radio', { name: 'Original', exact: true }).check();
  await expect(page.getByText('Original project text.').first()).toBeVisible();
});

test('selection resets on reload and original-only hides controls', async ({ page }) => {
  await page.goto('/');
  const group = page.getByRole('group', { name: 'Summary view for Fixture One' });
  await group.getByRole('radio', { name: 'Client', exact: true }).check();
  await page.reload();
  await expect(group.getByRole('radio', { name: 'Original', exact: true })).toBeChecked();
  await expect(page.getByRole('group', { name: 'Summary view for Fixture Original Only' })).toHaveCount(0);
});

test('SSR contains original and disclosure labels without JS', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByText('Cedar Quay Harbor Ledger is a fictional operations notebook').first()).toBeVisible();
  const recruiter = page.locator('details').filter({ has: page.locator('summary', { hasText: 'Recruiter' }) }).first();
  await recruiter.locator('summary').click();
  await expect(recruiter).toHaveAttribute('open', '');
  const response = await page.request.get('/');
  const html = await response.text();
  expect(html).toContain('Original project text.');
  expect(html).toContain('Recruiter');
  expect(html).toContain('Client');
  expect(html).toContain('Technical');
  expect(html).not.toContain('localStorage');
  await context.close();
});

test('arrow keys keep radio focus and no storage mutations', async ({ page }) => {
  await page.goto('/');
  const original = page.getByRole('group', { name: 'Summary view for Fixture One' })
    .getByRole('radio', { name: 'Original', exact: true });
  await original.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('group', { name: 'Summary view for Fixture One' })
    .getByRole('radio', { name: 'Recruiter', exact: true })).toBeFocused();
  expect(await page.evaluate(() => window.localStorage.length)).toBe(0);
  expect(await page.evaluate(() => document.cookie)).toBe('');
});

test('touch targets, reflow, and reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const option = page.locator('.project-summary-option').first();
  const box = await option.boundingBox();
  expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
  expect(box?.width ?? 0).toBeGreaterThanOrEqual(44);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
  expect(overflow).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('group', { name: 'Summary view for Fixture One' })).toBeVisible();
});
