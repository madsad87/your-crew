---
id: TASK-0031
title: "Surface task artifacts"
status: done
assigned_agent: builder
priority: medium
depends_on: [TASK-0030]
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-12
skills: [react-dashboard, dashboard-ux]
expected_files: [scripts/lib/agentboard-parser.js, src/types/agentboard.ts, src/App.tsx, tests/lib/agentboard-parser.test.js]
parallel_safe: false
---

# User Request

Build actual dashboard features in the chosen order.

# Objective

Surface related `.agentboard/artifacts/` files in the task detail drawer when artifact filenames include the task ID.

# Acceptance Criteria

- [x] Parser associates artifact paths with tasks by task ID.
- [x] Task type includes related artifact paths.
- [x] Detail drawer shows related artifacts when present.
- [x] Artifact paths wrap safely.
- [x] Dashboard remains read-only.
- [x] Parser tests cover artifact association.
- [x] Completion notes include `Skill used: react-dashboard`.
- [x] Completion notes include `Skill used: dashboard-ux`.
- [x] `npm test` passes.
- [x] `npm run validate:board` passes.
- [x] `npm run build` passes.

# Context

This is the third implementation task from `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`.

# Agent Instructions

- Act as `builder`.
- Read the listed skills.
- Preserve existing task detail metadata.
- Do not add artifact editing or mutation controls.
- Run tests, board validation, and frontend build.
- Move the task to review when complete.

# Deliverables

- Artifact visibility in the task detail drawer.

# Artifacts

## Created

## Used

- `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`

# Validation

- `npm test`
- `npm run validate:board`
- `npm run build`

# Completion Notes

## Summary of Work Completed

Added read-only artifact association by task ID. The parser now maps `.agentboard/artifacts/TASK-*.md` files to matching tasks, the shared task type includes artifact paths, parser tests cover the behavior, and the task detail drawer shows related artifacts with wrapping metadata chips.

## Files Changed

- `scripts/lib/agentboard-parser.js`
- `src/types/agentboard.ts`
- `src/App.tsx`
- `tests/lib/agentboard-parser.test.js`
- `.agentboard/review/TASK-0031-surface-task-artifacts.md`

## Artifacts Created or Used

Used `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`.

## Skill Usage

Skill used: react-dashboard.

Applied typed metadata flow, parser/type/UI alignment, task detail drawer metadata guidance, wrapping behavior, read-only constraints, and validation checklist.

Skill used: dashboard-ux.

Applied the roadmap recommendation to make related artifacts visible from task details without turning them into mutation controls.

## Assumptions Made

Associated artifacts by filename prefix matching the task ID, which matches the existing AgentBoard artifact naming convention.

## Validation Performed

- `npm test`
- `npm run validate:board`
- `npm run build`

## Known Limitations

Artifact paths are displayed as read-only metadata, not clickable file links. This preserves current read-only browser behavior.

## Follow-up Recommendations

Continue with compact board focus controls.

## Reviewer Approval

Approved by reviewer on 2026-05-12.

Parser, type, UI, and test changes are aligned. Related artifact paths are associated by task ID and displayed as wrapped read-only metadata in the detail drawer. No mutation controls were added. `npm test`, `npm run validate:board`, and `npm run build` pass.
