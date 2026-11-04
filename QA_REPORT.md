# UniversalToolchain website — Planprint QA and release boundary

**Review date:** 2026-11-04.
**Website repository:** \`Misha1302/universaltoolchain-site\` (\`main\`).
**Before redesign:** \`3b08b622d24b035e51bdb00535a712a07188a3c2\`.
**Upstream source pinned by site:** \`Misha1302/UniversalToolchain@f362649872ca70cb924d5233eb965e3a71602015\`.
**Method:** local Fedora Chromium/Playwright run and independent-in-intent *self-review* of rendered pixels; not an external usability study.

## Project/product boundary

Changes affect this static site only. No UT production code, SDK, compiler, runtime, docs or branches are modified. The site displays a pre-authored Acme type-route explanation, not a real browser compiler. "Compiled" in Acme is a delegate route and not Wist CIL. Unknown plans, plan hashes, unsourced performance claims, sandboxing or optimizer proofs are not asserted.

## Technical gates

| Check | Observed result | Scope |
|---|---|---|
| \`npm run check\` | PASS, zero Astro errors/warnings/hints | Static type checks |
| \`npm run lint\` | PASS | TS scripts, tests, config |
| \`npm run build\` | PASS, 1 static page | Astro Pages subpath |
| \`npm test\` | PASS, 9/9 Playwright tests | Tests described below |
| \`npm audit --omit=dev --audit-level=moderate\` | PASS, 0 production dependency issues reported | npm advisory DB at check time |
| All-dependency npm audit | 11 moderate development dependency reports | Not silently fixed with breaking upgrades |

Playwright covers:
- category/headline, Acme identity, source permalink and canonical/OG metadata;
- native radio change both pointer and keyboard, correct compiled \`Func<decimal>\`/not-Wist-CIL description;
- no JavaScript: main source, anchor paths and CSS route choice remain usable;
- mobile menu keyboard Escape, aria-expanded, focus recovery and anchor navigation;
- deep technical links and explicit alpha/limitations text;
- no JS page exceptions, no failed local resources during tested page load;
- no page-wide horizontal scroll at **320, 390, 768, 1440, 1920 CSS px**;
- \`prefers-reduced-motion: reduce\` basic render check;
- **axe-core** WCAG 2.2 AA-tagged automated rules at 390 and 1440, compiled route selected: zero detected violations after correcting the brand accessible name and scrollable code-region focus.

## Screenshot evidence

All were captured from **the local running Astro site** in Chromium, not the published production URL, at the state represented by the source checked into this commit.

| Screen/state | Files |
|---|---|
| Above-fold hero, five widths | \`evidence/planprint-hero-{320,390,768,1440,1920}.png\` |
| Acme interpreter, five widths | \`evidence/planprint-interpreter-{320,390,768,1440,1920}.png\` |
| Acme compiled, five widths | \`evidence/planprint-compiled-{320,390,768,1440,1920}.png\` |
| Full long page | \`evidence/planprint-full-{390,1440}.png\` |

Visually inspected by this implementation pass: hero at 1440/390/320, Acme inspector at 1440 and compiled at 390, checking hierarchy, clipping, source legibility and major layout breaks. The interaction/control data are tested independently of screenshots. This is **not** a professional external art-direction signoff.

## Functional and technical trust

The Acme source sample was separately built and run from a clean research checkout under .NET 10 with \`35.0:35.0\` output; the Wist rollout sample produced score \`82.0\`. These bounded experiments are evidence for named scenarios, not universal parity or a benchmark.

Every new source link uses a fixed upstream SHA. The Wist published/package-vs-source distinction is visible. GitHub and documentation are external links; they are not copied or transformed into invented product routes. Mobile navigation never points to an empty local page.

## Remaining limitations / non-claims

- **NOT_RUN:** NVDA, VoiceOver or other manual screen reader; dedicated assistive-device lab.
- **NOT_RUN:** Safari/WebKit, Firefox, cross-OS render comparisons.
- **NOT_RUN:** real-user Core Web Vitals and a statistically grounded five-second comprehension study.
- **PARTIAL:** accessibility: axe-core + keyboard and source inspection, not a verified WCAG conformance certification.
- **PARTIAL:** visual critique is single-implementation self-review, not independent studio jury.
- **RELEASE GATE:** local checks alone do not establish that GitHub Pages deployed the commit. Use \`node scripts/live-audit.mjs\` *after* the \`main\` workflow finishes; record live URL/status separately.

## How to reproduce

\`\`\`sh
npm ci
npm run check
npm run lint
npm run build
npm test
npm audit --omit=dev --audit-level=moderate
node scripts/live-audit.mjs  # AFTER public Pages deploy
\`\`\`

On Fedora the browser path is \`/usr/bin/chromium-browser\`; CI installs a Playwright-managed Chromium. Never label screenshots from a previous site revision as the current live state.