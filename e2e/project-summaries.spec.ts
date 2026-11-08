import { expect, test } from '@playwright/test';
import { PROJECTS } from '../src/config/constants';

test.describe('project summaries', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/spotify**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ playing: false }),
      });
    });
  });

  test('keeps original-only rows with stable ids and copy', async ({ page }) => {
    const requests: string[] = [];
    page.on('request', (request) => {
      requests.push(request.url());
    });
    await page.goto('/');
    await expect(page.locator('[data-project-id="dew"]')).toBeVisible();
    await expect(page.locator('[data-project-id="executive-network-analytics"]')).toBeVisible();
    await expect(page.getByRole('group', { name: /Summary view for/ })).toHaveCount(0);
    const dew = page.locator('[data-project-id="dew"]');
    await expect(dew.getByText(PROJECTS[0]?.summary ?? '')).toBeVisible();
    const analytics = page.locator('[data-project-id="executive-network-analytics"]');
    await expect(analytics.getByText(PROJECTS[1]?.outcomes.join(' · ') ?? '')).toBeVisible();
    expect(requests.some((url) => url.includes('ts.net'))).toBe(false);
    expect(requests.some((url) => url.includes('/labs/audience-summaries-demo'))).toBe(false);
  });

  test('production HTML has no fixture phrases, gateway host, or secret sentinels', async ({ request }) => {
    const response = await request.get('/');
    const html = await response.text();
    expect(html).not.toContain('Synthetic demo, not real content');
    expect(html).not.toContain('Fixture One');
    expect(html).not.toContain('Test fixture — not owner approved');
    expect(html).not.toContain('ts.net');
    expect(html).not.toContain('sk-test-placeholder');
    expect(html).not.toContain(['spark', '749c'].join('-'));
  });

  test('robots allow labs while the demo stays noindex and out of the sitemap', async ({ request }) => {
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).not.toContain('/labs/');
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).not.toContain('Disallow: /labs/');
    const demo = await (await request.get('/labs/audience-summaries-demo')).text();
    expect(demo).toMatch(/noindex/i);
    expect(demo).toMatch(/nofollow/i);
  });
});
