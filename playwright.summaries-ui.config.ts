import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/summary-site',
  testMatch: '**/*.spec.ts',
  reporter: 'line',
  retries: 0,
  workers: 1,
  use: {
    baseURL: 'http://localhost:3457',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npx --no-install next build tests/summary-site && npx --no-install next start tests/summary-site -p 3457',
    url: 'http://localhost:3457',
    reuseExistingServer: false,
    timeout: 180000,
  },
});
