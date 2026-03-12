---
Version: 1.2
Last updated: 12/03/26
Applies to: v0.4.5
Updated by: Added booking flow learnings
---

# Project Learnings

Cross-cutting patterns and institutional memory for this project. Check this file at session start. Updated automatically via Self-Annealing (failure recovery) and feature retros (post-completion review).

<!--
Claude: add learnings to the most relevant section. If no section fits, create a new ## heading.
Max 50 lines of content. When full, remove the least useful before adding new.

Routine learnings: one line, specific, actionable. Tag source: e.g. "[retro: feature-name vX.Y.Z]"
  Example: - macOS sed -i requires '' backup extension. [retro: doe-hooks v1.2.0]

Significant failures (cost >30 min, broke production, or recurred): use structured format:
  ### Learning: [title]
  **What happened:** [description]
  **Root cause:** [WHY -- context pollution? Ambiguous spec? Missing constraint?]
  **Fix applied:** [what changed]
  **Prevention:** [rule/hook/directive added, or "none needed -- one-off"]
  [source tag]
-->

## Process & Workflow
<!-- How to work effectively in this project. Planning, sequencing, context management. -->

## API & Integration Patterns
<!-- External service behaviours, rate limits, auth quirks, data formats. -->

## Execution Script Gotchas
<!-- Bugs, edge cases, and workarounds discovered in execution/ scripts. -->

## Architecture Decisions
<!-- Stack choices, trade-offs, and why things are built the way they are. -->

- Tailwind v4 uses CSS-based config (`@theme inline` in globals.css), not tailwind.config.ts. shadcn/ui v4 uses `base-nova` style (not `new-york`). Contracts referencing tailwind.config.ts need updating for v4 projects. [retro: scaffold v0.1.1]
- AppShell lives in route group layouts `(employer)/layout.tsx`, not root layout.tsx. Root layout only handles HTML shell, fonts, ThemeProvider. This enables role-specific layout variants. [retro: scaffold v0.1.2]
- Node 20.2.0 is too old for shadcn v4 and ESLint 9. Need Node >= 20.9.0. nvm installed 20.19.0 automatically. Added .nvmrc to enforce. [retro: scaffold v0.1.0]
- URL searchParams are the single source of truth for search filter state. Custom `useSearchParamsState` hook wraps Next.js `useSearchParams` + `useRouter`. No external state library needed. Prices in URL are GBP (human-readable), internal state uses pence. [retro: search v0.2.2]
- Search page uses negative margins (`-mx-6 -my-6`) to override AppShell padding for edge-to-edge map. Avoids modifying the shared AppShell component. [retro: search v0.2.4]

## Decisions
<!-- Technical and process decisions. Format: "Decision — reason. [source]" -->

## UI Patterns
<!-- Reusable patterns for the app. -->

- Search components live in `src/components/search/`, not `ui/` (shadcn primitives) or `shared/` (cross-feature). Feature-scoped directories keep things clean. [retro: search v0.2.5]
- Listing components in `src/components/listing/`. Same feature-scoping pattern. Page-level server component fetches all data, passes to client `ListingPage` orchestrator which renders sub-components. [retro: listing v0.3.5]
- For dynamic Lucide icon rendering from string names (e.g. amenity fixtures), use an explicit mapping object rather than dynamic imports. Faster, tree-shakeable, and type-safe. [retro: listing v0.3.1]
- Booking components in `src/components/booking/`. Modal-based flows: parent orchestrator (booking-modal) manages step state + data; child components (space-selector, date-time-picker, price-summary, booking-confirmation) are stateless views with callbacks. [retro: booking v0.4.5]
- Build verification grep pattern: use `grep -q "Compiled successfully"` on full build output, not `tail -5 | grep -q "Compiled"` -- the success line appears early, not at the end. [retro: booking v0.4.0]

## Common Mistakes
<!-- Recurring errors to watch for. Failure-driven learnings from Self-Annealing. -->

- Pure utility functions (parseSearchFilters, serializeFilters) must NOT live in `"use client"` files if they're called from server components. Extract to a separate file in `src/lib/` (no directive) and re-export from the hook file for client-side consumers. [retro: search v0.2.5]

### Learning: Contract criteria must be marked incrementally, not batched
**What happened:** During Feature 1, contract criteria were verified in bulk then marked `[x]` in a single batch edit. When moving to Done, the contract blocks were stripped to summary-only lines, losing the audit trail.
**Root cause:** Optimised for speed over process -- subagented the work, then edited todo.md after the fact instead of marking each criterion as it passed. During retro, manually constructed the Done block instead of moving the existing block.
**Fix applied:** Restored full contract blocks in Done section.
**Prevention:** (1) After each `Verify:` pattern passes, immediately edit todo.md to mark that specific criterion `[x]`. (2) When moving a feature to Done, cut-paste the entire block including all Contract lines -- never reconstruct from memory. (3) Subagents don't touch todo.md; the main agent marks criteria after verifying subagent output. [retro: scaffold v0.1.4]
