# AgentBoard Dashboard (Experimental Branch)

This branch is the **experimental dashboard workspace** for AgentBoard and `your-crew`.

It goes beyond the stable `main` experience by combining:

- a local React/Vite Kanban dashboard,
- a read-only board API for rendering and validating Markdown tasks,
- workflow helper scripts for safe task movement and preflight checks,
- early Skill Library support (skills metadata + registry surfacing), and
- lightweight smoke/validation tooling for iterative protocol development.

If you are looking for the conservative baseline workflow, use `main`. If you want to test dashboard-first coordination and in-progress protocol ideas, use this branch.

## What This Branch Is For

- Rapidly iterating on AgentBoard UX and task metadata behavior.
- Inspecting `.agentboard/` state visually without replacing the Markdown source-of-truth model.
- Testing validation/reporting behavior before broader rollout.
- Prototyping workflow ergonomics (preflight, metadata smoke checks, dashboard validation endpoint).

## Current Capabilities

### Dashboard UI

- Renders `.agentboard` tasks in Kanban columns: inbox, ready, in-progress, review, done, blocked.
- Shows task cards with priority, assignment, dependencies, and skill chips.
- Opens task details with frontmatter + extracted markdown sections.
- Surfaces Skill Library entries from `.agentboard/skill-registry.md`.
- Runs board validation from the UI and displays results.

### Local Read-Only API

Vite exposes local endpoints used by the dashboard:

- `GET /api/board`
  - returns parsed tasks and column-grouped workflow data
  - includes parsed skills metadata when available
- `GET /api/tasks/:id`
  - returns a single parsed task
- `GET /api/validate` / `POST /api/validate`
  - runs board validation and returns structured output

### Workflow / CLI Helpers

- `npm run board:preflight -- TASK-0000`
- `npm run board:move -- TASK-0000 in-progress --agent builder`
- `npm run smoke:metadata -- TASK-0000`
- `npm run smoke:dashboard`
- `npm run validate:board`

## Intentional Limits

This branch is still **read-only at the dashboard layer**:

- No direct task editing in UI.
- No claim/approve/create mutations from UI.
- Markdown task files under `.agentboard/` remain the source of truth.

## Quick Start

```bash
npm install
npm run dev
```

Then open the local Vite URL to use the dashboard.

## Build & Test

```bash
npm test
npm run build
npm run validate:board
```

## Project Layout (Relevant)

- `src/` – React dashboard UI.
- `scripts/lib/agentboard-parser.js` – Markdown + frontmatter parsing.
- `scripts/lib/agentboard-api.js` – Local read-only API implementation.
- `scripts/validate-agentboard.js` – board validation logic.
- `docs/skills-library.md` – Skill Library behavior and boundaries.
- `.agentboard/` – task board source-of-truth and artifacts.

## Why This README Is Different

This README describes the branch as an **experimental integration surface**, not only an MVP viewer. It reflects the branch’s broader tooling and protocol work that may not exist (or may differ) on `main`.
