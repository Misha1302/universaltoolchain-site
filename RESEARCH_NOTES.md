# Source-based editorial research

**Upstream:** `Misha1302/UniversalToolchain` at `5626a5e7fdd1c5d85158fab21752ef74c34926a3` (master, 2026-11-01).

## Verified claims / evidence

| Website message | Source |
| --- | --- |
| Package-owned features, typed artifacts, deterministic planning, exact runtime | `readme.md`, `docs/CURRENT_ARCHITECTURE_STATUS.md` |
| LanguageDefinition → LanguageCompiler → immutable LanguagePlan → LanguageRuntime is configuration-time | `docs/start/mental-model.md`, `docs/start/what-is-universal-toolchain.md` |
| Wist formula `Compile<Func<...>>` with restricted arithmetic | `docs/start/first-program.md`, `readme.md` |
| External non-Wist Acme sample with own syntax types and routes | `samples/Acme.PricingLanguage/Program.cs`, `docs/language-authoring/quickstart.md` |
| Wist interpreter/CIL parity as contract for shared behavior | `docs/architecture/backends-and-parity.md` |
| Alpha, no hardened sandbox, no automatic optimizer correctness | `docs/limitations.md`, `docs/CURRENT_ARCHITECTURE_STATUS.md` |
| Apache-2.0 license | `LICENSE` |

## Editorial guardrails

- Wist is the reference language; generic SDK **does not require** Wist Bytecode/AIR.
- SDK is low-level alpha, no turnkey high-level grammar constructor.
- No benchmark speedup, customer logos, adoption counts, security guarantees or invented future APIs.
- Planning catches structural conflicts, **does not prove semantic correctness**.
- Site interactive demos explain architecture only; the website runs no UT compiler.
- NuGet published Wist package is `0.1.0-alpha.1` according to upstream, while newer source candidate is `0.1.0-alpha.7`, **not** published. Avoid ambiguous install commands on marketing page.

## Visual research

Five live pages reviewed on 2026-11-03: [Linear](https://linear.app), [Vercel](https://vercel.com), [Resend](https://resend.com), [Bun](https://bun.sh), [Turso](https://turso.tech). The references combine terse positioning, actual product interfaces and code, restrained type systems, strong hierarchy and credible documentation actions. Specific observed content: Bun prominently centers installation/real performance comparisons; Resend shows working SDK syntax; Turso foregrounds a concrete database-per-actor story/code; Linear illustrates its actual product, and Vercel organizes platform surfaces. Also examined public imagery of Bun/Astro homepages.

**Chosen direction:** an engineering atlas: bold editorial typography plus a *domain-specific assembly schematic*, not marketing screenshots or code as decoration. No copied brand assets.

## Alternative directions considered

1. **Monochrome technical manifesto** — elegant but too little explanatory affordance for UT's distinctions.
2. **Engineering atlas / assembly system** — chosen. Unique to module ownership and explicit plans; high explanatory power with low client JS.
3. **Animated compiler laboratory** — visually dramatic but easy to fake execution/semantics and costly for mobile/a11y.

Every external link in the site points to an actual upstream repository resource or a local anchor. The preferred docs link uses the upstream `docs/` tree for reliability independent of Pages availability.
