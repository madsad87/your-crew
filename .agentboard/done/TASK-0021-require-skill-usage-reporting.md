---
id: TASK-0021
title: "Require skill usage reporting"
status: done
assigned_agent: content-creator
priority: high
depends_on: [TASK-0020]
created_by: orchestrator
claimed_by: content-creator
claimed_at: 2026-05-11
skills: []
expected_files: [AGENTS.md, .agentboard/templates/task.md]
parallel_safe: false
---

# User Request

Add selective protocol/task guidance so agents report skill usage when a task lists skills in frontmatter.

# Objective

Update AgentBoard guidance so tasks with frontmatter `skills` require the acting agent to read and apply the listed skills, document skill usage in Completion Notes, and record non-applicable checklist items.

# Acceptance Criteria

- [x] Protocol says tasks with `skills` require agents to read the listed skill files.
- [x] Protocol says agents must apply the relevant checklist or playbook.
- [x] Protocol says Completion Notes must include `Skill used: {skill}` for listed skills.
- [x] Protocol says agents must document which skill guidance was applied.
- [x] Protocol says agents must document listed skill checks that were not applicable.
- [x] Guidance remains selective and does not require every task to use skills.
- [x] Task template supports skill usage reporting in Completion Notes.
- [x] Board validator passes.

# Context

Skills are optional capabilities, not replacements for agents. This task adds reporting expectations for tasks that explicitly list skills.

# Agent Instructions

- Act as `content-creator`.
- Do not make all tasks require skills.
- Do not add MCPs, parallel execution, task mutation controls, or background automation.
- Keep changes focused to protocol/task guidance.
- Move this task to review when complete.

# Deliverables

- `AGENTS.md`
- `.agentboard/templates/task.md`

# Artifacts

## Created

## Used

# Validation

- `npm run validate:board`

# Completion Notes

## Summary of Work Completed

Added selective skill usage reporting requirements to `AGENTS.md` and added a Skill Usage section to the task template.

## Files Changed

- `AGENTS.md`
- `.agentboard/templates/task.md`
- `.agentboard/review/TASK-0021-require-skill-usage-reporting.md`

## Artifacts Created or Used

Used the upgraded `.agentboard/skills/react-dashboard.md` task context.

## Assumptions Made

Kept skills selective. Tasks without `skills` do not need to load or report skill usage.

## Validation Performed

- `npm run validate:board`

## Known Limitations

The template adds reporting prompts, but existing historical tasks are not backfilled.

## Follow-up Recommendations

Use the new reporting expectations on the dashboard implementation and review tasks in this workflow.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

The protocol now requires explicit skill loading and reporting only when a task lists skills, and the task template includes a Skill Usage section for those notes.
