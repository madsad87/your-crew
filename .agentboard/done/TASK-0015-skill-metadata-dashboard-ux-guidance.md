---
id: TASK-0015
title: "Skill metadata dashboard UX guidance"
status: done
assigned_agent: ux-ui
priority: high
depends_on: []
created_by: orchestrator
claimed_by: ux-ui
claimed_at: 2026-05-11
skills: [dashboard-ux]
expected_files: [.agentboard/artifacts/TASK-0015-skill-metadata-dashboard-ux-guidance.md]
parallel_safe: false
---

# User Request

Use the orchestrator role.

Create and execute a large stress-test workflow for the dashboard branch.

Goal:
Add a first-pass Skill Library system to Your Crew and surface skill awareness in the AgentBoard dashboard.

UX/UI involvement:
- Create a UX/UI guidance task first for how skill metadata should appear in the dashboard.
- The UX/UI agent should create an artifact with UI guidance.
- Builder should implement from that artifact.

# Objective

Produce reusable UX/UI guidance for displaying skill metadata in the read-only AgentBoard dashboard before builder implementation.

# Acceptance Criteria

- [x] Guidance explains how task skills should appear on task cards.
- [x] Guidance explains how task skills should appear in the task detail panel.
- [x] Guidance explains how enabled or registered skills should appear in a dashboard section or legend.
- [x] Guidance preserves current Active work summary, capped Done lane, validation panel, and light/dark behavior.
- [x] Guidance clearly distinguishes skill awareness from task mutation controls.
- [x] A reusable artifact is created under `.agentboard/artifacts/` with the task ID in the filename.

# Context

Agents are stable roles. Skills are reusable capabilities that agents can load when a task needs domain-specific guidance. Skills should enhance agents, not replace them.

The dashboard is read-only and should surface skill awareness without adding editing, routing, mutation, parallel execution, MCP integration, or background automation.

# Agent Instructions

- Act as `ux-ui`.
- Review `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md` and `.interface-design/system.md`.
- Create compact, implementation-ready guidance for builder.
- Keep the output focused on skill metadata display.
- Do not implement code changes.

# Deliverables

- `.agentboard/artifacts/TASK-0015-skill-metadata-dashboard-ux-guidance.md`

# Artifacts

## Created

- `.agentboard/artifacts/TASK-0015-skill-metadata-dashboard-ux-guidance.md`

## Used

- `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md`

# Validation

- Static review of requested UX scope.

# Completion Notes

## Summary of Work Completed

Created UX/UI guidance for surfacing first-pass skill metadata on task cards, in the task detail panel, and in a compact Skill Library dashboard section.

## Files Changed

- `.agentboard/artifacts/TASK-0015-skill-metadata-dashboard-ux-guidance.md`
- `.agentboard/review/TASK-0015-skill-metadata-dashboard-ux-guidance.md`

## Artifacts Created or Used

Created `.agentboard/artifacts/TASK-0015-skill-metadata-dashboard-ux-guidance.md`.

Used `.agentboard/artifacts/TASK-0012-current-dashboard-ux-ui-review.md` and `.interface-design/system.md`.

## Assumptions Made

Assumed skill chips should be non-interactive metadata in this pass and should not imply skill assignment or task mutation.

## Validation Performed

Static review against the requested UX scope, existing dashboard design system, and first-pass skill-library boundaries.

## Known Limitations

Guidance only; builder implementation remains in dependent TASK-0016.

## Follow-up Recommendations

Builder should keep skill metadata compact and preserve the existing Active work summary, Done preview cap, validation panel, and light/dark behavior.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

Validation confirmed the UX guidance artifact exists, covers task cards, task details, and the Skill Library dashboard section, and preserves read-only behavior without adding mutation controls, parallel execution, MCP integration, or background automation.
