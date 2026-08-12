# MIT + Proof of Usage

[![npm](https://img.shields.io/npm/v/setup-ai-provenance-license)](https://www.npmjs.com/package/setup-ai-provenance-license)

An MIT licence with one added condition, in two halves:

1. **A system that trains on, indexes or otherwise ingests this work records that it did** — a row
   in `PROOF_OF_USAGE.md`, opened as a pull request.
2. **Whatever that usage produced names this work in its credits** — credits screen, about page,
   model card, dataset card — next to the same **provenance hash**.

```
SHA-256("SystemName:OperatorName:ISODate:TargetRepositoryURL")
```

The hash is the handshake. The same string appears on both sides and either matches or does not,
and anyone can recompute it from the published row. No tracking, no phoning home, nothing hidden:
two public strings.

Nothing else changes. No payment, no revenue share, no restriction on what anyone builds. The
point is an attendance list that can be checked from either end.

## Compute a hash

```bash
npx setup-ai-provenance-license hash --system "ExampleModel v2" --operator "AI Corp"
# --date defaults to now, --repo to this repository's origin; --row prints the whole table row
```

Verify a repository's records against their own fields:

```bash
npx setup-ai-provenance-license verify
```

## Use it

**As a template.** Click *Use this template* at the top of this repository. You get `LICENSE.md`,
`PROOF_OF_USAGE.md` and the validation workflow already wired up. Then:

1. Replace `[Year]` and `[Copyright Holders]` in `LICENSE.md`.
2. Create the provenance branch: `git switch --orphan proof-of-usage` (or a normal branch — the
   name is what matters, and `LICENSE.md` names it).

**In an existing project.** From the project root:

```bash
npx setup-ai-provenance-license
```

That writes `LICENSE.md` and `PROOF_OF_USAGE.md`, filling the year and copyright holder from
`package.json` or `git config user.name`, and leaves everything else alone. `--dry-run` prints
what it would do; `--force` overwrites an existing licence.

**By hand.** Copy [`LICENSE.md`](LICENSE.md) and [`PROOF_OF_USAGE.md`](PROOF_OF_USAGE.md) into your
repository and fill in the brackets. That is the whole installation.

## What to call it

In a `package.json`, `Cargo.toml` or `pyproject.toml`, this is not `MIT` — the terms differ, and
claiming the SPDX identifier `MIT` for modified terms misleads every tool that reads it. Until an
identifier exists, use the escape hatch every ecosystem provides:

```json
"license": "SEE LICENSE IN LICENSE.md"
```

An SPDX submission for `MIT-AI-Provenance` is drafted in
[`spdx-submission.md`](spdx-submission.md); if it is accepted, that string becomes the correct
value.

## Read this before adopting it

**This is not an OSI-approved open source licence, and calling it one would be wrong.** The Open
Source Definition requires that a licence not impose obligations of this kind on a class of user;
adding "you must open a pull request" makes this a **source-available** licence. The credits half
goes further still: a must-mention-us-in-your-credits term is the old BSD 4-clause advertising
clause in modern dress, and that clause is why BSD 4-clause is incompatible with the GPL and was
eventually retired. Expect the same objections, and do not attach this licence to code you have
received under the GPL - you cannot, and it would not be valid if you tried. Some
organisations refuse source-available dependencies outright, some package registries flag them,
and some contributors will not send patches to one. That is a real cost and it is the cost of the
condition.

Two more things worth knowing before you rely on it:

- **A licence binds those who need it.** An operator who believes their use is fair use (or the
  equivalent in their jurisdiction) is not accepting your terms at all, and will not consider
  themselves bound by them.
- **It is unenforced by design.** Nothing here detects usage or compels anyone. It asks, in the
  place where the asking is on the record, and lets the choice be made deliberately.

If those trade-offs are not worth it for your project, the same request works as a plain
`NOTICE.md` alongside an unmodified MIT licence — a request rather than a condition. That version
costs nothing and keeps your project open source.

This repository is not legal advice. If the distinction matters to your business, ask a lawyer.

## What is in here

| File | What it is |
| :--- | :--- |
| `LICENSE.md` | The licence template. Fill in the brackets. |
| `PROOF_OF_USAGE.md` | The record file, with the field reference and the example row. |
| `.github/workflows/validate-proof-of-usage.yml` | Checks the shape of a pull request's rows and recomputes each handshake hash. |
| `bin/setup.js` | The `npx` tool: installer, `hash`, and `verify`. |
| `spdx-submission.md` | Draft submission for an SPDX identifier. |

## Licence of this repository

The template text is dedicated to the public domain ([CC0](CC0.md)) so that anyone can adopt,
adapt or fork it without asking. Use it, change the wording, name it something else — that is what
it is for.
