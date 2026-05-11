---
id: TASK-0014
title: "Add task card details affordance"
status: done
assigned_agent: builder
priority: medium
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
---

# User Request

Use the orchestrator role.

Create a builder implementation task based on `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md`.

Goal:
Make task cards more obviously clickable without adding mutation controls.

Scope:
- Add a subtle "Details" affordance, chevron, or equivalent hint to task cards.
- Preserve the full-card click behavior.
- Preserve keyboard focus visibility.
- Do not add nested action buttons.
- Keep the dashboard read-only.
- Preserve light/dark mode.
- Run board validation and frontend validation.

Acceptance criteria:
- Task cards clearly communicate that they open details.
- Existing card click behavior still works.
- Keyboard focus remains visible.
- No task mutation controls are added.
- Light/dark mode still works.
- Board validator passes.

Assign it to builder.
Place it in `.agentboard/ready/`.
Then continue the board if safe.
Use compact summaries.

# Objective

Improve task card click affordance by adding a subtle read-only detail hint while preserving full-card detail opening, keyboard focus, and existing light/dark styling.

# Acceptance Criteria

- [x] Task cards clearly communicate that they open details.
- [x] Existing full-card click behavior still opens the task detail panel.
- [x] Keyboard focus remains visible.
- [x] No nested action buttons or task mutation controls are added.
- [x] Dashboard remains read-only.
- [x] Light/dark mode still works.
- [x] Board validator passes.
- [x] Frontend validation passes.

# Context

This task implements the P2 recommendation from `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md`:

- Strengthen task card action affordance.

The dashboard uses task cards as full-card buttons that open a read-only task detail panel. Keep that model and avoid adding controls that imply editing, moving, claiming, or mutating tasks.

# Agent Instructions

- Act as `builder`.
- Follow `.interface-design/system.md`.
- Keep the change focused on the task card presentation.
- Do not add nested buttons inside task cards.
- Do not add drag/drop, editing, status changes, filters, or any mutation controls.
- Preserve current detail-panel behavior and focus-ring styling.
- Run board validation and frontend validation before moving to review.
- Use browser verification when practical.

# Deliverables

- Task card UI update that communicates detail-opening behavior.
- Completed task file moved to review with validation notes.

# Artifacts

## Created

## Used

- `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md`

# Validation

- `npm run validate:board`
- `npm run build`
- Browser check of task card click behavior and light/dark mode when available.

# Completion Notes

## Summary of Work Completed

Added a subtle `Details ->` affordance inside task cards while preserving the existing full-card button behavior and focus-ring styling.

## Files Changed

- `src/App.tsx`
- `.agentboard/review/TASK-0014-add-task-card-details-affordance.md`

## Artifacts Created or Used

Used `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md`.

## Assumptions Made

Used a text affordance instead of an icon dependency to keep the change minimal and avoid introducing a new package or visual language.

## Validation Performed

- `npm run validate:board`
- `npm run build`
- Browser reload at `http://127.0.0.1:5173/`
- Confirmed task cards show `Details ->`.
- Confirmed full-card click opens the read-only task detail panel.
- Confirmed light/dark mode still toggles.

## Known Limitations

The Active work summary rows remain compact attention links and do not include the card-level `Details ->` hint.

## Follow-up Recommendations

Consider validation failure next-action guidance as a separate future task from the UX/UI review artifact.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

Validation confirmed task cards now communicate detail-opening behavior with a `Details ->` affordance, full-card click still opens the read-only detail panel, keyboard focus styling is preserved, no mutation controls or nested action buttons were added, light/dark mode still works, and `npm run validate:board` plus `npm run build` pass.
