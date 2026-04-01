import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Responsividade", () => {
  test("deve funcionar em viewport mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("deve funcionar em viewport tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("deve funcionar em viewport desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("login deve funcionar em mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const response = await page.goto("/login");
    expect(response?.status()).toBe(200);
    await expect(page.locator("#email")).toBeVisible();
  });

  test("deve ter navbar em mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();
  });
});

test.describe("Acessibilidade", () => {
  test("deve ter labels de input", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("label[for='email']")).toBeAttached();
    await expect(page.locator("label[for='password']")).toBeAttached();
  });

  test("inputs devem ter placeholder", async ({ page }) => {
    await page.goto("/login");
    const emailInput = page.locator("#email");
    await expect(emailInput).toHaveAttribute("placeholder", /.+/);
  });

  test("botão de toggle deve ter aria-label", async ({ page }) => {
    await page.goto("/login");
    const toggleButton = page.locator('button[aria-label*="senha"]');
    await expect(toggleButton).toBeVisible();
  });

  test("deve ter elementos de formulário", async ({ page }) => {
    await page.goto("/login");
    await expect(page.locator("form")).toBeAttached();
  });
});
