# UniversalToolchain website — Planprint

The English-language product website for [UniversalToolchain](https://github.com/Misha1302/UniversalToolchain). This repository contains only the website: **it does not contain or modify the UniversalToolchain compiler/runtime**.

**Live site:** https://misha1302.github.io/universaltoolchain-site/

## Purpose and source of truth

**Compose the language. Know what runs.** The site explains how independently authored .NET language contributions are resolved into a typed, deterministic language plan, and uses the independent Acme.PricingLanguage example as the central proof. Wist is a separate first-contact path for restricted formulas.

Technical claims, source links and the example ledger are pinned to upstream SHA:

\`f362649872ca70cb924d5233eb965e3a71602015\`

Before changing architecture claims, confirm this commit still reflects the intended upstream state. The *compiled* Acme backend produces a \`Func<decimal>\` delegate; it does **not** demonstrate Wist CIL emission. A browser route switch displays pre-authored descriptions; it never executes .NET.

Do not claim formal optimizer correctness, sandboxing, universal backend equivalence, a stable 1.0 API or unpublished NuGet releases.

## Stack

- Astro 7 with static GitHub Pages output at \`/universaltoolchain-site/\`
- Handwritten responsive CSS, small TypeScript enhancement for menu and assistive status updates
- Self-hosted IBM Plex Sans, IBM Plex Sans Condensed and IBM Plex Mono (licensed under OFL)
- Native accessible backend radios, semantic diagrams and an optional disclosure
- Playwright browser tests and responsive evidence captures

## Work on the site

\`\`\`sh
npm ci
npm run dev
npm run check
npm run lint
npm run build
npm test
\`\`\`

Playwright defaults to \`/usr/bin/chromium-browser\` for the connected Fedora machine. Set \`PLAYWRIGHT_CHROMIUM_EXECUTABLE\` to a local Chromium path or run \`npx playwright install chromium\` in CI.

## Files

- \`src/pages/index.astro\`: six-scene product story, pinned sources and source-accurate Acme artifact routes
- \`src/components/SiteHeader.astro\`: responsive keyboard-accessible menu
- \`src/styles/global.css\`: Planprint typography, layout, and responsive treatments
- \`src/scripts/site.ts\`: progressive enhancement only (no simulated compiler)
- \`src/layouts/BaseLayout.astro\`: canonical URL, social metadata, self-hosted fonts
- \`tests/\`: user flows, no-JS, reduced motion and 5-viewport screenshot checks
- \`evidence/planprint-*.png\`: genuine local Chromium captures from this implementation
- \`scripts/live-audit.mjs\`: read-only visual/functional audit of published GitHub Pages
- \`DESIGN_CONTRACT.md\` and \`QA_REPORT.md\`: design and validation boundaries

## Release

Push to **\`main\` of this website repository only**. The GitHub Actions workflow validates/builds and deploys to Pages. Check the production URL after deployment; a successful local build does not establish a successful public release.

This site is under Apache-2.0. Fonts retain their own licenses.