---
id: TASK-0019
title: "Create AgentBoard initializer script"
status: done
assigned_agent: builder
priority: high
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-10
---

# User Request

Create a first-pass initializer script that can scaffold Your Crew into another repository.

# Objective

Move Your Crew from a working prototype repo toward an installable MVP by adding a dependency-free initializer that can create the base AgentBoard structure, protocol files, role files, task template, validator, and starter project profile in a target repository.

# Acceptance Criteria

- [x] Initializer script exists under `scripts/`.
- [x] Initializer creates the base AgentBoard directory structure.
- [x] Initializer can generate or copy the base protocol files.
- [x] Initializer avoids overwriting existing files by default.
- [x] Initializer supports or documents dry-run behavior.
- [x] Project profile generation includes the initial setup questions or a documented placeholder for them.
- [x] README.md explains how to run the initializer.
- [x] Board validator passes.
- [x] Existing homepage implementation is not modified.
- [x] Existing completed historical task files are not modified except normal task movement for this new task.

# Context

The initializer should create:

- `.agentboard/inbox`
- `.agentboard/ready`
- `.agentboard/in-progress`
- `.agentboard/review`
- `.agentboard/done`
- `.agentboard/blocked`
- `.agentboard/artifacts`
- `.agentboard/agents`
- `.agentboard/templates`

It should copy or generate:

- `AGENTS.md`
- `.agentboard/project-profile.md`
- `.agentboard/agent-registry.md`
- `.agentboard/templates/task.md`
- base agent files for orchestrator, builder, content-creator, reviewer, workflow-runner, and repo-ops
- `scripts/validate-agentboard.js`

Initial setup questions:

1. What are we building?
2. What type of project is this?
3. What technology stack is used?
4. What is the main project goal?
5. What should agents avoid touching?
6. Which optional specialists or skills might be useful later?

# Agent Instructions

- Act as `builder`.
- Prefer a dependency-free Node.js script.
- Do not overwrite existing files unless explicitly allowed.
- Support a safe dry-run mode if practical.
- For this first pass, do not fully implement skills, MCPs, parallel agents, or background automation.
- Design the project profile format so enabled agents and enabled skills can be added later.
- Update `README.md` with initializer usage.
- Do not modify homepage implementation files.
- Do not modify completed historical task files except normal movement of this new task.

# Deliverables

- Initializer script under `scripts/`.
- Updated README initializer documentation.
- Completed validation notes.

# Artifacts

## Created

None.

## Used

None.

# Validation

Run `npm run validate` and perform a safe dry-run or temporary-target smoke test of the initializer when practical.

# Completion Notes

## Summary of Work Completed

Added a dependency-free Node.js initializer script that scaffolds Your Crew into a target repository. The script creates the base AgentBoard directory structure, copies the global protocol, agent registry, task template, base role files, and validator script, and generates a starter project profile with setup questions plus future-ready enabled agents and skills sections. Updated README usage documentation.

## Files Changed

- `scripts/init-agentboard.js`
- `README.md`
- `.agentboard/review/TASK-0019-create-agentboard-initializer-script.md`

## Artifacts Created or Used

None.

## Assumptions Made

The first-pass initializer should be run from this repository or a future package copy where the base protocol files exist relative to the script. It should scaffold files rather than install npm dependencies or configure package scripts in the target repository.

## Validation Performed

- Ran `node scripts/init-agentboard.js --target "$env:TEMP\your-crew-init-dry-run" --dry-run ...`; dry-run listed planned folders and files without writing.
- Ran the initializer against a unique temp target; it created the expected AgentBoard folders and files.
- Ran the initializer a second time against the same temp target without `--force`; existing files were skipped.
- Ran the copied temp-target validator; result: `AgentBoard validation: PASS`, `Checked 0 task files.`
- Ran `npm run validate` in this repository; result: `AgentBoard validation: PASS`, `Checked 19 task files.`

## Known Limitations

The initializer is a first-pass scaffold and does not implement skills, MCP integrations, parallel agents, background automation, package installation, or interactive prompting.

## Follow-up Recommendations

Consider a later task for an interactive questionnaire mode and a package-level command once the installer shape is decided.

## Reviewer Approval

Approved by reviewer on 2026-05-10. Validation confirmed the initializer exists under `scripts/`, creates the required AgentBoard folder structure, copies/generates the required base files, skips existing files by default, supports `--dry-run`, generates a project profile with setup questions and future-ready enabled agents/skills sections, and README documents usage. Smoke testing confirmed scaffold creation, default non-overwrite behavior, and copied validator success. `npm run validate` passes.
