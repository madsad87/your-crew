---
id: TASK-0007
title: "Document dashboard workflow"
status: done
assigned_agent: content-creator
priority: medium
depends_on: [TASK-0006]
created_by: orchestrator
claimed_by: content-creator
claimed_at: 2026-05-11
---

# User Request

Build out the tasks needed to accomplish the project goal: a Kanban-style dashboard where TASK markdown files visibly move through the AgentBoard workflow.

# Objective

Document how to install, run, validate, and use the AgentBoard dashboard MVP.

# Acceptance Criteria

- [x] Documentation explains the project purpose in relation to Your Crew and AgentBoard.
- [x] Documentation includes setup and local development commands.
- [x] Documentation explains how the dashboard reads `.agentboard` task folders.
- [x] Documentation explains the read-only MVP limitations.
- [x] Documentation explains how to run AgentBoard validation.
- [x] Documentation identifies sensible next features after the MVP.

# Context

The project is intended to support future functionality for the `your-crew` tool. Clear documentation will make the MVP easier to extend and review.

# Agent Instructions

- Keep documentation concise and practical.
- Do not make claims about write/edit functionality unless it has been implemented.
- Link or reference relevant local files where useful.
- Store reusable planning notes as an artifact only if they are separate from project documentation.

# Deliverables

- README or equivalent project documentation updates.
- Optional artifact for future feature ideas if useful.

# Artifacts

## Created

None expected unless a separate future-feature artifact is useful.

## Used

- `.agentboard/project-profile.md`
- Implemented dashboard from prior tasks

# Validation

Check documentation commands against package scripts where practical and run AgentBoard validation.

# Completion Notes

## Summary of Work Completed

Expanded the README into practical MVP documentation covering the project purpose, setup, local development, build/test commands, AgentBoard folder reads, local API endpoints, validation behavior, read-only limitations, and sensible next features.

## Files Changed

- `README.md`

## Artifacts Created or Used

Used `.agentboard/project-profile.md`, package scripts, and the implemented dashboard/API behavior. No AgentBoard artifacts were created.

## Assumptions Made

Documented only currently implemented read-only behavior and avoided claiming task mutation, workflow actions, or production server support.

## Validation Performed

- `npm test`
- `npm run build`
- `npm run validate:board`

## Known Limitations

The README describes the MVP as a local Vite development dashboard. Production packaging remains a future feature.

## Follow-up Recommendations

Use the README's next-feature list to plan future AgentBoard tasks for safe workflow actions, task creation, filtering, search, artifact links, and production packaging.

## Reviewer Approval

Reviewer approval: approved on 2026-05-11.

Validated README coverage against all documentation acceptance criteria, including purpose, setup, development, board data flow, read-only limitations, validation, and sensible next features. Review validation performed with `npm test`, `npm run build`, and `npm run validate:board`.
