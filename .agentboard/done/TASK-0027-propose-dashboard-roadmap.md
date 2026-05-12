---
id: TASK-0027
title: "Propose dashboard roadmap"
status: done
assigned_agent: ux-ui
priority: high
depends_on: [TASK-0026]
created_by: orchestrator
claimed_by: ux-ui
claimed_at: 2026-05-11
skills: [dashboard-ux]
expected_files: [.agentboard/artifacts/TASK-0027-dashboard-roadmap.md]
parallel_safe: false
---

# User Request

Upgrade dashboard-ux into a UX decision framework, then use it to propose the next dashboard roadmap.

# Objective

Use the upgraded `dashboard-ux` skill to propose the next dashboard roadmap as a reusable UX artifact.

# Acceptance Criteria

- [x] Roadmap artifact is created under `.agentboard/artifacts/` with the task ID in the filename.
- [x] Roadmap explicitly applies the `dashboard-ux` decision framework.
- [x] Roadmap identifies near-term, mid-term, and later dashboard opportunities.
- [x] Roadmap prioritizes work by user value, workflow risk, implementation cost, and dependency order.
- [x] Roadmap distinguishes read-only viewer improvements from future mutation/write features.
- [x] Roadmap includes recommended next AgentBoard tasks.
- [x] Roadmap calls out accessibility and validation implications.
- [x] Completion notes include `Skill used: dashboard-ux`.
- [x] Board validator passes.

# Context

The dashboard is a local read-only AgentBoard viewer with workflow columns, validation panel, Skill Library, Active work summary, capped Done lane, task cards, task detail drawer, dark mode, skill metadata, and workflow-hardening helpers.

# Agent Instructions

- Act as `ux-ui`.
- Read `.agentboard/skills/dashboard-ux.md`.
- Review prior UX artifacts as useful context.
- Produce `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`.
- Do not modify dashboard implementation files.
- Do not create builder implementation tasks unless the roadmap recommends them inside the artifact.
- Run board validation.
- Move this task to review when complete.

# Deliverables

- `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`

# Artifacts

## Created

- `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`

## Used

- `.agentboard/skills/dashboard-ux.md`

# Validation

- `npm run validate:board`

# Completion Notes

## Summary of Work Completed

Created a reusable dashboard roadmap artifact applying the upgraded `dashboard-ux` decision framework to prioritize the next dashboard work.

## Files Changed

- `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`
- `.agentboard/review/TASK-0027-propose-dashboard-roadmap.md`

## Artifacts Created or Used

Created `.agentboard/artifacts/TASK-0027-dashboard-roadmap.md`.

Used `.agentboard/skills/dashboard-ux.md` and prior dashboard UX artifacts.

## Skill Usage

Skill used: dashboard-ux.

Applied primary user jobs, decision order, scanability framework, information hierarchy, task-card density, validation/error-state decisions, read-only versus mutation boundary, responsive/accessibility expectations, roadmap prioritization criteria, and roadmap artifact expectations.

Not applicable: mutation-boundary implementation details, because this artifact recommends keeping near-term work read-only.

## Assumptions Made

Assumed the next roadmap should prioritize read-only trust, inspection, accessibility, and validation improvements before dashboard write controls.

## Validation Performed

- `npm run validate:board`

## Known Limitations

This task produced UX guidance only. It did not create implementation tasks or modify dashboard code.

## Follow-up Recommendations

Use the roadmap's recommended task order to create focused builder and UX/UI tasks, starting with validation failure next-action guidance and detail drawer focus management.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

The roadmap artifact applies the upgraded `dashboard-ux` framework, prioritizes near-term and later dashboard work by user value, workflow risk, cost, dependency order, and read-only fit, and clearly separates read-only improvements from deferred mutation features. Board validation passes.
