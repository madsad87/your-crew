---
id: TASK-0029
title: "Add validation next action guidance"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-12
skills: [react-dashboard, accessibility-review, dashboard-ux]
expected_files: [src/App.tsx]
parallel_safe: false
---

# User Request

Build actual dashboard features in this order: validation failure next-action guidance, detail drawer focus management, artifact visibility in task details, and compact board focus controls.

# Objective

Improve validation failure UX by adding concise next-action guidance while preserving raw validator issue details.

# Acceptance Criteria

- [x] Validation failure state includes a short next-action guidance line.
- [x] Raw validator file and message details remain visible.
- [x] Issue rows can open the matching task detail when a validator file maps to a task.
- [x] Passing validation state remains compact.
- [x] Dashboard remains read-only.
- [x] No nested interactive controls are introduced.
- [x] Completion notes include `Skill used: react-dashboard`.
- [x] Completion notes include `Skill used: accessibility-review`.
- [x] Completion notes include `Skill used: dashboard-ux`.
- [x] `npm run validate:board` passes.
- [x] `npm run build` passes.

# Context

This is the first implementation task from `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`.

# Agent Instructions

- Act as `builder`.
- Read the listed skills.
- Keep the change focused to validation panel behavior.
- Preserve full board visibility and read-only behavior.
- Run board validation and frontend build.
- Move the task to review when complete.

# Deliverables

- Validation panel next-action guidance.

# Artifacts

## Created

## Used

- `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`

# Validation

- `npm run validate:board`
- `npm run build`

# Completion Notes

## Summary of Work Completed

Added validation failure next-action guidance and an `Open task` action for validator issues that map directly to parsed AgentBoard task files. Passing validation remains compact.

## Files Changed

- `src/App.tsx`
- `.agentboard/review/TASK-0029-add-validation-next-action-guidance.md`

## Artifacts Created or Used

Used `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`.

## Skill Usage

Skill used: react-dashboard.

Applied validation panel integration, typed task data flow, read-only constraints, and build/validation checklist guidance.

Skill used: accessibility-review.

Applied semantic button guidance, visible focus styling for the issue action, and avoided nested interactive controls.

Skill used: dashboard-ux.

Applied validation/error-state decision guidance by adding next-action copy while preserving raw issue details.

## Assumptions Made

Kept issue actions read-only and limited to opening the detail drawer for matching task files.

## Validation Performed

- `npm run validate:board`
- `npm run build`

## Known Limitations

No failing validation fixture was introduced in the live board; behavior was validated by source inspection and successful build.

## Follow-up Recommendations

Continue with detail drawer focus management.

## Reviewer Approval

Approved by reviewer on 2026-05-12.

Validation failure guidance is compact and preserves raw issue details. Matching task issues can open the read-only detail drawer through a semantic button with focus styling. No dashboard mutation controls or nested interactive controls were introduced. `npm run validate:board` and `npm run build` pass.
