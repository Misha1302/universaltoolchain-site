import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  workers: 2,
  retries: 0,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://localhost:4321/universaltoolchain-site/",
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE ?? "/usr/bin/chromium-browser"
    },
    trace: "retain-on-failure"
  },
  webServer: {
    command: "npm run dev -- --host localhost",
    url: "http://localhost:4321/universaltoolchain-site/",
    reuseExistingServer: !process.env.CI,
    timeout: 90_000
  }
});
