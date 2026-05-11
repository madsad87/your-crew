---
id: TASK-0010
title: "Add UX/UI specialist agent"
status: done
assigned_agent: builder
priority: medium
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
---

# User Request

Add a UX/UI specialist agent to this dashboard branch as an optional specialist for frontend-focused work.

# Objective

Create an optional `ux-ui` AgentBoard role for frontend interface guidance and register it as active for this dashboard branch.

# Acceptance Criteria

- [x] `.agentboard/agents/ux-ui.md` exists.
- [x] `.agentboard/agent-registry.md` lists `ux-ui` as active.
- [x] `.agentboard/project-profile.md` explains when UX/UI should be used.
- [x] UX/UI role clearly distinguishes design guidance from builder implementation.
- [x] Board validator passes.

# Context

The dashboard branch is a frontend-focused branch for a Kanban-style AgentBoard UI. The UX/UI specialist should evaluate usability, visual hierarchy, interaction design, responsive behavior, and accessibility expectations before builder implementation. This is branch-specific and must not change the base locked crew on main.

# Agent Instructions

- Create `.agentboard/agents/ux-ui.md`.
- Update `.agentboard/agent-registry.md` to list `ux-ui` as active.
- Update `.agentboard/project-profile.md` to explain UX/UI usage for frontend interface work on this dashboard branch.
- Do not modify homepage or dashboard implementation files.
- Do not modify completed historical task files except normal task movement for this task.
- Keep the UX/UI role advisory; it should produce guidance, acceptance considerations, and review notes, not implement builder code.

# Deliverables

- UX/UI role file.
- Registry update.
- Project profile update.

# Artifacts

## Created

None expected.

## Used

- `.agentboard/agent-registry.md`
- `.agentboard/project-profile.md`
- Existing role files under `.agentboard/agents/`

# Validation

Run the AgentBoard validator after changes.

# Completion Notes

## Summary of Work Completed

Added the optional `ux-ui` specialist role for this dashboard branch, registered it as active, and updated the project profile with branch-specific usage guidance for frontend interface work.

## Files Changed

- `.agentboard/agents/ux-ui.md`
- `.agentboard/agent-registry.md`
- `.agentboard/project-profile.md`
- `.agentboard/review/TASK-0010-add-ux-ui-specialist-agent.md`

## Artifacts Created or Used

Used the existing AgentBoard role files for structure. No artifacts were created.

## Assumptions Made

Treated `ux-ui` as an advisory specialist that produces guidance, acceptance considerations, and review notes before builder implementation. Did not modify homepage or dashboard implementation files and did not alter the base locked crew on `main`.

## Validation Performed

- `npm run validate:board`

## Known Limitations

This only adds the role definition and branch-specific metadata; it does not change automatic routing logic or create new workflow automation.

## Follow-up Recommendations

Use `ux-ui` for future dashboard tasks where usability, visual hierarchy, responsive behavior, interaction design, or accessibility expectations need to be defined before builder implementation.

## Reviewer Approval

Reviewer approval: approved on 2026-05-11.

Validated that `.agentboard/agents/ux-ui.md` exists, the registry lists `ux-ui` as active, the project profile explains branch-specific UX/UI usage, the role clearly distinguishes advisory design guidance from builder implementation, and `npm run validate:board` passes.
