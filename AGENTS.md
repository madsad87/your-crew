# AgentBoard System Instructions

This repository uses a Markdown-based Kanban workflow for coordinating AI agents inside Codex.

All agents must follow the rules in this document.

---

# System Overview

The `.agentboard/` directory acts as the shared coordination system for all agents.

Agents communicate ONLY through:
- task markdown files
- task status changes
- completion notes
- shared artifacts when needed

Agents must NOT simulate conversations with each other.

The Markdown task system is the single source of truth for all agent coordination.

---

# Instruction Hierarchy

Agents must apply instructions in this order:

1. User instructions for the current task.
2. `AGENTS.md` for global AgentBoard protocol.
3. `.agentboard/agents/{assigned_agent}.md` for role-specific behavior.
4. The active task file for objective, scope, acceptance criteria, dependencies, and completion requirements.
5. Referenced artifacts and project files for task-specific context.

`AGENTS.md` defines shared workflow rules, task lifecycle, status/folder alignment, claiming, completion, review, dependency unlocking, artifact handling, validation, and definition of done.

Individual role files define how each agent behaves inside that global protocol. They should not duplicate the full protocol.

---

# Conversational Entry Point

The orchestrator is the default conversational entry point for the system during normal use.

Users should not need to manually address specialist agents by saying "act as builder", "act as reviewer", or "act as workflow-runner" during normal use.

When the user gives an instruction, the orchestrator must decide whether to:

- create new tasks
- clarify requirements
- inspect board status
- delegate execution to the workflow-runner
- summarize current progress

The orchestrator may delegate to the workflow-runner when actionable tasks exist in `.agentboard/ready/` or `.agentboard/review/`, or when the user asks to continue existing board work.

The orchestrator should not require the user to say "act as workflow-runner" during normal operation.

Workflow execution remains sequential by default. Parallel execution, cron jobs, and background automation are outside the current protocol unless a future task explicitly adds them.

---

# Repo Ops Commands

Some user requests are repository operations, not AgentBoard project tasks.

Repo Ops commands include:
- checking git status
- committing changes
- pushing changes
- viewing recent commits
- creating branches
- preparing pull requests

For simple Repo Ops commands such as status, commit, push, log, and branch checks, do not create AgentBoard tasks.

If AgentBoard files changed, run the board validator before committing when practical.

Repo Ops must not perform destructive actions such as force push, reset, clean, rebase, or discarding changes unless explicitly instructed by the user.

After commit or push operations, report the current branch, latest commit hash, push status, and working tree state.

---

# Core Workflow

Tasks move through these stages:

    inbox -> ready -> in-progress -> review -> done

Blocked tasks move to:

    blocked

---

# Folder Definitions

## `.agentboard/inbox`

Newly created tasks that have not yet been triaged.

## `.agentboard/ready`

Tasks that are fully defined and ready for execution.

## `.agentboard/in-progress`

Tasks currently claimed and being worked on by an agent.

## `.agentboard/review`

Tasks completed by an agent and awaiting validation or approval.

## `.agentboard/done`

Tasks that have been approved and fully completed.

## `.agentboard/blocked`

Tasks that cannot continue due to missing information, unresolved dependencies, failed validation, or external blockers.

## `.agentboard/artifacts`

Supporting deliverables created by agents when their work produces reusable outputs for other agents.

Artifacts are supporting deliverables, not replacements for task files.

---

# Agent Artifacts

Agents may create supporting artifacts when their work produces reusable outputs for other agents.

Artifacts should be stored in:

    .agentboard/artifacts/

Artifact files should use this naming format:

    TASK-0001-short-description.md

Examples:

    TASK-0001-homepage-copy.md
    TASK-0005-product-requirements.md
    TASK-0012-review-notes.md

Agents must reference any created artifacts in the task Completion Notes.

Task files remain the source of truth for workflow status.

Reusable deliverables should be created directly under `.agentboard/artifacts/` unless the task explicitly requires another location. Artifact filenames should include the task ID.

Artifacts may support implementation or review, but they do not replace task acceptance criteria, workflow status, or completion notes.

---

# Global Agent Rules

All agents must:

- Read `.agentboard/project-profile.md` before beginning work.
- Read `.agentboard/agent-registry.md` before assigning or claiming work.
- Respect task acceptance criteria.
- Prefer small, focused changes.
- Avoid unrelated modifications.
- Update completion notes before moving tasks.
- Use Markdown task files as the source of truth.
- Avoid making assumptions when requirements are unclear.
- Preserve existing architecture unless explicitly instructed otherwise.
- Keep outputs deterministic and traceable.
- Avoid duplicate work already assigned to another agent.

Agents should prefer clarity and maintainability over cleverness.

---

# Agent Responsibilities

## Orchestrator Agent

Creates clear, dependency-aware tasks from user requests and places them in the correct board folders.

Detailed behavior lives in `.agentboard/agents/orchestrator.md`.

---

## Builder Agent

Implements assigned tasks with focused changes, validates the work, and moves completed work to review.

Detailed behavior lives in `.agentboard/agents/builder.md`.

---

## Reviewer Agent

Validates completed work, approves tasks into done, documents required fixes, and unlocks dependencies.

Detailed behavior lives in `.agentboard/agents/reviewer.md`.

Reviewer outcomes:

- Approve: mark reviewer approval in completion notes, move the task to `.agentboard/done/`, and update `status: done`.
- Request changes: document concrete change requests and leave the task in `.agentboard/review/` or move it to `.agentboard/ready/` when the next action is clear.
- Block: document the blocker, move the task to `.agentboard/blocked/`, and update `status: blocked`.

After approving a task, reviewers must inspect `.agentboard/inbox/` and `.agentboard/blocked/` for dependent tasks that are now unblocked.

---

## Content Creator Agent

Produces documentation, content, copy, and reusable Markdown artifacts for assigned tasks.

Detailed behavior lives in `.agentboard/agents/content-creator.md`.

---

## Workflow Runner Agent

Advances the board across roles by processing review tasks before ready tasks until no actionable work remains or a blocker is reached.

Detailed behavior lives in `.agentboard/agents/workflow-runner.md`.

---

# Agents And Skills

Agents are stable roles. They define ownership and responsibility in the workflow.

Skills are reusable capabilities. They provide optional domain-specific guidance that an agent can load when a task needs that capability.

Examples:

- `builder` agent + `react-dashboard` skill
- `reviewer` agent + `accessibility-review` skill
- `content-creator` agent + `seo-content` skill
- `ux-ui` agent + `dashboard-ux` skill

Skills must not replace agents. A task is still assigned to one `assigned_agent`, and that agent remains responsible for the work.

## Skill Library

Skill files live in:

    .agentboard/skills/

The skill registry lives at:

    .agentboard/skill-registry.md

The registry lists known skills, their purpose, status, and likely agent fit. Individual skill files contain reusable guidance for agents.

## Skill Loading Rules

Agents should load skills when relevant:

- Load project enabled skills from `.agentboard/project-profile.md` and `.agentboard/skill-registry.md` when they match the task.
- Load task-specific skills listed in frontmatter `skills`.
- If a task lists a skill that does not exist in `.agentboard/skills/` or `.agentboard/skill-registry.md`, document a blocker or warning before continuing.
- Treat skills as guidance only unless a future task explicitly adds tool or MCP behavior.

Task skill metadata may use:

```yaml
skills: [react-dashboard]
expected_files: [src/App.tsx]
parallel_safe: false
```

`expected_files` is planning metadata. `parallel_safe` is future planning metadata only.

## Skill System Boundaries

The first-pass Skill Library does not:

- change the base agents
- enable parallel execution
- add MCP integrations
- add background automation
- add task mutation controls

Workflow execution remains sequential by default.

---

# Claiming Tasks

When an agent claims a task:

- The task must be in `.agentboard/ready/`.
- All dependencies listed in `depends_on` must already exist in `.agentboard/done/`.
- Move the task file to `.agentboard/in-progress/`.
- Update frontmatter `status` to `in-progress`.
- If `claimed_by` exists, set it to the acting agent name.
- If `claimed_at` exists, set it to the current date.

Agents must not claim tasks assigned to another agent unless the user explicitly instructs them to temporarily act as that agent.

---

# Completing Tasks

When an implementation, content, or orchestration task is complete:

- Verify every acceptance criterion is satisfied.
- Mark satisfied acceptance criteria with `[x]`.
- Update the `# Completion Notes` section before moving the task.
- Move the task file to `.agentboard/review/`.
- Update frontmatter `status` to `review`.

Agents must not move their own completed work directly to `.agentboard/done/`.

---

# Status And Folder Alignment

Task frontmatter `status` must match the containing folder:

- `.agentboard/inbox/` uses `status: inbox`.
- `.agentboard/ready/` uses `status: ready`.
- `.agentboard/in-progress/` uses `status: in-progress`.
- `.agentboard/review/` uses `status: review`.
- `.agentboard/done/` uses `status: done`.
- `.agentboard/blocked/` uses `status: blocked`.

When moving a task, update the file path and frontmatter status in the same change.

---

# Task File Requirements

Every task file must:
- Use Markdown format.
- Include YAML frontmatter.
- Include a unique task ID.
- Include a clear title.
- Include `assigned_agent`.
- Include `status`.
- Include `priority`.
- Include `depends_on`.
- Include `created_by`.
- Include an objective.
- Include acceptance criteria.
- Include relevant context when available.
- Include agent instructions.
- Include completion notes.

---

# Task File Naming

Task files must use this naming format:

    TASK-0001-short-kebab-title.md

Examples:

    TASK-0001-define-homepage-content.md
    TASK-0002-build-homepage-structure.md
    TASK-0003-style-homepage-responsive.md

---

# Task Status Rules

## inbox

Task has been captured but not yet prepared for execution.

## ready

Task is actionable and ready to be claimed.

## in-progress

Task is actively being worked on by an assigned agent.

## review

Task implementation is complete and awaiting validation.

## done

Task has been reviewed and approved.

## blocked

Task cannot continue until blockers are resolved.

---

# Dependency Rules

When creating or reviewing dependent tasks:

- A task may move to `.agentboard/ready/` only when all dependencies are complete.
- A dependency is complete only when the dependent task exists in `.agentboard/done/`.
- Tasks with incomplete dependencies should remain in `.agentboard/inbox/` or `.agentboard/blocked/`.
- Reviewers may unlock dependent tasks after approving prerequisite work.
- Agents must not work on tasks with unresolved dependencies.

When unlocking a task:

- Confirm every task ID in `depends_on` exists in `.agentboard/done/`.
- Move the unlocked task to `.agentboard/ready/`.
- Update frontmatter `status` to `ready`.
- Leave tasks with unresolved dependencies untouched.

---

# Validation Rules

Agents should run the most relevant validation available for the task.

Validation may include:

- Static file inspection.
- Tests or build commands.
- Browser or visual checks.
- Link, schema, or formatting checks.
- Manual comparison against approved artifacts.

If expected tooling is unavailable, agents must:

- Document the unavailable tool.
- Perform the best practical fallback validation.
- Record the fallback in completion notes.
- Note any residual risk for the reviewer.

---

# Completion Notes Requirements

When completing a task, agents must update the `# Completion Notes` section with:

- Summary of work completed.
- Files changed.
- Artifacts created or used.
- Assumptions made.
- Tests or validation performed, when applicable.
- Known limitations or follow-up recommendations.

---

# Definition of Done

A task is considered complete only when:

- Acceptance criteria are satisfied.
- Required files are updated.
- Completion notes are written.
- Reviewer approval is complete.
- No unresolved blockers remain.
- Any dependent tasks are updated or unlocked as appropriate.

---

# System Philosophy

This system prioritizes:

- simplicity
- transparency
- deterministic workflows
- explicit ownership
- human-readable coordination
- minimal hidden state

Agents should operate predictably, conservatively, and collaboratively through the shared Markdown task system.

