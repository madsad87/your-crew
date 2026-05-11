---
id: TASK-0009
title: "Remove source path from task cards"
status: done
assigned_agent: builder
priority: medium
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
---

# User Request

Remove the source file path element from the dashboard task display card because it is not relevant there and takes up limited card space.

# Objective

Remove the task source path text from Kanban task cards while preserving source path traceability in the task detail panel.

# Acceptance Criteria

- [x] Task cards no longer render the source file path line.
- [x] Task detail panel still shows the source file path for traceability.
- [x] Card spacing remains compact and readable after removing the path.
- [x] Existing card selection and detail panel behavior remains unchanged.
- [x] App build, tests, and AgentBoard validation pass.

# Context

The annotated element is the `task.relativePath` line at the bottom of each task card. The detail panel already shows `task.relativePath`, which is a better place for traceability.

# Agent Instructions

- Make a focused UI change only.
- Do not remove `relativePath` from the data model because it is still used for keys and detail panel traceability.
- Preserve existing read-only dashboard behavior.

# Deliverables

- Updated task card UI without the source path line.
- Validation results.

# Artifacts

## Created

None expected.

## Used

- Browser annotation for the task card source path element.
- `src/App.tsx`

# Validation

Run `npm test`, `npm run build`, `npm run validate:board`, and browser verification that the path no longer appears on cards.

# Completion Notes

## Summary of Work Completed

Removed the `task.relativePath` display line from Kanban task cards to reduce card height and visual noise. Kept `relativePath` in the data model for React keys and retained source path display in the task detail drawer.

## Files Changed

- `src/App.tsx`
- `.agentboard/review/TASK-0009-remove-card-source-path.md`

## Artifacts Created or Used

Used the browser annotation identifying the card-level source path as the element to remove. No AgentBoard artifacts were created.

## Assumptions Made

Assumed path traceability should remain available in the detail drawer because the user objected specifically to the board display card element.

## Validation Performed

- `npm test`
- `npm run build`
- `npm run validate:board`
- Browser verification that the source path is no longer visible on cards.
- Browser verification that the source path remains visible in the task detail drawer.

## Known Limitations

None.

## Follow-up Recommendations

None.

## Reviewer Approval

Reviewer approval: approved on 2026-05-11.

Validated that `task.relativePath` is no longer rendered in task cards, remains available as the React key and in the detail drawer, and that `npm test`, `npm run build`, and `npm run validate:board` pass.
