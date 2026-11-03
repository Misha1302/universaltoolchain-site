# UniversalToolchain Site — Independent Critical QA

**Review date:** 2026-11-03  
**Project:** https://github.com/Misha1302/universaltoolchain-site  
**Live website:** https://misha1302.github.io/universaltoolchain-site/  
**Original UT source revision:** `5626a5e7fdd1c5d85158fab21752ef74c34926a3`  
**Method:** adversarial self-review (no second human agent claimed), true Linux Chromium screenshots and scripted browser interactions against the **public** Pages origin.

## Release verification

- First deployment: [GitHub Actions run 41580253884](https://github.com/Misha1302/universaltoolchain-site/actions/runs/41580253884), all three jobs **success**: validate, build and deploy.
- Source commit first released: `07baf5c21ae9bae2f4df00b348b16d7edf2ef2a9`. Later evidence/QA commits require a fresh deployment check.
- GitHub Pages API reports `build_type=workflow`, HTTPS enforced, canonical URL above.
- Live HTTP responses: HTML **200**, `og.png` **200**, `favicon.svg` **200**.
- Live Chromium test: **5/5 viewport runs passed**, widths **320, 390, 768, 1440, 1920** CSS pixels.
- Every viewport: code tab switching, copy to clipboard containing `LanguageDefinitionBuilder`, stage selection, Acme route selection, no site-level overflow, HTTP 200, no JS exceptions, no failed local resources, no missing internal anchors. Mobile open/close/Escape works at applicable widths.
- `evidence/live-qa.json` records exact per-viewport results, titles, link counts and resource/error lists.

## Browser screenshots of the published site

All screenshot files below originate from **the real deployed GitHub Pages page**, not from a design mockup.

- `evidence/live-hero-320.png`
- `evidence/live-hero-390.png`
- `evidence/live-hero-768.png`
- `evidence/live-hero-1440.png`
- `evidence/live-hero-1920.png`
- `evidence/live-architecture-390.png`
- `evidence/live-architecture-1440.png`

Full-length live screenshots were additionally captured on Fedora for visual review. Repository screenshots focus on the hero and architecture at the responsive breakpoints to avoid large binaries.

## Automated development checks

| Check | Verified result |
| --- | --- |
| `npm run check` | PASS — zero errors, warnings and hints |
| `npm run lint` | PASS |
| `npm run build` | PASS — Astro static generator: one generated page |
| `npm test` | PASS — 6/6 Playwright browser tests |
| Real live page tests | PASS — 5/5 widths, controls, clipboard, links/anchors, local request health |
| `npm audit --omit=dev` | PASS — zero reported production dependency vulnerabilities |
| All-dependency audit | 11 moderate advisories reported by `npm install`; monitor/update development dependencies |
| Lighthouse | ATTEMPTED — npm CLI setup timed out before producing a measurement; no score claimed |
| Axe and manual screen reader | NOT RUN |
| Safari/Firefox | NOT RUN |

## Defects found and repaired

| Priority | Finding | Remedy / confirmation |
| --- | --- | --- |
| P1 | Mobile 320px page originally overran by 12px (`scrollWidth=332`): long SDK pathway title | Reduced heading size at <=370px. Rechecked 320/390/768/1440/1920 on local and public origin: no body overflow. |
| P1 (test harness) | Playwright navigated to `/` instead of the GitHub project subpath and saw 404 | Changed to `page.goto("./")` using project-aware `baseURL`. |
| P2 (test harness) | Mobile Escape test targeted accessible name "Open" after the menu correctly changed to "Close" | Sent keyboard Escape via page; verified menu hides. |
| P2 | Generic SDK could visually appear to require Wist Bytecode/AIR | Separate Wist/Acme routes with explicit generic typed artifact contracts. |
| P2 | Config-time planner could be conflated with source compilation | Dedicated two-clock diagram and text; demo labelled conceptual, never a browser compiler. |
| P2 | OG cards have uneven SVG support across crawlers | Generated real `public/og.png`; metadata points to PNG, confirmed public HTTP 200. |
| P2 | Canonical URL must not use a redirect-only no-slash project URL | Canonical is computed with the project trailing slash. |

## Technical content proof boundary

Checked against `readme.md`, `docs/CURRENT_ARCHITECTURE_STATUS.md`, `docs/start/mental-model.md`, `docs/start/first-program.md`, `docs/architecture/backends-and-parity.md`, `docs/language-authoring/quickstart.md`, `samples/Acme.PricingLanguage/Program.cs`, `docs/limitations.md` at the fixed upstream SHA.

- Configuration-time `LanguageCompiler` plans language feature composition; it does **not** parse user's source.
- Wist is a reference language, and interpreter/CIL parity is a test contract for supported shared behavior, **not** automatic universal parity.
- Generic SDK can author independent non-Wist syntax and typed routes; it does **not** require Wist IR.
- No hardening/sandbox, performance multiplier, stable 1.0 compatibility, imaginary user or partner claimed.
- No mock code presented as a browser-running compiler.
- External quickstart, source, contributions, limits and license paths checked in upstream.

## Risks and remaining checks

- Experimental upstream components and alpha APIs can change. Recheck source claims when updating.
- Host isolation for hostile code or plugins is outside the product-site scope.
- Accessibility is engineered with keyboard controls, skip link, visible focus and reduced motion but dedicated manual screen-reader and axe runs were not completed.
- No field Core Web Vitals telemetry; do not mistake synthetic Lighthouse for real-user performance.
