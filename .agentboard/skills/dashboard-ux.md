# Dashboard UX Skill

## Purpose

Use this skill when evaluating dashboard usability, visual hierarchy, information density, task-card clarity, validation visibility, responsive behavior, and read-only interaction design for the AgentBoard dashboard branch.

This skill is a UX decision framework. It helps UX/UI agents turn dashboard observations into prioritized roadmap recommendations before builder implementation.

## Applies To

- ux-ui
- builder when translating UX guidance into implementation tasks
- reviewer when validating dashboard UX changes

## Dashboard Context

The dashboard is a local read-only AgentBoard operations surface. It helps a project owner or agent operator inspect Markdown task files moving through the AgentBoard workflow.

Current core surfaces:

- header with project identity, theme toggle, and metrics
- validation panel
- Skill Library section
- Active work summary
- canonical AgentBoard workflow columns
- capped Done lane
- task cards with status rails, metadata, and details affordance
- task detail drawer
- light and dark modes
- workflow helper scripts surfaced through docs and validation

## Primary User Jobs

Evaluate every dashboard idea against these jobs:

1. Confirm board health.
2. Find work that needs attention now.
3. Understand ownership, priority, dependencies, and requested skills.
4. Inspect task details without opening source files unnecessarily.
5. Trust that the dashboard is read-only unless write behavior is explicitly introduced.
6. Recover quickly from validation failures or workflow mismatches.

If a proposed feature does not improve one of these jobs, it should be deferred.

## Decision Order

Use this order when deciding what matters most:

1. Validation and workflow health.
2. Actionable work: blocked, review, in-progress, and ready tasks.
3. Task ownership and priority.
4. Dependencies and status mismatch risks.
5. Requested skills and expected files.
6. Historical context such as Done tasks.
7. Lower-frequency customization such as density preferences or filters.

The dashboard can show all of these, but it should not give them equal weight.

## Scanability Framework

Good scanability means the user can answer "what needs attention?" in a few seconds.

Check:

- Is validation visible before the full board?
- Is active work easier to find than completed history?
- Are blocked/review tasks visually distinguishable without shouting?
- Do empty states consume less attention than real tasks?
- Are task cards comparable across columns?
- Does the Done lane preserve count without dominating the page?

Prefer:

- compact summaries above detailed lanes
- capped or collapsed historical content
- clear counts and labels
- short, specific empty states
- status rails and badges over heavy colored backgrounds

Avoid:

- equal visual weight for active work, empty lanes, and history
- large explanatory copy inside the app
- decorative panels that push tasks down
- metadata rows that force users to parse everything at once

## Information Hierarchy

Task-card hierarchy should generally be:

1. status rail from the lane
2. task ID and title
3. priority and assigned agent
4. objective preview
5. risk metadata: blocked dependency, status mismatch
6. requested skills and expected files
7. details affordance

Detail-drawer hierarchy should generally be:

1. task ID, title, and path
2. status/folder alignment
3. agent, priority, dependencies, skills, expected files, parallel metadata
4. frontmatter for traceability
5. task sections

Metadata should help the user decide whether to open details. It should not turn cards into dashboards inside dashboards.

## Task Card Density Decisions

Use card space conservatively.

Show on cards:

- task ID
- title
- priority
- assigned agent
- dependency state
- status mismatch when present
- requested skills when present
- details affordance

Avoid on cards:

- full file paths
- long frontmatter values
- completion notes
- large skill descriptions
- mutation buttons or menus

Cap repeated metadata such as skills when needed. Put complete metadata in the detail drawer.

## Validation And Error-State Decisions

Validation should stay near the top because it answers "is the board trustworthy?"

When validation passes:

- keep the state compact
- show checked task count
- keep Refresh available

When validation fails:

- show file and message
- add next-action guidance when practical
- preserve raw validator detail
- avoid hiding the full board unless the board cannot load

Empty states should be short and operational, such as "No blocked tasks" or "No review tasks."

## Read-Only Versus Mutation Boundary

This branch is read-only unless a future task explicitly adds safe write behavior.

Read-only UX may include:

- opening task details
- refreshing validation
- toggling theme
- filtering or focusing visible data
- showing helper command guidance

Mutation UX requires separate design scrutiny:

- task creation
- moving tasks
- editing frontmatter or body
- approving reviews
- assignment changes
- deletion

Before recommending mutation features, specify:

- the workflow risk
- undo or recovery expectations
- validation behavior before and after mutation
- whether the operation belongs in the dashboard or should remain CLI/file-based

## Responsive And Accessibility Expectations

Responsive checks:

- active work should remain reachable near the top on mobile
- cards and metadata must not overflow narrow columns
- skill chips and expected files must wrap
- drawer content should not require horizontal scrolling
- empty states should not dominate stacked mobile layout

Accessibility checks:

- clickable rows/cards should be semantic buttons
- metadata chips should not look interactive unless they are interactive
- focus states should be visible in light and dark mode
- color must not be the only signal for validation, blocked, or mismatch states
- task details must have a keyboard-reachable close control

Use `accessibility-review` for detailed interaction and focus checks.

## Roadmap Prioritization Criteria

Score roadmap ideas by:

- User value: how directly it helps the operator decide what to do next.
- Workflow risk reduction: how much it prevents status, dependency, validation, or coordination mistakes.
- Implementation cost: small, medium, or large.
- Dependency order: what must exist first.
- Reversibility: whether the change can be adjusted without data risk.
- Read-only fit: whether it preserves current dashboard boundaries.

Prefer early roadmap items that are high value, low risk, read-only, and easy to validate.

## Roadmap Artifact Expectations

A dashboard roadmap artifact should include:

- current UX thesis
- what is already working
- decision-framework application
- prioritized roadmap table
- near-term tasks
- mid-term opportunities
- later or explicitly deferred items
- implementation boundaries
- accessibility and validation implications
- recommended next AgentBoard tasks

Roadmaps should recommend tasks, not silently implement them.

## Common UX Failure Modes

- Active work is technically visible but buried below empty states or history.
- Done history dominates because it is easy to render and always populated.
- Skill or dependency metadata becomes more prominent than title and status.
- Chips look clickable but do nothing.
- The dashboard suggests task mutation is available when it is not.
- Validation failures show raw errors but no operator path forward.
- Mobile layout preserves all content but makes the user scroll too far before reaching actionable work.
- New filters hide important validation or blocked states.
- Roadmaps recommend large write features before read-only trust and inspection are solid.

## UX/UI Completion Notes Reporting

When an agent uses this skill, Completion Notes should include:

- `Skill used: dashboard-ux`
- Which decision-framework sections were applied.
- Which checks were not applicable and why.
- Whether the output is guidance, roadmap, review, or implementation support.
- Any follow-up tasks recommended.

Example:

```text
Skill used: dashboard-ux.
Applied primary user jobs, scanability, task-card density, read-only boundary, and roadmap prioritization criteria.
Not applicable: mutation-boundary design details, because the roadmap keeps all near-term work read-only.
```

## Out Of Scope

- Drag-and-drop task movement.
- Parallel execution controls.
- MCP/tool invocation UI.
- Background automation.
- Mutation behavior without a dedicated future task.
