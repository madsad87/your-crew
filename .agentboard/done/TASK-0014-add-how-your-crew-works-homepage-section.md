---
id: TASK-0014
title: "Add How Your Crew Works homepage section"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: workflow-runner
claimed_at: 2026-05-10
---

# User Request

Add a new "How Your Crew Works" section to the homepage that visually explains the workflow:

1. User gives a request
2. Orchestrator creates tasks
3. Specialist agents complete work
4. Reviewer approves
5. Workflow-runner continues the board

# Objective

Add a small, demo-friendly visual workflow section to the existing homepage while preserving the current static HTML/CSS design direction.

# Acceptance Criteria

- [x] `index.html` includes a new "How Your Crew Works" section
- [x] The section visually explains all five requested workflow steps
- [x] `styles.css` includes matching styles for the new section
- [x] Styling stays consistent with the existing homepage design direction
- [x] Existing homepage content and CTA remain intact
- [x] AgentBoard protocol files are not modified
- [x] Completed historical task files are not modified except normal movement of this new task
- [x] `npm run validate` is run successfully after the change

# Context

The current homepage is a static HTML/CSS site with hero, features, and CTA sections. The new section should be small, visual, and suitable for demonstrating Your Crew's workflow.

# Agent Instructions

Act as `builder`. Keep the work small and visual. Do not modify AgentBoard protocol files unless required. Do not alter completed historical task files except for normal new task movement. Preserve the existing homepage design direction.

# Deliverables

- Updated `index.html`
- Updated `styles.css`

# Artifacts

## Created

## Used

# Validation

Run `npm run validate` when complete and document the result.

# Completion Notes

## Summary of Work Completed

Added a new "How Your Crew Works" workflow section to the homepage with five visual steps covering the user request, orchestration, specialist work, review, and workflow-runner continuation. Added responsive CSS that matches the existing editorial card-based design direction.

## Files Changed

- `index.html`
- `styles.css`
- `.agentboard/in-progress/TASK-0014-add-how-your-crew-works-homepage-section.md`

## Artifacts Created or Used

- No artifacts created or used.

## Assumptions Made

- The workflow section should sit between the existing features section and CTA so the page flows from value, to capabilities, to process, to action.
- The existing homepage visual language should be extended with bordered cards, serif headings, muted copy, and the existing accent colors.

## Validation Performed

- Ran `npm run validate`; result: `AgentBoard validation: PASS`, `Checked 14 task files.`
- Static-checked `index.html` and `styles.css` for the workflow section, navigation link, responsive styles, and all five requested steps.

## Known Limitations

- No browser screenshot or visual automation was run; validation was static inspection plus board validation.

## Follow-up Recommendations

- Consider linking the workflow section to `docs/demo-homepage-workflow.md` in a future content pass.

## Reviewer Approval

Approved by reviewer on 2026-05-10.

Validation confirmed that `index.html` includes a new `#workflow` section titled "How Your Crew works" with all five requested steps, `styles.css` adds matching responsive visual styling consistent with the existing homepage design, existing hero/features/CTA content remains intact, and no AgentBoard protocol files or completed historical task files were modified by this task. `npm run validate` passed with `AgentBoard validation: PASS`, `Checked 14 task files.`
