# MIT + Proof of Usage

[![npm](https://img.shields.io/npm/v/proof-of-usage?label=proof-of-usage)](https://www.npmjs.com/package/proof-of-usage)

**[origami-ltd.github.io/mit-proof-of-usage-license](https://origami-ltd.github.io/mit-proof-of-usage-license/)** — the same thing on one page, for anyone who finds it by searching rather than by link.

> **The format is now its own thing: [Proof of Usage `PoU/1.0`](https://github.com/origami-ltd/proof-of-usage).**
> It specifies the record, the credit and the hash independently of any licence, so a project can
> ask for provenance from beside MIT, Apache-2.0 or the GPL without changing its licence at all —
> `npx proof-of-usage init`. This repository is the version where the asking is a **condition**
> rather than a request: one implementation of that format, and the one with the costs described
> further down. If you are not sure you want those costs, you want the format.

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
npx proof-of-usage hash --system "ExampleModel v2" --operator "AI Corp"
# --date defaults to now, --repo to this repository's origin; --row prints the whole table row
```

Verify a repository's records against their own fields:

```bash
npx proof-of-usage verify
```

## Record a usage

The record is a pull request against the project's `proof-of-usage` branch, and a system that can
open one opens it. For a system that cannot — no credentials, no fork, a connector that may read a
repository but not create a branch in it — some projects publish an appendix to their licence
naming a **provenance endpoint** that opens the pull request on the system's behalf. `record` asks
the project which one it is and posts the row there:

```bash
npx proof-of-usage record \
  --system "ExampleModel v2" --operator "AI Corp" --contact "provenance@aicorp.com" \
  --repo "https://github.com/acme/widget"
```

It reads the target repository's `LICENSE.md`, uses the URL on its `PROVENANCE ENDPOINT:` line,
and prints the pull request that came back. A project that names none is a project where the pull
request is the only route, and it says so instead of guessing. `--endpoint` overrides the lookup;
there is no default and this tool has no endpoint of its own.

Nothing about the endpoint is part of the licence above: it is one project's arrangement, offered
by that project, and running one is a choice each project makes for itself. A courier that is
worth using recomputes the hash from the fields it was given rather than trusting a submitted one,
commits in its own fork so nothing is written to the project until a maintainer merges, answers a
repeat submission with the pull request that already carries it, and keeps no store of submissions
beyond the ordinary server log of the request — which is also the honest thing to say out loud: a
system that asks a host to act for it announces itself to that host.

## Use it

Step by step, including the parts worth thinking about first: **[ADOPTING.md](ADOPTING.md)**.

**As a template.** Click *Use this template* at the top of this repository. You get `LICENSE.md`,
`PROOF_OF_USAGE.md` and the validation workflow already wired up. Then:

1. Replace `[Year]` and `[Copyright Holders]` in `LICENSE.md`.
2. Create the provenance branch: `git switch --orphan proof-of-usage` (or a normal branch — the
   name is what matters, and `LICENSE.md` names it).

**In an existing project.** From the project root:

```bash
npx proof-of-usage licence
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

An SPDX submission for `MIT-PoU` is drafted in
[`spdx-submission.md`](spdx-submission.md) and filed as
[#3065](https://github.com/spdx/license-list-XML/issues/3065); if it is accepted, that string
becomes the correct value.

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
| `bin/setup.js` | The old installer, kept for reference. The tool is [`proof-of-usage`](https://www.npmjs.com/package/proof-of-usage) now. |
| `ADOPTING.md` | How to put this on your own project. |
| `spdx-submission.md` | The SPDX submission — filed as spdx/license-list-XML#3065. |

## Licence of this repository

The template text is dedicated to the public domain ([CC0](CC0.md)) so that anyone can adopt,
adapt or fork it without asking. Use it, change the wording, name it something else — that is what
it is for.
