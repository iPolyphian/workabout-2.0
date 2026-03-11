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

## Decisions
<!-- Technical and process decisions. Format: "Decision — reason. [source]" -->

## UI Patterns
<!-- Reusable patterns for the app. -->

## Common Mistakes
<!-- Recurring errors to watch for. Failure-driven learnings from Self-Annealing. -->
