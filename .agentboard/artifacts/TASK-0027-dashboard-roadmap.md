# AgentBoard Dashboard Roadmap

Task: TASK-0027  
Role: ux-ui  
Skill used: dashboard-ux  

## UX Thesis

The dashboard should become a trustworthy read-only operations console before it becomes a workflow mutation tool. The next roadmap should deepen the user's ability to see board health, understand what needs attention, and inspect task context without making the dashboard feel like a second task editor.

## What Is Already Working

- Validation is visible near the top and refreshable.
- Active work is summarized above the full board.
- The canonical AgentBoard columns remain visible.
- Done history is capped and no longer dominates.
- Task cards expose core metadata and a clear details affordance.
- Skill metadata is visible without becoming interactive.
- The detail drawer preserves source frontmatter and task sections.
- Light/dark mode and read-only behavior are preserved.
- Workflow helper scripts now tighten preflight, movement, metadata checks, and runtime checks.

## Decision Framework Application

### Primary User Jobs

The roadmap prioritizes work that helps the operator:

- confirm board health
- find actionable tasks quickly
- understand ownership, dependencies, priority, and skills
- inspect task details safely
- recover from validation failures

### Decision Order

Near-term work favors validation, actionable work, and inspection quality over lower-frequency customization. Mutation features are deferred until read-only trust, focus controls, and detail accessibility are stronger.

### Read-Only Boundary

The next phase should remain read-only. Task creation, task moves, approval actions, and editing should be designed separately because they introduce workflow risk and recovery requirements.

## Prioritized Roadmap

| Priority | Roadmap Item | User Value | Risk Reduction | Cost | Read-only Fit | Dependency |
|-|-|-|-|-|-|-|
| P1 | Add validation failure next-action guidance | High | High | Small | Yes | None |
| P1 | Improve task detail drawer focus management | High | High | Medium | Yes | Accessibility review guidance |
| P1 | Add compact board focus controls | High | Medium | Medium | Yes | Current metadata model |
| P2 | Compact empty lane states | Medium | Medium | Small | Yes | Current lane layout |
| P2 | Improve dependency/status-risk emphasis | Medium | High | Small | Yes | Existing dependency parsing |
| P2 | Add artifact visibility from task details | Medium | Medium | Medium | Yes | Artifact naming convention |
| P3 | Add dashboard density preference | Medium | Low | Medium | Yes | Stable card patterns |
| P3 | Add saved filter/view state | Medium | Low | Medium | Yes | Filter controls |
| Later | Safe task mutation design | High | High | Large | No | Read-only trust and validation UX |

## Near-Term Tasks

### TASK-A: Add Validation Failure Next-Action Guidance

Goal: Make validation failures easier to act on without hiding raw validator output.

Recommended scope:

- Add a short next-action line when validation fails.
- Keep raw issue file and message visible.
- If issue file maps to a parsed task, allow opening that task detail panel from the issue row only if it can be done without nested interactive conflicts.
- Preserve passing validation compactness.

Validation implications:

- `npm run validate:board`
- `npm run build`
- `npm run smoke:dashboard`

### TASK-B: Add Accessible Detail Drawer Focus Management

Goal: Make task inspection stronger for keyboard users.

Recommended scope:

- Move focus into the drawer on open.
- Close on Escape.
- Restore focus to the originating card on close.
- Keep Close button reachable.
- Avoid broad drawer redesign.

Validation implications:

- Use `accessibility-review`.
- Browser or manual keyboard check is important.
- If browser automation remains unavailable, document manual fallback.

### TASK-C: Add Compact Focus Controls

Goal: Help users narrow the board without losing validation or workflow context.

Recommended scope:

- Add compact controls for status group, assigned agent, priority, and risk states.
- Start with read-only client-side filters.
- Include clear reset behavior.
- Do not hide validation panel.
- Avoid a large side panel.

Validation implications:

- Empty filtered states must be clear.
- Active work and full board should remain understandable.

## Mid-Term Opportunities

### Compact Empty Lanes

Empty columns should remain visible but not compete with real work. Reduce empty lane height or use more specific empty copy such as "No tasks awaiting review" and "No blockers."

### Dependency And Status-Risk Emphasis

The dashboard should visually elevate blocked dependencies and status mismatches more than "no deps" or healthy dependency states. This improves risk scanning without adding new data.

### Artifact Visibility

Task details should surface related `.agentboard/artifacts/` files when a task ID match exists. This would reduce the need to know artifact filenames manually.

## Later Or Deferred Items

### Mutation And Write Features

Task creation, moving, claiming, approval, and editing should stay deferred until a dedicated design pass defines:

- confirmation and undo expectations
- validation before and after writes
- failure recovery
- whether CLI helpers or dashboard controls are the safer workflow

### Saved Views And Density Preferences

Useful later, but they should follow basic focus controls and stable card patterns.

## Recommended Next AgentBoard Tasks

1. Builder: Add validation failure next-action guidance.
2. Builder: Add accessible detail drawer focus management using `accessibility-review`.
3. UX/UI: Design compact read-only board focus controls.
4. Builder: Compact empty lane states.
5. Builder: Surface related artifacts in task detail drawer.

## Accessibility And Validation Implications

- Drawer focus management is the highest accessibility priority.
- Any focus controls must preserve keyboard navigation and visible focus.
- Filtered and empty states must be screen-reader understandable through visible text, not color alone.
- New validation UI should preserve raw issue detail.
- Continue using `npm run validate:board`, `npm run build`, and `npm run smoke:dashboard` for dashboard work.

## Implementation Boundary

This roadmap is guidance only. It does not request code changes in TASK-0027. Builder work should be split into focused follow-up tasks with explicit acceptance criteria.
