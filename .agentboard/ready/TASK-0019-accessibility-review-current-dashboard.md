---
id: TASK-0019
title: "Accessibility review current dashboard"
status: ready
assigned_agent: reviewer
priority: medium
depends_on: [TASK-0018]
created_by: orchestrator
claimed_by:
claimed_at:
skills: [accessibility-review]
expected_files: [.agentboard/artifacts/TASK-0019-accessibility-review-current-dashboard.md]
parallel_safe: false
---

# User Request

Use the orchestrator role.

Create an accessibility review task for the current dashboard using the `accessibility-review` skill.

The reviewer should explicitly apply `.agentboard/skills/accessibility-review.md`, document which checks passed, identify any issues, and recommend follow-up tasks if needed.

Do not implement code changes yet.

# Objective

Review the current read-only AgentBoard dashboard against `.agentboard/skills/accessibility-review.md` and produce a reusable accessibility review artifact with passed checks, identified issues, and follow-up recommendations.

# Acceptance Criteria

- [ ] Reviewer explicitly applies `.agentboard/skills/accessibility-review.md`.
- [ ] Review documents which accessibility checks passed.
- [ ] Review identifies any accessibility issues found.
- [ ] Review recommends follow-up tasks if needed.
- [ ] A reusable artifact is created under `.agentboard/artifacts/` with the task ID in the filename.
- [ ] No dashboard implementation files are modified.
- [ ] No code changes are implemented.
- [ ] Board validator passes.

# Context

The dashboard is a read-only React/Tailwind AgentBoard viewer with:

- header theme toggle
- validation panel
- Skill Library section
- Active work summary
- workflow columns
- task cards with `Details ->` affordance
- capped Done lane
- task detail drawer
- light and dark modes

This task is an audit only. It should produce findings and recommendations, not implementation changes.

# Agent Instructions

- Act as `reviewer`.
- Load and explicitly apply `.agentboard/skills/accessibility-review.md`.
- Inspect the current dashboard and relevant UI files as needed.
- Create `.agentboard/artifacts/TASK-0019-accessibility-review-current-dashboard.md`.
- Document passed checks, issues, validation performed, and follow-up recommendations.
- Do not modify dashboard implementation files.
- Do not add tests or code changes.
- Move the task to review when the artifact and completion notes are complete.

# Deliverables

- `.agentboard/artifacts/TASK-0019-accessibility-review-current-dashboard.md`

# Artifacts

## Created

## Used

- `.agentboard/skills/accessibility-review.md`

# Validation

- `npm run validate:board`
- Browser/manual accessibility review when this task is executed.

# Completion Notes

## Summary of Work Completed

## Files Changed

## Artifacts Created or Used

## Assumptions Made

## Validation Performed

## Known Limitations

## Follow-up Recommendations

## Reviewer Approval
