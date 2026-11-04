# Planprint — website implementation contract

**State:** Implemented design direction; browser validation recorded in \`QA_REPORT.md\`.
**Scope:** \`Misha1302/universaltoolchain-site\` only. Do not change \`Misha1302/UniversalToolchain\`.
**Upstream authority:** \`f362649872ca70cb924d5233eb965e3a71602015\`, especially \`samples/Acme.PricingLanguage/Program.cs\`, \`readme.md\`, \`docs/CURRENT_ARCHITECTURE_STATUS.md\` and \`docs/limitations.md\`.

## Visual thesis

**The design is the decision.** A developer should see a source-linked, typographically strong language-build ledger before generic feature marketing. Product identity is the actual selection of typed transformations and executor routes, not a decorative network graph.

- **Content:** distinguish *language configuration* from *program execution*; demonstrate Acme's actual independent syntax; offer Wist and SDK entry points; disclose alpha constraints.
- **Interaction:** native \`Interpreter/Compiled\` radio controls reveal pre-authored route descriptions. No browser compilation; no fake generated plan hash. Mobile menu and aria-live summary use progressive enhancement.
- **Character:** engineering print / technical publication, not a SaaS dashboard.

## Tokens

| Role | Token | Value |
|---|---|---|
| paper | \`--paper\` | \`#F3F1EA\` |
| paper tint | \`--paper-tint\` | \`#E8E8DF\` |
| ink | \`--ink\` | \`#182224\` |
| secondary ink | \`--ink-soft\` | \`#596366\` |
| selected (not semantic proof) | \`--selected\` | \`#0C645D\` |
| diagnostic/rejected | \`--rejected\` | \`#963F31\` |
| hairline | \`--rule\` | \`#CDD1C9\` |

Selected teal means *selected structural route*, **not** correctness certification. Rejected terracotta is for diagnosed structural errors, not a “security failure” claim.

## Type / layout

- Display: IBM Plex Sans Condensed 600; body: IBM Plex Sans 400/500/600; technical: IBM Plex Mono 400/500/600. Self-hosted through Fontsource packages.
- H1 fluid ~46–121 px; H2 fluid ~42–80 px; ordinary content ~15–18 px; technical labels ~10–13px but essential caveats remain ordinary readable text.
- Content max width 1544px with fluid gutters 20–72px. Hero desktop uses asymmetric 2-column copy/ledger; ≤1060px stacks headline + ledger. Interpreter/Compiled inspector desktop uses 3 columns, then 2, then one at ≤840px.
- The site is predominantly warm light paper, uses selected deep teal for exact routes, and has a dark closing to hand off to GitHub. Thin rules organize provenance; they are not standalone status indicators.
- Minimum supported CSS viewport 320px. Page-wide horizontal scrolling is prohibited; long code may scroll inside a code area.

## Accessibility and motion

- Skip link, landmarks, one H1, descriptive H2, visible focus states, control borders and real link destinations.
- Native keyboard-operable radio controls; no-JS route switching via CSS \`:has\` and static human-readable example text.
- Menu: aria-expanded, hidden nav links not tabbable, Escape returns focus, resize closes overlay.
- Aria-live message changes only on direct backend selection. Figure caption states the browser does not compile.
- No auto-animation or scrolljacking. \`prefers-reduced-motion\` disables transitions/scroll motion.
- WCAG 2.2 AA is a **target**, not a certified claim. Browser QA, assistive technology and contrast tests are separate requirements.

## Technical truth lock

1. Acme \`SourceText → PricingExpression → interpreter\`.
2. Acme \`SourceText → PricingExpression → Func<decimal> → compiled\`.
3. Acme compiled returns a delegate, not Wist CIL. Wist is not a mandatory generic SDK IR.
4. Two enabled Acme backends belong to one planned language configuration.
5. Published Wist package \`0.1.0-alpha.1\` differs from source candidate \`0.1.0-alpha.7\`; do not publish a false installation instruction.
6. No sandboxing, optimizer proof, semantic-preservation guarantee, high-level grammar generator, or stable 1.0 release promised.
7. One reproduced sample output \`35.0:35.0\` is evidence of one run, not a benchmark.

## Visual QA / release

The design must be inspected at 320, 390, 768, 1440 and 1920 CSS pixels, including mobile menu, route switch, focus, reduced-motion and non-JavaScript display. Exact commands/results, known gaps and screenshots are in \`QA_REPORT.md\`. Deploy only to the authorized **site repo** main branch.