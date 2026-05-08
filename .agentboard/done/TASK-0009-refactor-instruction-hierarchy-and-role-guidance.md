---
id: TASK-0009
title: "Refactor instruction hierarchy and role guidance"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: workflow-runner
claimed_at: 2026-05-08
---

# User Request

Reduce duplicated responsibility rules between `AGENTS.md` and the individual agent role files.

# Objective

Clarify the instruction hierarchy and refactor duplicated role guidance so `AGENTS.md` remains the global protocol source of truth, while `.agentboard/agents/*.md` files remain the role-specific behavior source of truth.

# Acceptance Criteria

- [x] `AGENTS.md` includes a clear `Instruction Hierarchy` section
- [x] `AGENTS.md` defines global workflow protocol, shared rules, task lifecycle, status/folder alignment, claiming, completion, review, dependency unlocking, artifact rules, validation rules, and definition of done
- [x] `AGENTS.md` keeps only short summaries of each agent role
- [x] `AGENTS.md` no longer duplicates detailed role instructions already present in `.agentboard/agents/*.md`
- [x] Matching `.agentboard/agents/*.md` files contain detailed role behavior
- [x] Every agent file includes role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations
- [x] `.agentboard/agents/workflow-runner.md` includes a dedicated `Role File Loading` section
- [x] `.agentboard/agents/workflow-runner.md` clearly says it must read the matching role file before acting as that role
- [x] No task status/folder rules are weakened or removed
- [x] Markdown formatting remains clean and unescaped
- [x] Completed historical task files are not changed
- [x] Homepage implementation files are not changed

# Context

The current protocol has useful role guidance in both `AGENTS.md` and `.agentboard/agents/*.md`. This task should reduce duplication without weakening the board rules.

Current role files include:

- `.agentboard/agents/orchestrator.md`
- `.agentboard/agents/builder.md`
- `.agentboard/agents/reviewer.md`
- `.agentboard/agents/content-creator.md`
- `.agentboard/agents/workflow-runner.md`

The workflow-runner file currently includes role loading guidance in its responsibilities list. That guidance should become a dedicated `Role File Loading` section.

# Agent Instructions

Act as `builder`. Do not modify completed historical task files in `.agentboard/done/`. Do not alter homepage implementation files such as `index.html` or `styles.css`. Preserve all existing global workflow rules unless they are being moved out of duplicated role-detail sections and remain covered by the global protocol or relevant role file.

# Deliverables

- Updated `AGENTS.md`
- Updated role files under `.agentboard/agents/` as needed

# Artifacts

## Created

## Used

# Validation

Validate that role-detail duplication is reduced, all role files remain complete, `workflow-runner.md` has a dedicated role-loading section, and no escaped Markdown was introduced.

# Completion Notes

## Summary of Work Completed

Refactored the instruction hierarchy so `AGENTS.md` now states the global protocol hierarchy and keeps agent descriptions short, while detailed role behavior remains in `.agentboard/agents/*.md`. Added a dedicated `Role File Loading` section to `workflow-runner.md`.

## Files Changed

- `AGENTS.md`
- `.agentboard/agents/workflow-runner.md`
- `.agentboard/review/TASK-0009-refactor-instruction-hierarchy-and-role-guidance.md`

## Artifacts Created or Used

- No artifacts created or used.

## Assumptions Made

- Detailed role guidance already present in `.agentboard/agents/orchestrator.md`, `.agentboard/agents/builder.md`, `.agentboard/agents/reviewer.md`, and `.agentboard/agents/content-creator.md` should remain intact.
- Short role summaries in `AGENTS.md` are enough when paired with explicit links to the matching role files.

## Validation Performed

- Confirmed `AGENTS.md` contains `Instruction Hierarchy` and retains global workflow sections for claiming, completion, status/folder alignment, dependency rules, validation rules, and definition of done.
- Confirmed role files still include role purpose, responsibilities, allowed actions, prohibited actions, workflow behavior, and completion/reporting expectations.
- Confirmed `workflow-runner.md` has a dedicated `Role File Loading` section.
- Scanned `AGENTS.md`, `.agentboard/agents/`, and `.agentboard/templates/task.md` for escaped Markdown patterns.

## Known Limitations

- This task is awaiting reviewer validation because the workflow-runner loop safety limit was reached after moving it to review.

## Follow-up Recommendations

- Review TASK-0009 before continuing with lower-priority ready tasks.

## Reviewer Approval

Approved by reviewer on 2026-05-08.

Validation confirmed that `AGENTS.md` includes a clear instruction hierarchy, retains the required global workflow protocol sections, and now keeps role guidance to short summaries with detailed behavior delegated to `.agentboard/agents/*.md`. Confirmed every role file includes the required role sections, `workflow-runner.md` has a dedicated `Role File Loading` section that requires reading the matching role file before acting as that role, no task status/folder rules were weakened, homepage files were not changed, and no escaped Markdown patterns were found in the protocol, role, or template files.
