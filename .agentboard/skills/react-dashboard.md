# React Dashboard Skill

## Purpose

Use this skill when implementing or reviewing React, TypeScript, Tailwind, or dashboard UI changes for the AgentBoard dashboard branch.

This is an operational playbook for the current read-only dashboard. It should help builders produce consistent changes and help reviewers check that implementation choices match the existing system.

## Applies To

- builder
- reviewer when validating dashboard implementation
- ux-ui when guidance affects React dashboard behavior

## Dashboard Context

The dashboard is a local read-only React/Vite/TypeScript/Tailwind interface for Markdown task files in `.agentboard/`.

Current high-value surfaces:

- header with project identity, theme toggle, and board metrics
- validation panel backed by `/api/validate`
- Skill Library section backed by `.agentboard/skill-registry.md`
- Active work summary for ready, in-progress, review, and blocked tasks
- canonical AgentBoard workflow columns
- capped Done lane preview
- task cards that open details
- task detail drawer with frontmatter, metadata, and Markdown sections
- light and dark theme behavior

## Core Rule

Preserve the dashboard as a read-only operations console unless a task explicitly adds safe mutation behavior. Do not add task movement, editing, deletion, approval, assignment, or write controls as part of normal dashboard UI work.

## React Component Structure

- Keep `App` responsible for data loading, top-level state, and composing dashboard surfaces.
- Keep repeated UI surfaces as small local components when they are used more than once or have distinct behavior.
- Prefer existing component shapes before adding new abstractions:
  - `ValidationPanel`
  - `SkillLibraryPanel`
  - `ActiveWorkPanel`
  - `TaskCard`
  - `TaskDetailPanel`
  - `MetadataItem`
  - `Pill`
  - `SkillChips`
- Pass typed data through props rather than rereading or reparsing frontmatter in UI components.
- Keep components deterministic: no hidden timers, background polling, or filesystem writes.
- Do not introduce global state libraries for local dashboard state.

## TypeScript Expectations

- Use `AgentBoard`, `AgentBoardTask`, `TaskStatus`, and response types from `src/types/agentboard.ts`.
- Prefer explicit prop types for local components.
- Preserve nullable state where loading can be incomplete, such as `AgentBoard | null`.
- Normalize optional metadata at the parser/type layer when possible, then render typed arrays/booleans in React.
- Avoid `any`. If unknown frontmatter must be displayed, keep it in `Record<string, unknown>` and render it safely.
- When adding metadata fields, update:
  - parser normalization
  - shared TypeScript types
  - UI display
  - validator behavior when needed

## Tailwind Usage Patterns

- Match the existing compact operations-console style.
- Use restrained borders, small radii, compact spacing, and scannable typography.
- Preserve `dark:` classes when adding new UI.
- Add light and dark styles together in the same change.
- Use responsive grid/flex classes already present in the dashboard before inventing new layout systems.
- Use `break-words`, `break-all`, `min-w-0`, and wrapping flex containers for long task titles, file paths, chips, and metadata.
- Keep hover and focus states distinct. Focus must remain visible without relying on hover.
- Avoid decorative backgrounds, marketing-style hero sections, gradient blobs, or oversized cards.

## State And Data Flow

- Load board data through `/api/board`.
- Load validation state through `/api/validate`.
- Keep UI state local:
  - selected task ID
  - theme mode
  - loading and error state
  - validation loading/error state
- Derive counts and summaries with `useMemo` when they depend on board data.
- Do not mutate task objects in place.
- Do not make client-side assumptions that conflict with validator output.

## Read-Only Constraints

Allowed:

- open/close task detail panels
- toggle local light/dark theme
- refresh validation
- display parsed metadata and Markdown sections
- summarize active work and completed history

Not allowed unless a future task explicitly requests it:

- moving tasks between board columns
- editing task frontmatter or Markdown
- assigning agents
- approving review tasks
- deleting tasks
- writing files from the dashboard
- enabling background automation

## Task Metadata Display Patterns

- Show operational metadata where it improves scanability:
  - task ID
  - title
  - priority
  - assigned agent
  - dependency status
  - status mismatch
  - requested skills
- Keep task cards compact. Use chips sparingly and cap visible chip counts when needed.
- Skill chips are metadata, not controls. They must not look like buttons or links.
- Preserve long-name wrapping for skills and expected files.
- In the detail panel, show richer metadata:
  - status and folder status
  - assigned agent
  - priority
  - created by
  - dependencies
  - skills
  - expected files
  - `parallel_safe` as metadata only
  - status match
- Do not reintroduce noisy source path text on task cards when the board is space-constrained.

## Empty, Loading, And Error States

- Loading states should reserve readable space without layout jumps where practical.
- Empty lane states should state what is absent, for example `No ready tasks`.
- Board load errors should appear above dashboard content and not hide validation state.
- Skill Library empty state should be explicit when no enabled skills are found.
- Validation error state should be visible but should not imply task mutation.

## Validation Panel Integration

- Keep the validation panel near the top of the dashboard.
- Preserve the Refresh action as a semantic button.
- Show checked task count when available.
- Show validation issues with wrapping file paths and readable messages.
- Do not suppress validator warnings to make the UI appear cleaner.
- Keep validation calls read-only.

## Active Work Summary Behavior

- Keep the Active work summary above the full board when actionable tasks exist.
- Include ready, in-progress, review, and blocked tasks.
- Preserve full board visibility below the summary.
- Summary rows may open the same detail panel as cards.
- Summary rows must not introduce nested interactive controls.
- Preserve Done count separately from active work.

## Task Detail Drawer Behavior

- The drawer should be readable on mobile and desktop widths.
- Keep a clear Close button.
- Preserve overlay close behavior only as a secondary close mechanism.
- Metadata should wrap safely in the drawer.
- Markdown sections should use readable line height and preserve line breaks.
- Frontmatter display should wrap and scroll safely.
- Do not add edit controls to the drawer unless explicitly requested.
- If interaction work touches the drawer, apply the `accessibility-review` skill for focus behavior expectations.

## Light And Dark Mode Preservation

- New surfaces must render in both themes.
- Theme toggle must remain a semantic button with `aria-pressed`.
- Dark-mode text, chip, border, panel, and focus styles must be added with light-mode styles.
- Do not store theme in server state; keep local storage behavior.

## Avoiding Nested Interactive Controls

- A task card is a full-card button. Do not place buttons, links, inputs, menus, or toggles inside it.
- Active work rows are buttons. Their child metadata must be spans or other non-interactive elements.
- If a future design needs per-card actions, refactor the card so the container is no longer a button before adding nested actions.
- A details affordance inside a card must be text or icon-like non-interactive content.

## When To Extract Components

Extract a component when:

- markup is repeated in more than one dashboard surface
- a piece has its own behavior or accessibility contract
- props can be typed clearly
- extraction reduces duplication without hiding important layout logic

Keep code local when:

- the UI is used once
- abstraction would obscure the data flow
- a task is a narrow, low-risk change

## Common Failure Modes

- Adding a new metadata chip without `min-w-0` or wrapping, causing overflow.
- Adding light-mode styling but forgetting `dark:` equivalents.
- Reintroducing source paths on cards and crowding constrained lanes.
- Making skills look clickable when they are metadata.
- Adding a nested button inside `TaskCard`.
- Breaking the Active work summary while changing board cards.
- Letting Done history dominate the page again.
- Treating `parallel_safe` as behavior instead of metadata.
- Adding a new task field to UI without updating parser/types.
- Creating hidden write behavior in a read-only dashboard.
- Forgetting to run both board validation and frontend build for UI work.

## Builder Checklist

Before moving a React dashboard task to review:

- Confirm the task remains in scope.
- Confirm board data still loads from `/api/board`.
- Confirm validation still loads from `/api/validate`.
- Confirm read-only constraints were preserved.
- Confirm task cards and Active work rows remain semantic buttons when clickable.
- Confirm no nested interactive controls were introduced.
- Confirm long task titles, skill names, expected files, and validation paths wrap safely.
- Confirm light and dark mode classes exist for new UI.
- Confirm Done lane remains capped if the task touches board layout.
- Confirm Skill Library and Active work summary remain visible when expected.
- Run `npm run validate:board`.
- Run `npm run build` for frontend changes.
- Perform browser/manual validation when practical.

## Reviewer Checklist

When reviewing a task that lists `react-dashboard`:

- Confirm the builder read and applied this playbook.
- Check the implementation matches existing component and Tailwind patterns.
- Check TypeScript types remain coherent.
- Check read-only constraints were preserved.
- Check active work, validation, Skill Library, task cards, detail drawer, Done preview, and light/dark mode were not regressed.
- Check no MCP, background automation, parallel execution, or mutation controls were introduced unless explicitly requested.
- Confirm `npm run validate:board` and `npm run build` passed or documented a blocker.

## Build And Validation Commands

Use the relevant commands for dashboard implementation work:

```bash
npm run validate:board
npm run build
```

Browser/manual validation should usually include:

- load or reload `http://127.0.0.1:5173/`
- inspect task card affordance and metadata
- open a detail drawer
- verify long metadata wraps
- toggle light/dark mode
- confirm no task mutation controls appear

## Completion Notes Reporting

When an agent uses this skill, the task Completion Notes must include:

- `Skill used: react-dashboard`
- Which sections of this playbook were applied.
- Which checks were not applicable and why.
- Files changed.
- Validation commands run.
- Browser/manual checks performed when relevant.
- Known limitations or follow-up recommendations.

Example:

```text
Skill used: react-dashboard.
Applied component structure, metadata display, read-only constraints, Tailwind wrapping, and validation checklist.
Not applicable: parser/type updates, because no new task metadata fields were introduced.
Validation: npm run validate:board; npm run build; browser check at 127.0.0.1:5173.
```

## Out Of Scope

- Task mutation controls.
- Parallel execution behavior.
- MCP/tool integration.
- Background automation.
- Broad redesign unrelated to the assigned task.
