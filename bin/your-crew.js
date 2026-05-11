#!/usr/bin/env node

const { run: runInitializer } = require("../scripts/init-agentboard");

function printHelp() {
  console.log(`Usage: your-crew <command> [options]

Commands:
  init    Scaffold Your Crew into a target repository.

Examples:
  your-crew init --target ../target-repo --dry-run
  your-crew init --target ../target-repo --interactive

Run "your-crew init --help" for initializer options.`);
}

async function main(argv) {
  const [command, ...args] = argv;

  if (!command || command === "--help" || command === "-h") {
    printHelp();
    return;
  }

  if (command !== "init") {
    throw new Error(`Unknown command: ${command}`);
  }

  await runInitializer(args, { commandName: "your-crew init" });
}

main(process.argv.slice(2)).catch((error) => {
  console.error(`your-crew failed: ${error.message}`);
  process.exit(1);
});
