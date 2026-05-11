# Accessibility Review Skill

## Purpose

Use this skill when UX/UI, builder, or reviewer work affects dashboard interaction, readability, keyboard access, focus behavior, semantic controls, contrast, or responsive layout.

This skill is a concrete checklist for the AgentBoard dashboard branch. It is guidance only; it does not add automated tooling, MCP integration, or task mutation behavior.

## Applies To

- reviewer
- ux-ui
- builder when implementing interactive UI

## Dashboard Context

The dashboard is a read-only React/Tailwind interface for local AgentBoard task files. Current key surfaces include:

- header with theme toggle
- validation panel with Refresh action
- Skill Library section
- Active work summary
- workflow columns
- task cards that open details
- capped Done lane
- task detail drawer/panel
- light and dark themes

## Required Checks

### Keyboard Navigation

- Confirm every interactive element can be reached with Tab.
- Confirm tab order follows the visual reading order: header controls, validation action, summary/list controls, board cards, drawer controls.
- Confirm Shift+Tab moves backward predictably.
- Confirm Enter or Space activates buttons where expected.
- Confirm opening a task card with keyboard opens the same detail panel as pointer click.

### Visible Focus States

- Confirm every button and card button has a visible focus indicator.
- Focus must be visible in both light and dark modes.
- Focus styling should not be hidden by overflow, adjacent cards, lane borders, or drawer overlay.
- Focus state should be stronger than hover state.

### Semantic Buttons And Links

- Use `button` for in-app actions such as theme toggle, validation refresh, card detail opening, and drawer close.
- Use links only for navigation to another URL or document.
- Do not use clickable `div` or `span` elements for dashboard actions.
- Non-interactive metadata chips, including skill chips, must not look or behave like controls.

### Toggle Semantics

- Theme toggles must expose pressed state with `aria-pressed`.
- The visible label should match the resulting or current state clearly enough for a screen reader user.
- Toggle focus and pressed state must remain visible in dark mode.

### Drawer And Detail Panel

- The task detail panel must have a clear Close button.
- The Close button must be keyboard reachable.
- The overlay/click-away behavior must not be the only way to close the panel.
- Closing the panel must return the user to a usable dashboard state.
- The panel must remain readable at mobile width and must not require horizontal scrolling.

### Nested Interactive Controls

- Do not put buttons, links, inputs, or other interactive controls inside a task card button.
- If a card needs extra actions in the future, change the card structure first instead of nesting controls.
- The `Details ->` affordance should remain non-interactive text inside the card unless the card is refactored.

### Text Contrast

- Check light mode and dark mode.
- Body text, task titles, metadata labels, validation messages, skill chips, priority pills, and status badges should remain readable.
- Low-emphasis text can be quieter, but it must still be legible against its surface.
- Do not rely on color alone for critical status; pair color with text such as `Blocked`, `Validation needs attention`, or `status mismatch`.

### Long Text Wrapping

- Long task titles must wrap without escaping card boundaries.
- File paths in the detail panel must wrap or break safely.
- Skill names and chips must wrap without causing horizontal scrolling.
- Validation issue file paths and messages must remain readable.
- Expected file metadata must wrap in the detail panel.

### Responsive Readability

- Verify mobile/narrow widths and desktop widths.
- Header metrics, Skill Library entries, Active work rows, columns, cards, and drawer content must stack without overlap.
- Text inside compact pills and chips must not collide with adjacent content.
- The Done preview summary and empty states must remain readable.
- The dashboard should not require horizontal page scrolling for normal use.

## Common Failure Modes

- Focus ring exists in CSS but is clipped by `overflow-hidden`.
- A card contains a nested button or link, causing invalid nested interaction.
- A chip looks clickable but is only metadata.
- Dark mode lowers contrast too far for labels or muted text.
- Long Markdown file paths overflow the detail panel.
- Validation issue rows become unreadable when file paths are long.
- Mobile layout shows controls in a confusing order.
- Detail panel can be opened with keyboard but not closed with keyboard.
- Theme toggle changes visually but does not expose `aria-pressed`.
- Hover styling is clear, but keyboard focus is subtle or missing.

## Reviewer Validation Steps

Use these steps when reviewing a dashboard UI change:

1. Run the required project validation from the task, normally `npm run validate:board` and, for frontend changes, `npm run build`.
2. Open or reload `http://127.0.0.1:5173/`.
3. Keyboard through the page with Tab and Shift+Tab.
4. Activate at least one task card with keyboard and confirm the detail panel opens.
5. Close the detail panel with the Close button using keyboard.
6. Toggle light/dark mode and confirm `aria-pressed` state is present.
7. Inspect task cards, Active work rows, Skill Library entries, validation panel, and detail metadata for wrapping and contrast.
8. Check a narrow/mobile viewport when the task affects layout, cards, chips, drawer content, or metadata density.
9. Confirm no task mutation controls were introduced unless the task explicitly requested them.

## UX/UI Agent Usage

When using this skill for UX/UI guidance:

- Include accessibility expectations in the artifact or task notes.
- Call out expected keyboard behavior, focus treatment, semantic controls, responsive wrapping, and dark-mode contrast.
- Identify any accessibility risks the builder should validate after implementation.

## Reviewer Usage

When using this skill for review:

- Validate the concrete checks above against the completed task.
- If a check cannot be performed, document the fallback validation and residual risk.
- Request changes when keyboard access, focus visibility, semantic controls, contrast, or responsive readability regress.

## Completion Notes Reporting

When an agent uses this skill, the task Completion Notes should include:

- `Skill used: accessibility-review`
- Which checks were performed.
- Any checks that were not applicable and why.
- Validation commands run.
- Browser or manual checks performed, including light/dark and keyboard checks when relevant.
- Known accessibility limitations or follow-up recommendations.

Example:

```text
Skill used: accessibility-review.
Checked keyboard access for task cards and drawer close, visible focus states, no nested controls, dark-mode contrast, and long title wrapping.
Validation: npm run validate:board; npm run build; browser keyboard pass at 127.0.0.1:5173.
Limitations: automated contrast tooling was not added in this task.
```

## Out Of Scope

- Automated accessibility tooling setup.
- External audit services.
- Browser extensions or MCP integrations.
- WCAG certification claims.
- Broad redesign work unrelated to the assigned task.
