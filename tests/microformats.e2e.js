import { expect, test } from "@playwright/test";

const checks = {
  home: {
    url: "/",
    selectors: {
      ".h-entry": { minCount: 1, maxCount: 1 },
      ".h-card[rel=me]": { minCount: 1, maxCount: 1 },
    },
  },
  "notes-index": {
    url: "/notes/",
    selectors: {
      ".h-feed": { minCount: 1, maxCount: 1 },
      ".h-entry": { minCount: 1, maxCount: 25 },
      ".h-card[rel=me]": { minCount: 1, maxCount: 1 },
    },
  },
  'note-article': {
    url: "/notes/project_my_website/",
    selectors: {
      ".h-entry": { minCount: 1, maxCount: 1 },
      ".h-card[rel=me]": { minCount: 1, maxCount: 1 },
    },
  },
};

test.describe("microformats", async () => {
  for (const checkName in checks) {
    const { url, selectors } = checks[checkName];

    test.describe(`at "${url}"`, async () => {
      for (const selector in selectors) {
        const { minCount, maxCount } = selectors[selector];

        test(`expects between ${minCount} and ${maxCount} "${selector}" elements`, async ({
          page,
        }) => {
          await page.goto(url);
          const elements = await page.$$(selector);

          expect(elements.length).toBeGreaterThanOrEqual(minCount);
          expect(elements.length).toBeLessThanOrEqual(maxCount);
        });
      }
    });
  }
});
