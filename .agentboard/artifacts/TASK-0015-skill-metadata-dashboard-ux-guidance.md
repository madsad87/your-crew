# Skill Metadata Dashboard UX Guidance

Task: TASK-0015  
Role: ux-ui  
Scope: First-pass skill awareness for the read-only AgentBoard dashboard  

## Summary

Skill metadata should help operators understand what reusable capabilities a task expects without changing the core AgentBoard workflow. Agents remain the primary ownership signal. Skills are secondary capability signals.

The dashboard should surface skills in compact, scannable places:

- task cards: small skill chips when present
- detail panel: full task skill list and expected files when present
- dashboard overview: compact Skill Library section or legend showing enabled skills

## User Goal

The user needs to answer:

- Which agent owns this task?
- Which skills should that agent load?
- What skills are available on this branch?
- Is this skill information metadata only, or does it mutate the workflow?

The UI should make the answer clear: skills are metadata and guidance, not task controls.

## Visual Hierarchy

- Keep workflow status, task title, agent, priority, and validation more prominent than skills.
- Show skill chips after agent/dependency metadata on task cards.
- Keep skill chips visually lighter than status badges and warning pills.
- Use the same dense card language: small rounded chips, neutral surfaces, and no new decorative color system.
- Use the Skill Library section as an operational reference band, not a large feature panel.

## Task Card Guidance

Builder handoff:

- If a task has `skills`, show up to three skill chips on the card.
- Use compact labels such as `skill: react-dashboard` or just `react-dashboard` if space is tight.
- If more than three skills exist, show a compact `+N skills` chip.
- Do not show an empty skill row for tasks without skills.
- Preserve existing card click behavior and the `Details ->` affordance.

Acceptance considerations:

- Skills should never look like clickable mutation controls.
- Cards should remain readable at narrow column widths.
- Skill chips must work in light and dark modes.

## Detail Panel Guidance

Builder handoff:

- Add a metadata item for `Skills` when task frontmatter includes skills.
- Add a metadata item for `Expected Files` when present, using wrapping text.
- Add a metadata item for `Parallel Safe` when present, labeled clearly as metadata only.
- Keep the raw frontmatter block unchanged for traceability.

Acceptance considerations:

- Missing `skills` should not create noisy empty content.
- `parallel_safe` should not imply execution changes.
- Long expected file paths must wrap and remain readable.

## Skill Library Section Guidance

Builder handoff:

- Add a compact section near the top of the dashboard after validation and before Active work, or near the summary metrics if it remains small.
- Show enabled skill count and a compact list of enabled skills from the registry or project profile.
- Include a short line that says skills enhance agents and do not replace roles.
- Prefer a grid of small skill rows or chips over large cards.

Acceptance considerations:

- The section should not push active work too far down the page.
- It should remain readable when there are four to eight skills.
- It should render a calm empty or unavailable state if registry data is missing.

## Responsive Behavior

- On mobile, skill chips should wrap under existing task metadata.
- The Skill Library section should collapse to one column and avoid horizontal scrolling.
- Long skill names and expected file paths should wrap instead of overflowing.

## Accessibility Expectations

- Skill metadata can be plain text or non-interactive chips.
- If any skill chip becomes interactive in a future task, it must use semantic controls and clear accessible names.
- Maintain existing keyboard focus on task cards.
- Preserve contrast for neutral skill chips in dark mode.

## Implementation Boundary

This task is guidance only. Builder implementation should remain read-only:

- no task mutation controls
- no skill assignment UI
- no parallel execution behavior
- no MCP or tool invocation
- no background automation

## Recommended Builder Sequence

1. Parse optional `skills`, `expected_files`, and `parallel_safe` task metadata.
2. Add Skill Library registry data to the read-only board API.
3. Render compact Skill Library overview.
4. Render task-card skill chips only when present.
5. Render detail panel metadata for skills, expected files, and parallel metadata.
6. Validate board, build, and browser display.
