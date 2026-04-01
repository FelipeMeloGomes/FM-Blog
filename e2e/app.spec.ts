import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Rotas básicas", () => {
  test("deve carregar home", async ({ page }) => {
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/fm blog/i);
  });

  test("deve carregar login", async ({ page }) => {
    const response = await page.goto("/login", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
  });

  test("deve carregar register", async ({ page }) => {
    const response = await page.goto("/register", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
  });

  test("deve carregar about", async ({ page }) => {
    const response = await page.goto("/about", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
  });

  test("deve carregar search", async ({ page }) => {
    const response = await page.goto("/search?q=test", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
  });

  test("deve carregar 404 para rota inexistente", async ({ page }) => {
    const response = await page.goto("/pagina-inexistente-xyz", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
  });
});

test.describe("Meta tags SEO", () => {
  test("home deve ter título correto", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const title = await page.title();
    expect(title.toLowerCase()).toContain("fm blog");
  });

  test("deve ter meta description", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const meta = page.locator('meta[name="description"]');
    await expect(meta).toHaveAttribute("content", /.+/);
  });

  test("deve ter meta viewport", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const meta = page.locator('meta[name="viewport"]');
    await expect(meta).toHaveAttribute("content", /width=device-width/);
  });

  test("deve ter meta robots", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const meta = page.locator('meta[name="robots"]');
    await expect(meta).toHaveAttribute("content", /index, follow/);
  });
});

test.describe("Responsividade", () => {
  test("deve funcionar em viewport mobile (375x667)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
  });

  test("deve funcionar em viewport tablet (768x1024)", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
  });

  test("deve funcionar em viewport desktop (1920x1080)", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const response = await page.goto("/", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
  });
});
