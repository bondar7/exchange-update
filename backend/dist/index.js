"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const path_1 = require("path");
const fs_1 = require("fs");

const envPaths = [
  (0, path_1.resolve)(process.cwd(), ".env"),
  (0, path_1.resolve)(__dirname, "../.env"),
  (0, path_1.resolve)(__dirname, ".env"),
  (0, path_1.resolve)(process.cwd(), "../.env"),
];

let envLoaded = false;
for (const envPath of envPaths) {
  if ((0, fs_1.existsSync)(envPath)) {
    require("dotenv").config({ path: envPath });
    envLoaded = true;
    break;
  }
}

if (!envLoaded) {
  require("dotenv").config();
}

require("./module-alias-setup");

const resolveBackendEntry = () => {
  const candidates = [
    (0, path_1.resolve)(__dirname, "src"),
    (0, path_1.resolve)(__dirname, "dist", "src"),
    (0, path_1.resolve)(__dirname, "..", "dist", "src"),
  ];
  for (const candidate of candidates) {
    if ((0, fs_1.existsSync)(candidate)) return candidate;
  }
  throw new Error(`Backend source not found. Tried: ${candidates.join(", ")}`);
};

const backendEntry = resolveBackendEntry();
const { MashServer } = require(backendEntry);
const { console$, logger } = require((0, path_1.join)(backendEntry, "utils", "console"));

const port = process.env.NEXT_PUBLIC_BACKEND_PORT || 4000;

const startApp = async () => {
  try {
    const app = new MashServer();
    await app.startServer(Number(port));
  } catch (error) {
    console$.error("Failed to start server", error);
    logger.error("APP", "Failed to initialize app", error);
    process.exit(1);
  }
};

startApp();
