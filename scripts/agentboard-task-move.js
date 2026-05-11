#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = process.cwd();
const boardDir = path.join(root, ".agentboard");
const taskFolders = ["inbox", "ready", "in-progress", "review", "done", "blocked"];

const [, , taskId, targetFolder, ...flags] = process.argv;

if (!taskId || !targetFolder || !taskFolders.includes(targetFolder)) {
  console.error("Usage: node scripts/agentboard-task-move.js TASK-0000 <folder> [--agent builder]");
  console.error(`Folders: ${taskFolders.join(", ")}`);
  process.exit(1);
}

const agent = readFlag(flags, "--agent");
const source = findTaskFile(taskId);

if (!source) {
  console.error(`Task not found: ${taskId}`);
  process.exit(1);
}

const targetDir = path.join(boardDir, targetFolder);
const targetPath = path.join(targetDir, path.basename(source.filePath));

if (source.folder === targetFolder) {
  console.log(`${relative(source.filePath)} already in ${targetFolder}.`);
  process.exit(0);
}

if (fs.existsSync(targetPath)) {
  console.error(`Target already exists: ${relative(targetPath)}`);
  process.exit(1);
}

const content = fs.readFileSync(source.filePath, "utf8");
const updated = updateFrontmatter(content, targetFolder, agent);

fs.mkdirSync(targetDir, { recursive: true });
fs.writeFileSync(targetPath, updated);
fs.unlinkSync(source.filePath);

console.log(`Moved ${taskId}: ${source.folder} -> ${targetFolder}`);
console.log(`Path: ${relative(targetPath)}`);

function findTaskFile(id) {
  for (const folder of taskFolders) {
    const dir = path.join(boardDir, folder);
    if (!fs.existsSync(dir)) continue;

    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isFile() && entry.name.startsWith(`${id}-`) && entry.name.endsWith(".md")) {
        return { folder, filePath: path.join(dir, entry.name) };
      }
    }
  }

  return null;
}

function updateFrontmatter(content, status, claimedAgent) {
  const newline = content.startsWith("---\r\n") ? "\r\n" : "\n";
  const endMarker = `${newline}---${newline}`;
  const endIndex = content.indexOf(endMarker, 3);

  if (endIndex === -1) {
    throw new Error("Task file is missing closing frontmatter delimiter.");
  }

  const raw = content.slice(3 + newline.length, endIndex);
  const body = content.slice(endIndex);
  let foundClaimedBy = false;
  let foundClaimedAt = false;
  const lines = raw.split(/\r?\n/).map((line) => {
    if (line.startsWith("status:")) {
      return `status: ${status}`;
    }

    if (claimedAgent && line.startsWith("claimed_by:")) {
      foundClaimedBy = true;
      return `claimed_by: ${claimedAgent}`;
    }

    if (claimedAgent && line.startsWith("claimed_at:")) {
      foundClaimedAt = true;
      return `claimed_at: ${new Date().toISOString().slice(0, 10)}`;
    }

    return line;
  });

  if (claimedAgent && !foundClaimedBy) {
    lines.push(`claimed_by: ${claimedAgent}`);
  }

  if (claimedAgent && !foundClaimedAt) {
    lines.push(`claimed_at: ${new Date().toISOString().slice(0, 10)}`);
  }

  return `---${newline}${lines.join(newline)}${body}`;
}

function readFlag(values, name) {
  const index = values.indexOf(name);
  return index === -1 ? "" : values[index + 1] || "";
}

function relative(filePath) {
  return path.relative(root, filePath).replace(/\\/g, "/");
}
