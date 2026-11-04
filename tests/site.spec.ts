import { expect, test } from "@playwright/test";

const SOURCE_REV = "f362649872ca70cb924d5233eb965e3a71602015";
const ORIGIN = "https://misha1302.github.io/universaltoolchain-site/";

test("positioning, proof and canonical metadata are present on first screen", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(/Compose thelanguage.Know whatruns./);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", ORIGIN);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /og\.png$/);
  await expect(page.locator(".hero-ledger")).toContainText("Acme.PricingLanguage");
  await expect(page.locator(".hero-ledger")).toContainText("Func<decimal>");
  await expect(page.locator(".hero-ledger")).toContainText("NOT CIL");
  await expect(page.locator(".hero-ledger")).toContainText("NOT A BROWSER COMPILER");
  await expect(page.locator(".hero-ledger a")).toHaveAttribute("href", new RegExp(SOURCE_REV));
  await page.getByRole("link", { name: /Explore a real example/ }).click();
  await expect(page).toHaveURL(/#example$/);
  await expect(page.getByRole("heading", { name: /The plan is/i })).toBeVisible();
});

test("single interactive inspector exposes both accurate routes with native radio keys", async ({ page }) => {
  await page.goto("./");
  const interpreter = page.getByRole("radio", { name: /Interpreter/ });
  const compiled = page.getByRole("radio", { name: /Compiled/ });
  await expect(interpreter).toBeChecked();
  await expect(page.getByRole("list", { name: "Interpreter source-backed route" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Compiled source-backed route" })).toBeHidden();
  await compiled.check();
  await expect(compiled).toBeChecked();
  await expect(page.getByRole("list", { name: "Compiled source-backed route" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Interpreter source-backed route" })).toBeHidden();
  await expect(page.locator("[data-route-summary]")).toContainText("not Wist CIL");
  await interpreter.focus();
  await interpreter.press("ArrowRight");
  await expect(compiled).toBeChecked();
  await expect(page.locator("[data-route-summary]")).toContainText("Compiled:");
  await compiled.press("ArrowLeft");
  await expect(interpreter).toBeChecked();
});

test("no JavaScript still renders main content and shows a real backend choice", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(ORIGIN.replace("https://misha1302.github.io", "http://localhost:4321"));
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".hero-ledger")).toContainText("Acme.PricingLanguage");
  await page.getByRole("radio", { name: /Compiled/ }).check();
  await expect(page.getByRole("list", { name: "Compiled source-backed route" })).toBeVisible();
  await context.close();
});

test("navigation, status and limitations connect to actual source", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Limitations" }).click();
  await expect(page).toHaveURL(/#limits$/);
  await expect(page.getByRole("heading", { name: /Structure is not a proof/ })).toBeVisible();
  await expect(page.locator("#limits")).toContainText("No hardened in-process sandbox");
  await expect(page.locator("#start")).toContainText("0.1.0-alpha.1");
  await expect(page.locator("#start")).toContainText("0.1.0-alpha.7");
  await expect(page.locator("#start")).toContainText("not on NuGet.org");
  await expect(page.locator("#start")).toContainText("does not generate a grammar");
  await page.locator(".diagnostic-note summary").click();
  await expect(page.locator(".diagnostic-inner")).toContainText("hypothetical invalid configuration");
  await expect(page.locator(".diagnostic-inner")).toContainText("UTL2207");
});

test("mobile menu supports Escape, focus recovery, and working anchors", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./");
  const menu = page.locator("[data-menu-toggle]");
  await menu.click();
  const nav = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(nav).toBeVisible();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(nav).toBeHidden();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await nav.getByRole("link", { name: /Get started/i }).click();
  await expect(nav).toBeHidden();
  await expect(page).toHaveURL(/#start$/);
});

test("no overflow at required widths or reduced-motion state", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: width <= 390 ? 844 : 900 });
    await page.goto("./");
    const dims = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth
    }));
    expect(dims.scroll, "horizontal overflow at width " + width).toBeLessThanOrEqual(dims.client + 1);
    await expect(page.locator(".action-primary")).toBeVisible();
  }
});

test("local resources and interactions do not emit page or request errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", e => errors.push(e.message));
  page.on("requestfailed", r => errors.push("request: " + r.url()));
  page.on("response", r => {
    if (r.status() >= 400 && r.url().includes("localhost")) errors.push(r.status() + " " + r.url());
  });
  await page.goto("./", { waitUntil: "networkidle" });
  await page.getByRole("radio", { name: /Compiled/ }).check();
  expect(errors).toEqual([]);
});