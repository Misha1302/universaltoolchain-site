# Planprint — source and product decisions

**Source revision:** \`Misha1302/UniversalToolchain@f362649872ca70cb924d5233eb965e3a71602015\` (4 Nov 2026).

**Prior direction:** the original website used a dark “engineering atlas” with a lime-highlighted composition schematic. The November 4 research found that while technically structured, it did not foreground a real independently authored language and its selected typed routes clearly enough.

**Chosen direction:** Planprint / The Build Ledger. An asymmetric editorial composition makes the architectural decision itself the central graphic: accepted type path, source provenance, and backend-specific terminal contracts. Competing directions — topology-as-constellation and interactive compiler toolbench — were rejected because they offered weaker truth cues or risked implying actual browser compiler execution.

**Technical boundaries:** the Acme example uses its own \`PricingExpression\`; its “compiled” backend is a delegate, not Wist CIL. LanguageCompiler composes a language implementation at configuration time; LanguageRuntime binds exact selected implementations. A successful plan resolves structure only, not arbitrary semantics, sandboxing or backend parity.

**First contact:** authors of non-Wist languages and compiler researchers receive the Acme source; .NET users who need restricted formulas can immediately enter the Wist quickstart. The site is not a documentation portal or API simulator.

**Observed design research:** Gleam (identity with real code), Bun (clear category/action), Zig (specific engineering claims), Astro (fast product category), MLIR and Tree-sitter (precise technical exposition). These served as heuristic contrasts, not visual templates to copy.

**Source file map:**
- \`readme.md\`: product split, public alpha versions and limits.
- \`docs/CURRENT_ARCHITECTURE_STATUS.md\`: generic SDK implementation, exact plan, parity boundaries.
- \`docs/language-authoring/{artifact-routing,contribution-planning}.md\`: type-compatible routes, diagnostics.
- \`samples/Acme.PricingLanguage/Program.cs\`: selected parser/executor/compiled delegate routes.
- \`docs/limitations.md\` and \`docs/alternatives.md\`: candid boundaries.

Site screenshots establish rendered composition, not source semantics. CI and integration checks establish bounded behavior, not visual originality or certified accessibility.