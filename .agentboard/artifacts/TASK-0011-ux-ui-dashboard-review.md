# UX/UI Dashboard Review

Task: TASK-0011  
Scope: Read-only AgentBoard dashboard MVP  
Reviewer role: ux-ui  

## Summary

The dashboard already has a strong MVP foundation: clear product identity, visible validation status, direct Kanban mapping to AgentBoard folders, compact task cards, usable task detail drawer, and light/dark mode support.

The main UX opportunity is to improve scan speed. The current layout gives equal visual weight to every lane, including empty lanes and long done history. For an operator checking what needs attention, the active work and validation state should be easier to reach and compare.

## User Goal

The primary user is a project owner or agent operator. They need to quickly answer:

- Is the board healthy?
- What needs action now?
- Which tasks are blocked, in progress, or awaiting review?
- What task details matter before opening the Markdown file?

## Findings

### Scanability

- The validation panel is highly visible and easy to understand when passing.
- The board exposes all workflow states, but each column has similar visual weight.
- Empty columns consume large vertical space, especially on mobile.
- The done column can dominate because it contains historical tasks while active states may contain only one task.
- Task cards are readable after removing the file path from card display.

### Visual Hierarchy

- Header hierarchy is clear: product label, title, supporting copy, metrics.
- The validation panel competes with the board but appropriately appears before the task lanes.
- Column colors are useful, but pastel lane backgrounds can make the entire page feel busier than the actual task count.
- Active work should have stronger priority than done/history work.

### Responsive Behavior

- Mobile layout stacks cleanly and avoids obvious text overflow.
- On mobile, the user sees header, metrics, validation, then empty inbox before reaching active work.
- Empty states are readable but take too much space when stacked vertically.
- The horizontal density of the desktop grid is useful, but six equal lanes can make cards narrow at some viewport widths.

### Validation Visibility

- Passing validation is clear.
- The refresh action is easy to find.
- Failure states show issue rows with file and message, which is useful.
- Validation status could be paired with "next action" language when failing, so users know whether to inspect a task, move a file, or open the detail drawer.

### Task Card Usability

- Cards now focus on task ID, title, objective, agent, dependency state, and priority.
- The status rail is a useful signature element.
- Task cards are clickable, but the affordance could be stronger through a small "View details" hint, chevron, or consistent hover/focus treatment.
- Dependency pills are useful, but "no deps" and "1 dep done" are lower priority than status, assignee, and title.

### Accessibility Expectations

- The theme toggle uses a button with `aria-pressed`, which is appropriate.
- Task cards are buttons, supporting keyboard access.
- Focus visibility exists through ring styling.
- Future work should confirm contrast in dark mode for low-emphasis labels, status badges, and pastel column treatments.

## Prioritized Recommendations

### P1: Prioritize Active Work Above Empty Workflow Lanes

Builder handoff:
- On mobile, render non-empty columns before empty columns, or add a compact "Active work" section above the full board.
- On desktop, consider reducing empty lanes to shorter empty-state panels.
- Keep the full workflow visible, but make active/in-progress/review/blocked content faster to reach.

Acceptance considerations:
- Active task should be visible above the fold on mobile when any active task exists.
- Empty columns should remain discoverable without dominating the first screen.

### P1: Reduce Done Column Dominance

Builder handoff:
- Collapse done history by default after the first few completed tasks.
- Add a compact "show all done" control or make done a scrollable lane with a clear max height.
- Preserve count visibility.

Acceptance considerations:
- Done count remains visible.
- Recent done tasks can still be inspected.
- Historical tasks do not push review/blocked context out of view.

### P2: Strengthen Task Card Action Affordance

Builder handoff:
- Add a compact visual hint that cards open details, such as a subtle chevron, "Details" label, or hover state.
- Keep the card dense; do not add a large button inside every card.

Acceptance considerations:
- Keyboard focus remains clear.
- Card click behavior stays unchanged.
- The hint does not crowd title/objective content.

### P2: Improve Validation Failure Guidance

Builder handoff:
- Add a short "What to do next" line when validation fails.
- For each validation issue, consider linking or matching the issue to a task detail panel when possible.
- Keep raw issue file/message visible.

Acceptance considerations:
- Passing state remains compact.
- Failing state shows file, message, and a plain-language action cue.

### P2: Add Board Filters Or Focus Controls

Builder handoff:
- Add lightweight filters for agent, priority, dependency state, and status mismatch.
- Start with a compact segmented control or toolbar, not a large filter panel.

Acceptance considerations:
- Filters should not hide validation status.
- Empty filtered states need clear reset behavior.

### P3: Tune Column Color Intensity

Builder handoff:
- Reduce lane background tint intensity and let rail/badge colors carry status identity.
- Keep the status colors consistent with `.interface-design/system.md`.

Acceptance considerations:
- Light and dark modes both maintain clear status distinction.
- Task cards remain visually dominant over lane backgrounds.

### P3: Add Density Modes Later

Builder handoff:
- Consider a compact/comfortable density toggle if task volume grows.
- Compact mode could reduce objective preview length and pill spacing.

Acceptance considerations:
- Default mode should remain comfortable for the MVP.
- Density preference should persist if implemented.

## Suggested Future Tasks

1. Create active-work-first mobile ordering.
2. Collapse or cap done history display.
3. Add task card details affordance.
4. Add validation failure action guidance.
5. Add lightweight board filters.
6. Tune column background intensity in light and dark modes.

## Implementation Boundary

This review is UX/UI guidance only. It does not request code changes in this task. Builder implementation should be handled by separate follow-up AgentBoard tasks with focused acceptance criteria.
