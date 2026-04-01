import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test.describe("Meta tags SEO", () => {
  test("home deve ter título correto", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/fm blog/i);
  });

  test("deve ter meta description", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.+/);
  });

  test("deve ter meta viewport", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
      "content",
      /width=device-width/
    );
  });

  test("deve ter meta robots", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /index, follow/);
  });

  test("login deve ter título correto", async ({ page }) => {
    await page.goto("/login");
    await expect(page).toHaveTitle(/fm blog/i);
  });

  test("about deve ter título correto", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveTitle(/fm blog/i);
  });
});
