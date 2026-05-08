---
id: TASK-0010
title: "Make orchestrator the default conversational entry point"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: workflow-runner
claimed_at: 2026-05-08
---

# User Request

Make the orchestrator the default conversational entry point for Your Crew so users do not need to manually say "act as builder", "act as reviewer", or "act as workflow-runner" during normal use.

# Objective

Update the global protocol and relevant role files so the orchestrator interprets user intent, chooses the correct interaction mode, and delegates actionable board execution to the workflow-runner when appropriate.

# Acceptance Criteria

- [x] `AGENTS.md` clearly states the orchestrator is the default conversational entry point
- [x] `.agentboard/agents/orchestrator.md` explains how to choose between Planning Mode, Execution Mode, Status Mode, and Clarification Mode
- [x] `.agentboard/agents/orchestrator.md` clearly says when to delegate to workflow-runner
- [x] `.agentboard/agents/workflow-runner.md` supports direct invocation and orchestrator delegation
- [x] `.agentboard/agents/workflow-runner.md` specifies compact summaries by default and avoids verbose transition-by-transition reporting unless debug output is requested
- [x] Sequential execution remains the default
- [x] No parallel execution is added
- [x] No cron or background automation is added
- [x] No existing workflow safety rules are weakened
- [x] Completed historical task files are not changed
- [x] Homepage implementation files are not changed
- [x] Markdown formatting remains clean

# Context

Your Crew currently uses `AGENTS.md` as the global protocol source of truth and `.agentboard/agents/*.md` for role-specific behavior. The desired user experience is that normal conversation enters through the orchestrator, which then decides whether to plan tasks, run existing board work through the workflow-runner, report status, or ask for clarification.

The builder should inspect the current state before editing because some conversational-entry-point guidance may already exist and may only need refinement, completion, or consistency checks.

# Agent Instructions

Act as `builder`. Read `AGENTS.md`, `.agentboard/agents/orchestrator.md`, and `.agentboard/agents/workflow-runner.md` before editing.

Implement only the requested protocol/role documentation changes. Do not modify completed historical task files in `.agentboard/done/`. Do not alter homepage implementation files such as `index.html` or `styles.css`. Keep workflow execution sequential and do not introduce parallel execution, cron jobs, background automation, or new tooling.

# Deliverables

- Updated `AGENTS.md`
- Updated `.agentboard/agents/orchestrator.md`
- Updated `.agentboard/agents/workflow-runner.md`

# Artifacts

## Created

## Used

# Validation

Validate that the orchestrator is documented as the default conversational entry point, the orchestrator mode-selection rules are clear, workflow-runner delegation is supported, compact runner output is the default, and no safety rules or scope exclusions were weakened.

# Completion Notes

## Summary of Work Completed

Updated the protocol and role documentation so the orchestrator is treated as the default conversational entry point, with explicit mode selection and workflow-runner delegation rules. Added workflow-runner invocation guidance and compact-summary output behavior.

## Files Changed

- `AGENTS.md`
- `.agentboard/agents/orchestrator.md`
- `.agentboard/agents/workflow-runner.md`
- `.agentboard/in-progress/TASK-0010-make-orchestrator-default-conversational-entry-point.md`

## Artifacts Created or Used

- No artifacts created or used.

## Assumptions Made

- "Continue the board" should use orchestrator execution mode and delegate to workflow-runner because actionable ready work existed.
- Existing conversational-entry-point guidance should be refined instead of duplicated.

## Validation Performed

- Confirmed `AGENTS.md` includes a `Conversational Entry Point` section identifying orchestrator as the normal default entry point.
- Confirmed `orchestrator.md` documents Planning, Execution, Status, and Clarification modes and explicit workflow-runner delegation rules.
- Confirmed `workflow-runner.md` includes an `Invocation` section supporting direct and orchestrator-delegated use.
- Confirmed workflow-runner output now defaults to compact summaries unless debug output is requested.
- Confirmed no parallel execution, cron/background automation, completed historical task files, or homepage implementation files were changed by this task.

## Known Limitations

- This is documentation/protocol behavior only; no executable runner tooling was added.

## Follow-up Recommendations

- Consider a future task for a board validator that checks status/folder alignment and malformed task frontmatter.

## Reviewer Approval

Approved by reviewer on 2026-05-08.

Validation confirmed that `AGENTS.md` clearly identifies the orchestrator as the default conversational entry point, `orchestrator.md` defines Planning, Execution, Status, and Clarification modes with explicit workflow-runner delegation rules, and `workflow-runner.md` supports both direct and orchestrator-delegated invocation. Confirmed compact summaries are the default, sequential execution remains the default, no parallel execution or cron/background automation was added, existing workflow safety rules remain intact, homepage implementation files were not changed, completed historical task files were not modified by this task, and Markdown formatting is clean.
