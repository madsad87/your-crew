---
id: TASK-0022
title: "Improve card affordance and skill metadata"
status: done
assigned_agent: builder
priority: high
depends_on: [TASK-0021]
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
skills: [react-dashboard, accessibility-review]
expected_files: [src/App.tsx]
parallel_safe: false
---

# User Request

Use the upgraded `react-dashboard` skill on a real dashboard improvement.

# Objective

Improve task card detail affordance and skill metadata visibility while preserving the read-only dashboard workflow.

# Acceptance Criteria

- [x] Task cards have a clearer detail affordance.
- [x] Full-card click behavior is preserved.
- [x] Keyboard focus visibility is preserved.
- [x] No nested interactive buttons or links are introduced inside task cards.
- [x] Task `skills` metadata displays on cards when present.
- [x] Task detail panel displays `skills`, `expected_files`, and `parallel_safe` when present.
- [x] Active work summary is preserved.
- [x] Capped Done lane behavior is preserved.
- [x] Skill Library display is preserved.
- [x] Light/dark mode still works.
- [x] Dashboard remains read-only.
- [x] Completion Notes explicitly say `Skill used: react-dashboard`.
- [x] Completion Notes explicitly say `Skill used: accessibility-review`.
- [x] Board validator passes.
- [x] Frontend build passes.

# Context

Some skill metadata and affordance behavior may already exist from earlier tasks. Improve the implementation in a focused way without duplicating UI or adding mutation controls.

# Agent Instructions

- Act as `builder`.
- Read `.agentboard/skills/react-dashboard.md`.
- Read `.agentboard/skills/accessibility-review.md`.
- Apply both skill checklists.
- Do not implement MCPs, parallel execution, task mutation controls, or background automation.
- Keep edits focused to dashboard implementation files.
- Run board validation and frontend build.
- Perform browser/manual validation if practical.
- Move this task to review when complete.

# Deliverables

- Focused dashboard UI improvement.

# Artifacts

## Created

## Used

- `.agentboard/skills/react-dashboard.md`
- `.agentboard/skills/accessibility-review.md`

# Validation

- `npm run validate:board`
- `npm run build`
- Browser/manual validation if practical.

# Completion Notes

## Summary of Work Completed

Improved task cards with an explicit `Open details ->` non-interactive affordance and an accessible card label. Improved task detail metadata rendering by displaying skills and expected files as wrapped metadata chips while preserving `parallel_safe` as metadata only.

## Files Changed

- `src/App.tsx`
- `.agentboard/review/TASK-0022-improve-card-affordance-and-skill-metadata.md`

## Artifacts Created or Used

Used `.agentboard/skills/react-dashboard.md` and `.agentboard/skills/accessibility-review.md`.

## Skill Usage

Skill used: react-dashboard.

Applied component structure guidance, TypeScript prop typing, Tailwind wrapping/dark-mode patterns, read-only constraints, metadata display guidance, task detail drawer guidance, and the build/validation checklist.

Not applicable: parser/type updates, because the existing parser and shared types already expose `skills`, `expectedFiles`, and `parallelSafe`.

Skill used: accessibility-review.

Applied semantic button guidance, visible focus preservation, no nested interactive controls, toggle/dark-mode preservation, long text wrapping guidance, and detail panel readability checks.

Not applicable: focus trap/Escape drawer improvements, because this task only improved card affordance and metadata display.

## Assumptions Made

Treated existing Skill Library, Active work, capped Done lane, and detail drawer behavior as features to preserve. Kept all new card affordance content non-interactive inside the existing full-card button.

## Validation Performed

- `npm run validate:board`
- `npm run build`
- Local app HTTP check at `http://127.0.0.1:5173/` returned 200.
- Local board API check confirmed `TASK-0022`, `react-dashboard`, `accessibility-review`, expected file metadata, and `parallel_safe` metadata are present in parsed board data.
- Static inspection confirmed no nested buttons or links were added inside `TaskCard`.

## Known Limitations

Automated Playwright browser validation was attempted through the available Node runtime, but Playwright is not installed there. Browser validation was limited to local app/API availability plus static source checks.

## Follow-up Recommendations

Consider a future focused task for detail drawer focus management, as recommended by the accessibility review artifact.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

Reviewer checked the implementation against `react-dashboard` and `accessibility-review`: the card affordance is visible, cards remain semantic full-card buttons, no nested interactive controls were introduced, skill and expected-file metadata wrap in the detail panel, read-only behavior is preserved, and `npm run validate:board` plus `npm run build` pass.
