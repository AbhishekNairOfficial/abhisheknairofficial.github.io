import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/project-summaries',
  reporter: 'line',
  retries: 0,
  workers: 1,
});
