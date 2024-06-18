import { expect, test } from "@playwright/test";

const checks = {
  home: "/",
  "notes-index": "/notes/",
  "note-article": "/notes/project_my_website/",
  "note-articles": "/notes/project_my_website/?s=%2Ftags%2Fproject%2F&c=%2Ftags%2Fproject%2F",
};

test.describe("screenshots", () => {
  for (const colorScheme of ["light", "dark"]) {
    test.describe(colorScheme, () => {
      for (const checkName in checks) {
        test.describe(checkName, () => {
          test("matches screenshot", async ({ page }) => {
            await page.emulateMedia({ colorScheme });
            await page.goto(checks[checkName], { waitUntil: "networkidle" });
            await expect(page).toHaveScreenshot({ animations: "disabled" });
          });
        });
      }
    });
  }
});
