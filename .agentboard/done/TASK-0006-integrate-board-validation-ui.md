---
id: TASK-0006
title: "Integrate board validation UI"
status: done
assigned_agent: builder
priority: medium
depends_on: [TASK-0004]
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
---

# User Request

Build out the tasks needed to accomplish the project goal: a Kanban-style dashboard where TASK markdown files visibly move through the AgentBoard workflow.

# Objective

Display AgentBoard validation status and validation issues inside the dashboard.

# Acceptance Criteria

- [x] The UI can show whether AgentBoard validation is passing or failing.
- [x] Validation errors from `scripts/validate-agentboard.js` are visible in a concise, actionable format.
- [x] Validation issues include the related file path and message when available.
- [x] The dashboard can refresh validation status without requiring a full app restart.
- [x] A passing board state is clearly distinguishable from a failing board state.
- [x] Validation integration does not mutate task files.

# Context

The existing validator already checks frontmatter, sections, status/folder alignment, dependencies, and reviewer approval rules. Surfacing these results in the dashboard gives the MVP immediate operational value.

# Agent Instructions

- Reuse the validation integration from TASK-0003.
- Prefer structured validation results over scraping console output if practical.
- Keep validation UI visible but not overwhelming.
- Do not change validator rules unless required to expose structured output, and document any such change.

# Deliverables

- Validation status UI.
- Refresh or rerun validation control.
- Any necessary structured validation API refinements.

# Artifacts

## Created

None expected.

## Used

- `scripts/validate-agentboard.js`
- Local API from TASK-0003
- Dashboard from TASK-0004

# Validation

Run AgentBoard validation, app build checks, and browser verification when practical.

# Completion Notes

## Summary of Work Completed

Added a dashboard validation panel backed by `/api/validate`. The API now preserves validator stdout/stderr and also returns parsed issue rows plus checked task count for UI use. The panel shows pass/attention states, issue file paths and messages when present, and a refresh control that reruns validation without restarting the app.

## Files Changed

- `scripts/lib/agentboard-api.js`
- `tests/lib/agentboard-api.test.js`
- `src/App.tsx`
- `src/types/agentboard.ts`

## Artifacts Created or Used

Used `scripts/validate-agentboard.js`, the local API from TASK-0003, and the dashboard from TASK-0004. No AgentBoard artifacts were created.

## Assumptions Made

Kept validator rules unchanged and parsed the existing console output into structured issue rows at the API layer. Kept validation read-only; it only runs the existing validator process.

## Validation Performed

- `npm test`
- `npm run build`
- `npm run validate:board`
- Live `/api/validate` endpoint check confirming `ok`, issue count, and checked task count.
- Browser check confirming validation pass state, checked task count, and refresh control behavior.

## Known Limitations

Issue parsing depends on the validator's current `- file: message` output format. The raw stdout and stderr remain available if future parsing needs refinement.

## Follow-up Recommendations

Proceed with TASK-0007 documentation after review approval.

## Reviewer Approval

Reviewer approval: approved on 2026-05-11.

Validated the structured validation response, parsed issue support, visible pass state, refresh control, read-only behavior, live `/api/validate` endpoint, and continued build/test/AgentBoard validation success.
