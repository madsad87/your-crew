---
id: TASK-0004
title: "Design Kanban dashboard view"
status: done
assigned_agent: builder
priority: high
depends_on: [TASK-0003]
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
---

# User Request

Build out the tasks needed to accomplish the project goal: a Kanban-style dashboard where TASK markdown files visibly move through the AgentBoard workflow.

# Objective

Build the main read-only Kanban dashboard view that visualizes AgentBoard tasks across workflow columns.

# Acceptance Criteria

- [x] The dashboard renders columns for inbox, ready, in-progress, review, done, and blocked.
- [x] Tasks from the local board API appear in the correct column.
- [x] Task cards show at least ID, title, priority, assigned agent, and dependency count or dependency state.
- [x] Empty columns have useful empty states without looking broken.
- [x] The layout is responsive and usable on desktop and narrow screens.
- [x] Visual treatment makes blocked, review, and in-progress states easy to distinguish.
- [x] The dashboard remains read-only in this task.

# Context

The core product goal is to make Markdown task files visibly move through the Kanban workflow. The first dashboard should prioritize clarity and scanability over editing features.

# Agent Instructions

- Build an actual tool screen, not a marketing landing page.
- Use restrained, work-focused UI patterns suitable for a dashboard.
- Keep cards compact and readable.
- If a design system file exists by the time this task starts, follow it.
- Do not implement drag-and-drop or file mutations in this task.

# Deliverables

- Main board view.
- Task card component or equivalent reusable UI.
- Responsive styling for the board layout.

# Artifacts

## Created

None expected.

## Used

- Local API from TASK-0003

# Validation

Run build checks and perform a browser or screenshot check when practical.

# Completion Notes

## Summary of Work Completed

Replaced the placeholder dashboard with a read-only Kanban board powered by `/api/board`. Added typed client-side AgentBoard models, loading and error states, workflow columns, compact task cards, status-specific color treatment, dependency state pills, and responsive desktop/mobile layouts. Initialized a project-specific interface design system.

## Files Changed

- `.interface-design/system.md`
- `src/App.tsx`
- `src/types/agentboard.ts`

## Artifacts Created or Used

Used the local board API from TASK-0003. Created `.interface-design/system.md` as the reusable interface design system memory required for dashboard UI work.

## Assumptions Made

Kept the dashboard read-only and avoided task detail interactions because those are assigned to TASK-0005. Used compact operational styling aligned with the AgentBoard workflow rather than a marketing-style page.

## Validation Performed

- `npm test`
- `npm run build`
- `npm run validate:board`
- Browser desktop check confirming real task cards and workflow columns render.
- Browser narrow viewport check at 390px confirming mobile task cards remain visible and text wraps inside cards.

## Known Limitations

Task cards show a concise objective excerpt only. Full task content and detailed section browsing are deferred to TASK-0005.

## Follow-up Recommendations

Proceed with TASK-0005 for task detail inspection and TASK-0006 for validation status UI after review approval.

## Reviewer Approval

Reviewer approval: approved on 2026-05-11.

Validated the read-only Kanban board against the task acceptance criteria, including real `/api/board` data rendering, status-specific column treatment, dependency indicators, empty states, desktop and narrow viewport browser checks, and continued build/test/AgentBoard validation success.
