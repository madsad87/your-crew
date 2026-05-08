# Demo Workflow: Homepage Build

This artifact summarizes the first completed Your Crew workflow: building and reviewing a static homepage through the AgentBoard task system.

## Workflow Goal

Create a homepage for Your Crew with a hero section, features section, and CTA while exercising the Markdown-based multi-agent workflow from task creation through review.

## Chronological Task Summary

### TASK-0001: Define Homepage Copy

- Agent: `content-creator`
- Outcome: Created approved homepage copy for the hero, feature cards, and CTA.
- Key output: `.agentboard/artifacts/TASK-0001-homepage-copy.md`
- Workflow movement: The content task moved from ready to in-progress, then to review, then to done after reviewer approval.

### TASK-0002: Implement Homepage HTML Structure

- Agent: `builder`
- Outcome: Created `index.html` as the static homepage entrypoint.
- Key output: Semantic HTML structure with header, hero, features, feature articles, and CTA.
- Workflow movement: The builder used the approved copy artifact, completed the HTML structure, moved the task to review, and a reviewer approved it into done.

### TASK-0003: Style Homepage And Make It Responsive

- Agent: `builder`
- Outcome: Added `styles.css` and linked it from `index.html`.
- Key output: Plain CSS with visual hierarchy, responsive feature grid, mobile layout rules, and hover/focus states.
- Workflow movement: The styling task was unlocked after TASK-0002 was approved, then completed, reviewed, and approved.

### TASK-0004: Review Homepage Quality

- Agent: `reviewer`
- Outcome: Completed final homepage review for content, structure, and responsiveness.
- Key output: Final approval notes confirming all requested sections were present, copy matched positioning, semantic structure was clear, and CSS covered desktop/mobile readability.
- Workflow movement: The final review task moved to done after documenting non-blocking follow-up recommendations.

### TASK-0005: Improve AgentBoard Protocol

- Agent: `builder`, reviewed by `reviewer`
- Outcome: Cleaned up and clarified the AgentBoard protocol after the first full workflow.
- Key output: Updated `AGENTS.md`, `.agentboard/templates/task.md`, and role files under `.agentboard/agents/`.
- Workflow movement: The protocol task was completed after the homepage workflow exposed missing rules around claiming, artifacts, validation fallback, review outcomes, and dependency unlocking.

## Agent Contributions

- `orchestrator`: Broke the homepage request into a dependency-ordered task chain and assigned the right agents.
- `content-creator`: Produced reusable homepage copy as source material for implementation.
- `builder`: Implemented the static HTML structure and styling while preserving approved content.
- `reviewer`: Validated task outputs, approved completed work, and unlocked dependent tasks.
- `workflow-runner`: Later formalized how the board can be advanced across roles while preserving review gates.

## Board Behavior Demonstrated

- Work began as small Markdown task files with explicit owners and acceptance criteria.
- Dependencies controlled when tasks became ready.
- Builders and content creators moved completed work to review instead of done.
- Reviewers approved work into done and unlocked follow-on tasks.
- Artifacts carried reusable outputs between agents without replacing task status or completion notes.

## Lessons For README Documentation

- Your Crew is easiest to explain through the board lifecycle: ready, in-progress, review, done, and dependency unlocking.
- The homepage workflow is a useful demo because it includes content, implementation, styling, review, and protocol refinement.
- README instructions should distinguish manual operation from workflow-runner mode.
- The README should point users to `AGENTS.md` for global protocol and `.agentboard/agents/` for role-specific behavior.
- The README should explain that artifacts are reusable work products, while task files remain the source of truth for workflow status.
