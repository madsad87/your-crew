---
id: TASK-0006
title: "Create project README"
status: done
assigned_agent: content-creator
priority: high
depends_on: [TASK-0007]
created_by: orchestrator
claimed_by: workflow-runner
claimed_at: 2026-05-08
---

# User Request

Create a project README for Your Crew.

# Objective

Write a clear project README that explains what Your Crew is, how the AgentBoard workflow works, what agents exist, how to run the workflow manually or through workflow-runner mode, and what the first completed workflow demonstrated.

# Acceptance Criteria

- [x] README explains what Your Crew is and who it is for
- [x] README explains how the `.agentboard/` board works, including the task folders and status flow
- [x] README lists the current agents and summarizes each role
- [x] README explains how to run the workflow manually using task files and role instructions
- [x] README explains how to run workflow-runner mode using `.agentboard/agents/workflow-runner.md`
- [x] README explains current V1 and V1.1 status based on the repository state
- [x] README uses the TASK-0007 demo workflow artifact as source material
- [x] README references the key protocol files: `AGENTS.md`, `.agentboard/templates/task.md`, `.agentboard/agent-registry.md`, and `.agentboard/agents/`
- [x] Existing project positioning remains consistent with `README.md.txt`, `AGENTS.md`, and `.agentboard/project-profile.md`

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

- `README.md`

## Used

- `.agentboard/artifacts/TASK-0007-demo-homepage-workflow.md` once available

# Validation

Validate the README against the requested topics and current repository files. Check links/paths for accuracy.

# Completion Notes

## Summary of Work Completed

Created a GitHub-rendered root `README.md` explaining Your Crew, the AgentBoard workflow, current agents, manual operation, workflow-runner mode, the first completed workflow, and V1/V1.1 status.

## Files Changed

- `README.md`
- `.agentboard/review/TASK-0006-create-project-readme.md`

## Artifacts Created or Used

- Used `.agentboard/artifacts/TASK-0007-demo-homepage-workflow.md`

## Assumptions Made

- `README.md` should be created for GitHub rendering while leaving `README.md.txt` untouched as historical source text.
- V1 means the Markdown board, protocol, role files, task template, and completed homepage workflow are in place.
- V1.1 means documentation and future workflow-runner/validator improvements are in progress.

## Validation Performed

- Checked that `README.md` covers all requested topics.
- Verified referenced paths exist: `AGENTS.md`, `.agentboard/templates/task.md`, `.agentboard/agent-registry.md`, `.agentboard/agents/`, and `.agentboard/artifacts/TASK-0007-demo-homepage-workflow.md`.
- Compared README positioning against `README.md.txt`, `AGENTS.md`, and `.agentboard/project-profile.md`.

## Known Limitations

- `README.md.txt` remains in the repository; a future cleanup task can remove it after `README.md` is approved.

## Follow-up Recommendations

- During review, decide whether to keep `README.md.txt` as an archive or remove it to avoid duplicate README-like files.

## Reviewer Approval

Approved. `README.md` exists, is suitable for GitHub rendering, explains Your Crew and the AgentBoard workflow, lists current agents, documents manual and workflow-runner usage, covers V1/V1.1 status, references the requested protocol files, and uses the TASK-0007 demo artifact as source material.
