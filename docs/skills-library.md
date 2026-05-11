# Skill Library

The Skill Library is a first-pass capability system for Your Crew on the dashboard branch.

Agents remain the stable roles that own work. Skills are reusable capabilities that agents can load when a task needs domain-specific guidance.

## Agents Vs Skills

Agents answer: who owns this task?

Examples:

- `builder`
- `reviewer`
- `content-creator`
- `ux-ui`

Skills answer: what extra capability should the assigned agent use?

Examples:

- `builder` + `react-dashboard`
- `reviewer` + `accessibility-review`
- `content-creator` + `seo-content`
- `ux-ui` + `dashboard-ux`

Skills do not replace agents, change task ownership, or create new workflow stages.

## Where Skills Live

The skill registry lives at:

```text
.agentboard/skill-registry.md
```

Skill guidance files live under:

```text
.agentboard/skills/
```

This branch currently includes:

- `react-dashboard`
- `accessibility-review`
- `seo-content`
- `dashboard-ux`

## Requesting Skills In Tasks

Tasks can request skills in frontmatter:

```yaml
assigned_agent: builder
skills: [react-dashboard, accessibility-review]
expected_files: [src/App.tsx]
parallel_safe: false
```

`skills` lists reusable guidance the assigned agent should load.

`expected_files` is planning metadata for likely work scope.

`parallel_safe` is future planning metadata only. It does not enable parallel execution.

Older task files do not need these fields.

## Validation

The board validator accepts tasks without `skills`.

When `skills` is present, validation checks that each listed skill exists in `.agentboard/skills/` or `.agentboard/skill-registry.md`.

The validator also checks that `parallel_safe` is boolean-like metadata when present. It does not treat this field as behavior.

## Dashboard Visibility

The dashboard surfaces skill awareness in read-only form:

- a Skill Library section lists enabled skills
- task cards show skill chips when a task requests skills
- the detail panel shows skills, expected files, and parallel metadata when present

The dashboard does not edit skill assignments or mutate tasks.

## MCP And Tooling Boundary

Skills may later connect to MCP servers, tools, or richer runtime loading.

That is intentionally out of scope for this pass. This first-pass Skill Library is file-backed metadata and guidance only. It does not add MCP integration, tool invocation, background automation, or parallel execution.
