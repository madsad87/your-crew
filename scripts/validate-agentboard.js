#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const boardDir = path.join(root, ".agentboard");
const skillsDir = path.join(boardDir, "skills");
const skillRegistryPath = path.join(boardDir, "skill-registry.md");
const taskFolders = ["inbox", "ready", "in-progress", "review", "done", "blocked"];
const requiredFrontmatter = [
  "id",
  "title",
  "status",
  "assigned_agent",
  "priority",
  "depends_on",
  "created_by",
];
const requiredSections = [
  "# User Request",
  "# Objective",
  "# Acceptance Criteria",
  "# Context",
  "# Agent Instructions",
  "# Completion Notes",
];

function relative(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

function listTaskFiles() {
  const files = [];

  for (const folder of taskFolders) {
    const dir = path.join(boardDir, folder);
    if (!fs.existsSync(dir)) continue;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push({
          folder,
          filePath: path.join(dir, entry.name),
        });
      }
    }
  }

  return files;
}

function parseFrontmatter(content) {
  if (!content.startsWith("---\n") && !content.startsWith("---\r\n")) {
    return { data: {}, errors: ["missing opening frontmatter delimiter"] };
  }

  const newline = content.startsWith("---\r\n") ? "\r\n" : "\n";
  const endMarker = `${newline}---${newline}`;
  const endIndex = content.indexOf(endMarker, 3);

  if (endIndex === -1) {
    return { data: {}, errors: ["missing closing frontmatter delimiter"] };
  }

  const raw = content.slice(3 + newline.length, endIndex);
  const data = {};
  const errors = [];

  raw.split(/\r?\n/).forEach((line, index) => {
    if (!line.trim()) return;

    const match = line.match(/^([A-Za-z_][A-Za-z0-9_-]*):\s*(.*)$/);
    if (!match) {
      errors.push(`invalid frontmatter line ${index + 1}: ${line}`);
      return;
    }

    data[match[1]] = parseValue(match[2]);
  });

  return { data, errors };
}

function parseValue(value) {
  const trimmed = value.trim();

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((item) => item.trim().replace(/^["']|["']$/g, ""));
  }

  return trimmed.replace(/^["']|["']$/g, "");
}

function addIssue(issues, filePath, message) {
  issues.push({ file: relative(filePath), message });
}

function validate() {
  const issues = [];
  const tasks = listTaskFiles();
  const byId = new Map();
  const doneIds = new Set();
  const skillRefs = readSkillReferences();

  for (const task of tasks) {
    const content = fs.readFileSync(task.filePath, "utf8");
    const parsed = parseFrontmatter(content);
    task.content = content;
    task.frontmatter = parsed.data;

    for (const error of parsed.errors) {
      addIssue(issues, task.filePath, error);
    }

    for (const key of requiredFrontmatter) {
      if (!(key in parsed.data)) {
        addIssue(issues, task.filePath, `missing frontmatter field: ${key}`);
      }
    }

    for (const section of requiredSections) {
      if (!content.includes(section)) {
        addIssue(issues, task.filePath, `missing required section: ${section}`);
      }
    }

    if (parsed.data.status && parsed.data.status !== task.folder) {
      addIssue(
        issues,
        task.filePath,
        `frontmatter status "${parsed.data.status}" does not match folder "${task.folder}"`
      );
    }

    if (parsed.data.id) {
      if (byId.has(parsed.data.id)) {
        addIssue(issues, task.filePath, `duplicate task id: ${parsed.data.id}`);
      } else {
        byId.set(parsed.data.id, task);
      }
    }

    if (task.folder === "done" && parsed.data.id) {
      doneIds.add(parsed.data.id);
    }

    if ("depends_on" in parsed.data && !Array.isArray(parsed.data.depends_on)) {
      addIssue(issues, task.filePath, "depends_on must use inline list syntax, for example: [] or [TASK-0001]");
    }

    if ("skills" in parsed.data) {
      if (!Array.isArray(parsed.data.skills)) {
        addIssue(issues, task.filePath, "skills must use inline list syntax, for example: [] or [react-dashboard]");
      } else {
        for (const skill of parsed.data.skills) {
          if (!skillRefs.has(skill)) {
            addIssue(issues, task.filePath, `skill does not exist: ${skill}`);
          }
        }
      }
    }

    if ("expected_files" in parsed.data && !Array.isArray(parsed.data.expected_files)) {
      addIssue(issues, task.filePath, "expected_files must use inline list syntax, for example: [] or [src/App.tsx]");
    }

    if ("parallel_safe" in parsed.data && !isBooleanMetadata(parsed.data.parallel_safe)) {
      addIssue(issues, task.filePath, "parallel_safe must be true or false metadata");
    }
  }

  for (const task of tasks) {
    const deps = Array.isArray(task.frontmatter.depends_on) ? task.frontmatter.depends_on : [];

    for (const dep of deps) {
      if (!byId.has(dep)) {
        addIssue(issues, task.filePath, `dependency does not exist: ${dep}`);
      }

      if (task.folder === "ready" && !doneIds.has(dep)) {
        addIssue(issues, task.filePath, `ready task dependency is not done: ${dep}`);
      }
    }

    if (task.folder === "done" && !hasReviewerApproval(task.content)) {
      addIssue(issues, task.filePath, "done task is missing reviewer approval");
    }
  }

  return { tasks, issues };
}

function readSkillReferences() {
  const refs = new Set();

  if (fs.existsSync(skillsDir)) {
    for (const entry of fs.readdirSync(skillsDir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.endsWith(".md")) {
        refs.add(entry.name.replace(/\.md$/, ""));
      }
    }
  }

  if (fs.existsSync(skillRegistryPath)) {
    const registry = fs.readFileSync(skillRegistryPath, "utf8");

    for (const line of registry.split(/\r?\n/)) {
      const match = line.match(/^\|([^|]+)\|/);
      if (!match) continue;

      const skill = match[1].trim();
      if (!skill || skill === "Skill" || /^-+$/.test(skill)) continue;
      refs.add(skill);
    }
  }

  return refs;
}

function isBooleanMetadata(value) {
  return value === true || value === false || value === "true" || value === "false";
}

function hasReviewerApproval(content) {
  return /reviewer approval/i.test(content) && /approved/i.test(content);
}

function printResult(result) {
  const issueCount = result.issues.length;
  console.log(`AgentBoard validation: ${issueCount === 0 ? "PASS" : "FAIL"}`);
  console.log(`Checked ${result.tasks.length} task file${result.tasks.length === 1 ? "" : "s"}.`);

  if (issueCount === 0) {
    return;
  }

  console.log("");
  console.log(`${issueCount} issue${issueCount === 1 ? "" : "s"} found:`);
  for (const issue of result.issues) {
    console.log(`- ${issue.file}: ${issue.message}`);
  }
}

const result = validate();
printResult(result);
process.exit(result.issues.length === 0 ? 0 : 1);
