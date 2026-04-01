import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Formulário de Login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.waitForLoadState("networkidle");
  });

  test("deve renderizar campos de email e senha", async ({ page }) => {
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
  });

  test("deve ter botão de login", async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toContainText(/entrar/i);
  });

  test("deve ter link para registro", async ({ page }) => {
    await expect(page.locator('a:has-text("Cadastre-se")')).toBeVisible();
  });

  test("deve ter link para recuperação de senha", async ({ page }) => {
    await expect(page.locator('a:has-text("Esqueceu")')).toBeVisible();
  });

  test("deve ter botão Google login", async ({ page }) => {
    await expect(page.locator('button:has-text("Google")')).toBeVisible();
  });

  test("deve mostrar erro com campos vazios", async ({ page }) => {
    await test.step("submeter formulário vazio", async () => {
      await page.locator('button[type="submit"]').click();
    });

    await test.step("verificar mensagem de erro", async () => {
      const errorMessage = page.locator("p").filter({ hasText: /obrigatório/i });
      await expect(errorMessage.first()).toBeVisible();
    });
  });
});

test.describe("Formulário de Registro", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
    await page.waitForLoadState("networkidle");
  });

  test("deve renderizar campos principais", async ({ page }) => {
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
  });

  test("deve ter link para login", async ({ page }) => {
    const loginLink = page.locator("#main-content a:has-text('Entrar')");
    await expect(loginLink).toBeVisible();
  });

  test("deve mostrar erro com senhas diferentes", async ({ page }) => {
    await test.step("preencher formulário com senhas diferentes", async () => {
      await page.locator("#email").fill("test@example.com");
      await page.locator("#password").fill("Password123!");
      await page.locator("#confirmPassword").fill("DifferentPassword!");
    });

    await test.step("submeter e verificar erro", async () => {
      await page.locator('button[type="submit"]').click();
      await expect(page.locator("text=/senhas/i")).toBeVisible();
    });
  });
});
