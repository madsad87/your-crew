---
id: TASK-0002
title: "Build AgentBoard task parser"
status: done
assigned_agent: builder
priority: high
depends_on: [TASK-0001]
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
---

# User Request

Build out the tasks needed to accomplish the project goal: a Kanban-style dashboard where TASK markdown files visibly move through the AgentBoard workflow.

# Objective

Create a reusable data layer that reads AgentBoard task markdown files from the status folders and normalizes them into typed task objects for the dashboard.

# Acceptance Criteria

- [x] Task files are discovered from `.agentboard/inbox`, `.agentboard/ready`, `.agentboard/in-progress`, `.agentboard/review`, `.agentboard/done`, and `.agentboard/blocked`.
- [x] YAML frontmatter is parsed into a typed task model.
- [x] Markdown sections needed by the UI can be accessed without corrupting source content.
- [x] Folder status and frontmatter status are both represented so mismatches can be surfaced later.
- [x] Dependency, priority, assigned agent, and file path data are included in parsed task objects.
- [x] Parser behavior is covered by focused tests or a documented validation script.

# Context

The existing validator contains lightweight frontmatter parsing logic in `scripts/validate-agentboard.js`. The dashboard parser may reuse compatible ideas, but it should be structured for application use rather than console validation only.

# Agent Instructions

- Keep parser behavior deterministic and local-first.
- Prefer a maintained YAML/frontmatter parser if dependencies are already acceptable after TASK-0001; otherwise document the tradeoff.
- Do not add write/move task behavior in this task.
- Preserve compatibility with the required task file shape in `.agentboard/templates/task.md`.

# Deliverables

- AgentBoard task parser module.
- Type definitions for parsed board/task data.
- Focused parser validation or tests.

# Artifacts

## Created

None expected.

## Used

- `.agentboard/templates/task.md`
- `scripts/validate-agentboard.js`

# Validation

Run parser tests or validation, the app build if available, and AgentBoard validation.

# Completion Notes

## Summary of Work Completed

Created a reusable read-only AgentBoard parser module that discovers task markdown files across all workflow folders, parses YAML frontmatter with `gray-matter`, exposes normalized task objects, groups tasks by status folder, preserves raw Markdown body content, and extracts top-level Markdown sections for UI use.

## Files Changed

- `package.json`
- `package-lock.json`
- `scripts/lib/agentboard-parser.js`
- `tests/run-all.js`
- `tests/lib/agentboard-parser.test.js`

## Artifacts Created or Used

Used `.agentboard/templates/task.md` and `scripts/validate-agentboard.js` as compatibility references. No AgentBoard artifacts were created.

## Assumptions Made

Used a CommonJS parser module so it remains compatible with the existing CommonJS validator and can be reused by a future Node-side API. Used JSDoc typedefs for the parsed task model because the parser is runtime Node code and the current repo does not yet have a server TypeScript build path.

## Validation Performed

- `npm test`
- `npm run build`
- `npm run validate:board`
- `node -e "const { readBoard } = require('./scripts/lib/agentboard-parser'); ..."` smoke check against the live board.

## Known Limitations

The parser is read-only and does not validate every AgentBoard rule; validation remains the responsibility of `scripts/validate-agentboard.js`. Task write/move behavior is intentionally deferred to future workflow action tasks.

## Follow-up Recommendations

Proceed with `TASK-0003` after review approval so the local API can expose parsed board data to the React dashboard.

## Reviewer Approval

Reviewer approval: approved on 2026-05-11.

Validated the parser module, fixture-based parser tests, live board smoke check notes, and continued compatibility with the app build and AgentBoard validator. Review validation performed with `npm test`, `npm run build`, and `npm run validate:board`.
