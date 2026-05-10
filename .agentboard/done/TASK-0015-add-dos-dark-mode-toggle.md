---
id: TASK-0015
title: "Add DOS-inspired dark mode toggle"
status: done
assigned_agent: builder
priority: medium
depends_on: [TASK-0014]
created_by: orchestrator
claimed_by: workflow-runner
claimed_at: 2026-05-10
---

# User Request

Add a toggleable dark mode radio option button in the header menu that fits the retro green-and-black style of 80s/90s DOS screens.

# Objective

Add a small CSS-driven theme toggle to the homepage header that switches the page into a DOS-inspired dark mode while preserving the existing homepage layout and design direction.

# Acceptance Criteria

- [x] Header includes a toggleable theme control
- [x] Theme control uses radio inputs
- [x] Dark mode uses a retro green-and-black DOS-inspired visual treatment
- [x] Existing homepage content and layout remain intact
- [x] Styling remains responsive and usable in the header on mobile
- [x] No AgentBoard protocol files are modified
- [x] `npm run validate` passes

# Context

The homepage is static HTML/CSS. Prefer a lightweight CSS-only implementation if practical.

# Agent Instructions

Act as `builder`. Keep the change small and visual. Do not add JavaScript unless necessary. Do not modify AgentBoard protocol files. Preserve the existing homepage design direction while adding the DOS-inspired dark mode treatment.

# Deliverables

- Updated `index.html`
- Updated `styles.css`

# Artifacts

## Created

## Used

# Validation

Run `npm run validate` and document the result.

# Completion Notes

## Summary of Work Completed

Added a CSS-only Light/DOS radio theme toggle to the header. DOS mode uses green-on-black variables, monospace typography, scanline-style background treatment, glowing accents, and dark card/header/button styling while preserving the existing homepage layout.

## Files Changed

- `index.html`
- `styles.css`
- `.agentboard/in-progress/TASK-0015-add-dos-dark-mode-toggle.md`

## Artifacts Created or Used

- No artifacts created or used.

## Assumptions Made

- A CSS-only implementation using `body:has(#theme-dos:checked)` is acceptable for this static homepage and avoids adding JavaScript.
- The theme does not need persistence across reloads.

## Validation Performed

- Ran `npm run validate`; result: `AgentBoard validation: PASS`, `Checked 15 task files.`
- Static-checked `index.html` and `styles.css` for radio inputs, the DOS selector, green/black theme variables, monospace styling, and mobile header adjustments.

## Known Limitations

- Theme selection is not persisted after reload because no JavaScript or storage was added.
- CSS `:has()` is required for the no-JavaScript toggle behavior.

## Follow-up Recommendations

- Add JavaScript persistence later only if user preference retention becomes important.

## Reviewer Approval

Approved by reviewer on 2026-05-10.

Validation confirmed that the header includes a Light/DOS radio theme control, the DOS option is implemented with CSS-only `body:has(#theme-dos:checked)` styling, the dark mode uses green-and-black terminal-inspired colors, monospace typography, scanline-style background treatment, and glowing accents, and the existing homepage content/layout remains intact. No AgentBoard protocol files were modified. `npm run validate` passed with `AgentBoard validation: PASS`, `Checked 15 task files.`
