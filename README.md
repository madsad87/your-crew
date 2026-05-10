# Your Crew

Your Crew is a Markdown-driven multi-agent workflow system for Codex. It gives AI agents a shared, inspectable board for coordinating work through task files instead of relying on hidden state or simulated conversation.

It is for builders who want several specialized agents to work in one repository with explicit ownership, review gates, dependency tracking, and durable handoffs.

## How AgentBoard Works

The `.agentboard/` directory is the coordination layer. Task files move through folders that represent workflow state:

```txt
inbox -> ready -> in-progress -> review -> done
```

Blocked tasks move to `.agentboard/blocked/` until the missing information, dependency, validation failure, or external blocker is resolved.

The main board folders are:

- `.agentboard/inbox/`: captured or dependent tasks that are not ready to claim
- `.agentboard/ready/`: actionable tasks whose dependencies are complete
- `.agentboard/in-progress/`: tasks currently claimed by an agent
- `.agentboard/review/`: completed work waiting for reviewer validation
- `.agentboard/done/`: reviewed and approved tasks
- `.agentboard/blocked/`: tasks that cannot continue safely
- `.agentboard/artifacts/`: reusable deliverables produced by tasks

Task files remain the source of truth for ownership, status, dependencies, acceptance criteria, completion notes, and review approval.

## Agents

Current agents are listed in `.agentboard/agent-registry.md` and described in `.agentboard/agents/`.

- `orchestrator`: turns user requests into small, dependency-aware tasks
- `content-creator`: writes documentation, content, copy, and reusable Markdown artifacts
- `builder`: implements assigned tasks and validates the work before review
- `reviewer`: validates completed tasks, approves work into done, and unlocks dependencies
- `workflow-runner`: advances the board across roles by processing review tasks before ready tasks
- `repo-ops`: handles simple repository hygiene and Git operations outside the task workflow

`AGENTS.md` is the global protocol source of truth. Individual role files under `.agentboard/agents/` describe role-specific behavior.

## Conversational Entry Point

The orchestrator is the default conversational entry point during normal use. Users do not need to manually say "act as builder", "act as reviewer", or "act as workflow-runner".

The orchestrator chooses the right mode for each request:

- Planning Mode creates new tasks for project work.
- Execution Mode delegates actionable board work to the workflow-runner.
- Status Mode summarizes board state without executing work.
- Clarification Mode asks for missing information or creates a blocked clarification task.

Workflow execution remains sequential by default. Parallel execution, cron jobs, and background automation are not part of the current protocol.

## Running The Workflow Manually

1. Read `AGENTS.md`, `.agentboard/project-profile.md`, and `.agentboard/agent-registry.md`.
2. Pick a task from `.agentboard/ready/` that matches the role you are acting as.
3. Read the matching role file in `.agentboard/agents/`.
4. Claim the task by moving it to `.agentboard/in-progress/` and updating frontmatter `status`.
5. Complete the task according to its acceptance criteria.
6. Update completion notes with files changed, artifacts used or created, assumptions, validation, limitations, and follow-up recommendations.
7. Move the task to `.agentboard/review/`.
8. A reviewer validates the work, moves approved tasks to `.agentboard/done/`, and unlocks dependent tasks when all dependencies are complete.

Do not skip review. Implementation, content, and orchestration tasks should not move directly to done.

## Running Workflow-Runner Mode

Workflow-runner mode uses `.agentboard/agents/workflow-runner.md` to advance the board automatically across roles.

The runner:

- checks `.agentboard/review/` before `.agentboard/ready/`
- reads the matching role file before acting as an assigned agent
- claims ready tasks before working on them
- moves completed work to review
- reviews completed work before moving it to done
- unlocks dependent tasks when prerequisites are approved
- stops when no actionable tasks remain, a blocker requires user input, or the loop safety limit is reached

Use workflow-runner mode when you want Codex to continue the board until it reaches a natural stopping point.

## Repo Ops Mode

Repo Ops Mode handles simple repository operations without creating AgentBoard tasks.

Use Repo Ops for requests such as:

- checking git status
- viewing recent commits or logs
- checking or creating branches
- committing completed work
- pushing the current branch
- preparing pull requests

Repo Ops is not for feature work, documentation changes, protocol changes, or implementation work. Those should go through the normal AgentBoard task workflow.

Destructive Git actions such as force push, reset, clean, rebase, or discarding changes require explicit user instruction. When AgentBoard files changed, run the board validator before committing when practical. After commit or push operations, report the branch, latest commit hash, push status, and working tree state.

## Validating The Board

Run the lightweight AgentBoard validator before committing protocol or task-board changes:

```bash
npm run validate
```

You can also run the script directly:

```bash
node scripts/validate-agentboard.js
```

The validator checks task frontmatter, status/folder alignment, dependency references, ready-task dependency satisfaction, reviewer approval on done tasks, and required task sections. It prints a pass/fail summary and lists specific files and issues when validation fails.

## Initializing Another Repository

Use the first-pass initializer to scaffold Your Crew into another repository:

```bash
node scripts/init-agentboard.js --target ../target-repo --dry-run
```

Remove `--dry-run` to write files:

```bash
node scripts/init-agentboard.js --target ../target-repo
```

The initializer creates the base `.agentboard/` folders, copies the global protocol, base agent files, task template, agent registry, and validator script, then generates a starter `.agentboard/project-profile.md`.

It is safe by default: existing files are skipped. Use `--force` only when you intentionally want to overwrite existing protocol files in the target repository.

Project profile values can be provided with flags:

```bash
node scripts/init-agentboard.js --target ../target-repo \
  --project-name "Customer Portal" \
  --project-type "Web app" \
  --tech-stack "TypeScript, React, Node.js" \
  --goal "Coordinate feature work through AgentBoard" \
  --avoid "Secrets, production data, generated build output" \
  --optional-skills "frontend design, accessibility, CI review"
```

The generated profile also records the initial setup questionnaire:

- What are we building?
- What type of project is this?
- What technology stack is used?
- What is the main project goal?
- What should agents avoid touching?
- Which optional specialists or skills might be useful later?

This first pass does not implement skills, MCP integrations, parallel agents, or background automation. The project profile includes `Enabled Agents` and `Enabled Skills` sections so those can be added deliberately later.

## First Completed Workflow

The first completed Your Crew workflow built the static homepage and then improved the protocol based on what the workflow revealed.

The chain covered:

- `TASK-0001`: homepage copy by `content-creator`
- `TASK-0002`: semantic HTML structure by `builder`
- `TASK-0003`: responsive CSS styling by `builder`
- `TASK-0004`: final homepage review by `reviewer`
- `TASK-0005`: protocol cleanup after the workflow

The reusable demo write-up is stored at `.agentboard/artifacts/TASK-0007-demo-homepage-workflow.md`.

Later homepage updates added:

- a "How Your Crew Works" visual workflow section
- a CSS-only Light/DOS radio theme toggle
- a DOS-inspired green-and-black dark mode treatment

The natural-language routing behind those demos is documented in `docs/natural-language-demo-workflows.md`.

## Current Status

Current project state:

- Markdown task board structure
- Global protocol in `AGENTS.md`
- Agent registry
- Role files for orchestrator, content creator, builder, reviewer, workflow-runner, and repo-ops
- Task template with claiming, artifacts, validation, completion notes, and reviewer approval fields
- Completed homepage workflow demonstrating the board
- Orchestrator default conversational entry point
- Workflow-runner delegation and compact summaries
- Lightweight AgentBoard validator
- First-pass initializer for scaffolding Your Crew into another repository
- `npm run validate` script
- Repo Ops Mode for simple Git operations outside task workflow
- Homepage workflow explainer section and DOS-inspired dark mode toggle

## Key Files

- `AGENTS.md`: global AgentBoard protocol
- `.agentboard/templates/task.md`: task file template
- `.agentboard/agent-registry.md`: active agent registry
- `.agentboard/agents/`: role-specific agent instructions
- `.agentboard/artifacts/`: reusable task deliverables
- `docs/natural-language-demo-workflows.md`: demo notes for conversational orchestration and workflow-runner routing
- `scripts/init-agentboard.js`: first-pass initializer for scaffolding Your Crew into another repository
- `scripts/validate-agentboard.js`: read-only AgentBoard validator
- `package.json`: project metadata and `npm run validate` script
- `index.html` and `styles.css`: static homepage produced by the first workflow
