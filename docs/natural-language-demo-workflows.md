# Natural-Language Demo Workflows

These demos showed that Your Crew can route normal user requests through the orchestrator and workflow-runner without requiring the user to manually address specialist agents.

The important behavior was not only that the frontend changed. The important behavior was that the user could ask for product work in ordinary language, and the AgentBoard system converted that request into task files, role ownership, sequential execution, validation, review, and completion.

## Structured Prompts vs. Natural-Language Prompts

A structured demo prompt tells the system exactly how to behave. It usually includes task goal, scope, acceptance criteria, assignee, folder placement, and execution instructions.

A natural-language prompt is closer to how a user actually asks for work. It may describe the desired outcome without naming AgentBoard mechanics or specialist roles.

Your Crew supports both:

- Structured prompts are useful for precise protocol tests and high-control work.
- Natural-language prompts are useful for normal usage because the orchestrator infers the workflow path.

The homepage workflow and dark mode demos proved that natural-language requests can still become deterministic AgentBoard work.

## Demo 1: "How Your Crew Works" Homepage Section

The user asked for a new homepage section that visually explained the Your Crew workflow:

1. User gives a request.
2. Orchestrator creates tasks.
3. Specialist agents complete work.
4. Reviewer approves.
5. Workflow-runner continues the board.

The request described the product outcome, not a manual role sequence. The user did not need to say "act as orchestrator", "act as builder", "act as reviewer", or "act as workflow-runner".

### How Orchestrator Entry Routed It

The orchestrator treated the request as project work and created a concrete AgentBoard task with:

- a clear objective
- builder assignment
- dependency-free `ready` placement
- acceptance criteria for the homepage section
- validation requirements
- scope limits to avoid protocol-file drift

That preserved the normal board lifecycle while keeping the user-facing interaction simple.

### How Workflow-Runner Advanced It

After task creation, workflow-runner execution advanced the board sequentially:

- claimed the ready task
- acted as the assigned builder
- updated the homepage files
- ran validation
- moved the task to review
- acted as reviewer for the completed work
- approved the task into done

The user did not have to manually invoke each role. The workflow-runner followed the board protocol and stopped at the natural completion point.

### Frontend Result

The homepage gained a "How Your Crew Works" section with five visual workflow steps. The new section extended the existing static HTML/CSS design, preserved the page structure, and made the AgentBoard process visible to visitors.

## Demo 2: DOS-Inspired Dark Mode Toggle

The user then asked for a toggleable dark mode radio option in the header that fit the green-and-black style of 80s/90s DOS screens.

This was also a normal product request. It described the desired user-facing behavior and visual direction, not the internal AgentBoard routing.

### How Orchestrator Entry Routed It

The orchestrator interpreted the request as frontend implementation work and created a builder task with:

- a dependency on the completed workflow-section task
- acceptance criteria for radio inputs, DOS styling, responsiveness, and validation
- explicit scope limits to avoid AgentBoard protocol changes

Because the dependency was already complete, the task could move through the normal ready-to-done lifecycle safely.

### How Workflow-Runner Advanced It

Workflow-runner processed the task after dependency satisfaction:

- selected the ready task
- claimed it as the assigned builder
- implemented the CSS-only Light/DOS radio toggle
- ran board validation
- moved the task to review
- reviewed the finished work
- approved it into done

Again, the user did not need to directly address the builder or reviewer.

### Frontend Result

The homepage gained a header theme control with Light and DOS radio options. DOS mode used a CSS-only `:has()` approach with green-on-black colors, monospace styling, scanline-like background treatment, glowing accents, and dark card/header/button styling.

The implementation preserved the existing static homepage and avoided JavaScript. The documented limitation is that the theme choice does not persist after reload.

## What These Demos Prove

The demos prove several practical usability points:

- Users can request product changes in natural language.
- The orchestrator can convert normal requests into well-scoped AgentBoard tasks.
- Users do not need to know which specialist agent should act next.
- Workflow-runner can advance implementation and review sequentially without parallel or background behavior.
- The Markdown board remains the source of truth for ownership, dependencies, status, validation, and review.
- Frontend work can move through the same protocol as documentation and protocol work.
- Review gates remain intact even when the user experience is conversational.

The result is a workflow that stays deterministic for agents while staying simple for users.
