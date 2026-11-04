import { expect, test } from "@playwright/test";

test("capture Planprint on 5 real viewport sizes and both routes", async ({ page }) => {
  for (const width of [320, 390, 768, 1440, 1920]) {
    const height = width <= 390 ? 844 : width <= 768 ? 1024 : 900;
    await page.setViewportSize({ width, height });
    await page.goto("./");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await page.screenshot({ path: "evidence/planprint-hero-" + width + ".png", fullPage: false });
    await page.locator(".inspector").screenshot({ path: "evidence/planprint-interpreter-" + width + ".png" });
    await page.getByRole("radio", { name: /Compiled/ }).check();
    await page.locator(".inspector").screenshot({ path: "evidence/planprint-compiled-" + width + ".png" });
    if (width === 390 || width === 1440) {
      await page.screenshot({ path: "evidence/planprint-full-" + width + ".png", fullPage: true });
    }
    const dim = await page.evaluate(() => ({ x: document.documentElement.scrollWidth, width: document.documentElement.clientWidth }));
    expect(dim.x, "horizontal overflow on viewport " + width).toBeLessThanOrEqual(dim.width + 1);
  }
});