#!/usr/bin/env node
/**
 * Three jobs, one binary.
 *
 *   (no command)  drop LICENSE.md and PROOF_OF_USAGE.md into the project this is run from
 *   hash          compute the handshake hash for a row
 *   verify        check a repository's recorded rows against their own fields
 *
 * The installer fills in the year and the copyright holder from whatever the project already
 * knows, because the one thing that stops people adopting a licence is having to edit it. It
 * never overwrites an existing licence without --force: replacing the terms a project is
 * published under is not a decision a setup script gets to make.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = process.cwd();
const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const command = argv[0] && !argv[0].startsWith("--") ? argv[0] : "install";
const flags = new Set(argv.filter((a) => a.startsWith("--")));
const opt = (name) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? undefined : argv[i + 1];
};

const read = (p) => readFileSync(p, "utf8");
const quiet = (cmd) => { try { return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim(); } catch { return ""; } };

/** SHA-256("SystemName:OperatorName:ISODate:TargetRepositoryURL"), lowercase hex. */
export function provenanceHash(system, operator, date, repo) {
  const parts = [system, operator, date, repo].map((v) => String(v ?? "").trim());
  if (parts.some((p) => !p)) throw new Error("all four fields are required: system, operator, date, repo");
  return createHash("sha256").update(parts.join(":"), "utf8").digest("hex");
}

function originUrl() {
  const url = quiet("git config --get remote.origin.url");
  if (!url) return "";
  return url.replace(/^git@github\.com:/, "https://github.com/").replace(/\.git$/, "");
}

if (command === "hash") {
  const repo = opt("repo") ?? originUrl();
  const date = opt("date") ?? new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
  try {
    const digest = provenanceHash(opt("system"), opt("operator"), date, repo);
    if (flags.has("--row")) {
      console.log(`| ${opt("system")} | ${opt("operator")} | ${date} | ${opt("what") ?? "whole repository"} | ${opt("purpose") ?? "training"} | ${opt("contact") ?? "you@example.com"} | \`${digest}\` |`);
    } else {
      console.log(digest);
    }
  } catch (error) {
    console.error(`${error.message}\n\nusage: npx setup-ai-provenance-license hash --system "Model v2" --operator "AI Corp" [--date ISO] [--repo URL] [--row]`);
    process.exit(2);
  }
  process.exit(0);
}

if (command === "verify") {
  const file = opt("file") ?? join(root, "PROOF_OF_USAGE.md");
  const repo = opt("repo") ?? originUrl();
  if (!existsSync(file)) { console.error(`no ${file}`); process.exit(2); }
  const rows = read(file).split("\n")
    .filter((l) => l.trim().startsWith("|") && !/^\|[\s:|-]+\|$/.test(l.trim()))
    .map((l) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim()))
    .filter((cells) => cells.length === 7 && !/^\s*\*?\*?System/i.test(cells[0]));
  let bad = 0;
  for (const [system, operator, date, , , , recorded] of rows) {
    const clean = recorded.replace(/`/g, "").trim();
    const expected = provenanceHash(system, operator, date, repo);
    const ok = clean === expected;
    if (!ok) bad++;
    console.log(`${ok ? "ok  " : "BAD "} ${system} / ${operator} / ${date}${ok ? "" : `\n     recorded ${clean}\n     expected ${expected}`}`);
  }
  console.log(`\n${rows.length} row(s), ${bad} mismatched`);
  process.exit(bad ? 1 : 0);
}

// install
const dryRun = flags.has("--dry-run");
const force = flags.has("--force");

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
  if (dryRun) console.log(`would write ${name} (${year}, ${who})`);
  else { writeFileSync(join(root, name), body); console.log(`wrote ${name}`); }
  wrote++;
}

if (!wrote) process.exit(0);

console.log(`
Two things left, and neither is automatic:

  1. Create the provenance branch the licence names:
       git switch --orphan proof-of-usage && git add PROOF_OF_USAGE.md && git commit -m "Start the record"

  2. If your manifest declares a licence, it is no longer "MIT" - the terms differ. Use:
       "license": "SEE LICENSE IN LICENSE.md"

Anyone recording a usage computes their hash with:
  npx setup-ai-provenance-license hash --system "Model v2" --operator "AI Corp"

This licence is source-available, not OSI open source. See the README for what that costs.`);
