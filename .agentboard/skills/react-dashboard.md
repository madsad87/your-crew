# React Dashboard Skill

## Purpose

Use this skill when implementing React, TypeScript, Tailwind, or dashboard UI changes for the AgentBoard dashboard.

## Applies To

- builder
- reviewer when validating dashboard implementation

## Guidance

- Preserve the dashboard as a read-only operations console unless a task explicitly adds safe mutations.
- Prefer compact, scannable data surfaces over marketing-style layout.
- Keep AgentBoard workflow state visible and understandable.
- Preserve existing active-work summary, capped Done lane, validation panel, task detail drawer, and theme behavior.
- Use typed task metadata instead of ad hoc UI parsing where possible.

## Out Of Scope

- Task mutation controls.
- Parallel execution behavior.
- MCP/tool integration.
- Background automation.
