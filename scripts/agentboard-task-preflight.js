#!/usr/bin/env node

const { readBoard } = require("./lib/agentboard-parser");

const [, , taskId] = process.argv;

if (!taskId) {
  console.error("Usage: node scripts/agentboard-task-preflight.js TASK-0000");
  process.exit(1);
}

const board = readBoard();
const task = board.tasks.find((candidate) => candidate.id === taskId);

if (!task) {
  console.error(`Task not found: ${taskId}`);
  process.exit(1);
}

const acceptance = task.sections["Acceptance Criteria"]?.content || "";
const checked = (acceptance.match(/- \[x\]/gi) || []).length;
const unchecked = (acceptance.match(/- \[ \]/g) || []).length;
const expectedFiles = task.expectedFiles.filter(Boolean);

console.log(`Preflight: ${task.id} ${task.title}`);
console.log(`Status: ${task.folderStatus} / ${task.status || "missing"}`);
console.log(`Assigned: ${task.assignedAgent || "unassigned"}`);
console.log(`Skills: ${task.skills.length > 0 ? task.skills.join(", ") : "none"}`);
console.log(`Expected files: ${expectedFiles.length > 0 ? expectedFiles.join(", ") : "none"}`);
console.log(`Acceptance: ${checked} checked, ${unchecked} unchecked`);

if (unchecked === 0 && checked > 0) {
  console.log("Recommendation: acceptance criteria already appear satisfied; validate before implementing new code.");
} else {
  console.log("Recommendation: inspect expected files and existing behavior before deciding implementation scope.");
}
