import { expect, test } from "@playwright/test";

const basePath = "/";

test.describe("home page", () => {
  test("has title", async ({ page }) => {
    await page.goto(basePath);

    await expect(page).toHaveTitle(/Unindented/);
  });

  test("has main navigation", async ({ page }) => {
    await page.goto(basePath);

    const nav = await page.getByRole("navigation");
    await expect(nav).toBeInViewport();
  });

  test("has main heading", async ({ page }) => {
    await page.goto(basePath);

    const heading = await page.getByRole("heading", { level: 1, name: "My notes" });
    await expect(heading).toBeInViewport();
  });

  test("has link to full list of articles", async ({ page }) => {
    await page.goto(basePath);

    const link = await page.getByRole("link", { name: "full index" });
    await expect(link).toBeAttached();
  });
});
