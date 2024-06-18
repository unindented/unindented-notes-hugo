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
    const menuButton = await page.getByRole("button", { name: "Menu" });
    await expect(nav.or(menuButton)).toBeInViewport();
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

  test("opens list of articles to the side", async ({ page }) => {
    await page.goto(basePath);

    await page.getByRole("link", { name: "full index" }).click();
    const article = await page.getByRole("heading", { name: "All of my notes" });
    await expect(article).toBeAttached();
  });

  test("opens article to the side", async ({ page }) => {
    await page.goto(basePath);

    await page.getByRole("link", { name: "full index" }).click();
    await page.getByRole("link", { name: "My website" }).click();
    const article = await page.getByRole("heading", { name: "My website" });
    await expect(article).toBeAttached();
  });
});
