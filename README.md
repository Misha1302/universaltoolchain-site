# UniversalToolchain — product website

The official product/marketing landing page for [UniversalToolchain](https://github.com/Misha1302/UniversalToolchain). This is **not** the documentation site; its links point to the upstream documentation and code.

Built with Astro, TypeScript, handwritten CSS, self-hosted OFL fonts, and small progressive-enhancement interactions. Static output targets GitHub Pages at `/universaltoolchain-site/`.

## Develop

```bash
npm ci
npm run dev
npm run check
npm run lint
npm run build
npm test
```

Playwright tests use `/usr/bin/chromium-browser` by default. Override with `PLAYWRIGHT_CHROMIUM_EXECUTABLE` if needed. Run `npx playwright install chromium` if the browser is missing.

## Architecture

- `src/pages/index.astro` — one focused editorial landing page.
- `src/layouts/BaseLayout.astro` — document shell / SEO.
- `src/components/` — brand/navigation, architecture diagrams, source examples.
- `src/scripts/site.ts` — keyboard-aware interactions; no client framework.
- `src/styles/global.css` — design system and responsive layouts.
- `DESIGN_CONTRACT.md`, `RESEARCH_NOTES.md`, `QA_REPORT.md` — design/evidence/review.
- `.github/workflows/deploy.yml` — build validation and GitHub Pages release.

## Source of truth

Architecture and code examples were checked against UT upstream commit `5626a5e7fdd1c5d85158fab21752ef74c34926a3` (2026-11-01). Recheck before making future API/version claims. The diagrams and lifecycle explorer are **conceptual visualizations**, not a browser-hosted compiler or actual plan generator.

## Release

Push to `main`; GitHub Actions validates, builds and deploys via the official Astro action. Pages source must be `GitHub Actions`. No secrets are used by the static site.

UniversalToolchain upstream is Apache-2.0. Original website content is provided under Apache-2.0; fonts are licensed by their respective SIL Open Font Licenses.
