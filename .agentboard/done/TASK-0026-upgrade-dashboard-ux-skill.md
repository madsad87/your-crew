---
id: TASK-0026
title: "Upgrade dashboard UX skill"
status: done
assigned_agent: content-creator
priority: high
depends_on: []
created_by: orchestrator
claimed_by: content-creator
claimed_at: 2026-05-11
skills: [dashboard-ux]
expected_files: [.agentboard/skills/dashboard-ux.md]
parallel_safe: false
---

# User Request

Upgrade dashboard-ux into a UX decision framework, then use it to propose the next dashboard roadmap.

# Objective

Expand `.agentboard/skills/dashboard-ux.md` from lightweight guidance into a practical UX decision framework for evaluating and prioritizing AgentBoard dashboard work.

# Acceptance Criteria

- [x] `dashboard-ux` becomes a concrete UX decision framework.
- [x] Framework covers user goals and dashboard jobs-to-be-done.
- [x] Framework covers scanability and information hierarchy.
- [x] Framework covers task card density and metadata decisions.
- [x] Framework covers validation visibility and error/empty states.
- [x] Framework covers read-only versus mutation boundary decisions.
- [x] Framework covers responsive behavior and accessibility expectations.
- [x] Framework includes prioritization criteria for roadmap decisions.
- [x] Framework includes common UX failure modes.
- [x] Framework includes roadmap artifact expectations.
- [x] Completion notes include `Skill used: dashboard-ux`.
- [x] Board validator passes.

# Context

The dashboard branch now has upgraded `react-dashboard` and `accessibility-review` skills. This task upgrades `dashboard-ux` so UX/UI work can make consistent decisions before builder implementation.

# Agent Instructions

- Act as `content-creator`.
- Read `.agentboard/project-profile.md`, `.agentboard/agent-registry.md`, and existing dashboard UX artifacts.
- Update only `.agentboard/skills/dashboard-ux.md` and this task file.
- Keep the skill advisory; do not add MCP integration, background automation, parallel execution, or task mutation behavior.
- Run board validation.
- Move this task to review when complete.

# Deliverables

- `.agentboard/skills/dashboard-ux.md`

# Artifacts

## Created

## Used

- `.agentboard/skills/dashboard-ux.md`

# Validation

- `npm run validate:board`

# Completion Notes

## Summary of Work Completed

Expanded `.agentboard/skills/dashboard-ux.md` into a dashboard-specific UX decision framework for scanability, hierarchy, metadata density, validation visibility, read-only boundaries, responsive/accessibility expectations, and roadmap prioritization.

## Files Changed

- `.agentboard/skills/dashboard-ux.md`
- `.agentboard/review/TASK-0026-upgrade-dashboard-ux-skill.md`

## Artifacts Created or Used

Used prior dashboard UX artifacts:

- `.agentboard/artifacts/TASK-0011-ux-ui-dashboard-review.md`
- `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md`
- `.agentboard/artifacts/TASK-0015-skill-metadata-dashboard-ux-guidance.md`

## Skill Usage

Skill used: dashboard-ux.

Applied the existing dashboard UX guidance and turned it into a reusable decision framework with user jobs, decision order, scanability checks, metadata density rules, validation/error-state guidance, read-only boundary criteria, roadmap prioritization, and artifact expectations.

Not applicable: implementation guidance for code changes, because this task only upgrades the skill file.

## Assumptions Made

Kept the skill advisory and read-only. No MCP integration, background automation, parallel execution, or task mutation behavior was added.

## Validation Performed

- `npm run validate:board`

## Known Limitations

The framework does not itself create roadmap tasks or implementation changes; it is intended to guide the next UX/UI artifact.

## Follow-up Recommendations

Use the upgraded framework immediately to propose the next dashboard roadmap.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

The upgraded `dashboard-ux` skill now provides a concrete decision framework covering user jobs, scanability, hierarchy, card density, validation and empty states, read-only versus mutation boundaries, responsive and accessibility expectations, roadmap prioritization, common failure modes, and artifact expectations. Board validation passes.
