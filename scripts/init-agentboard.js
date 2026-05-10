#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const sourceRoot = path.resolve(__dirname, "..");
const boardFolders = [
  ".agentboard/inbox",
  ".agentboard/ready",
  ".agentboard/in-progress",
  ".agentboard/review",
  ".agentboard/done",
  ".agentboard/blocked",
  ".agentboard/artifacts",
  ".agentboard/agents",
  ".agentboard/templates",
];

const copyFiles = [
  ["AGENTS.md", "AGENTS.md"],
  [".agentboard/agent-registry.md", ".agentboard/agent-registry.md"],
  [".agentboard/templates/task.md", ".agentboard/templates/task.md"],
  [".agentboard/agents/orchestrator.md", ".agentboard/agents/orchestrator.md"],
  [".agentboard/agents/builder.md", ".agentboard/agents/builder.md"],
  [".agentboard/agents/content-creator.md", ".agentboard/agents/content-creator.md"],
  [".agentboard/agents/reviewer.md", ".agentboard/agents/reviewer.md"],
  [".agentboard/agents/workflow-runner.md", ".agentboard/agents/workflow-runner.md"],
  [".agentboard/agents/repo-ops.md", ".agentboard/agents/repo-ops.md"],
  ["scripts/validate-agentboard.js", "scripts/validate-agentboard.js"],
];

const setupQuestions = [
  "What are we building?",
  "What type of project is this?",
  "What technology stack is used?",
  "What is the main project goal?",
  "What should agents avoid touching?",
  "Which optional specialists or skills might be useful later?",
];

function parseArgs(argv) {
  const options = {
    target: process.cwd(),
    dryRun: false,
    force: false,
    help: false,
    answers: {},
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--target") {
      options.target = readValue(argv, index, arg);
      index += 1;
    } else if (arg.startsWith("--target=")) {
      options.target = arg.slice("--target=".length);
    } else if (arg === "--project-name") {
      options.answers.projectName = readValue(argv, index, arg);
      index += 1;
    } else if (arg.startsWith("--project-name=")) {
      options.answers.projectName = arg.slice("--project-name=".length);
    } else if (arg === "--project-type") {
      options.answers.projectType = readValue(argv, index, arg);
      index += 1;
    } else if (arg.startsWith("--project-type=")) {
      options.answers.projectType = arg.slice("--project-type=".length);
    } else if (arg === "--tech-stack") {
      options.answers.techStack = readValue(argv, index, arg);
      index += 1;
    } else if (arg.startsWith("--tech-stack=")) {
      options.answers.techStack = arg.slice("--tech-stack=".length);
    } else if (arg === "--goal") {
      options.answers.goal = readValue(argv, index, arg);
      index += 1;
    } else if (arg.startsWith("--goal=")) {
      options.answers.goal = arg.slice("--goal=".length);
    } else if (arg === "--avoid") {
      options.answers.avoid = readValue(argv, index, arg);
      index += 1;
    } else if (arg.startsWith("--avoid=")) {
      options.answers.avoid = arg.slice("--avoid=".length);
    } else if (arg === "--optional-skills") {
      options.answers.optionalSkills = readValue(argv, index, arg);
      index += 1;
    } else if (arg.startsWith("--optional-skills=")) {
      options.answers.optionalSkills = arg.slice("--optional-skills=".length);
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }

  options.target = path.resolve(options.target);
  return options;
}

function readValue(argv, index, flag) {
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value`);
  }
  return value;
}

function printHelp() {
  console.log(`Usage: node scripts/init-agentboard.js [options]

Options:
  --target <path>             Target repository path. Defaults to current directory.
  --dry-run                   Show planned changes without writing files.
  --force                     Allow overwriting existing files.
  --project-name <text>       Answer: What are we building?
  --project-type <text>       Answer: What type of project is this?
  --tech-stack <text>         Answer: What technology stack is used?
  --goal <text>               Answer: What is the main project goal?
  --avoid <text>              Answer: What should agents avoid touching?
  --optional-skills <text>    Answer: Which optional specialists or skills might be useful later?
  --help                      Show this help.

The initializer is safe by default: existing files are skipped unless --force is provided.`);
}

function ensureTargetExists(target, dryRun) {
  if (fs.existsSync(target)) return;

  if (dryRun) {
    logPlan("create directory", target);
    return;
  }

  fs.mkdirSync(target, { recursive: true });
}

function ensureDir(targetDir, dryRun) {
  if (fs.existsSync(targetDir)) {
    logSkip("directory exists", targetDir);
    return;
  }

  if (dryRun) {
    logPlan("create directory", targetDir);
    return;
  }

  fs.mkdirSync(targetDir, { recursive: true });
  logDone("created directory", targetDir);
}

function copyFile(sourceRelative, targetRelative, options) {
  const source = path.join(sourceRoot, sourceRelative);
  const target = path.join(options.target, targetRelative);

  if (!fs.existsSync(source)) {
    throw new Error(`Source file is missing: ${sourceRelative}`);
  }

  writeFile(target, fs.readFileSync(source, "utf8"), options);
}

function writeFile(target, content, options) {
  const fileExists = fs.existsSync(target);

  if (fileExists && !options.force) {
    logSkip("file exists", target);
    return;
  }

  if (options.dryRun) {
    logPlan(fileExists ? "overwrite file" : "create file", target);
    return;
  }

  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  logDone(fileExists ? "overwrote file" : "created file", target);
}

function createProjectProfile(options) {
  const answers = options.answers;
  return `# Project Profile

## Setup Questions

Use these questions to adapt Your Crew to this repository:

1. What are we building?
2. What type of project is this?
3. What technology stack is used?
4. What is the main project goal?
5. What should agents avoid touching?
6. Which optional specialists or skills might be useful later?

## Project Name

${answers.projectName || "TODO: describe what this project is building"}

## Project Type

${answers.projectType || "TODO: identify the project type"}

## Goal

${answers.goal || "TODO: define the main project goal"}

## Tech Stack

${formatList(answers.techStack)}

## Agent Constraints

${formatList(answers.avoid)}

## Enabled Agents

- orchestrator
- builder
- reviewer
- content-creator
- workflow-runner
- repo-ops

## Enabled Skills

${formatList(answers.optionalSkills)}

## Future Extensions

- Add optional specialists as new role files under \`.agentboard/agents/\`.
- Track enabled skills here before wiring them into tasks or role guidance.
- Keep parallel agents, MCP integrations, and background automation out of scope until explicitly added by future project tasks.
`;
}

function formatList(value) {
  if (!value) return "- TODO";

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `- ${item}`)
    .join("\n") || "- TODO";
}

function logPlan(action, filePath) {
  console.log(`[dry-run] Would ${action}: ${relativeToCwd(filePath)}`);
}

function logDone(action, filePath) {
  console.log(`${action}: ${relativeToCwd(filePath)}`);
}

function logSkip(action, filePath) {
  console.log(`skipped, ${action}: ${relativeToCwd(filePath)}`);
}

function relativeToCwd(filePath) {
  return path.relative(process.cwd(), filePath).replace(/\\/g, "/") || ".";
}

function run() {
  const options = parseArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    return;
  }

  console.log(`Initializing Your Crew in ${options.target}`);
  if (options.dryRun) console.log("Dry-run mode: no files will be written.");
  if (options.force) console.log("Force mode: existing files may be overwritten.");

  ensureTargetExists(options.target, options.dryRun);

  for (const folder of boardFolders) {
    ensureDir(path.join(options.target, folder), options.dryRun);
  }

  for (const [source, target] of copyFiles) {
    copyFile(source, target, options);
  }

  writeFile(path.join(options.target, ".agentboard/project-profile.md"), createProjectProfile(options), options);

  console.log("");
  console.log("Initial setup questionnaire:");
  for (const question of setupQuestions) {
    console.log(`- ${question}`);
  }
  console.log("");
  console.log("Initializer complete.");
}

try {
  run();
} catch (error) {
  console.error(`Initializer failed: ${error.message}`);
  process.exit(1);
}
