const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const {
  getBoardResponse,
  parseValidationIssues,
  getTaskResponse,
  getValidationResponse,
} = require("../../scripts/lib/agentboard-api");
const { TASK_STATUSES } = require("../../scripts/lib/agentboard-parser");

const root = fs.mkdtempSync(path.join(os.tmpdir(), "agentboard-api-"));

try {
  for (const status of TASK_STATUSES) {
    fs.mkdirSync(path.join(root, ".agentboard", status), { recursive: true });
  }

  fs.writeFileSync(
    path.join(root, ".agentboard", "ready", "TASK-0001-api.md"),
    [
      "---",
      "id: TASK-0001",
      "title: API Task",
      "status: ready",
      "assigned_agent: builder",
      "priority: high",
      "depends_on: []",
      "created_by: orchestrator",
      "---",
      "",
      "# Objective",
      "",
      "Expose this task through the API.",
      "",
    ].join("\n"),
  );

  const boardResponse = getBoardResponse(root);
  assert.equal(boardResponse.ok, true);
  assert.equal(boardResponse.data.columns.ready.length, 1);
  assert.equal(boardResponse.data.columns.ready[0].id, "TASK-0001");

  const taskResponse = getTaskResponse("TASK-0001", root);
  assert.equal(taskResponse.ok, true);
  assert.equal(taskResponse.data.title, "API Task");

  const missingTaskResponse = getTaskResponse("TASK-9999", root);
  assert.equal(missingTaskResponse.ok, false);
  assert.equal(missingTaskResponse.status, 404);
  assert.equal(missingTaskResponse.error.code, "TASK_NOT_FOUND");

  const validationResponse = getValidationResponse(process.cwd());
  assert.equal(typeof validationResponse.ok, "boolean");
  assert.equal(typeof validationResponse.data.stdout, "string");
  assert.equal(Array.isArray(validationResponse.data.issues), true);
  assert.equal(typeof validationResponse.data.checkedTaskCount, "number");

  assert.deepEqual(parseValidationIssues("- .agentboard/ready/TASK-0001.md: missing field"), [
    {
      file: ".agentboard/ready/TASK-0001.md",
      message: "missing field",
    },
  ]);

  console.log("agentboard-api.test.js passed");
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
