import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { createRequire } from "node:module";
import { defineConfig } from "vite";

const require = createRequire(import.meta.url);
const { createAgentBoardApiPlugin } = require("./scripts/lib/agentboard-api");

export default defineConfig({
  plugins: [react(), tailwindcss(), createAgentBoardApiPlugin()],
});
