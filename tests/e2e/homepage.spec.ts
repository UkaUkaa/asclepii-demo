import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/uk");
  });

  test("loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Asklepiy/);
  });

  test("displays hero section", async ({ page }) => {
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("h1")).toContainText(/Медицина|Medicine/);
  });

  test("header is visible with navigation", async ({ page }) => {
    const header = page.locator("header");
    await expect(header).toBeVisible();
  });

  test("navigation links work", async ({ page }) => {
    await page.click("text=Напрямки");
    await expect(page).toHaveURL(/napryamky/);
  });

  test("footer is present", async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
  });
});

test.describe("Language switching", () => {
  test("switches from Ukrainian to English", async ({ page }) => {
    await page.goto("/uk");
    const langBtn = page.locator("button:has-text('EN')");
    await langBtn.click();
    await expect(page).toHaveURL(/\/en/);
  });

  test("English locale shows English content", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("h1")).toContainText(/Medicine/);
  });
});
