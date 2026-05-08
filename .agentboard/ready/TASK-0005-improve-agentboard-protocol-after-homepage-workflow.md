---
id: TASK-0005
title: "Improve AgentBoard protocol after homepage workflow"
status: ready
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
---

# User Request

Improve the AgentBoard protocol after completing the first full homepage workflow.

# Objective

Clean up the Markdown protocol files, populate role-specific agent instruction files, and make the workflow rules explicit where the homepage workflow required agents to infer behavior.

# Acceptance Criteria

- [ ] Escaped Markdown syntax is cleaned up in agent role files and task templates so headings, lists, and frontmatter render normally
- [ ] `.agentboard/templates/task.md` includes the fields discovered during the homepage workflow, including claiming metadata, deliverables, artifacts, validation, completion notes, known limitations, follow-up recommendations, and reviewer approval
- [ ] `.agentboard/agents/orchestrator.md` exists and contains usable orchestrator-specific instructions covering role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations
- [ ] `.agentboard/agents/builder.md` exists and contains usable builder-specific instructions covering role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations
- [ ] `.agentboard/agents/reviewer.md` exists and contains usable reviewer-specific instructions covering role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations
- [ ] `.agentboard/agents/content-creator.md` exists and contains usable content-creator-specific instructions covering role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations
- [ ] `AGENTS.md` explicitly defines how agents claim tasks, complete tasks, move tasks between folders, and keep frontmatter `status` aligned with folder location
- [ ] `AGENTS.md` clarifies artifact rules, including when reusable outputs should be created in `.agentboard/artifacts/` and how task notes should reference them
- [ ] `AGENTS.md` clarifies acceptable validation behavior, including what to document when browser or external tooling is unavailable
- [ ] `AGENTS.md` clarifies reviewer behavior for approvals, change requests, blocked work, and dependency unlocking
- [ ] Individual agent files stay focused on role behavior and do not duplicate the full global protocol from `AGENTS.md`
- [ ] `.agentboard/agents/workflow-runner.md` is reviewed for future implementation scope, with concrete recommendations recorded in TASK-0005 completion notes, but full implementation of workflow-runner behavior is not required in this task
- [ ] Existing completed task files remain historically accurate and are not rewritten except where absolutely required by a protocol consistency issue

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
