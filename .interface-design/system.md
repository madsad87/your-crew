# Design System

## Direction
- Personality: calm operations console for coordinating AI work.
- Foundation: compact dashboard layout, readable status groupings, and visible workflow state.
- Signature: every task card carries a slim status rail that matches its AgentBoard column.

## Intent
- User: a project owner or agent operator checking task flow.
- Core task: scan Markdown tasks, understand where work sits, and spot blocked or review-ready items.
- Feel: orderly, traceable, local-first, and low-friction.

## Product World
- Domain concepts: board, task file, status folder, dependency, reviewer approval, agent role, validation.
- Color world: paper canvas, graphite text, slate borders, blue in-progress, amber review, green done, red blocked, violet inbox.
- Defaults rejected:
  - Generic SaaS hero layout; use the tool surface as the first screen.
  - Decorative gradients and oversized cards; use compact operational panels.
  - Single blue dashboard palette; use workflow-specific semantic color.

## Tokens
### Spacing
- Base: 4px.
- Scale: 4, 8, 12, 16, 20, 24, 32.

### Typography
- Display: 24-30px semibold for the product name.
- Body: 14px regular for task details.
- Label: 11-12px medium uppercase or compact label text.
- Data: 12-13px semibold for IDs, counts, and statuses.

### Colors
- Foreground: stone-950.
- Secondary: stone-650 equivalent through stone-600.
- Tertiary: stone-500.
- Muted: stone-100.
- Accent: emerald-700 for product identity.
- Canvas: stone-50.
- Surface 1: white.
- Surface 2: stone-50.
- Surface 3: stone-100.
- Border: stone-200.
- Border strong: stone-300.
- Focus: emerald-600.
- Success: green-700.
- Warning: amber-700.
- Danger: red-700.

## Depth
- Strategy: borders and surface-color shifts first, subtle shadow only for task cards and columns.
- Elevation notes: avoid stacked cards inside cards; columns are work lanes, task cards are the repeated card unit.

## Patterns
### Navigation
- Keep navigation minimal until there are multiple views.

### Metric cards
- Small bordered counters with a concise label and strong value.

### Forms and controls
- Prefer compact controls and explicit labels.

### Tables or data views
- Use dense cards for task scanability before introducing full tables.

## States
- Hover: slight border darkening and surface shift.
- Active: stronger border and maintained layout size.
- Focus: visible emerald ring.
- Disabled: muted foreground and surface.
- Loading: stable skeleton-like text and reserved board area.
- Empty: concise message inside the lane.
- Error: red border and actionable message.
