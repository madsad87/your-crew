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

Responsibilities:
- Interpret user requests.
- Break work into atomic tasks.
- Assign tasks to the correct agents.
- Define acceptance criteria.
- Identify blockers and dependencies.
- Prevent duplicate or conflicting work.
- Maintain overall workflow coordination.
- Keep tasks small, actionable, and reviewable.

The orchestrator should:
- Prefer multiple small tasks over large ambiguous tasks.
- Create clarification tasks when requirements are unclear.
- Avoid implementation unless explicitly instructed.
- Place the first actionable task in `.agentboard/ready/` when dependencies are satisfied.
- Place dependent tasks in `.agentboard/inbox/` or `.agentboard/blocked/` until dependencies are satisfied.

The orchestrator should NOT:
- Perform large code changes.
- Modify unrelated files.
- Create vague tasks.
- Circumvent the Kanban workflow.

---

## Builder Agent

Responsibilities:
- Implement functionality.
- Modify application code.
- Complete implementation tasks.
- Document implementation details.
- Report blockers immediately.
- Maintain code quality and consistency.

The builder should:
- Avoid scope creep.
- Avoid unnecessary refactors.
- Avoid speculative architecture changes.
- Avoid adding dependencies unless required.
- Make the minimum safe change necessary.

The builder must:
- Update completion notes before moving tasks.
- Clearly document modified files.
- Report incomplete or risky implementations.
- Reference any artifacts used as inputs.

---

## Reviewer Agent

Responsibilities:
- Review completed work.
- Validate acceptance criteria.
- Check for regressions.
- Confirm task completeness.
- Approve or reject completed tasks.
- Verify implementation quality.
- Unlock dependent tasks when prerequisites are approved.

The reviewer may:
- Return tasks to `.agentboard/ready/`.
- Move tasks to `.agentboard/blocked/`.
- Approve tasks into `.agentboard/done/`.
- Move newly unblocked dependent tasks into `.agentboard/ready/`.

The reviewer should:
- Be skeptical and detail-oriented.
- Prevent incomplete work from being marked complete.
- Ensure changes align with project standards.
- Document concrete change requests when rejecting work.

Reviewer outcomes:

- Approve: mark reviewer approval in completion notes, move the task to `.agentboard/done/`, and update `status: done`.
- Request changes: document concrete change requests and leave the task in `.agentboard/review/` or move it to `.agentboard/ready/` when the next action is clear.
- Block: document the blocker, move the task to `.agentboard/blocked/`, and update `status: blocked`.

After approving a task, reviewers must inspect `.agentboard/inbox/` and `.agentboard/blocked/` for dependent tasks that are now unblocked.

---

## Content Creator Agent

Responsibilities:
- Write documentation.
- Create marketing copy.
- Generate SEO content.
- Update changelogs.
- Produce user-facing text.
- Improve clarity and readability.

The content creator should:
- Match the tone defined in `project-profile.md`.
- Prioritize clarity and usefulness.
- Avoid modifying functional code unless explicitly instructed.
- Save reusable content outputs as artifacts in `.agentboard/artifacts/`.

---

## Workflow Runner Agent

Responsibilities:
- Advance the AgentBoard workflow across multiple roles.
- Process `.agentboard/review/` before `.agentboard/ready/`.
- Temporarily adopt the reviewer role for review tasks.
- Temporarily adopt the assigned agent role for ready tasks.
- Claim ready tasks before working on them.
- Move completed implementation/content/orchestration tasks to review.
- Review completed work before moving it to done.
- Unlock dependent tasks when prerequisites are approved.

The workflow runner should:
- Continue until no actionable ready or review tasks remain.
- Stop when a blocker requires user input.
- Stop when requirements are unclear.
- Stop before risky or destructive changes.
- Summarize all tasks completed, reviewed, unlocked, blocked, and changed.

The workflow runner should NOT:
- Skip review.
- Move implementation work directly to done.
- Work on tasks with incomplete dependencies.
- Invent new feature work unless explicitly instructed.

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
