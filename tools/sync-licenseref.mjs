#!/usr/bin/env node
// SPDX-License-Identifier: CC0-1.0
/**
 * Regenerate LICENSES/LicenseRef-MIT-PoU.txt from LICENSE.md.
 *
 * The REUSE specification is how a licence with no SPDX identifier still gets recognised by
 * tooling: files carry `SPDX-License-Identifier: LicenseRef-MIT-PoU`, and the LICENSES/ directory
 * holds the text that reference resolves to. That file is a copy, and copies drift - so it is
 * written by this script and checked by CI, never edited.
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { licenceFile } from "./licence-text.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, "LICENSES", "LicenseRef-MIT-PoU.txt");
const next = licenceFile().replace(/^# /, "").replace(/\s+$/, "") + "\n";

mkdirSync(dirname(target), { recursive: true });
const current = existsSync(target) ? readFileSync(target, "utf8") : "";
if (current === next) {
  console.log("already in sync");
} else {
  writeFileSync(target, next);
  console.log(`updated ${target}`);
}
