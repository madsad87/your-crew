# Current Dashboard UX/UI Review

Task: TASK-0012  
Role: ux-ui  
Scope: Read-only AgentBoard dashboard MVP  

## Summary

The dashboard is already usable as a read-only operations surface: status columns map clearly to AgentBoard folders, validation is visible before the board, task cards expose the right core metadata, and the detail drawer preserves deeper task context.

The next improvements should focus on faster operator scanning. The current view gives empty lanes, active lanes, and completed history similar weight, so users can understand the board but may spend extra time finding the work that needs attention.

## Primary Workflow

The main user is checking board health and deciding what needs action next:

- confirm validation state
- identify active, review, blocked, or ready work
- scan task priority and ownership
- open details only when a task needs deeper inspection

## Findings

### Scanability

- Validation state is high enough on the page and reads clearly.
- The six-lane board is easy to understand because it mirrors the AgentBoard folder model.
- Empty columns consume similar visual space to active columns, especially on narrow screens.
- Completed history can dominate the page when most tasks are done.
- Active work is findable, but it competes with empty states and historical tasks.

### Visual Hierarchy

- Header hierarchy is clear: product label, theme control, title, description, and metrics.
- The metric cards help set context but are less actionable than validation and active work.
- Column counts are useful, but columns with `0` tasks still feel visually heavy.
- The status rail on task cards is a strong reusable signature and should remain.

### Task Card Clarity

- Cards expose the useful MVP metadata: task ID, title, objective, priority, assigned agent, and dependency state.
- The card-as-button pattern supports opening details without extra controls.
- Card affordance could be clearer; the current card looks clickable mainly through hover/focus behavior.
- Dependency pills are useful, but "no deps" is usually lower priority than owner, priority, and current status.

### Validation Visibility

- Passing validation is easy to recognize.
- The refresh button is obvious and compact.
- Failure states should add clearer next-action guidance so users know whether to inspect a task file, move a task, or correct frontmatter.
- Validation issue rows should remain file-first because AgentBoard is file-backed.

### Empty States

- Empty state copy is concise and understandable.
- Empty columns take too much vertical room when several columns are empty.
- Empty states could communicate operational meaning more directly, such as "No tasks awaiting review" or "No blockers."

### Responsive Behavior

- The layout stacks predictably and avoids obvious overflow.
- On mobile, users must pass through header, metrics, validation, and empty lanes before reaching some useful content.
- Six equal columns work conceptually, but narrow desktop widths can make cards feel compressed.
- The detail drawer should remain full-width on small screens and constrained on larger screens.

### Accessibility

- The theme toggle uses a real button with `aria-pressed`.
- Task cards are keyboard-reachable buttons with visible focus rings.
- The detail panel has a labeled close button and click-away behavior.
- Future checks should verify dark-mode contrast for low-emphasis labels, badges, and tinted status surfaces.
- Icon-only controls, if added later, should include accessible names and visible focus states.

## Prioritized Recommendations

### P1: Make Actionable Work Easier To Reach

Builder handoff:
- Add an "Needs attention" or "Active work" summary row above the full board that lists ready, in-progress, review, and blocked tasks.
- Alternatively, on mobile only, order non-empty actionable columns before empty columns and completed history.
- Keep the canonical folder board visible below or alongside the summary.

Acceptance considerations:
- If any ready, in-progress, review, or blocked task exists, at least one actionable task should be visible near the first viewport on mobile.
- The full AgentBoard workflow should remain discoverable.

### P1: Reduce Completed History Dominance

Builder handoff:
- Cap the Done lane preview to the most recent few tasks.
- Add a compact "Show all done" affordance or make the Done lane internally scrollable.
- Preserve the Done count in the column header.

Acceptance considerations:
- Done history does not push review or blocked state out of the main scan path.
- Users can still inspect completed tasks from the dashboard.

### P2: Compact Empty Columns

Builder handoff:
- Give empty lanes a shorter minimum height than populated lanes.
- Use more specific empty messages by lane.
- Consider collapsing repeated empty states into a compact row on mobile.

Acceptance considerations:
- Empty states remain visible and understandable.
- Empty lanes should not visually outweigh active lanes.

### P2: Strengthen Task Card Affordance

Builder handoff:
- Add a subtle details affordance, such as a chevron, "Details" micro-label, or stronger hover/focus treatment.
- Keep the full card clickable and avoid adding large nested buttons.
- Preserve the status rail and dense card structure.

Acceptance considerations:
- Keyboard focus remains visible.
- Card layout does not grow substantially.
- The affordance works in light and dark modes.

### P2: Improve Validation Failure Guidance

Builder handoff:
- Add a short "Next action" line when validation fails.
- Keep raw file and message details visible.
- If practical, connect issue file paths to the matching task detail view.

Acceptance considerations:
- Passing validation remains compact.
- Failing validation explains both what failed and what the operator should do next.

### P3: Tune Metadata Priority On Cards

Builder handoff:
- Keep task ID, title, priority, and assigned agent prominent.
- De-emphasize "no deps" when there are no dependency concerns.
- Elevate dependency warnings only when dependencies are blocked or mismatched.

Acceptance considerations:
- Task cards remain easy to compare.
- Dependency problems stand out more than dependency absence.

### P3: Add Lightweight Focus Controls Later

Builder handoff:
- Consider compact filters for status, assigned agent, priority, dependency state, and status mismatch.
- Use a toolbar or segmented controls rather than a large filter panel.

Acceptance considerations:
- Filters must include a clear reset state.
- Filtering should not hide validation status.

## Builder Boundary

This artifact is design guidance only. It recommends follow-up implementation tasks but does not request code changes as part of TASK-0012.

## Suggested Follow-Up Task Order

1. Add active-work summary or mobile-first active ordering.
2. Cap or collapse Done history.
3. Compact empty column states.
4. Add clearer task card detail affordance.
5. Add validation failure next-action guidance.
6. Add lightweight focus filters if task volume grows.
