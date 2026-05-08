---
id: TASK-0006
title: "Create project README"
status: inbox
assigned_agent: content-creator
priority: high
depends_on: [TASK-0007]
created_by: orchestrator
claimed_by:
claimed_at:
---

# User Request

Create a project README for Your Crew.

# Objective

Write a clear project README that explains what Your Crew is, how the AgentBoard workflow works, what agents exist, how to run the workflow manually or through workflow-runner mode, and what the first completed workflow demonstrated.

# Acceptance Criteria

- [ ] README explains what Your Crew is and who it is for
- [ ] README explains how the `.agentboard/` board works, including the task folders and status flow
- [ ] README lists the current agents and summarizes each role
- [ ] README explains how to run the workflow manually using task files and role instructions
- [ ] README explains how to run workflow-runner mode using `.agentboard/agents/workflow-runner.md`
- [ ] README explains current V1 and V1.1 status based on the repository state
- [ ] README uses the TASK-0007 demo workflow artifact as source material
- [ ] README references the key protocol files: `AGENTS.md`, `.agentboard/templates/task.md`, `.agentboard/agent-registry.md`, and `.agentboard/agents/`
- [ ] Existing project positioning remains consistent with `README.md.txt`, `AGENTS.md`, and `.agentboard/project-profile.md`

# Context

The current root README is `README.md.txt` and contains only a short overview. GitHub will render `README.md` automatically, so this task should either create `README.md` or replace/rename the existing `.txt` file if appropriate.

The project now includes:

- Global protocol instructions in `AGENTS.md`
- Agent registry in `.agentboard/agent-registry.md`
- Task template in `.agentboard/templates/task.md`
- Role files in `.agentboard/agents/`
- Completed homepage workflow tasks `TASK-0001` through `TASK-0005`
- Static homepage files `index.html` and `styles.css`
- Demo workflow artifact from TASK-0007, once complete

# Agent Instructions

Act as `content-creator`. Do not change AgentBoard protocol behavior or homepage implementation. Focus on project-facing documentation. Preserve the Markdown-first, workflow-agnostic positioning. Wait for TASK-0007 to be approved before claiming this task.

# Deliverables

- Root project README suitable for GitHub rendering

# Artifacts

## Created

## Used

- `.agentboard/artifacts/TASK-0007-demo-homepage-workflow.md` once available

# Validation

Validate the README against the requested topics and current repository files. Check links/paths for accuracy.

# Completion Notes

## Summary of Work Completed

## Files Changed

## Artifacts Created or Used

## Assumptions Made

## Validation Performed

## Known Limitations

## Follow-up Recommendations

## Reviewer Approval
