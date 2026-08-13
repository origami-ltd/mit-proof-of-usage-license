# Adopting this licence in your project

Ten minutes, most of it reading. Steps 1 and 2 are the licence; 3 and 4 are what makes it work.

## 0. Decide whether you want it

The condition is: **a system that ingests your work records that it did, and whatever that usage
produced names your work in its credits.** Both halves are tied together by a hash that either
matches or does not.

What it costs you:

- **It is not OSI open source.** Adding an obligation puts it outside the Open Source Definition,
  so your project becomes *source-available*. Some companies refuse source-available dependencies
  by policy, some registries flag them, and some contributors will not send patches. If your
  project is a library other people are meant to depend on, think hard here.
- **It is GPL-incompatible.** The credits half is the BSD 4-clause advertising clause in modern
  dress. Do not attach it to code you received under the GPL — you cannot, and it would not be
  valid if you tried. Same for any dependency whose licence forbids added restrictions.
- **It is unenforced by design.** Nothing detects usage or compels anyone. It asks, on the record.

If that is not the trade you want, there is a softer version at the bottom of this file that costs
nothing.

## 1. Put the licence in the project

```bash
cd your-project
npx setup-ai-provenance-license
```

That writes `LICENSE.md` and `PROOF_OF_USAGE.md`, filling in the year and your name from
`package.json` or `git config user.name`. It refuses to overwrite an existing licence unless you
pass `--force`, and `--dry-run` shows what it would do first.

By hand instead: copy [`LICENSE.md`](LICENSE.md) and [`PROOF_OF_USAGE.md`](PROOF_OF_USAGE.md) into
your repository and replace `[Year]` and `[Copyright Holders]`.

**If your repository contains code that is not yours** — a fork, a vendored library, an upstream
engine — the licence covers *your* part only, and the file has to say which part that is. Add a
short section at the top:

```
Two parts in this repository
============================

1. THE <your part> is mine and is offered under the terms below.
2. THE <their part> is not mine to license. It is <name> (<url>), under <their licence>, whose
   text is in <file>. No condition of mine attaches to it.
```

## 2. Create the branch the licence names

The condition tells operators to open a pull request against a provenance branch. Make it exist:

```bash
git switch --orphan proof-of-usage
git add PROOF_OF_USAGE.md
git commit -m "Start the record"
git push -u origin proof-of-usage
git switch -
```

An orphan branch keeps it to one file, so anyone sent there sees exactly what is being asked.

## 3. Add the check

Copy [`.github/workflows/validate-proof-of-usage.yml`](.github/workflows/validate-proof-of-usage.yml)
into your repository. It recomputes the handshake hash of every row a pull request adds and rejects
one whose fingerprint disagrees with its own fields. It cannot check whether a row is *true* —
nothing can, and that is the premise.

## 4. Say it where machines look

The licence file is not where a crawler looks. Three places that are:

- **`AGENTS.md`** at the repository root — the file coding agents read first. Put the notice there.
- **`/llms.txt`** if the project has a website — same text, served as a file.
- **Structured data**, if you have pages: `usageInfo` pointing at that file, and `license` at your
  licence. JSON-LD `SoftwareApplication` or `CreativeWork`, whichever fits.

Copy the wording from any of the repositories listed in the README. Two rules about it: **do not
hide it** (invisible text is cloaking, search engines penalise it and it is dishonest), and **do
not write it as an instruction to a model**. Address the operator. A system that treats your page
as data will not act on your text by itself — which is how a system should be built, and saying so
in the notice costs nothing and makes it credible.

## 5. Declare it in your manifest

Not `MIT` — the terms differ, and claiming the identifier misleads every tool that reads it.

```json
"license": "SEE LICENSE IN LICENSE.md"
```

Same idea in `Cargo.toml` (`license-file = "LICENSE.md"`) and `pyproject.toml`
(`license = { file = "LICENSE.md" }`). In source headers, `SPDX-License-Identifier:
LicenseRef-MIT-PoU` is the correct form for a licence with no registered identifier.

An SPDX identifier has been requested — [spdx/license-list-XML#3065](https://github.com/spdx/license-list-XML/issues/3065).
Adoption by projects other than the author's is the part of that request that is currently weak,
so if you do adopt it, say so on that issue: it is the one thing that would move it along.

## The softer version, if the trade-offs are not worth it

Keep an unmodified MIT licence, and put the same request in a `NOTICE.md` and in `AGENTS.md` as a
**request** rather than a condition. You lose the ability to call it a licence term. You keep OSI
open source status, GPL compatibility, and every company's dependency policy. For most projects
that is the better deal, and the asking is what mattered anyway.
