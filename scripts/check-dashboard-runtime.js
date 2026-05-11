#!/usr/bin/env node

const baseUrl = process.argv[2] || "http://127.0.0.1:5173";

async function main() {
  const checks = [
    { name: "app shell", url: "/" },
    { name: "board api", url: "/api/board" },
    { name: "validation api", url: "/api/validate" },
  ];

  for (const check of checks) {
    const response = await fetch(`${baseUrl}${check.url}`);
    if (!response.ok) {
      throw new Error(`${check.name} failed with ${response.status}`);
    }

    console.log(`${check.name}: ${response.status}`);
  }

  console.log(`Dashboard runtime check passed: ${baseUrl}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
