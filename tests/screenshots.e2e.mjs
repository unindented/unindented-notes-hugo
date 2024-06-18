import { join } from "node:path";
import { expect, test } from "@playwright/test";

const stylePath = join(import.meta.dirname, "screenshots.css");

test.describe("screenshots", () => {
  test.describe("normal pages", () => {
    const pages = {
      home: "/",
      "note-article": "/notes/reference_encrypting_org_files_in_emacs/",
      "note-two-articles":
        "/notes/note_auto_export_org_files_to_hugo/" +
        "?s=%2Fnotes%2Fnote_dark_mode_for_hacker_news%2F" +
        "&c=%2Fnotes%2Fnote_dark_mode_for_hacker_news%2F",
      "note-three-articles":
        "/notes/reference_alerts_in_github_flavored_markdown/" +
        "?s=%2Fnotes%2Freference_css_anchor_positioning_tool%2F" +
        "&s=%2Fnotes%2Fnote_pre_compress_assets_with_gzip_and_brotli%2F" +
        "&c=%2Fnotes%2Fnote_pre_compress_assets_with_gzip_and_brotli%2F",
    };

    const variations = {
      "light mode": {
        testOptions: {},
        emulationOptions: { colorScheme: "light" },
      },
      "dark mode": {
        testOptions: {},
        emulationOptions: { colorScheme: "dark" },
      },
      "light mode forced": {
        testOptions: {},
        emulationOptions: { colorScheme: "light", forcedColors: "active" },
      },
      "dark mode forced": {
        testOptions: {},
        emulationOptions: { colorScheme: "dark", forcedColors: "active" },
      },
      "disabled scripting": {
        testOptions: { javaScriptEnabled: false },
        emulationOptions: { colorScheme: "no-preference" },
      },
    };

    for (const variationName in variations) {
      const { testOptions, emulationOptions } = variations[variationName];

      test.describe(variationName, () => {
        for (const pageName in pages) {
          test.describe(pageName, () => {
            test.use(testOptions);

            test("matches screenshot", async ({ page }) => {
              await page.emulateMedia(emulationOptions);
              await page.goto(pages[pageName], { waitUntil: "networkidle" });
              await expect(page).toHaveScreenshot({ animations: "disabled", stylePath });
            });
          });
        }
      });
    }
  });

  test.describe("kitchen sink", () => {
    const variations = {
      "light mode": {
        testOptions: { javaScriptEnabled: false },
        emulationOptions: { colorScheme: "light" },
      },
      "dark mode": {
        testOptions: { javaScriptEnabled: false },
        emulationOptions: { colorScheme: "dark" },
      },
    };

    for (const variationName in variations) {
      const { testOptions, emulationOptions } = variations[variationName];

      test.use(testOptions);

      test.describe(variationName, () => {
        test("matches screenshot", async ({ page }) => {
          await page.emulateMedia(emulationOptions);
          await page.goto("/notes/note_demo/", { waitUntil: "networkidle" });
          await expect(page).toHaveScreenshot({ animations: "disabled", fullPage: true, stylePath });
        });
      });
    }
  });
});
