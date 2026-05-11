---
id: TASK-0005
title: "Add task detail panel"
status: done
assigned_agent: builder
priority: medium
depends_on: [TASK-0004]
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
---

# User Request

Build out the tasks needed to accomplish the project goal: a Kanban-style dashboard where TASK markdown files visibly move through the AgentBoard workflow.

# Objective

Add a task detail experience so users can inspect the full content and metadata behind a Kanban card.

# Acceptance Criteria

- [x] Selecting a task opens a detail panel, drawer, modal, or dedicated detail area.
- [x] The detail view shows frontmatter fields, objective, acceptance criteria, context, agent instructions, validation notes, and completion notes when present.
- [x] The source file path is visible or otherwise available for traceability.
- [x] Missing optional sections or empty notes are handled gracefully.
- [x] The detail view can be closed or cleared without reloading the page.
- [x] The detail view remains read-only in this task.

# Context

AgentBoard task files are the source of truth. The dashboard should help users inspect that source without opening every Markdown file manually.

# Agent Instructions

- Reuse parsed markdown sections from TASK-0002 and API data from TASK-0003.
- Keep detail UI compact and scannable.
- Avoid rendering unsafe raw HTML from Markdown.
- Do not add task editing in this task.

# Deliverables

- Task detail UI.
- Any needed data shape refinements for detail content.

# Artifacts

## Created

None expected.

## Used

- Parser from TASK-0002
- Dashboard from TASK-0004

# Validation

Run build checks and manually verify detail behavior with representative task files when practical.

# Completion Notes

## Summary of Work Completed

Added a read-only task detail drawer opened by selecting a task card. The drawer shows task identity, traceable file path, normalized metadata, raw frontmatter, and key Markdown sections including objective, acceptance criteria, context, agent instructions, validation, and completion notes. Empty sections render a stable fallback message.

## Files Changed

- `src/App.tsx`
- `src/types/agentboard.ts`

## Artifacts Created or Used

Used parsed section and frontmatter data from the parser/API work completed in TASK-0002 and TASK-0003. No AgentBoard artifacts were created.

## Assumptions Made

Used the already-loaded `/api/board` task data rather than adding another detail fetch because the API already returns section, frontmatter, and path data needed by the panel. Kept Markdown content as escaped preformatted text to avoid unsafe raw HTML rendering.

## Validation Performed

- `npm test`
- `npm run build`
- `npm run validate:board`
- Browser check selecting `TASK-0005`, confirming frontmatter, acceptance criteria, and completion notes are visible, then closing the panel without reload.

## Known Limitations

The panel is read-only and does not render Markdown formatting beyond preserving line breaks. Editing and workflow actions remain outside this task.

## Follow-up Recommendations

Proceed with TASK-0006 for validation status UI.

## Reviewer Approval

Reviewer approval: approved on 2026-05-11.

Validated the read-only detail drawer implementation, traceability path display, frontmatter and section rendering, close behavior, escaped Markdown text handling, and continued build/test/AgentBoard validation success.
