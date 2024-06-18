import { expect, test } from "@playwright/test";

const basePath = "/";

test.describe("home page", () => {
  test("has main navigation", async ({ page }) => {
    await page.goto(basePath);

    const nav = await page.getByRole("navigation");
    const menuButton = await page.getByRole("button", { name: "Menu", exact: true });
    await expect(nav.or(menuButton)).toBeInViewport();
  });

  test("opens articles to the side, and updates title", async ({ page }) => {
    await page.goto(basePath);

    await expect(await page.getByRole("heading", { name: "My notes", exact: true })).toBeAttached();
    await expect(page).toHaveTitle("Notes — Unindented");

    await page.getByRole("link", { name: "full index" }).click();
    await expect(await page.getByRole("heading", { name: "My notes", exact: true })).toBeAttached();
    await expect(await page.getByRole("heading", { name: "All of my notes", exact: true })).toBeInViewport();
    await expect(page).toHaveTitle("All of my notes — Notes — Unindented");

    await page.getByRole("link", { name: "My website", exact: true }).click();
    await expect(await page.getByRole("heading", { name: "My notes", exact: true })).toBeAttached();
    await expect(await page.getByRole("heading", { name: "All of my notes", exact: true })).toBeAttached();
    await expect(await page.getByRole("heading", { name: "My website", exact: true })).toBeInViewport();
    await expect(page).toHaveTitle("My website — Notes — Unindented");
  });

  test("closes articles when navigating back, and updates title", async ({ page }) => {
    await page.goto(basePath);

    await page.getByRole("link", { name: "full index", exact: true }).click();
    await page.getByRole("link", { name: "My website", exact: true }).click();
    await expect(page).toHaveTitle("My website — Notes — Unindented");

    await page.goBack();
    await expect(page).toHaveTitle("All of my notes — Notes — Unindented");

    await page.goBack();
    await expect(page).toHaveTitle("Notes — Unindented");
  });
});
