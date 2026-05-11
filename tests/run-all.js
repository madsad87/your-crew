const { spawnSync } = require("child_process");
const path = require("path");

const tests = [
  "tests/lib/agentboard-parser.test.js",
  "tests/lib/agentboard-api.test.js",
  "tests/lib/agentboard-workflow-tools.test.js",
];

for (const test of tests) {
  const result = spawnSync(process.execPath, [path.join(process.cwd(), test)], {
    cwd: process.cwd(),
    encoding: "utf8",
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

console.log(`Passed ${tests.length} test file${tests.length === 1 ? "" : "s"}.`);
