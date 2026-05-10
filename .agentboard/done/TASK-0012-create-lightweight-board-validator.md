---
id: TASK-0012
title: "Create lightweight AgentBoard validator script"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: workflow-runner
claimed_at: 2026-05-08
---

# User Request

Create a lightweight AgentBoard validator script.

# Objective

Add a minimal, safe-to-run local validation script that checks AgentBoard task files for common protocol problems, prints a clear pass/fail summary, and lists specific files and issues when validation fails.

# Acceptance Criteria

- [x] A validator script exists
- [x] The script checks status/folder alignment
- [x] The script checks dependency references
- [x] The script checks ready-task dependency satisfaction
- [x] The script checks done-task reviewer approval
- [x] The script checks required sections
- [x] The script checks task files use valid Markdown/YAML-style frontmatter where practical
- [x] README or documentation explains how to run it
- [x] The validator is run once and results are documented in completion notes
- [x] The script prints a clear pass/fail summary
- [x] The script lists specific files and issues when validation fails
- [x] The script is safe to run locally and does not modify files
- [x] Implementation stays lightweight with minimal dependencies

# Context

The AgentBoard protocol is Markdown-first and minimal-dependency. A lightweight validator should harden the board without introducing a framework or background automation.

Current task requirements and lifecycle rules are defined in `AGENTS.md` and `.agentboard/templates/task.md`.

Suggested implementation:

- Create a script under `scripts/`
- Prefer minimal dependencies
- The script should print a clear pass/fail summary
- The script should list specific files and issues when validation fails
- It should be safe to run locally and should not modify files

# Agent Instructions

Act as `builder`. Implement the validator with the smallest practical minimal-dependency approach. Do not modify homepage implementation files. Do not modify completed historical task files except if the validator reveals a real protocol error that must be fixed for the current board to validate.

# Deliverables

- A runnable validator script under `scripts/`
- Documentation for running the validator

# Artifacts

## Created

## Used

# Validation

Run the validator once against the current board and document the result in completion notes. If validation finds issues, fix only in-scope board issues or document blockers.

# Completion Notes

## Summary of Work Completed

Created a dependency-free Node.js AgentBoard validator that checks task frontmatter, status/folder alignment, dependency references, ready-task dependency satisfaction, reviewer approval on done tasks, and required task sections. Documented the run command in `README.md`.

## Files Changed

- `scripts/validate-agentboard.js`
- `README.md`
- `.agentboard/done/TASK-0004-review-homepage-quality.md`
- `.agentboard/done/TASK-0008-review-readme-and-demo-documentation.md`
- `.agentboard/in-progress/TASK-0012-create-lightweight-board-validator.md`

## Artifacts Created or Used

- No artifacts created or used.

## Assumptions Made

- A plain Node.js script is the smallest practical implementation because the project already lists Node.js in the project profile and it requires no third-party dependencies.
- Required task sections are the core sections required by `AGENTS.md`: user request, objective, acceptance criteria, context, agent instructions, and completion notes.

## Validation Performed

- Ran `node scripts\validate-agentboard.js`; initial result failed with malformed `TASK-0008` frontmatter and missing explicit reviewer approval text in `TASK-0004`.
- Fixed those two board issues because they were real protocol issues discovered by the validator.
- Ran `node scripts\validate-agentboard.js` again; final result: `AgentBoard validation: PASS`, `Checked 12 task files.`

## Known Limitations

- Frontmatter parsing intentionally supports the current simple YAML-style task format, including scalar fields and inline arrays, but it is not a full YAML parser.
- The validator is read-only by design and does not auto-fix issues.

## Follow-up Recommendations

- Consider adding the validator command to a future CI workflow once the repository has a CI setup.

## Reviewer Approval

Approved by reviewer on 2026-05-08.

Validation confirmed that `scripts/validate-agentboard.js` exists, is safe/read-only, uses only Node.js built-in modules, checks status/folder alignment, dependency references, ready-task dependency satisfaction, done-task reviewer approval, required sections, and practical YAML-style frontmatter. `README.md` documents `node scripts/validate-agentboard.js`. Reviewer reran the validator and confirmed `AgentBoard validation: PASS`, `Checked 12 task files.`
