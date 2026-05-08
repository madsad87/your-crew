# AgentBoard System Instructions

This repository uses a Markdown-based Kanban workflow for coordinating AI agents inside Codex.

All agents must follow the rules in this document.

---

# System Overview

The `.agentboard/` directory acts as the shared coordination system for all agents.

Agents communicate ONLY through:
- task markdown files
- task status changes
- completion notes

Agents must NOT simulate conversations with each other.

The Markdown task system is the single source of truth for all agent coordination.

---

# Core Workflow

Tasks move through these stages:

```txt
inbox → ready → in-progress → review → done