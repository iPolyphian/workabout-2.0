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

- **Active feature:** DOE HTML Renderer Enhancements [INFRA] (v0.5.x) -- all auto criteria pass, awaiting manual visual review
- **Next step:** User reviews HQ test output, then run feature retro to move to Done
- **Current app version:** v0.5.5
- **DOE Starter Kit:** v1.27.3

## Blockers & Edge Cases
<!-- No active blockers -->

## Last Session

Session 7 (12/03/26). DOE renderer enhancements: added platform/model/tag tracking + badges to wrap and EOD, fixed EOD breakdown bar overflow, built HQ with side-by-side stats, streak heatmap, feature velocity chart, moved search/filters below Features This Week. Synced to starter kit.
