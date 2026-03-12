# DOE HTML Renderer Enhancements [INFRA] (v0.5.x)

## Files to modify

- `execution/eod_html.py` — Fix `.breakdown-bar` overflow (line 682: add `max-width` + container `overflow: hidden`)
- `~/doe-starter-kit/global-scripts/build_hq.py` (and copy to `execution/hq_html.py` at end):
  - Lines 837-839: Wrap `.platform-stats` + `.model-stats` in a flex row (new `.stats-split` container, `display: flex; gap: 1rem`)
  - Lines 1659-1667: Move `{controls}` and `{tag_filter}` below `render_project_swimlane` output (after "Features this week")
  - Add `render_streak_heatmap()` function — GitHub-style 52-week SVG grid, intensity based on session count per day. Insert in portfolio section after allocation bar
  - Add `render_feature_velocity()` function — bar chart showing features shipped per month, parsed from stats.json milestones/recentSessions. Insert in portfolio section after heatmap

## Steps

1. **Fix EOD breakdown bar overflow** — `eod_html.py:682` add `max-width: 100%` to `.breakdown-bar`, add `overflow: hidden` to `.breakdown-item`
2. **HQ: Platform + model stats side-by-side** — Wrap both in `<div class="stats-split">` with `display: flex; gap: 1rem; > * { flex: 1 }`. Render function at line 1562-1563 just concatenates; wrap in container div
3. **HQ: Move search/filters below Features This Week** — In project view content assembly (lines 1659-1667), move `{controls}` and `{tag_filter}` to after the swimlane panels (line ~1677)
4. **HQ: Streak heatmap** — New `render_streak_heatmap(all_sessions)` function. Build 52x7 SVG grid from session dates. Color intensity: 0 sessions = `var(--surface)`, 1 = light accent, 2+ = full accent. Insert at portfolio level after allocation bar (line 1561)
5. **HQ: Feature velocity chart** — New `render_feature_velocity(all_sessions)` function. Parse version bumps from session summaries (reuse existing `extract_milestones` logic at line ~230). Render as CSS bar chart grouped by month. Insert after heatmap
6. **Sync to starter kit** — Copy final `build_hq.py` to `~/doe-starter-kit/global-scripts/build_hq.py` and `~/.claude/scripts/build_hq.py`

## Parallelisation

Steps 1-3 are independent bug fixes (different files/sections). Can run in parallel.
Steps 4-5 are independent new features in build_hq.py but touch same file — run sequentially.
Step 6 depends on all others completing.

## Verification

`python3 execution/eod_html.py --help` exits 0 (no syntax errors)
`python3 ~/doe-starter-kit/global-scripts/build_hq.py --help` exits 0
Generate test outputs with real data and visually verify
