"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const path_1 = require("path");
const fs_1 = require("fs");

const resolveExistingPath = (candidates) => {
  for (const candidate of candidates) {
    if ((0, fs_1.existsSync)(candidate)) return candidate;
  }
  return candidates[0];
};

const aliases = {
  "@b": resolveExistingPath([
    (0, path_1.resolve)(__dirname, "src"),
    (0, path_1.resolve)(__dirname, "dist", "src"),
    (0, path_1.resolve)(__dirname, "..", "dist", "src"),
  ]),
  "@db": resolveExistingPath([
    (0, path_1.resolve)(__dirname, "models"),
    (0, path_1.resolve)(__dirname, "dist", "models"),
    (0, path_1.resolve)(__dirname, "..", "dist", "models"),
  ]),
};

for (const alias in aliases) {
  require("module-alias").addAlias(alias, aliases[alias]);
}
