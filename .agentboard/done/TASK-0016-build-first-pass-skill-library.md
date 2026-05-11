---
id: TASK-0016
title: "Build first-pass skill library"
status: done
assigned_agent: builder
priority: high
depends_on: [TASK-0015]
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
skills: [react-dashboard, accessibility-review, dashboard-ux]
expected_files: [AGENTS.md, .agentboard/project-profile.md, .agentboard/templates/task.md, .agentboard/skill-registry.md, scripts/validate-agentboard.js, scripts/lib/agentboard-parser.js, scripts/lib/agentboard-api.js, src/App.tsx, src/types/agentboard.ts]
parallel_safe: false
---

# User Request

Use the orchestrator role.

Create and execute a large stress-test workflow for the dashboard branch.

Goal:
Add a first-pass Skill Library system to Your Crew and surface skill awareness in the AgentBoard dashboard.

# Objective

Implement the first-pass skill library protocol, sample skills, validator support, parser/API support, and dashboard skill visibility using the UX/UI guidance artifact from TASK-0015.

# Acceptance Criteria

- [x] `.agentboard/skills/` exists.
- [x] `.agentboard/skill-registry.md` exists.
- [x] Four sample skill files exist: `react-dashboard.md`, `accessibility-review.md`, `seo-content.md`, and `dashboard-ux.md`.
- [x] `AGENTS.md` explains agents vs skills and skill-loading rules.
- [x] `.agentboard/templates/task.md` supports `skills: []`, `expected_files: []`, and `parallel_safe: false`.
- [x] `.agentboard/project-profile.md` includes enabled skills and identifies this branch as a proving ground.
- [x] Board validator supports optional skill checks without breaking historical tasks.
- [x] Board validator validates `parallel_safe` only as metadata.
- [x] Dashboard displays task skills when present.
- [x] Dashboard displays enabled skills or skill registry information somewhere readable.
- [x] Dashboard remains read-only.
- [x] Current Active work summary and capped Done lane remain.
- [x] Light/dark mode remains.
- [x] No parallel execution is implemented.
- [x] No MCP integration is implemented.
- [x] No background automation is implemented.
- [x] Board validator passes.
- [x] Frontend build passes.

# Context

This task depends on TASK-0015 for UX/UI guidance. It implements the first-pass skill system for the dashboard branch only.

Skills are capabilities, not agents. They should guide agents when relevant and can later connect to tools or MCPs, but MCP integration is explicitly out of scope for this pass.

# Agent Instructions

- Act as `builder`.
- Load the TASK-0015 UX/UI artifact before implementing dashboard UI.
- Keep changes focused on first-pass skill awareness.
- Preserve read-only API and UI behavior.
- Do not add task mutation controls, parallel execution, MCP integration, or background automation.
- Do not modify completed historical task files except this task's normal movement.
- Run `npm run validate:board` and `npm run build`.
- Verify the dashboard loads when practical.

# Deliverables

- Skill library structure and sample skill files.
- Protocol/template/profile updates.
- Validator support for optional task skills and `parallel_safe` metadata.
- Dashboard display of task skills and skill registry information.

# Artifacts

## Created

- `.agentboard/skill-registry.md`
- `.agentboard/skills/react-dashboard.md`
- `.agentboard/skills/accessibility-review.md`
- `.agentboard/skills/seo-content.md`
- `.agentboard/skills/dashboard-ux.md`

## Used

- `.agentboard/artifacts/TASK-0015-skill-metadata-dashboard-ux-guidance.md`

# Validation

- `npm run validate:board`
- `npm run build`
- Browser check of dashboard load and skill metadata display when practical.

# Completion Notes

## Summary of Work Completed

Implemented a first-pass Skill Library system with registry and sample skill files, protocol/template/profile updates, optional validator checks for task skill metadata, parser/API support for skill metadata, and read-only dashboard visibility for skills.

## Files Changed

- `AGENTS.md`
- `.agentboard/project-profile.md`
- `.agentboard/templates/task.md`
- `.agentboard/skill-registry.md`
- `.agentboard/skills/react-dashboard.md`
- `.agentboard/skills/accessibility-review.md`
- `.agentboard/skills/seo-content.md`
- `.agentboard/skills/dashboard-ux.md`
- `scripts/validate-agentboard.js`
- `scripts/lib/agentboard-parser.js`
- `src/types/agentboard.ts`
- `src/App.tsx`
- `.agentboard/review/TASK-0016-build-first-pass-skill-library.md`

## Artifacts Created or Used

Used `.agentboard/artifacts/TASK-0015-skill-metadata-dashboard-ux-guidance.md`.

## Assumptions Made

Treated skills as advisory metadata only. `parallel_safe` is validated as boolean-like metadata but no parallel execution behavior was added.

## Validation Performed

- `npm test`
- `npm run build`
- `npm run validate:board`
- Restarted the local Vite dev server so the read-only API loaded the new parser/registry support.
- Browser-verified the dashboard loads, Skill Library shows four enabled skills, task cards show skill chips when present, detail panel shows skills and expected files, Active work and capped Done lane remain, validation passes, and light/dark mode toggles.

## Known Limitations

No MCP/tool integration, background automation, parallel execution, skill assignment UI, or task mutation behavior was added.

## Follow-up Recommendations

Complete dependent documentation task TASK-0017 to explain the Skill Library system for users.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

Validation confirmed the skill library structure, registry, sample skill files, protocol/template/profile updates, optional validator checks, parser/API support, dashboard skill visibility, read-only boundaries, and absence of parallel execution, MCP integration, and background automation. `npm test`, `npm run build`, and `npm run validate:board` pass.
