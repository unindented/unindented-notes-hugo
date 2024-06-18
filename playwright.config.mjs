import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://localhost:1313/";

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testMatch: "**/*.e2e.{js,jsx,ts,tsx}",
  testDir: "tests",
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
    command: "pnpm start",
    url: baseURL,
    reuseExistingServer: !process.env["CI"],
  },

  projects: [
    { name: "desktop-chrome", use: devices["Desktop Chrome"] },
    { name: "desktop-firefox", use: devices["Desktop Firefox"] },
    { name: "desktop-safari", use: devices["Desktop Safari"] },
    { name: "mobile-chrome", use: devices["Pixel 5"] },
    { name: "mobile-safari", use: devices["iPhone 12"] },
  ],
};

export default defineConfig(config);
