---
id: TASK-0018
title: "Document natural-language demo workflows"
status: done
assigned_agent: content-creator
priority: medium
depends_on: []
created_by: orchestrator
claimed_by: content-creator
claimed_at: 2026-05-10
---

# User Request

Document the natural-language demo workflows that proved Your Crew can route normal user requests through the orchestrator and workflow-runner without requiring users to manually address specialist agents.

# Objective

Create a concise documentation page that explains the homepage workflow-section demo and DOS dark mode toggle demo, with emphasis on natural-language orchestration, workflow-runner sequencing, frontend outcomes, and what the demos prove about Your Crew usability.

# Acceptance Criteria

- [x] `docs/natural-language-demo-workflows.md` exists.
- [x] Document explains both demo workflows.
- [x] Document explains natural-language orchestration.
- [x] Document explains the role of workflow-runner without requiring users to invoke it manually.
- [x] Document distinguishes structured demo prompts from conversational prompts.
- [x] `README.md` links to the new document if appropriate.
- [x] Board validator passes.

# Context

The demos to document are:

- The "How Your Crew Works" homepage section demo.
- The DOS-inspired dark mode toggle demo.

These demos showed that users can make normal requests and rely on the orchestrator to create tasks, assign roles, and delegate execution to workflow-runner without saying "act as builder", "act as reviewer", or "act as workflow-runner".

Relevant files:

- `README.md`
- `docs/`
- `.agentboard/done/TASK-0010-make-orchestrator-default-conversational-entry-point.md`
- `.agentboard/done/TASK-0014-add-how-your-crew-works-homepage-section.md`
- `.agentboard/done/TASK-0015-add-dos-dark-mode-toggle.md`

# Agent Instructions

- Act as `content-creator`.
- Create `docs/natural-language-demo-workflows.md`.
- Link or reference it from `README.md` if it improves discoverability.
- Do not modify homepage implementation files unless required for documentation accuracy.
- Do not change AgentBoard protocol files unless required for documentation accuracy.
- Keep summaries compact and factual.

# Deliverables

- `docs/natural-language-demo-workflows.md`
- Updated `README.md` link if appropriate

# Artifacts

## Created

None.

## Used

None.

# Validation

Run `npm run validate` and document the result.

# Completion Notes

## Summary of Work Completed

Created `docs/natural-language-demo-workflows.md` documenting the "How Your Crew Works" homepage section demo and DOS-inspired dark mode toggle demo. Explained structured versus natural-language prompts, orchestrator-entry routing, workflow-runner sequencing, frontend outcomes, and what the demos prove about usability. Added a README reference to the new document.

## Files Changed

- `docs/natural-language-demo-workflows.md`
- `README.md`
- `.agentboard/review/TASK-0018-document-natural-language-demo-workflows.md`

## Artifacts Created or Used

None.

## Assumptions Made

The documentation should focus on the demonstrated workflow behavior rather than reproduce full task files or implementation details.

## Validation Performed

- `npm run validate` passed with `AgentBoard validation: PASS`, `Checked 18 task files.`
- Static-reviewed the new documentation for both demo workflows, natural-language orchestration, workflow-runner routing, and frontend outcomes.

## Known Limitations

None.

## Follow-up Recommendations

None.

## Reviewer Approval

Approved by reviewer on 2026-05-10. Validation confirmed the new document explains both demo workflows, natural-language orchestration, workflow-runner sequencing without manual user invocation, structured versus conversational prompts, and frontend outcomes. README references the new document. `npm run validate` passes.
