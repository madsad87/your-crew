---
id: TASK-0025
title: "Harden AgentBoard workflow tooling"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
skills: [react-dashboard, accessibility-review]
expected_files: [scripts/validate-agentboard.js, scripts/agentboard-task-move.js, scripts/agentboard-task-preflight.js, scripts/smoke-agentboard-metadata.js, scripts/check-dashboard-runtime.js, AGENTS.md, README.md, package.json]
parallel_safe: false
---

# User Request

Can you add these improvements that you recommend so that we can tighten these up?

# Objective

Tighten the AgentBoard workflow by adding concrete tooling and protocol guidance for skill reporting enforcement, atomic task movement, preflight checks, focused metadata smoke checks, and dashboard runtime validation fallback.

# Acceptance Criteria

- [x] Validator enforces skill usage reporting for future review/done tasks with `skills`.
- [x] Historical skill tasks before the reporting rule remain valid.
- [x] A task move helper updates file location and frontmatter status together.
- [x] Preflight guidance or tooling helps detect already-satisfied work before implementation.
- [x] A focused metadata smoke check avoids dumping the full board API.
- [x] A dashboard runtime validation fallback checks the local app/API without Playwright.
- [x] Protocol or docs explain when to use the new helpers.
- [x] Package scripts expose the new helper commands.
- [x] `npm test` passes.
- [x] `npm run validate:board` passes.
- [x] `npm run build` passes.
- [x] Completion notes explicitly include `Skill used: react-dashboard`.
- [x] Completion notes explicitly include `Skill used: accessibility-review`.

# Context

Recent workflow tests exposed these gaps:

- skill reporting was required by protocol but not validated
- task moves could briefly mismatch folder and frontmatter status
- duplicate work could be created when acceptance criteria were already satisfied
- API/debug checks dumped huge payloads
- browser validation was fragile when Playwright was unavailable

# Agent Instructions

- Act as `builder`.
- Read `.agentboard/skills/react-dashboard.md`.
- Read `.agentboard/skills/accessibility-review.md`.
- Keep changes focused on workflow tooling and documentation.
- Do not add MCP integration.
- Do not add background automation.
- Do not add parallel execution behavior.
- Run tests, board validation, and frontend build.
- Move the task to review when complete.

# Deliverables

- Workflow-hardening scripts, validator updates, package scripts, and docs/protocol updates.

# Artifacts

## Created

## Used

- `.agentboard/skills/react-dashboard.md`
- `.agentboard/skills/accessibility-review.md`

# Validation

- `npm test`
- `npm run validate:board`
- `npm run build`

# Completion Notes

## Summary of Work Completed

Added workflow-hardening tooling for AgentBoard: validator enforcement for future skill-reporting tasks, a task move helper, a task preflight helper, a focused metadata smoke check, and a dashboard runtime fallback check. Documented the helpers in `AGENTS.md` and `README.md` and exposed them as npm scripts.

## Files Changed

- `AGENTS.md`
- `README.md`
- `package.json`
- `scripts/validate-agentboard.js`
- `scripts/agentboard-task-move.js`
- `scripts/agentboard-task-preflight.js`
- `scripts/smoke-agentboard-metadata.js`
- `scripts/check-dashboard-runtime.js`
- `tests/run-all.js`
- `tests/lib/agentboard-workflow-tools.test.js`
- `.agentboard/review/TASK-0025-harden-agentboard-workflow-tooling.md`

## Artifacts Created or Used

Used `.agentboard/skills/react-dashboard.md` and `.agentboard/skills/accessibility-review.md`.

## Skill Usage

Skill used: react-dashboard.

Applied the playbook's TypeScript/runtime tooling expectations, read-only dashboard boundaries, validation command guidance, metadata-smoke-check goal, and completion note reporting expectations.

Not applicable: React component and Tailwind UI guidance, because this task changed workflow scripts and documentation rather than dashboard UI components.

Skill used: accessibility-review.

Applied the skill's validation and reporting expectations by documenting browser-tooling fallback behavior and avoiding new UI interaction changes.

Not applicable: keyboard navigation, focus state, contrast, and responsive layout checks, because no frontend interaction or styling was changed.

## Assumptions Made

Skill-report enforcement is applied to `TASK-0022` and newer review/done tasks so historical skill tasks created before the reporting rule remain valid.

## Validation Performed

- `npm test`
- `npm run validate:board`
- `npm run build`
- `npm run board:preflight -- TASK-0025`
- `npm run smoke:metadata -- TASK-0025`
- `npm run smoke:dashboard`

## Known Limitations

The task move helper is a local CLI safety helper, not a dashboard write feature. The dashboard runtime smoke check verifies app/API availability but does not replace full browser visual or keyboard automation.

## Follow-up Recommendations

Use `npm run board:move` for future task status transitions and add a true browser automation dependency later if visual/focus regression checks become required.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

Reviewed the workflow-hardening changes against `react-dashboard` and `accessibility-review`. The validator now enforces future skill reporting while preserving historical tasks, helper scripts cover task movement, preflight, focused metadata smoke checks, and dashboard runtime fallback validation, and documentation plus npm scripts explain how to use them. Validation passed with `npm test`, `npm run validate:board`, `npm run build`, `npm run board:preflight -- TASK-0025`, `npm run smoke:metadata -- TASK-0025`, and `npm run smoke:dashboard`.
