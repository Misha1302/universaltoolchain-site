import { expect, test } from "@playwright/test";

test("accurate first screen and working page anchors", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Languages,composed\./);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og\.png$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://misha1302.github.io/universaltoolchain-site/");
  await page.getByRole("link", { name: /Explore the architecture/i }).click();
  await expect(page).toHaveURL(/#architecture$/);
  await expect(page.getByRole("heading", { name: /One language/i })).toBeVisible();
});

test("lifecycle and independent language route are operable", async ({ page }) => {
  await page.goto("./");
  const compiler = page.getByRole("button", { name: /LanguageCompiler/ });
  await compiler.click();
  await expect(compiler).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("heading", { name: "Let the planner decide." })).toBeVisible();
  const runtime = page.getByRole("button", { name: /LanguageRuntime/ });
  await runtime.click();
  await expect(page.getByRole("heading", { name: "Run only what was selected." })).toBeVisible();
  await page.getByRole("button", { name: "Acme / SDK" }).click();
  await expect(page.getByLabel("Acme pricing language typed routes")).toBeVisible();
  await expect(page.getByLabel("Wist reference-language route")).toBeHidden();
});

test("code tabs support keyboard and copy", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("./");
  const wist = page.getByRole("tab", { name: /WIST/ });
  await wist.focus();
  await wist.press("ArrowRight");
  const sdk = page.getByRole("tab", { name: /SDK/ });
  await expect(sdk).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel", { name: /SDK/ })).toBeVisible();
  await page.getByRole("button", { name: /Copy visible C sharp example/ }).click();
  await expect(page.getByRole("status")).toHaveText(/copied/i);
  const content = await page.evaluate(() => navigator.clipboard.readText());
  expect(content).toContain("LanguageDefinitionBuilder");
});

test("mobile menu, keyboard escape, no horizontal page overflow", async ({ page }) => {
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("./");
    const dimensions = await page.evaluate(() => ({
      doc: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth
    }));
    expect(dimensions.doc, "overflow at " + width).toBeLessThanOrEqual(dimensions.viewport + 1);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
});

test("local asset links and JS are served without request failures", async ({ page }) => {
  const failed: string[] = [];
  page.on("requestfailed", (r) => failed.push(r.url()));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().includes("127.0.0.1")) failed.push(r.status() + " " + r.url());
  });
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  expect(failed).toEqual([]);
});
