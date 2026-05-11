#!/usr/bin/env node

const { readBoard } = require("./lib/agentboard-parser");

const [, , taskId] = process.argv;

if (!taskId) {
  console.error("Usage: node scripts/smoke-agentboard-metadata.js TASK-0000");
  process.exit(1);
}

const board = readBoard();
const task = board.tasks.find((candidate) => candidate.id === taskId);

if (!task) {
  console.error(`Task not found: ${taskId}`);
  process.exit(1);
}

console.log(JSON.stringify(
  {
    id: task.id,
    status: task.status,
    folderStatus: task.folderStatus,
    statusMatchesFolder: task.statusMatchesFolder,
    skills: task.skills,
    expectedFiles: task.expectedFiles,
    parallelSafe: task.parallelSafe,
  },
  null,
  2,
));
