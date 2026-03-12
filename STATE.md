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

- **Active feature:** None
- **Next step:** Scope Employer Dashboard [APP] from ROADMAP; test Booking Flow + Search & Discovery manual items in Awaiting Sign-off
- **Current app version:** v0.5.5
- **DOE Starter Kit:** v1.30.1

## Blockers & Edge Cases
<!-- No active blockers -->

## Last Session

Session 8 (12/03/26). Added Awaiting Sign-off workflow to prevent unchecked manual contracts landing in Done. Updated CLAUDE.md, todo.md, audit_claims.py, wrap_html.py, stand-up, sitrep, and wrap commands. Fixed timing so features move to Awaiting Sign-off immediately when last auto passes. Removed HQ heatmap. Synced to DOE kit as v1.30.0 + v1.30.1.
