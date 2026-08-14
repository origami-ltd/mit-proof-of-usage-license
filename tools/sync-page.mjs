#!/usr/bin/env node
// SPDX-License-Identifier: CC0-1.0
/**
 * Keep the published page's licence embed identical to LICENSE.md.
 *
 *   node tools/sync-page.mjs <path-to-gh-pages-checkout>
 *
 * The page carries the full licence text so a searcher reads the terms without a repository
 * around them - which means every wording change used to be copied over by hand, and one of those
 * copies once vanished into a detached HEAD. This is that copy, mechanised: idempotent, loud when
 * the page has no embed, exit 0 with "already in sync" when there is nothing to do.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { withCurrentEmbed } from "./licence-text.mjs";

const pagesDir = process.argv[2] ?? process.env.PAGES_DIR;
if (!pagesDir || !existsSync(join(pagesDir, "index.html"))) {
  console.error("usage: node tools/sync-page.mjs <path-to-gh-pages-checkout>  (index.html not found)");
  process.exit(2);
}

const page = join(pagesDir, "index.html");
const before = readFileSync(page, "utf8");
const after = withCurrentEmbed(before);

if (after === before) {
  console.log("already in sync");
} else {
  writeFileSync(page, after);
  console.log(`updated ${page}`);
}
