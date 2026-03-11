# Project State

Session memory that persists across `/clear`. Claude updates this file during sessions; the user rarely edits it directly.

<!--
Claude: update this file when any of the following happen:
- A blocker or edge case is discovered
- An approach changes (decisions themselves go in learnings.md ## Decisions)
- A session ends or the user runs /clear
- An assumption is corrected

Keep each section short. Replace stale info, don't accumulate. This file should reflect CURRENT state, not history.
Keep each section short. Replace stale info, don't accumulate. Max ~30 lines of content.
-->

## Current Position

- **Active feature:** Listing Detail [APP] v0.3.x
- **Next step:** Step 1 — Photo fixtures + gallery component
- **Current app version:** v0.2.5
- **DOE Starter Kit:** v1.27.3

## Blockers & Edge Cases
<!-- No active blockers -->

## Last Session

Session 3 (11/03/26). Scoped and built all 6 steps of Feature 2 (Search & Discovery): search data layer with amenity fixtures and filter helpers, PropertyCard component, filter bar with URL sync + mobile drawer, map panel with CSS fallback, split-view search page integration, SSR polish and empty states. Fixed server/client boundary error (parseSearchFilters in "use client" file called from server component). All 35 auto contracts passed. Manual testing pending.
