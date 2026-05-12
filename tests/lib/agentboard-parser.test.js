const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  TASK_STATUSES,
  parseMarkdownSections,
  parseTaskContent,
  readBoard,
} = require("../../scripts/lib/agentboard-parser");

const root = fs.mkdtempSync(path.join(os.tmpdir(), "agentboard-parser-"));

try {
  for (const status of TASK_STATUSES) {
    fs.mkdirSync(path.join(root, ".agentboard", status), { recursive: true });
  }
  fs.mkdirSync(path.join(root, ".agentboard", "artifacts"), { recursive: true });

  fs.writeFileSync(
    path.join(root, ".agentboard", "ready", "TASK-0001-sample.md"),
    [
      "---",
      "id: TASK-0001",
      "title: Sample Task",
      "status: ready",
      "assigned_agent: builder",
      "priority: high",
      "depends_on: [TASK-0000]",
      "created_by: orchestrator",
      "---",
      "",
      "# Objective",
      "",
      "Build a sample task.",
      "",
      "# Acceptance Criteria",
      "",
      "- [ ] Works",
      "",
    ].join("\n"),
  );
  fs.writeFileSync(
    path.join(root, ".agentboard", "artifacts", "TASK-0001-sample-artifact.md"),
    "# Sample Artifact\n",
  );

  fs.writeFileSync(
    path.join(root, ".agentboard", "blocked", "TASK-0002-mismatch.md"),
    [
      "---",
      "id: TASK-0002",
      "title: Mismatch Task",
      "status: ready",
      "assigned_agent: builder",
      "priority: medium",
      "depends_on: []",
      "created_by: orchestrator",
      "---",
      "",
      "# Objective",
      "",
      "Expose mismatched status.",
      "",
    ].join("\n"),
  );

  const board = readBoard(root);
  assert.equal(board.tasks.length, 2);
  assert.equal(board.columns.ready.length, 1);
  assert.equal(board.columns.blocked.length, 1);

  const sample = board.columns.ready[0];
  assert.equal(sample.id, "TASK-0001");
  assert.equal(sample.title, "Sample Task");
  assert.equal(sample.status, "ready");
  assert.equal(sample.folderStatus, "ready");
  assert.equal(sample.statusMatchesFolder, true);
  assert.equal(sample.assignedAgent, "builder");
  assert.equal(sample.priority, "high");
  assert.deepEqual(sample.dependsOn, ["TASK-0000"]);
  assert.equal(sample.relativePath, ".agentboard/ready/TASK-0001-sample.md");
  assert.deepEqual(sample.artifacts, [".agentboard/artifacts/TASK-0001-sample-artifact.md"]);
  assert.equal(sample.sections.Objective.content, "Build a sample task.");
  assert.equal(sample.sections["Acceptance Criteria"].content, "- [ ] Works");

  const mismatch = board.columns.blocked[0];
  assert.equal(mismatch.status, "ready");
  assert.equal(mismatch.folderStatus, "blocked");
  assert.equal(mismatch.statusMatchesFolder, false);

  const sections = parseMarkdownSections("# First\n\nOne\n\n# Second\n\nTwo");
  assert.equal(sections.First.content, "One");
  assert.equal(sections.Second.content, "Two");

  const parsed = parseTaskContent("---\nid: TASK-0003\ndepends_on: []\n---\n\n# Context\n\nRaw body", {
    filePath: path.join(root, ".agentboard", "inbox", "TASK-0003-raw.md"),
    folderStatus: "inbox",
    root,
  });
  assert.equal(parsed.body.includes("# Context"), true);
  assert.deepEqual(parsed.dependsOn, []);

  console.log("agentboard-parser.test.js passed");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
