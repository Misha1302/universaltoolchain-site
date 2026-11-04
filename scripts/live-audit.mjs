import { chromium } from "playwright";
import { mkdirSync, writeFileSync } from "node:fs";

const site = "https://misha1302.github.io/universaltoolchain-site/";
mkdirSync("evidence", { recursive: true });
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ?? "/usr/bin/chromium-browser";
const browser = await chromium.launch({ executablePath, headless: true });
const results = [];
let defects = 0;

for (const width of [320, 390, 768, 1440, 1920]) {
  const height = width <= 390 ? 844 : width <= 768 ? 1024 : 900;
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  const badRequests = [];

  page.on("pageerror", error => errors.push(String(error)));
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("requestfailed", request => badRequests.push(request.url()));
  page.on("response", response => {
    if (response.url().startsWith(site) && response.status() >= 400)
      badRequests.push(response.status() + " " + response.url());
  });

  const response = await page.goto(site, { waitUntil: "networkidle", timeout: 60_000 });
  const content = await page.evaluate(() => {
    const localLinks = [...document.querySelectorAll("a[href]")];
    const missingAnchors = localLinks.map(a => a.getAttribute("href")).filter(href => {
      if (!href) return false;
      const u = new URL(href, location.href);
      return u.origin === location.origin && u.pathname === location.pathname && u.hash
        && !document.getElementById(decodeURIComponent(u.hash.slice(1)));
    });
    return {
      title: document.title,
      h1: document.querySelector("h1")?.innerText,
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      ledger: document.querySelector(".hero-ledger")?.textContent?.includes("Acme.PricingLanguage"),
      missingAnchors
    };
  });

  await page.screenshot({ path: "evidence/planprint-live-hero-" + width + ".png" });
  if (width === 390 || width === 1440)
    await page.screenshot({ path: "evidence/planprint-live-full-" + width + ".png", fullPage: true });

  const compiledRadio = page.locator('input[value="compiled"]');
  await compiledRadio.check();
  const compiledVisible = await page.locator(".route-compiled").isVisible();
  const delegateMentioned = await page.locator("[data-route-summary]").innerText().then(s => s.includes("not Wist CIL"));

  let menuWorks = true;
  if (width <= 840) {
    const toggle = page.locator("[data-menu-toggle]");
    await toggle.click();
    menuWorks = await page.locator("[data-mobile-nav]").isVisible();
    await page.keyboard.press("Escape");
    menuWorks = menuWorks && !(await page.locator("[data-mobile-nav]").isVisible());
  }
  const record = {
    width,
    http: response?.status(),
    ...content,
    compiledVisible,
    delegateMentioned,
    menuWorks,
    errors,
    badRequests
  };
  const pass = record.http === 200 && record.documentWidth <= record.viewportWidth + 1
    && record.ledger && record.compiledVisible && record.delegateMentioned
    && record.menuWorks && record.missingAnchors.length === 0
    && record.errors.length === 0 && record.badRequests.length === 0;
  results.push({ pass, ...record });
  if (!pass) defects += 1;
  console.log("PLANPRINT_PUBLIC_QA", JSON.stringify({ pass, ...record }));
  await context.close();
}

await browser.close();
writeFileSync("evidence/planprint-live-qa.json", JSON.stringify({
  url: site,
  executedAt: new Date().toISOString(),
  failed: defects,
  viewports: results
}, null, 2) + "\n");

if (defects) process.exitCode = 1;