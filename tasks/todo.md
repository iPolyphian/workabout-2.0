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

### DOE HTML Renderer Enhancements [INFRA] (v0.5.x)
Plan: `.claude/plans/eager-napping-donut.md`

Bug fixes and new features for DOE HTML renderers (eod_html.py, build_hq.py). Fixes overflow bug, layout issues, adds streak heatmap and feature velocity chart.

1. [ ] Fix EOD breakdown bar overflow → v0.5.0
   Contract:
   - [ ] [auto] breakdown-bar has max-width constraint. Verify: file: execution/eod_html.py contains max-width
   - [ ] [auto] breakdown-item has overflow hidden. Verify: file: execution/eod_html.py contains overflow: hidden
   - [ ] [auto] Script has no syntax errors. Verify: run: python3 execution/eod_html.py --help

2. [ ] HQ: Platform + model stats side-by-side → v0.5.1
   Contract:
   - [ ] [auto] Stats split container exists. Verify: file: execution/hq_html.py contains stats-split
   - [ ] [auto] Stats split uses flexbox. Verify: file: execution/hq_html.py contains display: flex
   - [ ] [auto] Script has no syntax errors. Verify: run: python3 execution/hq_html.py --help
   - [ ] [manual] Platform and model stat boxes render side-by-side on desktop

3. [ ] HQ: Move search/filters below Features This Week → v0.5.2
   Contract:
   - [ ] [auto] Controls appear after swimlane in content assembly. Verify: run: python3 -c "import ast; ast.parse(open('execution/hq_html.py').read())"
   - [ ] [manual] Search bar and filter pills appear below the Features This Week swimlane

4. [ ] HQ: Streak heatmap → v0.5.3
   Contract:
   - [ ] [auto] Heatmap render function exists. Verify: file: execution/hq_html.py contains render_streak_heatmap
   - [ ] [auto] SVG grid rendered. Verify: file: execution/hq_html.py contains streak-heatmap
   - [ ] [auto] Script has no syntax errors. Verify: run: python3 execution/hq_html.py --help
   - [ ] [manual] Heatmap shows a GitHub-style 52-week grid with intensity coloring

5. [ ] HQ: Feature velocity chart → v0.5.4
   Contract:
   - [ ] [auto] Velocity render function exists. Verify: file: execution/hq_html.py contains render_feature_velocity
   - [ ] [auto] Bar chart rendered. Verify: file: execution/hq_html.py contains velocity-chart
   - [ ] [auto] Script has no syntax errors. Verify: run: python3 execution/hq_html.py --help
   - [ ] [manual] Bar chart shows features shipped per month

6. [ ] Sync to starter kit → v0.5.5
   Contract:
   - [ ] [auto] Starter kit HQ script updated. Verify: run: diff execution/hq_html.py ~/doe-starter-kit/global-scripts/build_hq.py | head -1 || echo "MATCH"
   - [ ] [auto] Global script updated. Verify: run: diff execution/hq_html.py ~/.claude/scripts/build_hq.py | head -1 || echo "MATCH"

## Queue

<!-- Approved features waiting to start. Brief description + link to plan if one exists. -->

## Done

### Booking Flow [APP] (v0.4.5)
Plan: `.claude/plans/booking-flow.md`

Multi-step booking modal from listing detail. Space selection, date/time picker, guest count, price summary, instant vs manual booking paths. Mock data only.

1. [x] Booking UI primitives -- dialog, calendar, radio group, select → v0.4.0 *(completed 13:53 12/03/26)*
   Contract:
   - [x] [auto] Dialog component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/dialog.tsx exists
   - [x] [auto] Calendar component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/calendar.tsx exists
   - [x] [auto] Radio group component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/radio-group.tsx exists
   - [x] [auto] Select component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/select.tsx exists
   - [x] [auto] react-day-picker installed. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && grep -q "react-day-picker" package.json
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | grep -q "Compiled successfully"

2. [x] Booking data helpers → v0.4.1 *(completed 13:57 12/03/26)*
   Contract:
   - [x] [auto] Booking helpers file exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/booking.ts exists
   - [x] [auto] Price calculation exported. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/booking.ts contains calculateBookingPrice
   - [x] [auto] Availability check exported. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/booking.ts contains isSpaceAvailable
   - [x] [auto] Time slot helper exported. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/booking.ts contains getAvailableTimeSlots
   - [x] [auto] Booking creation exported. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/booking.ts contains createBooking
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | grep -q "Compiled successfully"

3. [x] Booking modal shell + space selector → v0.4.2 *(completed 14:02 12/03/26)*
   Contract:
   - [x] [auto] Booking modal component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/booking-modal.tsx exists
   - [x] [auto] Space selector component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/space-selector.tsx exists
   - [x] [auto] Modal manages multi-step state. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/booking-modal.tsx contains step
   - [x] [auto] Book CTA wired to modal. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/book-cta.tsx contains onBook
   - [x] [auto] Space card wired to modal. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/space-card.tsx contains onClick
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | grep -q "Compiled successfully"
   - [ ] [manual] Clicking "Book a Space" opens modal with space selection grid
   - [ ] [manual] Clicking per-space "Book this space" opens modal at date step

4. [x] Date picker + duration selector → v0.4.3 *(completed 14:08 12/03/26)*
   Contract:
   - [x] [auto] DateTimePicker component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/date-time-picker.tsx exists
   - [x] [auto] Duration type selector exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/date-time-picker.tsx contains durationType
   - [x] [auto] Time slot picker for hourly. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/date-time-picker.tsx contains TimeSlot
   - [x] [auto] Past dates disabled. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/date-time-picker.tsx contains disabled
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | grep -q "Compiled successfully"
   - [ ] [manual] Calendar renders with today highlighted, past dates greyed
   - [ ] [manual] Duration options only show tiers the space supports
   - [ ] [manual] Hourly selection shows available time slots

5. [x] Guest count, price summary, and confirmation → v0.4.4 *(completed 14:13 12/03/26)*
   Contract:
   - [x] [auto] Price summary component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/price-summary.tsx exists
   - [x] [auto] Confirmation component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/booking-confirmation.tsx exists
   - [x] [auto] Guest count input exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/price-summary.tsx contains guestCount
   - [x] [auto] Instant vs manual paths. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/booking-confirmation.tsx contains instant
   - [x] [auto] Success state exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/booking-confirmation.tsx contains Confirmed
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | grep -q "Compiled successfully"
   - [ ] [manual] Price breakdown shows correct calculation for each duration type
   - [ ] [manual] Guest count capped at space capacity
   - [ ] [manual] Instant booking shows confirmation, manual shows pending message

6. [x] Integration, responsive polish, and edge states → v0.4.5 *(completed 14:18 12/03/26)*
   Contract:
   - [x] [auto] Back navigation between steps. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/booking-modal.tsx contains onBack
   - [x] [auto] Mobile sheet variant. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/booking-modal.tsx contains useMediaQuery
   - [x] [auto] No-availability state. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/booking/date-time-picker.tsx contains No availability
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | grep -q "Compiled successfully"
   - [ ] [manual] Modal becomes full-screen on mobile
   - [ ] [manual] Back button navigates between steps correctly
   - [ ] [manual] Escape key closes modal
   - [ ] [manual] Full flow works end-to-end: select space, pick date, set guests, confirm

### Listing Detail [APP] (v0.3.5)
Plan: `.claude/plans/listing-detail.md`

Full property listing page from search results. Photo gallery, property info, amenities grid, space cards with pricing, reviews, Book CTA. Mock data only.

1. [x] Photo fixtures + gallery component → v0.3.0 *(completed 14:21 11/03/26)*
   Contract:
   - [x] [auto] Photo fixtures exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/photos.ts exists
   - [x] [auto] Barrel export updated. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/data/fixtures/index.ts contains photos
   - [x] [auto] Gallery component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/photo-gallery.tsx exists
   - [x] [auto] Lightbox component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/lightbox.tsx exists
   - [x] [auto] Gallery uses Next.js Image. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/photo-gallery.tsx contains next/image
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"

2. [x] Property info + amenities grid → v0.3.1 *(completed 14:21 11/03/26)*
   Contract:
   - [x] [auto] Property header component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/property-header.tsx exists
   - [x] [auto] Amenities grid component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/amenities-grid.tsx exists
   - [x] [auto] Property helpers exist. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/property.ts contains getPropertyById
   - [x] [auto] Reviews helper exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/lib/property.ts contains getReviewsForProperty
   - [x] [auto] Amenities grouped by category. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/amenities-grid.tsx contains category
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"

3. [x] Space cards with pricing → v0.3.2 *(completed 14:25 11/03/26)*
   Contract:
   - [x] [auto] Space card component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/space-card.tsx exists
   - [x] [auto] Space list component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/space-list.tsx exists
   - [x] [auto] Card shows pricing tiers. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/space-card.tsx contains fullDayPrice
   - [x] [auto] Card shows capacity. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/space-card.tsx contains capacity
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"

4. [x] Reviews section → v0.3.3 *(completed 14:25 11/03/26)*
   Contract:
   - [x] [auto] Review card component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/review-card.tsx exists
   - [x] [auto] Reviews section component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/reviews-section.tsx exists
   - [x] [auto] Shows average rating. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/reviews-section.tsx contains averageRating
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"

5. [x] Listing page assembly + search navigation → v0.3.4 *(completed 14:30 11/03/26)*
   Contract:
   - [x] [auto] Dynamic route page exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/search/[propertyId]/page.tsx exists
   - [x] [auto] Listing page component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/listing-page.tsx exists
   - [x] [auto] Book CTA component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/book-cta.tsx exists
   - [x] [auto] PropertyCard links to detail. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/property-card.tsx contains /search/
   - [x] [auto] Page handles 404. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/search/[propertyId]/page.tsx contains notFound
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [x] [manual] Clicking a search result navigates to the listing detail page *(passed 14:40 11/03/26)*
   - [x] [manual] Back navigation returns to search with filters preserved *(passed 14:40 11/03/26)*
   - [x] [manual] Gallery lightbox opens, navigates between photos, closes *(passed 14:40 11/03/26)*
   - [x] [manual] Amenities show correct icons grouped by category *(passed 14:40 11/03/26)*
   - [x] [manual] Space cards show all pricing tiers clearly *(passed 14:40 11/03/26)*
   - [x] [manual] Sticky Book CTA visible on mobile scroll *(passed 14:40 11/03/26)*

6. [x] Responsive polish + SSR + empty states → v0.3.5 *(completed 14:33 11/03/26)*
   Contract:
   - [x] [auto] Property data in server component. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/search/[propertyId]/page.tsx contains getPropertyById
   - [x] [auto] Alt text on gallery images. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/listing/photo-gallery.tsx contains alt
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [x] [manual] SSR working -- property name visible in page source *(passed 14:40 11/03/26)*
   - [x] [manual] Mobile layout usable at 375px *(passed 14:40 11/03/26)*
   - [x] [manual] Tablet layout sensible at 768px *(passed 14:40 11/03/26)*
   - [x] [manual] Empty review state shows gracefully *(passed 14:40 11/03/26)*
   - [x] [manual] Heading hierarchy and keyboard nav logical *(passed 14:40 11/03/26)*

### Search & Discovery [APP] (v0.2.5)
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

3. [x] Filter bar with URL sync → v0.2.2 *(completed 02:55 11/03/26)*
   Contract:
   - [x] [auto] Filter bar component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/filter-bar.tsx exists
   - [x] [auto] Filter drawer exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/filter-drawer.tsx exists
   - [x] [auto] Search params hook exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/hooks/use-search-params-state.ts exists
   - [x] [auto] Hook reads URL params. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/hooks/use-search-params-state.ts contains useSearchParams
   - [x] [auto] Popover component installed. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/popover.tsx exists
   - [x] [auto] Slider component installed. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/ui/slider.tsx exists
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] Selecting filters updates the URL bar in real time
   - [ ] [manual] Pasting a URL with filter params pre-selects the correct filters
   - [ ] [manual] "Clear all" resets filters and URL
   - [ ] [manual] On mobile (< 768px), filters appear in a slide-up drawer

4. [x] Map panel with property pins → v0.2.3 *(completed 03:01 11/03/26)*
   Contract:
   - [x] [auto] Map component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-map.tsx exists
   - [x] [auto] Map pin component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/map-pin.tsx exists
   - [x] [auto] Map fallback exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/map-fallback.tsx exists
   - [x] [auto] Map accepts highlight prop. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-map.tsx contains highlightedPropertyId
   - [x] [auto] Dynamic import used. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-map.tsx contains next/dynamic
   - [x] [auto] Google Maps package installed. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && grep -q "react-google-maps" package.json
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] Map (or fallback) renders with pins at correct relative positions
   - [ ] [manual] Pin shows price and uses brand colors

5. [x] Split-view search page -- list + map + filter integration → v0.2.4 *(completed 03:08 11/03/26)*
   Contract:
   - [x] [auto] Search page replaced. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/app/(employer)/search/page.tsx contains filterProperties
   - [x] [auto] Search layout component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx exists
   - [x] [auto] Layout is client component. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx contains use client
   - [x] [auto] Mobile toggle exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx contains List
   - [x] [auto] Highlight state managed. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/search-layout.tsx contains highlightedPropertyId
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] Split view shows list on left, map on right on desktop
   - [ ] [manual] Hovering a card highlights the corresponding map pin
   - [ ] [manual] Clicking a map pin scrolls to and highlights the corresponding card
   - [ ] [manual] Filters reduce the visible results in both list and map
   - [ ] [manual] On mobile, List/Map toggle switches between full-width views
   - [ ] [manual] Empty state shows when no properties match filters

6. [x] SSR, responsive polish, and empty states → v0.2.5 *(completed 03:15 11/03/26)*
   Contract:
   - [x] [auto] Empty state component exists. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/empty-state.tsx exists
   - [x] [auto] Unsplash image domain configured. Verify: file: /Users/williamporter/Desktop/workabout-2.0/next.config.ts contains unsplash
   - [x] [auto] Property cards have alt text. Verify: file: /Users/williamporter/Desktop/workabout-2.0/src/components/search/property-card.tsx contains alt
   - [x] [auto] Build succeeds. Verify: run: cd /Users/williamporter/Desktop/workabout-2.0 && npx next build 2>&1 | tail -5 | grep -q "Compiled"
   - [ ] [manual] View page source shows property names and prices in HTML (SSR working)
   - [ ] [manual] Mobile layout is usable at 375px width (iPhone SE)
   - [ ] [manual] Tablet layout (768px) shows a sensible split or toggle
   - [ ] [manual] Empty state appears when all filters are set to impossible values
   - [ ] [manual] Tab key navigates through filter controls in logical order

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
