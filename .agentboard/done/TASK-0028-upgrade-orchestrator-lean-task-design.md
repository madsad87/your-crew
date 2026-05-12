---
id: TASK-0028
title: "Upgrade orchestrator lean task design"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-12
skills: []
expected_files: [.agentboard/agents/orchestrator.md]
parallel_safe: false
---

# User Request

Use the orchestrator role.

Create and execute a focused orchestrator improvement task.

# Objective

Upgrade the orchestrator into a lean task-design and dependency-planning specialist that helps Your Crew build faster with less duplicate work, fewer unnecessary artifacts, and better skill selection.

# Acceptance Criteria

- [x] Orchestrator guidance includes an already-satisfied preflight.
- [x] Orchestrator guidance explicitly avoids unnecessary duplicate work.
- [x] Orchestrator guidance explains when to create compact implementation tasks instead of artifacts.
- [x] Orchestrator guidance explains when skills should be attached selectively.
- [x] Orchestrator guidance explains when UX/UI, builder, reviewer, content-creator, repo-ops, and workflow-runner should be used.
- [x] Orchestrator guidance says to prefer implementation over process when requirements are clear.
- [x] Orchestrator guidance says to split tasks only when dependencies, risk, or role ownership justify it.
- [x] Board validator passes.

# Context

Recent workflow hardening added task preflight, atomic task movement, skill reporting validation, metadata smoke checks, and dashboard runtime smoke checks. The orchestrator should now use those guardrails to reduce process bloat and keep the team building.

# Agent Instructions

- Act as `builder`.
- Update `.agentboard/agents/orchestrator.md`.
- Add a “Lean Task Design” section.
- Add an “Already Satisfied Preflight” rule.
- Add guidance for one task versus multiple tasks.
- Add guidance for artifacts, skill selection, agent selection, duplicate avoidance, and preserving build velocity.
- Keep the orchestrator as the default conversational entry point.
- Do not add heavy scorecards.
- Do not add mandatory self-audit sections.
- Do not add hooks, parallel execution, or MCP integrations.
- Do not modify dashboard implementation files.
- Run board validation.
- Move the task to review when complete.

# Deliverables

- Updated `.agentboard/agents/orchestrator.md`

# Artifacts

## Created

## Used

# Validation

- `npm run validate:board`

# Completion Notes

## Summary of Work Completed

Updated the orchestrator role with lean task-design guidance, already-satisfied preflight rules, selective skill attachment criteria, artifact discipline, one-task versus multi-task rules, agent selection guidance, and build-velocity safeguards.

## Files Changed

- `.agentboard/agents/orchestrator.md`
- `.agentboard/review/TASK-0028-upgrade-orchestrator-lean-task-design.md`

## Artifacts Created or Used

No artifacts created.

## Skill Usage

No task skills were listed. Used the existing orchestrator role file and workflow-hardening helpers as context.

## Assumptions Made

Kept this as guidance-only role strengthening. Did not add hooks, parallel execution, MCP integrations, heavy scorecards, mandatory self-audits, or dashboard implementation changes.

## Validation Performed

- `npm run validate:board`
- `npm run board:preflight -- TASK-0028`

## Known Limitations

The guidance improves orchestration behavior but does not automatically enforce every task-design decision in the validator.

## Follow-up Recommendations

Use the upgraded orchestrator guidance to create compact implementation tasks from the dashboard roadmap instead of doing more broad workflow-hardening work.

## Reviewer Approval

Approved by reviewer on 2026-05-12.

The orchestrator guidance now includes lean task design, an already-satisfied preflight, duplicate-work avoidance, compact task versus artifact guidance, selective skill attachment, agent selection rules, and explicit build-velocity guidance. It preserves the orchestrator as the default conversational entry point and does not add hooks, parallel execution, MCP integrations, dashboard implementation changes, heavy scorecards, or mandatory self-audits. Board validation passes.
