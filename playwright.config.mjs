import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:1313/";

const desktopChrome = devices["Desktop Chrome"];
const desktopFirefox = devices["Desktop Firefox"];
const desktopSafari = devices["Desktop Safari"];
const mobileChrome = devices["Pixel 5"];
const mobileSafari = devices["iPhone 12"];

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: "tests",
  testMatch: "**/*.e2e.{js,mjs}",
  snapshotPathTemplate: "{testDir}/__screenshots__/{platform}/{projectName}/{arg}{ext}",
  outputDir: "e2e-results",
  retries: 2,

  reporter: [["list"], ["html", { open: "never", outputFolder: "e2e-report" }]],

  use: {
    baseURL,
    screenshot: "on",
    video: "on-first-retry",
    trace: "on-first-retry",
  },

  webServer: {
    command: process.env["CI"] ? "pnpm start" : "pnpm dev",
    url: baseURL,
    reuseExistingServer: !process.env["CI"],
  },

  expect: {
    toHaveScreenshot: { maxDiffPixels: 48 },
  },

  projects: [
    {
      name: "desktop-wide-chrome",
      use: { ...desktopChrome, viewport: { ...desktopChrome.viewport, width: 1920 } },
    },
    { name: "desktop-chrome", use: desktopChrome },
    { name: "desktop-firefox", use: desktopFirefox },
    { name: "desktop-safari", use: desktopSafari },
    { name: "mobile-chrome", use: mobileChrome },
    { name: "mobile-safari", use: mobileSafari },
  ],
};

export default defineConfig(config);
