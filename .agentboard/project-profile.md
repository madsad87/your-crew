# Project Profile

## Setup Questions

Use these questions to adapt Your Crew to this repository:

1. What are we building?
2. What type of project is this?
3. What technology stack is used?
4. What is the main project goal?
5. What should agents avoid touching?
6. Which optional specialists or skills might be useful later?

## Project Name

A kanban style dashbord where you can see TASK md files move through the kanban workflow visibily.

## Project Type

a test passion project that is intended to work with the "your-crew" tool https://github.com/madsad87/your-crew

## Goal

To be able to build and create further functionality for the "your-crew" tools

## Tech Stack

- likely react
- open to suggestions
- maybe tailwind.

## Agent Constraints

- n/a

## Enabled Agents

- orchestrator
- builder
- reviewer
- content-creator
- workflow-runner
- repo-ops
- ux-ui

## Enabled Skills

- UX/UI specialist guidance is enabled on this dashboard branch for frontend interface work.
- Use `ux-ui` before builder implementation when a task affects usability, visual hierarchy, interaction design, responsive behavior, accessibility expectations, or reusable interface patterns.
- `ux-ui` is advisory and should produce design guidance, acceptance considerations, and review notes; builder remains responsible for implementation.
- Do not treat this dashboard-branch specialist as a change to the base locked crew on `main`.

## Future Extensions

- Add optional specialists as new role files under `.agentboard/agents/`.
- Track enabled skills here before wiring them into tasks or role guidance.
- Keep parallel agents, MCP integrations, and background automation out of scope until explicitly added by future project tasks.
