const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");

const repoRoot = path.resolve(__dirname, "../..");
const root = fs.mkdtempSync(path.join(os.tmpdir(), "agentboard-workflow-tools-"));

try {
  createBoard(root);

  writeTask(
    root,
    "review",
    "TASK-0022-missing-skill-report.md",
    [
      "---",
      "id: TASK-0022",
      "title: Missing Skill Report",
      "status: review",
      "assigned_agent: builder",
      "priority: medium",
      "depends_on: []",
      "created_by: orchestrator",
      "skills: [react-dashboard]",
      "expected_files: []",
      "parallel_safe: false",
      "---",
      "",
      "# User Request",
      "",
      "Test.",
      "",
      "# Objective",
      "",
      "Test.",
      "",
      "# Acceptance Criteria",
      "",
      "- [x] Works",
      "",
      "# Context",
      "",
      "Test.",
      "",
      "# Agent Instructions",
      "",
      "Test.",
      "",
      "# Completion Notes",
      "",
      "No skill usage note.",
    ],
  );

  let result = runScript(root, "scripts/validate-agentboard.js");
  assert.notEqual(result.status, 0);
  assert.match(result.stdout, /missing Completion Notes skill usage: Skill used: react-dashboard/);

  writeTask(
    root,
    "review",
    "TASK-0022-missing-skill-report.md",
    [
      "---",
      "id: TASK-0022",
      "title: Missing Skill Report",
      "status: review",
      "assigned_agent: builder",
      "priority: medium",
      "depends_on: []",
      "created_by: orchestrator",
      "skills: [react-dashboard]",
      "expected_files: []",
      "parallel_safe: false",
      "---",
      "",
      "# User Request",
      "",
      "Test.",
      "",
      "# Objective",
      "",
      "Test.",
      "",
      "# Acceptance Criteria",
      "",
      "- [x] Works",
      "",
      "# Context",
      "",
      "Test.",
      "",
      "# Agent Instructions",
      "",
      "Test.",
      "",
      "# Completion Notes",
      "",
      "Skill used: react-dashboard.",
    ],
  );

  result = runScript(root, "scripts/validate-agentboard.js");
  assert.equal(result.status, 0, result.stdout + result.stderr);

  result = runScript(root, "scripts/agentboard-task-move.js", [
    "TASK-0022",
    "in-progress",
    "--agent",
    "builder",
  ]);
  assert.equal(result.status, 0, result.stdout + result.stderr);

  const movedPath = path.join(root, ".agentboard", "in-progress", "TASK-0022-missing-skill-report.md");
  const moved = fs.readFileSync(movedPath, "utf8");
  assert.match(moved, /^status: in-progress$/m);
  assert.match(moved, /^claimed_by: builder$/m);
  assert.match(moved, /^claimed_at: \d{4}-\d{2}-\d{2}$/m);

  result = runScript(root, "scripts/smoke-agentboard-metadata.js", ["TASK-0022"]);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /"skills": \[/);
  assert.match(result.stdout, /"react-dashboard"/);

  result = runScript(root, "scripts/agentboard-task-preflight.js", ["TASK-0022"]);
  assert.equal(result.status, 0, result.stdout + result.stderr);
  assert.match(result.stdout, /Preflight: TASK-0022/);

  console.log("agentboard-workflow-tools.test.js passed");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}

function createBoard(targetRoot) {
  const boardDir = path.join(targetRoot, ".agentboard");
  for (const folder of ["inbox", "ready", "in-progress", "review", "done", "blocked", "skills"]) {
    fs.mkdirSync(path.join(boardDir, folder), { recursive: true });
  }

  fs.writeFileSync(path.join(boardDir, "skills", "react-dashboard.md"), "# React Dashboard Skill\n");
  fs.writeFileSync(
    path.join(boardDir, "skill-registry.md"),
    [
      "# Skill Registry",
      "",
      "|Skill|Purpose|Status|Applies To|",
      "|-|-|-|-|",
      "|react-dashboard|React dashboard implementation patterns|enabled|builder|",
      "",
    ].join("\n"),
  );
}

function writeTask(targetRoot, folder, filename, lines) {
  fs.writeFileSync(path.join(targetRoot, ".agentboard", folder, filename), lines.join("\n"));
}

function runScript(cwd, script, args = []) {
  return spawnSync(process.execPath, [path.join(repoRoot, script), ...args], {
    cwd,
    encoding: "utf8",
  });
}
