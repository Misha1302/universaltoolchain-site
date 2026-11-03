import { test, expect } from "@playwright/test";

test("render final responsive evidence", async ({ page }) => {
  for (const width of [320, 390, 768, 1440, 1920]) {
    const height = width <= 390 ? 844 : width <= 768 ? 1024 : 900;
    await page.setViewportSize({ width, height });
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.locator(".hero").screenshot({ path: "evidence/hero-" + width + ".png" });
    await page.locator(".explorer").screenshot({ path: "evidence/architecture-" + width + ".png" });
    if (width === 390 || width === 1440) {
      await page.screenshot({ path: "evidence/full-" + width + ".png", fullPage: true });
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow, "page overflow at " + width).toBe(false);
  }
});
