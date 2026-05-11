---
id: TASK-0024
title: "Improve task skill metadata visibility"
status: done
assigned_agent: builder
priority: medium
depends_on: []
created_by: orchestrator
claimed_by: builder
claimed_at: 2026-05-11
skills: [react-dashboard, accessibility-review]
expected_files: [src/App.tsx]
parallel_safe: false
---

# User Request

Use the orchestrator role.

Create and execute a focused dashboard improvement task that explicitly uses the upgraded skills.

# Objective

Improve task metadata visibility in the dashboard using the `react-dashboard` and `accessibility-review` skills.

# Acceptance Criteria

- [x] Task cards display skill metadata when present.
- [x] Skill metadata does not make cards feel crowded.
- [x] Skill chips are visibly metadata, not controls.
- [x] Detail drawer shows skills, expected_files, and parallel_safe when present.
- [x] Long skill names and expected file paths wrap safely.
- [x] Existing dashboard behavior is preserved.
- [x] No nested interactive controls are introduced.
- [x] `npm run validate:board` passes.
- [x] `npm run build` passes.
- [x] Completion notes explicitly include `Skill used: react-dashboard`.
- [x] Completion notes explicitly include `Skill used: accessibility-review`.

# Context

The dashboard already parses and displays skill metadata. This task should refine task card presentation without adding task mutation controls or changing the read-only workflow.

# Agent Instructions

- Act as `builder`.
- Read `.agentboard/skills/react-dashboard.md`.
- Read `.agentboard/skills/accessibility-review.md`.
- Keep skill chips compact and non-interactive.
- Cap visible skill chips on cards if needed to preserve scanability.
- Preserve full-card click behavior.
- Do not add nested buttons, links, menus, or mutation controls inside task cards.
- Preserve Active work summary, capped Done lane, Skill Library section, and light/dark mode.
- Run board validation and frontend build.
- Move the task to review when complete.

# Deliverables

- Focused dashboard UI improvement for task skill metadata visibility.

# Artifacts

## Created

## Used

- `.agentboard/skills/react-dashboard.md`
- `.agentboard/skills/accessibility-review.md`

# Validation

- `npm run validate:board`
- `npm run build`

# Completion Notes

## Summary of Work Completed

Refined task card skill metadata so requested skills render in a dedicated compact metadata block instead of being mixed into the agent/dependency/status pill row. The card remains a single read-only button with the existing `Open details ->` affordance.

## Files Changed

- `src/App.tsx`
- `.agentboard/review/TASK-0024-improve-task-skill-metadata-visibility.md`

## Artifacts Created or Used

Used `.agentboard/skills/react-dashboard.md` and `.agentboard/skills/accessibility-review.md`.

## Skill Usage

Skill used: react-dashboard.

Applied task metadata display guidance, compact card scanability guidance, Tailwind wrapping/dark-mode patterns, read-only constraints, existing component patterns, and the validation checklist.

Not applicable: parser/type updates, because `skills`, `expectedFiles`, and `parallelSafe` were already parsed and typed.

Skill used: accessibility-review.

Applied semantic button guidance, non-interactive metadata chip guidance, no nested interactive controls, visible focus preservation, long text wrapping, and dark-mode readability expectations.

Not applicable: drawer focus-management changes, because this task only changes card metadata presentation and preserves the existing drawer behavior.

## Assumptions Made

Kept skill chips as metadata rather than actions. Preserved the existing visible chip cap in `SkillChips` so cards remain compact.

## Validation Performed

- `npm run validate:board`
- `npm run build`
- Local app HTTP check at `http://127.0.0.1:5173/` returned 200.
- Local board API check confirmed `TASK-0024`, `react-dashboard`, `accessibility-review`, expected file metadata, and `parallel_safe` metadata are present in parsed board data.

## Known Limitations

No automated browser interaction tooling was available in this runtime, so validation used build, board validation, local HTTP/API checks, and static source inspection.

## Follow-up Recommendations

Keep the next related accessibility task focused on detail drawer focus management rather than further card metadata density.

## Reviewer Approval

Approved by reviewer on 2026-05-11.

Reviewed against `react-dashboard` and `accessibility-review`. Task cards now show requested skills in a compact, labeled metadata block; chips remain non-interactive spans; the full-card button behavior and focus classes are preserved; detail drawer metadata remains available for skills, expected files, and `parallel_safe`; Active work, capped Done lane, Skill Library, and light/dark mode were not changed. Validation passed with `npm run validate:board` and `npm run build`.
