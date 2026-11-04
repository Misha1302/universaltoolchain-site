import { expect, test } from "@playwright/test";

interface AxeViolation {
  id: string;
  impact: string | null;
  nodes: { target: string[]; failureSummary?: string }[];
}

test("automated WCAG 2.2 AA axe audit at desktop and mobile", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    await page.goto("./", { waitUntil: "networkidle" });
    await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
    await page.getByRole("radio", { name: /Compiled/ }).check();
    const violations = await page.evaluate(async () => {
      const w = window as typeof window & {
        axe: { run: (root: Document, options: unknown) => Promise<{ violations: AxeViolation[] }> };
      };
      const result = await w.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] }
      });
      return result.violations.map(v => ({
        id: v.id,
        impact: v.impact,
        targets: v.nodes.map(n => n.target.join(" ")).slice(0, 6),
        failure: v.nodes[0]?.failureSummary?.slice(0, 220)
      }));
    });
    expect(violations, "axe violations at width " + width + ": " + JSON.stringify(violations, null, 2)).toEqual([]);
  }
});