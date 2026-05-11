---
id: TASK-0018
title: "Upgrade accessibility review skill"
status: done
assigned_agent: content-creator
priority: medium
depends_on: []
created_by: orchestrator
claimed_by: content-creator
claimed_at: 2026-05-11
skills: [accessibility-review]
expected_files: [.agentboard/skills/accessibility-review.md]
parallel_safe: false
---

# User Request

Use the orchestrator role.

Create a task to upgrade one skill from lightweight guidance into a high-signal operational playbook.

Goal:
Make `.agentboard/skills/accessibility-review.md` genuinely useful for UX/UI and reviewer work by turning it into a concrete checklist and validation guide for the dashboard.

Scope:
- Expand `.agentboard/skills/accessibility-review.md`
- Add specific checks for:
  - keyboard navigation
  - visible focus states
  - semantic buttons and links
  - aria-pressed for toggles
  - drawer/detail panel close behavior
  - no nested interactive controls
  - text contrast in light and dark modes
  - long text wrapping for task titles, file paths, and chips
  - responsive readability
- Add common failure modes
- Add validation steps for reviewers
- Add guidance for how agents should report use of this skill in Completion Notes
- Do not modify dashboard implementation files
- Do not expand every skill yet
- Run board validation when complete

Acceptance criteria:
- accessibility-review skill becomes a concrete checklist/playbook
- guidance is specific to this dashboard branch where useful
- reviewer and ux-ui agents can apply it directly
- skill file includes validation steps and reporting expectations
- board validator passes

Assign it to content-creator.
Place it in `.agentboard/ready/`.
Then continue the board if safe.
Use compact summaries.

# Objective

Upgrade `.agentboard/skills/accessibility-review.md` from lightweight guidance into a concrete accessibility checklist and validation playbook for AgentBoard dashboard UX/UI and reviewer work.

# Acceptance Criteria

- [x] `accessibility-review` skill becomes a concrete checklist/playbook.
- [x] Guidance is specific to this dashboard branch where useful.
- [x] Reviewer and UX/UI agents can apply it directly.
- [x] Skill file includes validation steps for reviewers.
- [x] Skill file includes common failure modes.
- [x] Skill file includes Completion Notes reporting expectations.
- [x] No dashboard implementation files are modified.
- [x] No other skill files are expanded.
- [x] Board validator passes.

# Context

The first-pass Skill Library currently makes skills visible and valid, but this task should make one skill genuinely high-signal. Focus only on `accessibility-review`.

The dashboard is a read-only React/Tailwind AgentBoard viewer with task cards, an Active work summary, capped Done lane, validation panel, Skill Library section, light/dark mode, and a task detail drawer.

# Agent Instructions

- Act as `content-creator`.
- Load `.agentboard/skills/accessibility-review.md`.
- Keep the skill practical, specific, and checklist-driven.
- Do not edit `src/`, dashboard implementation files, or other skill files.
- Run `npm run validate:board` before moving to review.

# Deliverables

- Expanded `.agentboard/skills/accessibility-review.md`.

# Artifacts

## Created

## Used

- `.agentboard/skills/accessibility-review.md`

# Validation

- `npm run validate:board`

# Completion Notes

## Summary of Work Completed

Expanded `accessibility-review` from lightweight guidance into a dashboard-specific operational playbook covering keyboard navigation, focus states, semantic controls, toggle semantics, drawer close behavior, nested control risks, contrast, wrapping, responsive readability, common failure modes, reviewer validation steps, and Completion Notes reporting expectations.

## Files Changed

- `.agentboard/skills/accessibility-review.md`
- `.agentboard/review/TASK-0018-upgrade-accessibility-review-skill.md`

## Artifacts Created or Used

Used and updated `.agentboard/skills/accessibility-review.md`.

## Assumptions Made

Assumed this pass should stay documentation-only and should not introduce automated accessibility tooling or modify dashboard implementation files.

## Validation Performed

- `npm run validate:board`

## Known Limitations

No automated accessibility tooling, WCAG certification workflow, or browser automation was added.

## Follow-up Recommendations

Use this upgraded skill on the next UX/UI or reviewer task that touches dashboard interaction or responsive UI to verify it changes task quality in practice.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

Validation confirmed `.agentboard/skills/accessibility-review.md` now provides a concrete dashboard-specific accessibility checklist, common failure modes, reviewer validation steps, UX/UI and reviewer usage guidance, and Completion Notes reporting expectations. No dashboard implementation files or other skill files were modified. `npm run validate:board` passes.
