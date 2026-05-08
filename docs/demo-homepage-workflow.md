# Demo: Homepage Workflow

This document explains the first successful Your Crew workflow: turning a broad homepage request into shipped static site files, reviewed task history, reusable artifacts, and protocol improvements.

## Original Request

The workflow began with a user request to build a homepage for Your Crew with three required sections:

- hero section
- features section
- CTA section

The repository was markdown-first and did not have an existing frontend framework, so the implementation target became a minimal static HTML/CSS homepage.

## Orchestrator Task Breakdown

The orchestrator converted the homepage request into a dependency-ordered AgentBoard chain:

- `TASK-0001`: define homepage copy and section content
- `TASK-0002`: implement homepage HTML structure
- `TASK-0003`: style homepage and make it responsive
- `TASK-0004`: review homepage quality

This kept each task small enough for one focused agent role. Content came first, structure depended on approved content, styling depended on approved structure, and final review depended on the styled page.

After the homepage was complete, the orchestrator created follow-up tasks to document and improve the workflow itself:

- `TASK-0005`: improve the AgentBoard protocol after the homepage workflow
- `TASK-0007`: write a demo workflow artifact
- `TASK-0006`: create the project README
- `TASK-0008`: review the README and demo documentation
- `TASK-0009`: refactor instruction hierarchy and role guidance
- `TASK-0010`: make the orchestrator the default conversational entry point

## Agent Participation

`content-creator` produced the approved homepage copy in `TASK-0001`. That copy defined the hero message, feature cards, and CTA language used by the implementation tasks.

`builder` implemented the homepage in two stages. In `TASK-0002`, the builder created `index.html` with semantic hero, features, and CTA sections. In `TASK-0003`, the builder added `styles.css`, responsive layout rules, and visible hover/focus states.

`reviewer` validated completed work before it moved to `done`. The reviewer approved the homepage copy, HTML structure, CSS styling, and final homepage quality. Review also documented non-blocking recommendations, such as replacing the CTA target with a dedicated getting-started page later.

`workflow-runner` later exercised the board loop across roles. It processed review tasks before ready tasks, claimed ready tasks, temporarily followed assigned role files, moved completed work to review, reviewed completed work before moving it to done, and unlocked dependent tasks when prerequisites were approved.

## Sequential Dependency Unlocking

The workflow demonstrated deterministic dependency handling:

- `TASK-0001` had no dependency, so it started in `ready`.
- `TASK-0002` depended on `TASK-0001`, so it was unlocked only after copy was approved.
- `TASK-0003` depended on `TASK-0002`, so styling began only after the HTML structure was approved.
- `TASK-0004` depended on `TASK-0003`, so final review began only after styling was approved.
- Documentation and protocol tasks followed the completed homepage workflow and used the reviewed task history as source material.

Each dependency was considered complete only when the prerequisite task existed in `.agentboard/done/`. This avoided hidden state and made the workflow auditable from the filesystem.

## Artifacts Created

The workflow produced both user-facing files and reusable AgentBoard artifacts:

- `.agentboard/artifacts/TASK-0001-homepage-copy.md`: approved homepage copy used by the builder
- `index.html`: static homepage entrypoint
- `styles.css`: responsive plain-CSS homepage styling
- `.agentboard/artifacts/TASK-0007-demo-homepage-workflow.md`: reusable summary of the first completed workflow
- `README.md`: project overview, manual workflow instructions, workflow-runner mode, and V1/V1.1 status

Task files in `.agentboard/done/` also became durable historical records because they contain acceptance criteria, completion notes, validation, and reviewer approval.

## Retrospective Improvements

The first workflow exposed places where agents had to infer rules instead of reading explicit protocol instructions. The follow-up protocol work made those rules concrete.

Important improvements included:

- explicit claiming rules for moving tasks from `ready` to `in-progress`
- status and folder alignment rules for every board stage
- completion note requirements for files changed, artifacts, assumptions, validation, limitations, and follow-up recommendations
- artifact naming and storage rules under `.agentboard/artifacts/`
- validation fallback rules when browser or external tooling is unavailable
- reviewer outcomes for approval, change requests, blocked work, and dependency unlocking
- populated role files for orchestrator, content-creator, builder, reviewer, and workflow-runner
- an instruction hierarchy that keeps `AGENTS.md` as the global protocol source of truth
- orchestrator guidance that makes it the default conversational entry point
- workflow-runner invocation guidance for direct use or orchestrator delegation

These improvements turned lessons from the homepage build into reusable operating rules for future workflows.

## What This Proves About V1 And V1.1

The homepage workflow proves that Your Crew V1 can coordinate useful multi-step work with only Markdown files, Git history, role instructions, and deterministic task movement.

V1 demonstrated:

- a working Markdown task board
- explicit task ownership
- sequential dependencies
- reusable artifacts
- review gates before completion
- a completed static homepage built through specialized roles

V1.1 builds on that proof by making the workflow easier to operate and explain:

- clearer global protocol in `AGENTS.md`
- complete role-specific files in `.agentboard/agents/`
- workflow-runner behavior documented as a reusable board loop
- README and demo documentation for onboarding
- orchestrator-as-entry-point behavior so users can say what they want instead of naming internal agent modes

The result is a small but complete demonstration of Your Crew's core promise: AI agents can coordinate through visible, versioned, human-readable workflow files instead of hidden state or ad hoc chat handoffs.
