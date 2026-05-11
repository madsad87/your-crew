---
id: TASK-0020
title: "Upgrade react dashboard skill"
status: done
assigned_agent: content-creator
priority: high
depends_on: []
created_by: orchestrator
claimed_by: content-creator
claimed_at: 2026-05-11
skills: []
expected_files: [.agentboard/skills/react-dashboard.md]
parallel_safe: false
---

# User Request

Use the orchestrator role to create and execute a large stress-test workflow that upgrades `.agentboard/skills/react-dashboard.md` from lightweight guidance into a high-signal operational playbook.

# Objective

Expand `.agentboard/skills/react-dashboard.md` into a concrete React, TypeScript, and Tailwind dashboard implementation playbook for builder and reviewer work on this dashboard branch.

# Acceptance Criteria

- [x] `react-dashboard` becomes a concrete operational playbook.
- [x] The skill covers React component structure.
- [x] The skill covers TypeScript typing expectations.
- [x] The skill covers Tailwind usage patterns.
- [x] The skill covers dashboard state and data flow expectations.
- [x] The skill covers read-only dashboard constraints.
- [x] The skill covers task metadata display patterns.
- [x] The skill covers empty, loading, and error states.
- [x] The skill covers validation panel integration.
- [x] The skill covers active work summary behavior.
- [x] The skill covers task detail drawer behavior.
- [x] The skill covers light/dark mode preservation.
- [x] The skill covers avoiding nested interactive controls.
- [x] The skill covers when to extract components.
- [x] The skill covers common failure modes.
- [x] The skill covers build and validation commands.
- [x] The skill covers completion note reporting expectations.
- [x] Board validator passes.

# Context

The `accessibility-review` skill was upgraded into a concrete checklist. This task does the same for `react-dashboard`, but with builder-focused implementation guidance.

# Agent Instructions

- Act as `content-creator`.
- Read `.agentboard/project-profile.md` and `.agentboard/agent-registry.md`.
- Expand `.agentboard/skills/react-dashboard.md`.
- Keep the skill specific to this dashboard branch.
- Do not modify dashboard implementation files.
- Do not implement MCPs, parallel execution, task mutation controls, or background automation.
- Run board validation.
- Move this task to review when complete.

# Deliverables

- `.agentboard/skills/react-dashboard.md`

# Artifacts

## Created

## Used

# Validation

- `npm run validate:board`

# Completion Notes

## Summary of Work Completed

Expanded `.agentboard/skills/react-dashboard.md` from lightweight guidance into a concrete dashboard implementation and review playbook for this branch.

## Files Changed

- `.agentboard/skills/react-dashboard.md`
- `.agentboard/review/TASK-0020-upgrade-react-dashboard-skill.md`

## Artifacts Created or Used

Used `.agentboard/project-profile.md` and `.agentboard/agent-registry.md` as workflow context.

## Assumptions Made

Kept this as documentation/playbook work only. No dashboard implementation files were changed.

## Validation Performed

- `npm run validate:board`

## Known Limitations

The playbook is guidance only. It does not add automated tooling, MCP integration, parallel execution, or task mutation behavior.

## Follow-up Recommendations

Use the skill on a real builder task and have reviewer verify whether the guidance improves implementation consistency.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

The upgraded skill is a concrete operational playbook for this dashboard branch and covers the required builder and reviewer guidance areas without adding behavior outside the skill system boundary.
