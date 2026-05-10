---
id: TASK-0013
title: "Add npm validate script"
status: done
assigned_agent: builder
priority: medium
depends_on: [TASK-0012]
created_by: orchestrator
claimed_by: workflow-runner
claimed_at: 2026-05-10
---

# User Request

Add a `package.json` script so users can run `npm run validate` instead of `node scripts\validate-agentboard.js`.

# Objective

Improve validator onboarding by adding a standard npm script for the existing AgentBoard validator and updating documentation to prefer the npm command.

# Acceptance Criteria

- [x] `package.json` exists
- [x] `package.json` includes a `validate` script
- [x] `npm run validate` runs the AgentBoard validator
- [x] README or documentation mentions `npm run validate`
- [x] Existing direct Node command remains usable or documented as an alternative
- [x] No third-party dependencies are added
- [x] Validation command is run and passes

# Context

`TASK-0012` added `scripts/validate-agentboard.js` and documented the direct Node command. This task should provide a more onboarding-friendly npm script without changing validator behavior.

# Agent Instructions

Act as `builder`. Keep the change minimal. Do not modify homepage implementation files. Do not change validator behavior unless required to support the npm script.

# Deliverables

- `package.json`
- Updated validation documentation

# Artifacts

## Created

## Used

# Validation

Run `npm run validate` and document the result.

# Completion Notes

## Summary of Work Completed

Added a minimal `package.json` with a `validate` script that runs the existing AgentBoard validator. Updated README validation instructions to prefer `npm run validate` while keeping the direct Node command documented as an alternative.

## Files Changed

- `package.json`
- `README.md`
- `.agentboard/in-progress/TASK-0013-add-npm-validate-script.md`

## Artifacts Created or Used

- No artifacts created or used.

## Assumptions Made

- Creating `package.json` is appropriate because the project profile already lists Node.js and the validator is a Node script.
- `private: true` is appropriate to prevent accidental npm publication.

## Validation Performed

- Ran `npm run validate`; result: `AgentBoard validation: PASS`, `Checked 13 task files.`

## Known Limitations

- No package lock file was created because no dependencies were installed.

## Follow-up Recommendations

- Use `npm run validate` before committing board or protocol changes.

## Reviewer Approval

Approved by reviewer on 2026-05-10.

Validation confirmed that `package.json` exists, includes `scripts.validate`, and runs the existing AgentBoard validator without adding third-party dependencies. README documents `npm run validate` and keeps the direct `node scripts/validate-agentboard.js` command as an alternative. Reviewer reran `npm run validate`; result: `AgentBoard validation: PASS`, `Checked 13 task files.`
