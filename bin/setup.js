#!/usr/bin/env node
/**
 * Drop the licence and the record file into the project this is run from.
 *
 * It fills in the year and the copyright holder from whatever the project already knows -
 * package.json, then git - because the one thing that stops people adopting a licence is having to
 * edit it. Nothing else in the project is touched, and an existing LICENSE is never overwritten
 * without --force: replacing the terms a project is already published under is not a thing a
 * setup script gets to decide.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const here = dirname(fileURLToPath(import.meta.url));
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const force = args.has("--force");

const read = (p) => readFileSync(p, "utf8");
const quiet = (cmd) => { try { return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch { return ""; } };

function holder() {
  try {
    const pkg = JSON.parse(read(join(root, "package.json")));
    const author = typeof pkg.author === "string" ? pkg.author : pkg.author?.name;
    if (author) return author.replace(/\s*<[^>]*>/, "").replace(/\s*\([^)]*\)/, "").trim();
  } catch { /* no package.json, or not ours to read */ }
  return quiet("git config user.name") || "[Copyright Holders]";
}

const templates = [
  { name: "LICENSE.md", protectedNames: ["LICENSE", "LICENSE.md", "LICENSE.txt", "COPYING"] },
  { name: "PROOF_OF_USAGE.md", protectedNames: ["PROOF_OF_USAGE.md"] },
];

const year = new Date().getFullYear();
const who = holder();
let wrote = 0;

for (const { name, protectedNames } of templates) {
  const existing = protectedNames.find((f) => existsSync(join(root, f)));
  if (existing && !force) {
    console.log(`skipped ${name}: ${existing} already exists (use --force to replace it)`);
    continue;
  }
  const body = read(join(here, "..", name))
    .replace("[Year]", String(year))
    .replace("[Copyright Holders]", who);
  if (dryRun) {
    console.log(`would write ${name} (${year}, ${who})`);
  } else {
    writeFileSync(join(root, name), body);
    console.log(`wrote ${name}`);
  }
  wrote++;
}

if (!wrote) process.exit(0);

console.log(`
Two things left, and neither is automatic:

  1. Create the provenance branch the licence names:
       git switch --orphan proof-of-usage && git add PROOF_OF_USAGE.md && git commit -m "Start the record"

  2. If your manifest declares a licence, it is no longer "MIT" - the terms differ. Use:
       "license": "SEE LICENSE IN LICENSE.md"

This licence is source-available, not OSI open source. See the README for what that costs.`);
