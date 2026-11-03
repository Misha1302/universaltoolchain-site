# DESIGN CONTRACT — UniversalToolchain Site

**State:** implementation baseline / independently reviewed after visual QA.
**Source of truth:** upstream UT `5626a5e7fdd1c5d85158fab21752ef74c34926a3`. This is a new site, not an extension of the upstream documentation or production source.

## Purpose & guardrails

- **Product:** compact English-language marketing/identity page for .NET language authors, compiler builders and researchers.
- **Primary flow:** learn the central difference in 5 seconds → inspect actual architecture → choose Wist or the generic SDK → open code/docs/GitHub.
- **Invariant:** no invented performance data, security guarantees, live compiler previews, users, partner logos, or stable 1.0 promises.
- **Protected:** do not modify `Misha1302/UniversalToolchain`, its documentation, release artifacts or code.

## Art direction

**Visual thesis:** *the engineering atlas*. The page reads like an oversized technical field manual: generous editorial typography, ink-colored drafting surfaces, paper-colored explanations and a fluorescent chartreuse “resolved component” highlight. Square modules / branching routes are a repeated visual grammar; all imagery derives from the actual architecture.

**Content thesis:** show that a language implementation has a configuration lifecycle separate from per-program compilation. Explain a non-Wist language through actual Acme example. Wist is a real, narrow starting point.

**Interaction thesis:** user control exposes different stages or execution routes; it never pretends to run .NET locally. Buttons update states with accessible names and pressed/selected semantics. Copy acts on real source.

Two strengths: clear brand expression tied to architecture and visually inspectable planning boundaries. One risk: architecture diagram can feel dense on narrow screens; compact into vertical stacked cards and preserve explanatory captions.

Rejected:
- purely monochrome technical manifesto — aesthetically minimal but weaker explanations;
- animated IDE/compiler simulator — high scope and unacceptable risk of mimicking execution.
- chosen: editorial architecture/assembly schematic, visually striking with small controlled interactive states.

## References observed

| Reference | Observed principle | Adaptation | Not copied |
| --- | --- | --- | --- |
| linear.app | succinct positioning and product-specific visualization | domain-specific first-screen diagram | UI imagery, branding |
| vercel.com | deep multi-layer product taxonomy and crisp dark/bright hierarchy | legible section hierarchy | platform marketing |
| resend.com | direct code and visibly approachable quickstart | verified Wist / Acme source examples | code snippets and graphics |
| bun.sh | concise promise and explicit source benchmarks | clarity of technical claims and links | benchmark numbers, logos |
| turso.tech | concrete technical argument paired with SDK code | explain why one planner matters | product-specific diagrams |
| imagery: Bun/Astro homepage | generous headlines, restrained code-like visual anchors | typographic emphasis with controlled color | layout, colors, decorative imagery |

## Type system

- Display/body: **Space Grotesk Variable** (SIL OFL, self-hosted `@fontsource-variable/space-grotesk`), fallback system-ui.
- Monospace labels and code: **IBM Plex Mono** (SIL OFL, self-hosted `@fontsource/ibm-plex-mono`), fallback ui-monospace.
- Hero: 78–140 px desktop, 50–76 px small screens, optical tracking −0.09 em, line-height 0.87–0.96.
- Section title: fluid 52–101 px, normal 500, tracking −0.076 em. Body 14–19 px with line height 1.5–1.65.
- Mono labels: 9–12 px; main accessible content never solely relies on tiny labels.
- Actual copy is in English; no unsupported locale switch.

## Tokens and surfaces

| Role | Token | Value |
| --- | --- | --- |
| Ink background | `--ink` | `#101714` |
| Secondary drawing surface | `--ink-2` | `#18221c` |
| Warm technical paper | `--paper` | `#eeeee6` |
| Soft paper | `--paper-soft` | `#f6f5ef` |
| Primary text / chalk | `--chalk` | `#f5f4ed` |
| Resolved/selected accent | `--lime` | `#d8f782` |
| Dark text muted | `--muted-on-dark` | `#b2bbae` |
| Light text muted | `--muted-on-light` | `#515a51` |
| Focus ring | `#94b5ff` | strong visible outline |

- Container max 1376 px. Gutter fluid 22–76 px, 20 px below 600, 17 px at 320.
- Grids: editorial two-column desktop; two-column pathways; stacked on tablet and narrow phones.
- Surface corners 3–4 px: precision tool feel; thin 1 px dividers as semantic group boundaries.
- Zero drop-shadows except slight code window offset and open menu; gradients/photos banned as semantically irrelevant.
- Component shapes: package node, planned component, runtime route, phase caption, source window.

## Responsive strategy

- **≥1250:** dense 5-column assembly; multi-column hero typography and editorial body.
- **1040–1249:** stacked headline and introduction, condensed schematic labels.
- **≤830:** mobile navigation toggles; assembly turns into staged vertical columns; explorer steps become a 2×2 grid.
- **≤600:** single-column explorer buttons, stacked path panels, route chips wrap, code only scrolls inside code region.
- **≤370:** 50 px hero, shortened secondary labels, tighter module cells. No body horizontal scrolling at 320 px.

## Motion, states and accessibility

- Animated only on action: subtle background/transform transition on selected modules, buttons and CTAs. No autoplay animations or scroll-linked effects.
- `prefers-reduced-motion` removes motion/smooth scrolling.
- Native semantic `header/main/footer/section/nav/button/a` structure, H1 once, anchored H2 sections.
- Skip link, focus-visible outlines, aria-pressed lifecycle/route controls, proper tablist/tabpanel and arrow keyboard navigation for code, Escape closes mobile menu.
- Menu closed by default, no click-through overlays. No forms, loading states or backend claims; site is fully static.
- Source code copy has live announcement; error state explained when clipboard permission blocks.
- Images: original inline SVG/CSS only; generated original OG artwork. No licensed external raster assets.

## Golden path / acceptance

1. Navigate via GitHub Pages project path to correct hero.
2. Open architecture stage `LanguageCompiler`, inspect typed resolution.
3. Switch route to Acme and verify Wist IR is not implied.
4. Switch code source with keyboard, copy.
5. Open verified upstream source/quickstart CTA in new tab.
6. Check 320/390/768/1440/1920 and reduced motion.
7. Capture and visually inspect actual Chromium screenshots; document exact revision and defects in `QA_REPORT.md`.

Approval: no external approval implied. Review evidence belongs in QA_REPORT.
