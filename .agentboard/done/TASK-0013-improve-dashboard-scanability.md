---
id: TASK-0013
title: "Improve dashboard scanability"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
---

# User Request

Use the orchestrator role.

Create a builder implementation task based on the UX/UI review artifact `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md`.

Goal:
Improve dashboard scanability by making actionable work easier to reach and reducing completed history dominance.

Scope:
- Add an "Active work" or "Needs attention" summary area above the full board showing ready, in-progress, review, and blocked tasks when present.
- Keep the canonical AgentBoard columns visible.
- Cap or collapse the Done lane preview so completed history does not dominate the board.
- Preserve the Done count.
- Keep the dashboard read-only.
- Preserve existing light/dark behavior.
- Do not add task mutation controls.
- Do not implement filters yet.
- Run the board validator when complete.

Acceptance criteria:
- Active/attention-worthy tasks are easier to find near the top of the dashboard.
- Done history no longer visually dominates when many completed tasks exist.
- The full board remains visible and understandable.
- Empty states and validation panel still render correctly.
- Light and dark modes still work.
- Board validator passes.

Assign it to builder.
Place it in `.agentboard/ready/`.
Then continue the board if safe.
Use compact summaries.

# Objective

Improve the read-only AgentBoard dashboard scan path by surfacing actionable work above the full board and limiting completed-history dominance in the Done lane.

# Acceptance Criteria

- [x] Active/attention-worthy tasks are easier to find near the top of the dashboard.
- [x] Ready, in-progress, review, and blocked tasks appear in an Active work or Needs attention summary when present.
- [x] Canonical AgentBoard workflow columns remain visible and understandable.
- [x] Done lane preserves its count while limiting the visible completed history preview.
- [x] Dashboard remains read-only with no task mutation controls.
- [x] Existing light and dark mode behavior is preserved.
- [x] Empty states and validation panel still render correctly.
- [x] No board filters are implemented.
- [x] Board validator passes.

# Context

This implementation follows the P1 recommendations from `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md`:

- Make actionable work easier to reach.
- Reduce completed history dominance.

The dashboard is a compact operations console for local AgentBoard Markdown task files. Preserve the existing semantic workflow colors, status rails, validation panel, task detail drawer, and read-only behavior.

# Agent Instructions

- Act as `builder`.
- Follow `.interface-design/system.md` for interface consistency.
- Implement the smallest focused UI change that satisfies the acceptance criteria.
- Do not add task mutation controls, drag/drop, status changes, filters, or editing behavior.
- Preserve existing dashboard data flow and board API behavior.
- Run the board validator when complete.
- Use browser or visual verification when practical because this is a frontend UI task.

# Deliverables

- Dashboard UI update for actionable-work summary.
- Done lane preview cap or collapse behavior.
- Completed task file moved to review with validation notes.

# Artifacts

## Created

## Used

- `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md`

# Validation

- `npm run validate:board`
- Frontend build or relevant project validation when available.
- Browser inspection of the dashboard at `http://127.0.0.1:5173/` when available.

# Completion Notes

## Summary of Work Completed

Added a read-only Active work summary above the board for ready, in-progress, review, and blocked tasks. Capped the Done lane preview to four visible tasks while preserving the Done count and adding a compact hidden-history summary.

## Files Changed

- `src/App.tsx`
- `.agentboard/review/TASK-0013-improve-dashboard-scanability.md`

## Artifacts Created or Used

Used `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md`.

## Assumptions Made

Used a capped Done preview rather than a Show all control to keep the dashboard read-only and avoid adding another interaction surface beyond task detail opening.

## Validation Performed

- `npm run build`
- `npm run validate:board`
- Browser reload at `http://127.0.0.1:5173/`
- Confirmed Active work appears above the canonical board when TASK-0013 is in progress.
- Confirmed Done count remains visible while only four Done cards render with a hidden-count summary.
- Confirmed empty states, validation panel, and light/dark mode toggle still render.

## Known Limitations

Done history is preview-capped, so older completed tasks are summarized rather than all shown in the lane.

## Follow-up Recommendations

Consider a future task for task card detail affordance or validation failure guidance from the UX/UI review artifact.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

Validation confirmed the Active work summary appears above the canonical board, Done history is preview-capped while the Done count remains visible, the dashboard remains read-only, empty states and validation panel still render, light/dark mode still toggles, and `npm run build` plus `npm run validate:board` pass.
