---
id: TASK-0020
title: "Add reusable CLI installer"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
---

# User Request

Progress Your Crew from a repo-local initializer script toward a reusable CLI installer.

# Objective

Add a local CLI entrypoint and package metadata so the existing initializer can be run as `your-crew init`, while preserving current non-interactive initializer behavior and adding an optional terminal questionnaire mode.

# Acceptance Criteria

- [x] `your-crew init --target <path>` works locally.
- [x] `your-crew init --target <path> --dry-run` works.
- [x] `your-crew init --target <path> --interactive` asks setup questions.
- [x] Non-interactive flags still work.
- [x] `package.json` exposes a `your-crew` bin command.
- [x] `README.md` explains local testing with `npm link`.
- [x] Board validator passes.

# Context

Existing initializer:

- `scripts/init-agentboard.js`

Expected additions:

- Add a CLI entrypoint under `bin/`.
- Add a `package.json` `bin` field for `your-crew`.
- Support `your-crew init`.
- Keep `scripts/init-agentboard.js` behavior reusable.
- Preserve `--target`, `--dry-run`, `--force`, and project profile flags.
- Add optional `--interactive` mode that asks the setup questions in the terminal.

# Agent Instructions

- Act as `builder`.
- Keep implementation dependency-free.
- Do not implement skills, MCPs, parallel agents, or background automation.
- Do not modify homepage implementation files.
- Do not modify completed historical task files except normal movement of this new task.
- Update README with local CLI usage and `npm link` testing.

# Deliverables

- CLI entrypoint under `bin/`.
- Updated reusable initializer script if needed.
- Updated `package.json`.
- Updated `README.md`.
- Completed validation notes.

# Artifacts

## Created

None.

## Used

None.

# Validation

Run `npm run validate` and smoke test CLI init, dry-run, interactive mode, and non-interactive flags against temporary targets.

# Completion Notes

## Summary of Work Completed

Added a reusable CLI entrypoint for `your-crew init`, exposed it through `package.json` `bin`, and refactored `scripts/init-agentboard.js` so existing script usage and the new CLI share the same initializer logic. Added `--interactive` setup questions while preserving non-interactive flags, `--dry-run`, and `--force`. Updated README with local CLI usage and `npm link` testing instructions.

## Files Changed

- `bin/your-crew.js`
- `scripts/init-agentboard.js`
- `package.json`
- `README.md`
- `.agentboard/review/TASK-0020-add-reusable-cli-installer.md`

## Artifacts Created or Used

None.

## Assumptions Made

The CLI should remain dependency-free and package-local for this pass; publishing, package installation workflows, and automated release setup are separate future tasks.

## Validation Performed

- Ran direct script dry-run with non-interactive flags.
- Ran `node bin/your-crew.js init --target <temp> --dry-run` with non-interactive flags.
- Ran `node bin/your-crew.js init --target <temp>` with non-interactive flags and verified generated profile values.
- Ran `node bin/your-crew.js init --target <temp> --interactive` with piped answers and verified generated profile values.
- Ran copied validator in generated temp targets; result: `AgentBoard validation: PASS`, `Checked 0 task files.`
- Ran `npm link`, verified `your-crew init --target <temp> --dry-run`, then ran `npm unlink -g your-crew`.
- Ran `npm run validate`; result: `AgentBoard validation: PASS`, `Checked 20 task files.`

## Known Limitations

Interactive mode is terminal-based and stores answers in the generated project profile only. The CLI currently supports only the `init` command.

## Follow-up Recommendations

Consider adding automated CLI tests and package publishing metadata after the MVP command shape stabilizes.

## Reviewer Approval

Approved by reviewer on 2026-05-11. Validation confirmed `package.json` exposes the `your-crew` bin command, `bin/your-crew.js` supports `your-crew init`, the initializer remains reusable from `scripts/init-agentboard.js`, `--dry-run`, `--force`, non-interactive flags, and `--interactive` are preserved, README documents `npm link` testing, and board validation passes.
