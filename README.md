# AgentBoard Dashboard

A local React dashboard for viewing AgentBoard Markdown tasks as a Kanban workflow.

This project is a companion UI for the Your Crew / AgentBoard workflow. AgentBoard uses Markdown task files under `.agentboard/` as the source of truth for AI-agent coordination. This dashboard makes those task files visible as workflow lanes so a project owner can quickly see what is in inbox, ready, in progress, review, done, or blocked.

## Setup

```bash
npm install
```

## Local Development

```bash
npm run dev
```

The Vite development server starts the dashboard and exposes the local read-only API used by the UI.

## Build And Test

```bash
npm test
npm run build
npm run validate:board
```

## Current Scope

The current MVP is read-only. It can:

- Render `.agentboard` task files in Kanban workflow columns.
- Show task cards with ID, title, priority, assigned agent, dependency state, and source path.
- Open a task detail drawer with frontmatter and key Markdown sections.
- Run AgentBoard validation from the dashboard and show pass/fail status.

It does not edit, move, claim, approve, or create task files.

## How Board Data Is Read

The dashboard reads Markdown task files from these folders:

- `.agentboard/inbox`
- `.agentboard/ready`
- `.agentboard/in-progress`
- `.agentboard/review`
- `.agentboard/done`
- `.agentboard/blocked`

Task parsing lives in `scripts/lib/agentboard-parser.js`. The parser reads YAML frontmatter with `gray-matter`, preserves the Markdown body, extracts top-level sections, and groups tasks by folder status.

The browser does not read the filesystem directly. During local development, Vite loads `scripts/lib/agentboard-api.js`, which exposes read-only API endpoints for the React UI.

## Local API

The Vite development server exposes read-only AgentBoard endpoints for the dashboard:

- `GET /api/board` returns `{ ok, data }`, where `data.tasks` is the full task list and `data.columns` is grouped by AgentBoard status.
- `GET /api/tasks/:id` returns `{ ok, data }` for a single task or `{ ok: false, status: 404, error }` when the task is missing.
- `GET /api/validate` or `POST /api/validate` runs `scripts/validate-agentboard.js` and returns `{ ok, data: { exitCode, stdout, stderr, checkedTaskCount, issues } }`.

## Validation

Run AgentBoard validation from the command line:

```bash
npm run validate:board
```

The dashboard also runs validation through `/api/validate`. Validation is read-only and uses the existing `scripts/validate-agentboard.js` rules for frontmatter, required sections, status/folder alignment, dependencies, and reviewer approval.

## Read-Only Limits

The MVP intentionally avoids task file mutations. Use the Markdown task files and AgentBoard protocol directly for workflow changes until write actions are implemented. The UI should be treated as a viewer and validator, not as the source of truth.

## Sensible Next Features

- Add safe workflow actions for moving tasks between folders while updating frontmatter status.
- Add task creation from `.agentboard/templates/task.md`.
- Add filters by assigned agent, priority, status mismatch, and dependency state.
- Add search across task titles, sections, and source paths.
- Add artifact links from `.agentboard/artifacts`.
- Add production packaging if the dashboard needs to run outside Vite development mode.
