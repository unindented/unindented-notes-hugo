import { expect, test } from "@playwright/test";

const checks = {
  home: {
    url: "/",
    selectors: {
      ".h-entry": { minCount: 1, maxCount: 1 },
    },
  },
  "notes-index": {
    url: "/notes/",
    selectors: {
      ".h-entry": { minCount: 1, maxCount: 1 },
    },
  },
  "note-article": {
    url: "/notes/project_my_website/",
    selectors: {
      ".h-entry": { minCount: 1, maxCount: 1 },
    },
  },
  "note-articles": {
    url: "/notes/project_my_website/?s=%2Ftags%2Fproject%2F&c=%2Ftags%2Fproject%2F",
    selectors: {
      ".h-entry": { minCount: 2, maxCount: 2 },
    },
  },
};

test.describe("microformats", () => {
  for (const checkName in checks) {
    const { url, selectors } = checks[checkName];

    test.describe(checkName, () => {
      for (const selector in selectors) {
        const { minCount, maxCount } = selectors[selector];

        test(`expects between ${minCount} and ${maxCount} "${selector}" elements`, async ({ page }) => {
          await page.goto(url, { waitUntil: "networkidle" });
          const elements = await page.$$(selector);

          expect(elements.length).toBeGreaterThanOrEqual(minCount);
          expect(elements.length).toBeLessThanOrEqual(maxCount);
        });
      }
    });
  }
});
