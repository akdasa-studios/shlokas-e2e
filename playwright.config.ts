import { defineConfig, devices } from '@playwright/test'
import { SHLOKAS_URL } from './utils/env'


export default defineConfig({
  timeout: 60 * 1000,
  testDir: './tests',
  fullyParallel: true,
  // forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.WORKERS ? parseInt(process.env.WORKERS) : (process.env.CI ? 1 : undefined),
  outputDir: './output/results',
  reporter: [
    ['html', { open: 'never', outputFolder: './output/report' }],
    ['list', { printSteps: true }],
    ['github']
  ],
  use: {
    baseURL: SHLOKAS_URL,
    trace: 'on-first-retry',
    video: 'on-first-retry'
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
