const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const TASK_STATUSES = ["inbox", "ready", "in-progress", "review", "done", "blocked"];

/**
 * @typedef {"inbox" | "ready" | "in-progress" | "review" | "done" | "blocked"} TaskStatus
 *
 * @typedef {Object} MarkdownSection
 * @property {string} title
 * @property {string} content
 *
 * @typedef {Object} AgentBoardTask
 * @property {string} id
 * @property {string} title
 * @property {string} status
 * @property {TaskStatus} folderStatus
 * @property {boolean} statusMatchesFolder
 * @property {string} assignedAgent
 * @property {string} priority
 * @property {string[]} dependsOn
 * @property {string[]} skills
 * @property {string[]} expectedFiles
 * @property {boolean | null} parallelSafe
 * @property {string[]} artifacts
 * @property {string} createdBy
 * @property {string} filePath
 * @property {string} relativePath
 * @property {Record<string, unknown>} frontmatter
 * @property {string} body
 * @property {Record<string, MarkdownSection>} sections
 *
 * @typedef {Object} AgentBoard
 * @property {AgentBoardTask[]} tasks
 * @property {Record<TaskStatus, AgentBoardTask[]>} columns
 * @property {SkillRegistryEntry[]} skills
 *
 * @typedef {Object} SkillRegistryEntry
 * @property {string} name
 * @property {string} purpose
 * @property {string} status
 * @property {string} appliesTo
 * @property {string} relativePath
 */

function readBoard(root = process.cwd()) {
  const boardDir = path.join(root, ".agentboard");
  const columns = createEmptyColumns();
  const tasks = [];

  for (const status of TASK_STATUSES) {
    const folderPath = path.join(boardDir, status);

    if (!fs.existsSync(folderPath)) {
      continue;
    }

    const entries = fs
      .readdirSync(folderPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .sort((left, right) => left.name.localeCompare(right.name));

    for (const entry of entries) {
      const filePath = path.join(folderPath, entry.name);
      const task = parseTaskFile(filePath, status, root);
      tasks.push(task);
      columns[status].push(task);
    }
  }

  const artifactsByTaskId = readArtifactsByTaskId(root);
  for (const task of tasks) {
    task.artifacts = artifactsByTaskId.get(task.id) || [];
  }

  tasks.sort(compareTasks);
  for (const status of TASK_STATUSES) {
    columns[status].sort(compareTasks);
  }

  return { tasks, columns, skills: readSkillRegistry(root) };
}

function parseTaskFile(filePath, folderStatus, root = process.cwd()) {
  const content = fs.readFileSync(filePath, "utf8");
  return parseTaskContent(content, {
    filePath,
    folderStatus,
    root,
  });
}

function parseTaskContent(content, options) {
  const parsed = matter(content);
  const frontmatter = parsed.data || {};
  const body = parsed.content;
  const status = stringify(frontmatter.status);
  const folderStatus = options.folderStatus;

  return {
    id: stringify(frontmatter.id),
    title: stringify(frontmatter.title),
    status,
    folderStatus,
    statusMatchesFolder: status === folderStatus,
    assignedAgent: stringify(frontmatter.assigned_agent),
    priority: stringify(frontmatter.priority),
    dependsOn: normalizeDependsOn(frontmatter.depends_on),
    skills: normalizeList(frontmatter.skills),
    expectedFiles: normalizeList(frontmatter.expected_files),
    parallelSafe: normalizeBooleanMetadata(frontmatter.parallel_safe),
    artifacts: [],
    createdBy: stringify(frontmatter.created_by),
    filePath: options.filePath,
    relativePath: toRelativePath(options.root, options.filePath),
    frontmatter,
    body,
    sections: parseMarkdownSections(body),
  };
}

function readArtifactsByTaskId(root = process.cwd()) {
  const artifactsDir = path.join(root, ".agentboard", "artifacts");
  const artifactsByTaskId = new Map();

  if (!fs.existsSync(artifactsDir)) {
    return artifactsByTaskId;
  }

  for (const entry of fs.readdirSync(artifactsDir, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".md")) {
      continue;
    }

    const match = entry.name.match(/^(TASK-\d+)/);
    if (!match) {
      continue;
    }

    const artifactPath = toRelativePath(root, path.join(artifactsDir, entry.name));
    const existing = artifactsByTaskId.get(match[1]) || [];
    existing.push(artifactPath);
    artifactsByTaskId.set(match[1], existing.sort());
  }

  return artifactsByTaskId;
}

function parseMarkdownSections(body) {
  const sections = {};
  const lines = body.replace(/\r\n/g, "\n").split("\n");
  let currentTitle = null;
  let currentLines = [];

  for (const line of lines) {
    const match = line.match(/^#\s+(.+?)\s*$/);

    if (match) {
      flushSection(sections, currentTitle, currentLines);
      currentTitle = match[1];
      currentLines = [];
      continue;
    }

    currentLines.push(line);
  }

  flushSection(sections, currentTitle, currentLines);
  return sections;
}

function flushSection(sections, title, lines) {
  if (!title) {
    return;
  }

  sections[title] = {
    title,
    content: lines.join("\n").trim(),
  };
}

function normalizeDependsOn(value) {
  return normalizeList(value);
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map(stringify).filter(Boolean);
  }

  if (typeof value === "string" && value.trim()) {
    return [value.trim()];
  }

  return [];
}

function normalizeBooleanMetadata(value) {
  if (value === true || value === false) {
    return value;
  }

  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return null;
}

function readSkillRegistry(root = process.cwd()) {
  const registryPath = path.join(root, ".agentboard", "skill-registry.md");
  const skillsDir = path.join(root, ".agentboard", "skills");

  if (!fs.existsSync(registryPath)) {
    return [];
  }

  const registry = fs.readFileSync(registryPath, "utf8");

  return registry
    .split(/\r?\n/)
    .map((line) => parseSkillRegistryRow(line, root, skillsDir))
    .filter(Boolean);
}

function parseSkillRegistryRow(line, root, skillsDir) {
  if (!line.startsWith("|")) {
    return null;
  }

  const cells = line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());

  if (cells.length < 4 || cells[0] === "Skill" || /^-+$/.test(cells[0])) {
    return null;
  }

  const skillPath = path.join(skillsDir, `${cells[0]}.md`);

  return {
    name: cells[0],
    purpose: cells[1],
    status: cells[2],
    appliesTo: cells[3],
    relativePath: fs.existsSync(skillPath) ? toRelativePath(root, skillPath) : "",
  };
}

function createEmptyColumns() {
  return TASK_STATUSES.reduce((columns, status) => {
    columns[status] = [];
    return columns;
  }, {});
}

function compareTasks(left, right) {
  return left.id.localeCompare(right.id) || left.relativePath.localeCompare(right.relativePath);
}

function stringify(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value);
}

function toRelativePath(root, filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}

module.exports = {
  TASK_STATUSES,
  parseMarkdownSections,
  readSkillRegistry,
  parseTaskContent,
  parseTaskFile,
  readArtifactsByTaskId,
  readBoard,
};
