---
id: TASK-0005
title: "Improve AgentBoard protocol after homepage workflow"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: workflow-runner
claimed_at: 2026-05-08
---

# User Request

Improve the AgentBoard protocol after completing the first full homepage workflow.

# Objective

Clean up the Markdown protocol files, populate role-specific agent instruction files, and make the workflow rules explicit where the homepage workflow required agents to infer behavior.

# Acceptance Criteria

- [x] Escaped Markdown syntax is cleaned up in agent role files and task templates so headings, lists, and frontmatter render normally
- [x] `.agentboard/templates/task.md` includes the fields discovered during the homepage workflow, including claiming metadata, deliverables, artifacts, validation, completion notes, known limitations, follow-up recommendations, and reviewer approval
- [x] `.agentboard/agents/orchestrator.md` exists and contains usable orchestrator-specific instructions covering role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations
- [x] `.agentboard/agents/builder.md` exists and contains usable builder-specific instructions covering role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations
- [x] `.agentboard/agents/reviewer.md` exists and contains usable reviewer-specific instructions covering role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations
- [x] `.agentboard/agents/content-creator.md` exists and contains usable content-creator-specific instructions covering role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations
- [x] `AGENTS.md` explicitly defines how agents claim tasks, complete tasks, move tasks between folders, and keep frontmatter `status` aligned with folder location
- [x] `AGENTS.md` clarifies artifact rules, including when reusable outputs should be created in `.agentboard/artifacts/` and how task notes should reference them
- [x] `AGENTS.md` clarifies acceptable validation behavior, including what to document when browser or external tooling is unavailable
- [x] `AGENTS.md` clarifies reviewer behavior for approvals, change requests, blocked work, and dependency unlocking
- [x] Individual agent files stay focused on role behavior and do not duplicate the full global protocol from `AGENTS.md`
- [x] `.agentboard/agents/workflow-runner.md` is reviewed for future implementation scope, with concrete recommendations recorded in TASK-0005 completion notes, but full implementation of workflow-runner behavior is not required in this task
- [x] Existing completed task files remain historically accurate and are not rewritten except where absolutely required by a protocol consistency issue

# Context

The homepage workflow completed TASK-0001 through TASK-0004 and exposed several protocol gaps:

- Agents inferred that claiming means moving a task from `ready` to `in-progress` and updating frontmatter status
- Agents inferred that builders move completed work to `review`, while reviewers move approved work to `done`
- Agents inferred that reviewers unlock dependent tasks after approving prerequisites
- The first content artifact was initially created as `homepage-copy.md` before being moved under `.agentboard/artifacts/`
- Browser validation was attempted but unavailable, so static validation was documented as fallback
- Some protocol files contain escaped Markdown characters such as `\#`, `\-`, `\---`, and `\[]`
- The individual role files are incomplete or empty: `builder.md`, `reviewer.md`, and `content-creator.md` are empty; `orchestrator.md` exists but needs cleanup and alignment with the global protocol
- A new `.agentboard/agents/workflow-runner.md` file exists and should be reviewed as a candidate for a future workflow automation role

# Agent Instructions

Do not change homepage implementation files. Focus on protocol documentation, role files, and the task template. Keep `AGENTS.md` as the global protocol source of truth. Keep individual agent files focused on role-specific behavior, not full protocol duplication. Preserve the current Markdown-first, minimal-dependency approach.

# Completion Notes

## Summary of Work Completed

Cleaned up and clarified the AgentBoard protocol after the first completed workflow. Populated the core role files with focused role behavior, normalized the task template, and updated `AGENTS.md` with explicit claiming, completion, artifact, validation, review, status alignment, and dependency unlocking rules.

## Files Changed

- `AGENTS.md`
- `.agentboard/templates/task.md`
- `.agentboard/agents/orchestrator.md`
- `.agentboard/agents/builder.md`
- `.agentboard/agents/reviewer.md`
- `.agentboard/agents/content-creator.md`
- `.agentboard/review/TASK-0005-improve-agentboard-protocol-after-homepage-workflow.md`

## Artifacts Created or Used

- Used `.agentboard/agents/workflow-runner.md` as protocol context.
- No new artifacts were created.

## Assumptions Made

- `AGENTS.md` remains the global protocol source of truth.
- Individual role files should describe role-specific behavior and avoid duplicating every global rule.
- Completed historical task files should remain unchanged.

## Validation Performed

- Checked `.agentboard/agents/` and `.agentboard/templates/task.md` for escaped Markdown patterns such as `\#`, `\-`, `\---`, and escaped frontmatter fields.
- Confirmed the four core role files contain role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations.
- Confirmed `AGENTS.md` contains explicit sections for claiming, completion, status/folder alignment, artifacts, validation, reviewer outcomes, and dependency unlocking.
- Confirmed `.agentboard/templates/task.md` includes claiming metadata, deliverables, artifacts, validation, completion notes, known limitations, follow-up recommendations, and reviewer approval.

## Known Limitations

- No automated board validator exists yet to enforce these rules mechanically.
- `workflow-runner.md` is documented as a role instruction file, but no separate executable runner script exists.

## Follow-up Recommendations

- Add a future task for a lightweight board validator that checks folder/status alignment, dependency resolution, required task sections, and active agent names.
- Consider adding a dedicated implementation task for executable workflow-runner tooling after the Markdown protocol stabilizes.

## Reviewer Approval

Approved. The protocol cleanup satisfies all TASK-0005 acceptance criteria: escaped Markdown is removed from role files and the task template, the template includes the fields discovered during the homepage workflow, core role files contain focused role-specific instructions, `AGENTS.md` now documents claiming/completion/status/artifact/validation/review/dependency-unlock rules, and completed historical task files were preserved.
