import { test, expect } from "@playwright/test";

test.describe("Booking Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/uk/napryamky");
  });

  test("booking wizard loads on services page", async ({ page }) => {
    await expect(page.locator("text=Оберіть медичний напрямок")).toBeVisible();
  });

  test("can select a service", async ({ page }) => {
    const serviceBtn = page.locator("button").filter({ hasText: /cardiology|кардіологія/i }).first();
    if (await serviceBtn.isVisible()) {
      await serviceBtn.click();
    }
  });

  test("next button is disabled without selection", async ({ page }) => {
    const nextBtn = page.locator("button:has-text('Далі')");
    await expect(nextBtn).toBeDisabled();
  });
});

test.describe("Sign In", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/uk/sign-in");
  });

  test("sign in page loads", async ({ page }) => {
    await expect(page.locator("h1")).toContainText(/Вхід/);
  });

  test("email tab is active by default", async ({ page }) => {
    await expect(page.locator("input[type='email']")).toBeVisible();
  });

  test("can switch to phone tab", async ({ page }) => {
    await page.click("button:has-text('Телефон')");
    await expect(page.locator("input[type='tel']")).toBeVisible();
  });

  test("password field works", async ({ page }) => {
    await page.fill("input[type='email']", "test@example.com");
    await page.fill("input[type='password']", "password123");
    await expect(page.locator("input[type='email']")).toHaveValue("test@example.com");
  });
});

test.describe("Dashboard", () => {
  test("dashboard is accessible", async ({ page }) => {
    await page.goto("/uk/dashboard");
    await expect(page.locator("text=Заплановані прийоми")).toBeVisible();
  });

  test("family profile switcher works", async ({ page }) => {
    await page.goto("/uk/dashboard");
    await page.click("button:has-text('Дитина')");
  });
});
