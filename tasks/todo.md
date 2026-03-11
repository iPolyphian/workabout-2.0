# Active Task List
<!--
FORMAT RULES (Claude: follow these when updating this file)
- This file tracks immediate work only. Long-term roadmap lives elsewhere.
- Sections: ## Current (one active feature), ## Queue (approved, not started), ## Done (completed, keep for audit)
- Each feature gets a heading, short description, and numbered steps
- Each feature heading includes a type tag: [APP] for changes users see, [INFRA] for tooling/workflow/dev improvements. Example: ### Election History [APP] (v0.9.x). Data work that produces user-visible output is [APP]. Data work that only improves dev workflow is [INFRA].
- Complex features (3+ steps): link to the full design in .claude/plans/ — e.g. "Plan: .claude/plans/feature-name.md"
- Steps are numbered. Step 1 maps to patch 0, step 2 to patch 1, etc (step number = patch + 1). Each new feature starts a new minor version at patch 0 (v0.X.0, v0.X.1, etc.). Feature headings show (vX.Y.x) while in progress, then update to the final patch version when complete.
- Each step shows its version tag after the description: "→ v0.X.Y". Step 1 = v0.X.0, step 2 = v0.X.1, etc. Example: 1. [x] First step — description → v0.X.0 *(completed HH:MM DD/MM/YY)*
- Each step must be scoped to one shippable patch — one commit, one push, one changelog entry. If a step is too big to commit as a single unit, break it down further. If a step is trivial housekeeping, combine it with the previous step.
- When completing a step: N. [x] Step name → v0.X.Y *(completed HH:MM DD/MM/YY)* — then bump the version everywhere it appears (version badges, config files, filenames), rename any versioned deliverable files to match the new version number (even if their content didn't change — the filename must always match the project version), update the changelog, and commit.
- When the final step of a feature completes, run the retro in the same commit: (1) Update version references. (2) Update changelog. (3) Update ROADMAP.md: move the feature from Up Next to Complete (with date and one-line summary), update any status tags (IN PROGRESS → COMPLETE), and refresh Suggested Next if it references the completed feature. (4) Update feature heading from (vX.Y.x) to (vX.Y.N). (5) Run brief retro: what worked, what was slow, what to do differently. Add learnings to learnings.md or ~/.claude/CLAUDE.md, tagged with source. If the process recurs, create a directive + trigger. Check the Progressive Disclosure triggers section in CLAUDE.md — are there any recurring patterns from this feature that should have a trigger but don't? (6) Move the whole block to ## Done.
- Keep ## Done trimmed to last 3 completed features. Move older ones to tasks/archive.md with all steps and timestamps preserved. Newest at top of archive.
- Don't duplicate the product roadmap here. Reference it: "See ROADMAP.md"
- Progress tracking happens HERE, not in .claude/plans/. Plans are reference docs.
- **Task contracts** are mandatory for every step. Every task added to todo.md gets a `Contract:` block with at least one `[auto]` criterion. No exceptions.
  Format:
  N. [ ] Step name -> vX.Y.Z
    Contract:
    - [ ] [auto] Description. Verify: [executable pattern]
    - [ ] [manual] Description of what the human should check
    Agent cannot mark the step done until all contract items pass /agent-verify.
  **`[auto]` criteria** must use one of these executable Verify: patterns:
    - `Verify: run: <shell command>` -- execute, check exit code 0
    - `Verify: file: <path> exists` -- check file existence
    - `Verify: file: <path> contains <string>` -- check file content for substring
    - `Verify: html: <path> has <selector>` -- parse HTML, check CSS selector (requires BeautifulSoup)
    Anything not matching a pattern is flagged invalid during /agent-launch pre-flight.
  **`[manual]` criteria** describe what the human should check visually/behaviourally. No Verify: method. Prefer converting to `[auto]` where possible — only keep `[manual]` for things that genuinely need human eyes (visual layout, interaction feel, print rendering). `[manual]` criteria are batched and presented to the user at feature completion (or mid-feature for 5+ step features), not per-step.
  **Rules:** Every task must have at least one `[auto]` criterion. `[APP]` tasks must also have at least one `[manual]` criterion. `[INFRA]` tasks can be fully `[auto]`.
  System-generated side effects (stats.json, learnings, wave infrastructure) are NOT tasks and don't get contracts.
- This format can be changed — just update these rules and Claude will follow the new convention.
-->

## Current

### Project Scaffold & Design System [INFRA] (v0.1.x)
Plan: `.claude/plans/project-scaffold.md`

1. [ ] Next.js project init + Tailwind + shadcn/ui + folder structure → v0.1.0
   Contract:
   - [ ] [auto] Next.js builds successfully. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [auto] Tailwind globals exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/globals.css exists
   - [ ] [auto] shadcn/ui configured. Verify: file: /Users/williamporter/Desktop/workabout-2.0/components.json exists
   - [ ] [auto] Route group structure exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/layout.tsx exists
   - [ ] [auto] Path aliases configured. Verify: file: /Users/williamporter/Desktop/workabout-2.0/tsconfig.json contains @/

2. [ ] Design system tokens + base component variants → v0.1.1
   Contract:
   - [ ] [auto] DM Sans font loaded. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/layout.tsx contains DM_Sans
   - [ ] [auto] Design tokens defined. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/globals.css contains --teal
   - [ ] [auto] Dark mode variables present. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/globals.css contains .dark
   - [ ] [auto] Tailwind extended with brand colors. Verify: file: /Users/williamporter/Desktop/workabout-2.0/tailwind.config.ts contains teal
   - [ ] [auto] Button component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/button.tsx exists
   - [ ] [auto] Badge component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/badge.tsx exists
   - [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] Fonts render correctly (DM Sans body, Fira Code mono)
   - [ ] [manual] Colors match blueprint -- teal primary (#0d9488), amber secondary (#d97706)

3. [ ] Layout shell -- collapsible sidebar + topbar + role-aware nav → v0.1.2
   Contract:
   - [ ] [auto] Sidebar component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/layout/sidebar.tsx exists
   - [ ] [auto] Topbar component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/layout/topbar.tsx exists
   - [ ] [auto] App shell component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/layout/app-shell.tsx exists
   - [ ] [auto] Root layout uses app shell. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/layout.tsx contains AppShell
   - [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] Sidebar collapses/expands with smooth animation
   - [ ] [manual] Active nav item highlighted with teal accent
   - [ ] [manual] Layout is clean, Linear-inspired -- proper spacing, no clutter
   - [ ] [manual] Mobile: sidebar appears as slide-out drawer

4. [ ] Mock data layer -- TypeScript types + fixture data → v0.1.3
   Contract:
   - [ ] [auto] Types file covers all entities. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/types/database.ts contains BookingRestriction
   - [ ] [auto] Space type enum defined. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/types/database.ts contains hot_desk
   - [ ] [auto] Property fixtures exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/properties.ts exists
   - [ ] [auto] Booking fixtures exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/bookings.ts exists
   - [ ] [auto] Barrel export exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/index.ts exists
   - [ ] [auto] Types compile cleanly. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx tsc --noEmit 2>&1 | tail -3 | grep -v "error"

5. [ ] Placeholder pages wired to layout -- all routes navigable → v0.1.4
   Contract:
   - [ ] [auto] Employer dashboard page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/dashboard/page.tsx exists
   - [ ] [auto] Search page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/search/page.tsx exists
   - [ ] [auto] Provider dashboard page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(provider)/space-provider/page.tsx exists
   - [ ] [auto] Admin dashboard page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(admin)/admin/page.tsx exists
   - [ ] [auto] Placeholder component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/shared/page-placeholder.tsx exists
   - [ ] [auto] Route group layouts exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(provider)/layout.tsx exists
   - [ ] [auto] Full build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] Every sidebar link navigates to correct placeholder page
   - [ ] [manual] Active nav highlighting works for each route
   - [ ] [manual] Role switching shows different nav items and routes

## Queue

<!-- Approved features waiting to start. Brief description + link to plan if one exists. -->

## Done
