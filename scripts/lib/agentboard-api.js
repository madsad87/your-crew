const { spawnSync } = require("child_process");
const path = require("path");
const { readBoard } = require("./agentboard-parser");

function getBoardResponse(root = process.cwd()) {
  return {
    ok: true,
    data: readBoard(root),
  };
}

function getTaskResponse(taskId, root = process.cwd()) {
  const board = readBoard(root);
  const task = board.tasks.find((candidate) => candidate.id === taskId);

  if (!task) {
    return {
      ok: false,
      status: 404,
      error: {
        code: "TASK_NOT_FOUND",
        message: `Task ${taskId} was not found.`,
      },
    };
  }

  return {
    ok: true,
    data: task,
  };
}

function getValidationResponse(root = process.cwd()) {
  const validatorPath = path.join(root, "scripts", "validate-agentboard.js");
  const result = spawnSync(process.execPath, [validatorPath], {
    cwd: root,
    encoding: "utf8",
  });

  return {
    ok: result.status === 0,
    data: {
      exitCode: result.status,
      stdout: result.stdout,
      stderr: result.stderr,
      checkedTaskCount: parseCheckedTaskCount(result.stdout),
      issues: parseValidationIssues(result.stdout),
    },
  };
}

function parseCheckedTaskCount(stdout) {
  const match = stdout.match(/Checked\s+(\d+)\s+task file/i);
  return match ? Number(match[1]) : 0;
}

function parseValidationIssues(stdout) {
  return stdout
    .split(/\r?\n/)
    .map((line) => line.match(/^-\s+(.+?):\s+(.+)$/))
    .filter(Boolean)
    .map((match) => ({
      file: match[1],
      message: match[2],
    }));
}

function createAgentBoardApiPlugin(root = process.cwd()) {
  return {
    name: "agentboard-local-api",
    configureServer(server) {
      server.middlewares.use("/api/board", (request, response) => {
        if (request.method !== "GET") {
          sendJson(response, 405, methodNotAllowed());
          return;
        }

        sendSafely(response, () => getBoardResponse(root));
      });

      server.middlewares.use("/api/tasks/", (request, response) => {
        if (request.method !== "GET") {
          sendJson(response, 405, methodNotAllowed());
          return;
        }

        const taskId = decodeURIComponent((request.url || "").replace(/^\//, ""));

        if (!taskId) {
          sendJson(response, 400, {
            ok: false,
            error: {
              code: "TASK_ID_REQUIRED",
              message: "A task ID is required.",
            },
          });
          return;
        }

        sendSafely(response, () => getTaskResponse(taskId, root));
      });

      server.middlewares.use("/api/validate", (request, response) => {
        if (request.method !== "GET" && request.method !== "POST") {
          sendJson(response, 405, methodNotAllowed());
          return;
        }

        sendSafely(response, () => getValidationResponse(root));
      });
    },
  };
}

function sendSafely(response, getPayload) {
  try {
    const payload = getPayload();
    sendJson(response, payload.status || 200, payload);
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      error: {
        code: "AGENTBOARD_API_ERROR",
        message: error instanceof Error ? error.message : "Unknown AgentBoard API error.",
      },
    });
  }
}

function sendJson(response, statusCode, payload) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(payload, null, 2));
}

function methodNotAllowed() {
  return {
    ok: false,
    error: {
      code: "METHOD_NOT_ALLOWED",
      message: "This endpoint only supports read-only AgentBoard API methods.",
    },
  };
}

module.exports = {
  createAgentBoardApiPlugin,
  getBoardResponse,
  getTaskResponse,
  getValidationResponse,
  parseValidationIssues,
};
