// SPDX-License-Identifier: CC0-1.0
/**
 * The licence text lives once, in LICENSE.md. These generators exist so nobody - including the
 * maintainer - ever copies it anywhere by hand again: `adoption` writes a filled licence and a
 * fresh register into a project, `page` refreshes the published page's embed.
 *
 *   npx plop adoption
 *   npx plop page
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { licenceFor, withCurrentEmbed } from "./tools/licence-text.mjs";

export default function (plop) {
  plop.setGenerator("adoption", {
    description: "Write LICENSE.md and PROOF_OF_USAGE.md into a project, brackets filled",
    prompts: [
      { type: "input", name: "dest", message: "Project directory to write into", validate: (v) => !!v || "required" },
      { type: "input", name: "holders", message: "Copyright holders, e.g. Ada Lovelace and contributors", validate: (v) => !!v || "required" },
      { type: "input", name: "year", message: "Copyright year(s)", default: String(new Date().getFullYear()) },
      { type: "input", name: "work", message: "Canonical URL of the work, e.g. https://github.com/acme/widget", validate: (v) => /^https?:\/\/\S+[^/]$/.test(v) || "an URL, no trailing slash" },
      { type: "input", name: "endpoint", message: "Provenance endpoint URL (blank for pull-request only)", default: "" },
    ],
    actions: [
      function writeLicence(answers) {
        const path = resolve(answers.dest, "LICENSE.md");
        if (existsSync(path)) throw new Error(`${path} already exists - not a decision a generator gets to make`);
        const appendix = answers.endpoint
          ? `\nAPPENDIX A - PROVENANCE ENDPOINT (this project only):\nA system unable to open the pull request required by half one may POST the\nsame fields to ${answers.endpoint} - which opens\nthat pull request on its behalf and answers with its URL. The endpoint commits\nonly in its own fork and may decline any submission, in which case the pull\nrequest remains the system's to open.\n`
          : "";
        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, `# MIT License with Proof-of-Usage Condition (MIT-PoU)\n\n${licenceFor(answers.year, answers.holders)}${appendix}`);
        return `wrote ${path}`;
      },
      function writeRegister(answers) {
        const path = resolve(answers.dest, "PROOF_OF_USAGE.md");
        if (existsSync(path)) return `skipped ${path}: already exists`;
        const template = readFileSync(join(plop.getPlopfilePath(), "templates", "register.md.hbs"), "utf8");
        writeFileSync(path, template.split("{{work}}").join(answers.work));
        return `wrote ${path}`;
      },
    ],
  });

  plop.setGenerator("page", {
    description: "Refresh the licence embed in a gh-pages checkout from LICENSE.md",
    prompts: [
      { type: "input", name: "pages", message: "Path to the gh-pages checkout", validate: (v) => !!v || "required" },
    ],
    actions: [
      function refresh(answers) {
        const path = resolve(answers.pages, "index.html");
        const before = readFileSync(path, "utf8");
        const after = withCurrentEmbed(before);
        if (after === before) return "already in sync";
        writeFileSync(path, after);
        return `updated ${path}`;
      },
    ],
  });
}
