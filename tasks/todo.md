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

### Search & Discovery [APP] (v0.2.x)
Plan: `.claude/plans/search-discovery.md`

Split-view search page (list + map), filters with URL sync, property cards, responsive layout. Mock data only -- client-side filtering over fixtures.

1. [x] Search data layer -- amenity fixtures + property search helpers → v0.2.0 *(completed 02:42 11/03/26)*
   Contract:
   - [x] [auto] Amenity fixtures exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/amenities.ts exists
   - [x] [auto] Property-amenity mapping exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/property-amenities.ts exists
   - [x] [auto] Barrel export updated. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/index.ts contains amenities
   - [x] [auto] Search helpers exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/search.ts contains filterProperties
   - [x] [auto] SearchFilters type exported. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/search.ts contains SearchFilters
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"

2. [x] Property card component → v0.2.1 *(completed 02:47 11/03/26)*
   Contract:
   - [x] [auto] Property card component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/property-card.tsx exists
   - [x] [auto] Format utilities exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/format.ts contains formatPrice
   - [x] [auto] Card uses Next.js Image. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/property-card.tsx contains next/image
   - [x] [auto] Card accepts highlight prop. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/property-card.tsx contains isHighlighted
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] Card renders with thumbnail, name, city, rating, badges, and price in a compact layout
   - [ ] [manual] Hover state shows subtle visual feedback (elevation or border)

3. [ ] Filter bar with URL sync → v0.2.2
   Contract:
   - [ ] [auto] Filter bar component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/filter-bar.tsx exists
   - [ ] [auto] Filter drawer exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/filter-drawer.tsx exists
   - [ ] [auto] Search params hook exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/hooks/use-search-params-state.ts exists
   - [ ] [auto] Hook reads URL params. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/hooks/use-search-params-state.ts contains useSearchParams
   - [ ] [auto] Popover component installed. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/popover.tsx exists
   - [ ] [auto] Slider component installed. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/slider.tsx exists
   - [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] Selecting filters updates the URL bar in real time
   - [ ] [manual] Pasting a URL with filter params pre-selects the correct filters
   - [ ] [manual] "Clear all" resets filters and URL
   - [ ] [manual] On mobile (< 768px), filters appear in a slide-up drawer

4. [ ] Map panel with property pins → v0.2.3
   Contract:
   - [ ] [auto] Map component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-map.tsx exists
   - [ ] [auto] Map pin component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/map-pin.tsx exists
   - [ ] [auto] Map fallback exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/map-fallback.tsx exists
   - [ ] [auto] Map accepts highlight prop. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-map.tsx contains highlightedPropertyId
   - [ ] [auto] Dynamic import used. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-map.tsx contains next/dynamic
   - [ ] [auto] Google Maps package installed. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && grep -q "react-google-maps" package.json
   - [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] Map (or fallback) renders with pins at correct relative positions
   - [ ] [manual] Pin shows price and uses brand colors

5. [ ] Split-view search page -- list + map + filter integration → v0.2.4
   Contract:
   - [ ] [auto] Search page replaced. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/search/page.tsx contains filterProperties
   - [ ] [auto] Search layout component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx exists
   - [ ] [auto] Layout is client component. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx contains use client
   - [ ] [auto] Mobile toggle exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx contains List
   - [ ] [auto] Highlight state managed. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx contains highlightedPropertyId
   - [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] Split view shows list on left, map on right on desktop
   - [ ] [manual] Hovering a card highlights the corresponding map pin
   - [ ] [manual] Clicking a map pin scrolls to and highlights the corresponding card
   - [ ] [manual] Filters reduce the visible results in both list and map
   - [ ] [manual] On mobile, List/Map toggle switches between full-width views
   - [ ] [manual] Empty state shows when no properties match filters

6. [ ] SSR, responsive polish, and empty states → v0.2.5
   Contract:
   - [ ] [auto] Empty state component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/empty-state.tsx exists
   - [ ] [auto] Unsplash image domain configured. Verify: file: /Users/williamporter/Desktop/workabout-2.0/next.config.ts contains unsplash
   - [ ] [auto] Property cards have alt text. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/property-card.tsx contains alt
   - [ ] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] View page source shows property names and prices in HTML (SSR working)
   - [ ] [manual] Mobile layout is usable at 375px width (iPhone SE)
   - [ ] [manual] Tablet layout (768px) shows a sensible split or toggle
   - [ ] [manual] Empty state appears when all filters are set to impossible values
   - [ ] [manual] Tab key navigates through filter controls in logical order

## Queue

<!-- Approved features waiting to start. Brief description + link to plan if one exists. -->

## Done

### Project Scaffold & Design System [INFRA] (v0.1.4)
Plan: `.claude/plans/project-scaffold.md`

1. [x] Next.js project init + Tailwind + shadcn/ui + folder structure → v0.1.0 *(completed 01:28 11/03/26)*
   Contract:
   - [x] [auto] Next.js builds successfully. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [x] [auto] Tailwind globals exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/globals.css exists
   - [x] [auto] shadcn/ui configured. Verify: file: /Users/williamporter/Desktop/workabout-2.0/components.json exists
   - [x] [auto] Route group structure exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/layout.tsx exists
   - [x] [auto] Path aliases configured. Verify: file: /Users/williamporter/Desktop/workabout-2.0/tsconfig.json contains @/

2. [x] Design system tokens + base component variants → v0.1.1 *(completed 01:35 11/03/26)*
   Contract:
   - [x] [auto] Barlow font loaded. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/layout.tsx contains Barlow
   - [x] [auto] Design tokens defined. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/globals.css contains --indigo
   - [x] [auto] Dark mode variables present. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/globals.css contains .dark
   - [x] [auto] Tailwind brand colors in CSS theme. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/globals.css contains --color-indigo
   - [x] [auto] Button component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/button.tsx exists
   - [x] [auto] Badge component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/badge.tsx exists
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [x] [manual] Fonts render correctly (Barlow headings, Inter body) *(passed 02:25 11/03/26)*
   - [x] [manual] Colors match brand -- indigo primary (#312e81), terracotta secondary (#c4533a) *(passed 02:25 11/03/26)*

3. [x] Layout shell -- collapsible sidebar + topbar + role-aware nav → v0.1.2 *(completed 01:40 11/03/26)*
   Contract:
   - [x] [auto] Sidebar component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/layout/sidebar.tsx exists
   - [x] [auto] Topbar component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/layout/topbar.tsx exists
   - [x] [auto] App shell component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/layout/app-shell.tsx exists
   - [x] [auto] Route group layout uses app shell. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/layout.tsx contains AppShell
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [x] [manual] Sidebar collapses/expands with smooth animation *(passed 02:25 11/03/26)*
   - [x] [manual] Active nav item highlighted with indigo accent *(passed 02:25 11/03/26)*
   - [x] [manual] Layout is clean, Linear-inspired -- proper spacing, no clutter *(passed 02:25 11/03/26)*
   - [x] [manual] Mobile: sidebar appears as slide-out drawer *(passed 02:25 11/03/26)*

4. [x] Mock data layer -- TypeScript types + fixture data → v0.1.3 *(completed 01:45 11/03/26)*
   Contract:
   - [x] [auto] Types file covers all entities. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/types/database.ts contains BookingRestriction
   - [x] [auto] Space type enum defined. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/types/database.ts contains hot_desk
   - [x] [auto] Property fixtures exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/properties.ts exists
   - [x] [auto] Booking fixtures exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/bookings.ts exists
   - [x] [auto] Barrel export exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/index.ts exists
   - [x] [auto] Types compile cleanly. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx tsc --noEmit 2>&1 | tail -3 | grep -v "error"

5. [x] Placeholder pages wired to layout -- all routes navigable → v0.1.4 *(completed 01:47 11/03/26)*
   Contract:
   - [x] [auto] Employer dashboard page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/dashboard/page.tsx exists
   - [x] [auto] Search page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/search/page.tsx exists
   - [x] [auto] Provider dashboard page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(provider)/space-provider/page.tsx exists
   - [x] [auto] Admin dashboard page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(admin)/admin/page.tsx exists
   - [x] [auto] Placeholder component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/shared/page-placeholder.tsx exists
   - [x] [auto] Route group layouts exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(provider)/layout.tsx exists
   - [x] [auto] Full build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [x] [manual] Every sidebar link navigates to correct placeholder page *(passed 02:25 11/03/26)*
   - [x] [manual] Active nav highlighting works for each route *(passed 02:25 11/03/26)*
   - [x] [manual] Role switching shows different nav items and routes *(passed 02:25 11/03/26)*
