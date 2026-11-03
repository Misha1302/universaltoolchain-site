import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const site = "https://misha1302.github.io/universaltoolchain-site/";
mkdirSync("evidence", { recursive: true });
const browser = await chromium.launch({
  executablePath: "/usr/bin/chromium-browser",
  headless: true
});
const evidence = [];
let defects = 0;
for (const width of [320, 390, 768, 1440, 1920]) {
  const height = width <= 390 ? 844 : 900;
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    permissions: ["clipboard-read", "clipboard-write"]
  });
  const page = await context.newPage();
  const errors = [];
  const requests = [];
  page.on("pageerror", error => errors.push(String(error)));
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("requestfailed", request => requests.push(request.url()));
  page.on("response", response => {
    if (response.url().startsWith(site) && response.status() >= 400)
      requests.push(response.status() + " " + response.url());
  });
  const response = await page.goto(site, { waitUntil: "networkidle", timeout: 45_000 });
  const content = await page.evaluate(() => {
    const allLinks = [...document.querySelectorAll("a[href]")];
    const missingAnchors = allLinks.map(a => a.getAttribute("href")).filter(href => {
      if (!href) return false;
      const url = new URL(href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return false;
      return !document.getElementById(decodeURIComponent(url.hash.slice(1)));
    });
    return {
      title: document.title,
      width: document.documentElement.scrollWidth,
      viewport: document.documentElement.clientWidth,
      cssFiles: [...document.querySelectorAll("link[rel=stylesheet]")].length,
      sourceLinks: allLinks.length,
      missingAnchors,
      heading: document.querySelector("h1")?.textContent?.trim() || ""
    };
  });
  if (width === 390 || width === 1440) {
    await page.screenshot({ path: "evidence/live-full-" + width + ".png", fullPage: true });
    await page.locator(".hero").screenshot({ path: "evidence/live-hero-" + width + ".png" });
    await page.locator(".explorer").screenshot({ path: "evidence/live-architecture-" + width + ".png" });
  } else {
    await page.locator(".hero").screenshot({ path: "evidence/live-hero-" + width + ".png" });
  }
  const compiler = page.locator('[data-step-button="compiler"]');
  await compiler.click();
  const compilerActive = await compiler.getAttribute("aria-pressed");
  await page.locator('[data-route-switch="acme"]').click();
  const acmeShown = await page.locator('[data-route-panel="acme"]').isVisible();
  await page.locator('[data-code-tab="sdk"]').click();
  await page.locator("[data-copy-code]").click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  let menuWorks = true;
  if (width <= 830) {
    const button = page.locator("[data-menu-toggle]");
    await button.click();
    menuWorks = await page.locator("[data-mobile-nav]").isVisible();
    await page.keyboard.press("Escape");
    menuWorks = menuWorks && !(await page.locator("[data-mobile-nav]").isVisible());
  }
  const record = {
    width,
    http: response?.status(),
    ...content,
    compilerActive,
    acmeShown,
    copiedSDK: copied.includes("LanguageDefinitionBuilder"),
    menuWorks,
    requests,
    errors
  };
  evidence.push(record);
  const pass =
    record.http === 200 &&
    record.width <= record.viewport + 1 &&
    record.compilerActive === "true" &&
    record.acmeShown &&
    record.copiedSDK &&
    record.menuWorks &&
    record.missingAnchors.length === 0 &&
    record.errors.length === 0 &&
    record.requests.length === 0;
  if (!pass) defects++;
  console.log("PUBLIC_QA", JSON.stringify({ pass, ...record }));
  await context.close();
}
writeFileSync("evidence/live-qa.json", JSON.stringify({ url: site, failed: defects, viewports: evidence }, null, 2) + "\n");
await browser.close();
if (defects) process.exitCode = 1;
