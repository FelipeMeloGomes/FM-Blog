import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Rotas básicas", () => {
  test("deve carregar home", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);
  });

  test("deve carregar login", async ({ page }) => {
    const response = await page.goto("/login");
    expect(response?.status()).toBe(200);
  });

  test("deve carregar register", async ({ page }) => {
    const response = await page.goto("/register");
    expect(response?.status()).toBe(200);
  });

  test("deve carregar about", async ({ page }) => {
    const response = await page.goto("/about");
    expect(response?.status()).toBe(200);
  });

  test("deve carregar search", async ({ page }) => {
    const response = await page.goto("/search?q=test");
    expect(response?.status()).toBe(200);
  });

  test("deve carregar 404", async ({ page }) => {
    await page.goto("/non-existent-page-xyz");
    await expect(page.getByText(/não encontrada/i)).toBeVisible();
  });
});

test.describe("Navegação", () => {
  test("navbar deve ter logo clicável para home", async ({ page }) => {
    await page.goto("/login");
    await page.locator('text="FM Blog"').click();
    await expect(page).toHaveURL("http://localhost:5173/");
  });

  test("deve ter link para login na navbar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('nav a:has-text("Entrar")')).toBeVisible();
  });

  test("deve ter link para cadastro na navbar", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('nav a:has-text("Cadastrar")')).toBeVisible();
  });

  test("footer deve ter copyright", async ({ page }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toContainText(/©/);
  });

  test("deve ter skip link para conteúdo principal", async ({ page }) => {
    await page.goto("/");
    const skipLink = page.locator('a:has-text("Pular para o conteúdo principal")');
    await expect(skipLink).toHaveClass(/sr-only/);
  });
});

test.describe("Dark Mode", () => {
  test("deve ter toggle de dark mode", async ({ page }) => {
    await page.goto("/");
    const themeToggle = page
      .locator('button[aria-label*="mode"], button[aria-label*="tema"]')
      .first();
    await expect(themeToggle).toBeVisible();
  });

  test("deve alternar tema ao clicar", async ({ page }) => {
    await page.goto("/");
    const themeToggle = page
      .locator('button[aria-label*="mode"], button[aria-label*="tema"]')
      .first();
    await themeToggle.click();
    const html = page.locator("html");
    const classList = await html.getAttribute("class");
    expect(classList).toMatch(/dark|light/);
  });
});

test.describe("Sitemap e Robots", () => {
  test("sitemap.xml deve existir e ser válido", async ({ page }) => {
    const response = await page.goto("/sitemap.xml");
    expect(response?.status()).toBe(200);
    const content = await page.content();
    expect(content).toContain("<urlset");
  });

  test("robots.txt deve existir", async ({ page }) => {
    const response = await page.goto("/robots.txt");
    expect(response?.status()).toBe(200);
    const content = await page.content();
    expect(content).toMatch(/user-agent|allow|disallow/i);
  });
});

test.describe("Performance", () => {
  test("deve carregar sem erros críticos", async ({ page }) => {
    const failedRequests: string[] = [];
    page.on("requestfailed", (request) => {
      failedRequests.push(request.url());
    });

    await page.goto("/");
    await page.waitForTimeout(2000);

    const criticalFailures = failedRequests.filter(
      (url) => !url.includes("favicon") && !url.includes("fonts.googleapis")
    );
    expect(criticalFailures.length).toBeLessThanOrEqual(3);
  });

  test("deve ter código de resposta rápido", async ({ page }) => {
    const start = Date.now();
    await page.goto("/");
    const loadTime = Date.now() - start;
    expect(loadTime).toBeLessThan(5000);
  });
});

test.describe("Links externos", () => {
  test("about deve ter links para LinkedIn e GitHub", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator('a[href*="linkedin"]')).toBeVisible();
    await expect(page.locator('a[href*="github"]')).toBeVisible();
  });

  test("links externos devem ter target _blank", async ({ page }) => {
    await page.goto("/about");
    await expect(page.locator('a[href*="linkedin"]')).toHaveAttribute("target", "_blank");
    await expect(page.locator('a[href*="github"]')).toHaveAttribute("target", "_blank");
  });
});
