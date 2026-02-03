import "module-alias/register";
import path from "path";
import fs from "fs";

const resolveExistingPath = (candidates: string[]) => {
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return candidates[0];
};

// Support both source tree (backend/src) and dist-only builds (backend/dist/src).
const aliases = {
  "@b": resolveExistingPath([
    path.resolve(__dirname, "src"),
    path.resolve(__dirname, "dist", "src"),
    path.resolve(__dirname, "..", "dist", "src"),
  ]),
  "@db": resolveExistingPath([
    path.resolve(__dirname, "models"),
    path.resolve(__dirname, "dist", "models"),
    path.resolve(__dirname, "..", "dist", "models"),
  ]),
};

for (const alias in aliases) {
  require("module-alias").addAlias(alias, aliases[alias]);
}
