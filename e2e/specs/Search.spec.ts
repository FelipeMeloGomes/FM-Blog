import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Busca", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("deve ter campo de busca na home", async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Buscar"]');
    await expect(searchInput).toBeVisible();
  });

  test("deve navegar para search com query", async ({ page }) => {
    await test.step("digitar no campo de busca", async () => {
      const searchInput = page.locator('input[placeholder*="Buscar"]');
      await searchInput.fill("test");
    });

    await test.step("submeter formulário", async () => {
      await page.keyboard.press("Enter");
    });

    await test.step("verificar navegação", async () => {
      await expect(page).toHaveURL(/search\?q=test/);
    });
  });
});

test.describe("Página de Busca", () => {
  test("deve mostrar título de resultados", async ({ page }) => {
    await page.goto("/search?q=test");
    await expect(page.getByRole("heading", { name: /resultados/i })).toBeVisible();
  });

  test("deve mostrar contagem de posts", async ({ page }) => {
    await page.goto("/search?q=test");
    await expect(page.locator("text=/post/i")).toBeVisible();
  });
});
