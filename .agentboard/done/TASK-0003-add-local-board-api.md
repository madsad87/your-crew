---
id: TASK-0003
title: "Add local board API"
status: done
assigned_agent: builder
priority: high
depends_on: [TASK-0002]
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
---

# User Request

Build out the tasks needed to accomplish the project goal: a Kanban-style dashboard where TASK markdown files visibly move through the AgentBoard workflow.

# Objective

Expose the parsed AgentBoard data through a small local API that the React dashboard can consume.

# Acceptance Criteria

- [x] A local API route or development server endpoint returns the full board grouped by status.
- [x] A local API route or endpoint returns a single task by ID or a clear not-found response.
- [x] A validation route or command integration can run the existing AgentBoard validator and report pass/fail output.
- [x] API responses use stable JSON shapes documented in code or concise project documentation.
- [x] Errors such as missing `.agentboard` folders or malformed tasks return useful messages without crashing the dev server.
- [x] Existing read-only behavior is preserved; this task does not move or edit task files.

# Context

The frontend cannot safely read local filesystem paths directly in the browser. A local Node/API layer is needed to bridge the app to `.agentboard` files.

# Agent Instructions

- Choose the smallest API approach that fits the scaffold from TASK-0001.
- Keep this task read-only except for invoking validation.
- Reuse the parser from TASK-0002.
- Avoid introducing a database or persistent hidden state.

# Deliverables

- Local board API endpoints or equivalent local server integration.
- Stable response types.
- Validation integration for `scripts/validate-agentboard.js`.

# Artifacts

## Created

None expected.

## Used

- Parser from TASK-0002
- `scripts/validate-agentboard.js`

# Validation

Run API-level checks where practical, the app build if available, and AgentBoard validation.

# Completion Notes

## Summary of Work Completed

Added a read-only local AgentBoard API as Vite development server middleware. The API exposes full board data, individual task lookup, and validator execution. Shared API helper functions were added for test coverage without requiring a running server.

## Files Changed

- `README.md`
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `scripts/lib/agentboard-api.js`
- `tests/run-all.js`
- `tests/lib/agentboard-api.test.js`

## Artifacts Created or Used

Used the parser from `scripts/lib/agentboard-parser.js` and the existing validator at `scripts/validate-agentboard.js`. No AgentBoard artifacts were created.

## Assumptions Made

Implemented the API as Vite dev-server middleware because the current app is a Vite scaffold and does not yet need a separate production server. Kept all API behavior read-only except for running the validator command.

## Validation Performed

- `npm test`
- `npm run build`
- `npm run validate:board`
- Live endpoint checks against `http://127.0.0.1:5173/api/board`, `/api/tasks/TASK-0001`, `/api/tasks/TASK-9999`, and `/api/validate`.

## Known Limitations

The API is available through the Vite development server. A standalone production server is not yet implemented.

## Follow-up Recommendations

Proceed with `TASK-0004` after review approval so the dashboard can consume `/api/board` and render real task cards.

## Reviewer Approval

Reviewer approval: approved on 2026-05-11.

Validated the read-only API helpers, Vite middleware wiring, endpoint response documentation, and live validation endpoint. Review validation performed with `npm test`, `npm run build`, `npm run validate:board`, and a live `/api/validate` endpoint check.
