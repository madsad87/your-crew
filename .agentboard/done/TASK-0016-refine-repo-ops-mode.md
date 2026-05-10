---
id: TASK-0016
title: "Refine Repo Ops Mode guidance"
status: done
assigned_agent: builder
priority: medium
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-10
---

# User Request

Review and improve the Repo Ops Mode work already added so simple git operations are handled as repository operations instead of full AgentBoard project tasks.

# Objective

Refine Repo Ops Mode guidance across the global protocol, orchestrator role, repo-ops role, and agent registry so it is clear, consistent, safe, and aligned with the Your Crew instruction hierarchy.

# Acceptance Criteria

- [x] `.agentboard/agents/repo-ops.md` exists and has clear role purpose, responsibilities, allowed actions, prohibited actions, behavior, and reporting expectations.
- [x] `AGENTS.md` includes a concise Repo Ops Commands section.
- [x] `.agentboard/agents/orchestrator.md` includes Repo Ops Mode and explains when to use it.
- [x] `.agentboard/agent-registry.md` lists `repo-ops` as active.
- [x] Repo Ops guidance clearly says simple commit, push, status, and log requests do not require full AgentBoard task creation.
- [x] Repo Ops guidance clearly says destructive git actions require explicit user instruction.
- [x] Repo Ops guidance says to run the board validator before committing when AgentBoard files changed, when practical.
- [x] Existing workflow safety rules are not weakened.
- [x] Markdown formatting remains clean.
- [x] Board validator passes.

# Context

Relevant files:

- `AGENTS.md`
- `.agentboard/agents/orchestrator.md`
- `.agentboard/agents/repo-ops.md`
- `.agentboard/agent-registry.md`

Do not alter homepage implementation files. Do not modify completed historical task files except normal task movement for this new task. Do not introduce background automation, cron behavior, or parallel execution.

# Agent Instructions

- Act as builder.
- Keep changes focused on Repo Ops Mode guidance and registry alignment.
- Avoid duplicating the full global protocol in the repo-ops role file.
- Preserve the instruction hierarchy in `AGENTS.md`.
- Keep Repo Ops scoped to repository hygiene, not project implementation work.

# Deliverables

- Updated Repo Ops guidance files.
- Completed validation record.

# Artifacts

## Created

None.

## Used

None.

# Validation

Run the board validator with `npm run validate`.

# Completion Notes

## Summary of Work Completed

Refined Repo Ops Mode guidance across the global protocol, orchestrator role, repo-ops role, and agent registry. Clarified that simple repository operations do not require AgentBoard task creation, destructive Git operations require explicit user instruction, AgentBoard validation should run before committing AgentBoard changes when practical, and commit/push reporting must include branch, commit hash, push status, and working tree state.

## Files Changed

- `AGENTS.md`
- `.agentboard/agent-registry.md`
- `.agentboard/agents/orchestrator.md`
- `.agentboard/agents/repo-ops.md`
- `.agentboard/review/TASK-0016-refine-repo-ops-mode.md`

## Artifacts Created or Used

None.

## Assumptions Made

Repo Ops should remain a role-guidance file and registry entry, not a normal workflow stage or background automation mechanism.

## Validation Performed

- `npm run validate` passed.

## Known Limitations

None.

## Follow-up Recommendations

None.

## Reviewer Approval

Approved by reviewer on 2026-05-10. Validation confirmed all acceptance criteria are satisfied, Repo Ops guidance remains scoped to repository hygiene, destructive Git actions require explicit user instruction, AgentBoard validation guidance is preserved, and `npm run validate` passes.
