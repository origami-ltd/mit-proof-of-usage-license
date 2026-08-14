// SPDX-License-Identifier: CC0-1.0
/**
 * The licence text lives in LICENSE.md and nowhere else. Everything that needs it - the plop
 * generators, the page sync, the workflow - reads it through here, so a wording change is one
 * edit and a regeneration, never a hunt for copies.
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/** The full file, heading included. */
export const licenceFile = () => readFileSync(join(root, "LICENSE.md"), "utf8");

/** The text below the heading - what adopters copy and the page embeds. */
export const licenceCore = () => licenceFile().replace(/^# .*\n\n/, "").replace(/\s+$/, "") + "\n";

/** The core with the template brackets filled. */
export const licenceFor = (year, holders) =>
  licenceCore()
    .replace("[Year]", String(year))
    .replace("[Copyright Holders]", holders);

export const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Swap the licence embed inside the published page's HTML for the current text. */
export function withCurrentEmbed(pageHtml) {
  const marker = /(<pre class="licence"><code>)[\s\S]*?(<\/code><\/pre>)/;
  if (!marker.test(pageHtml)) {
    throw new Error('the page has no <pre class="licence"> embed to update');
  }
  return pageHtml.replace(marker, `$1${escapeHtml(licenceCore().trimEnd())}$2`);
}
