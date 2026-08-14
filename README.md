# MIT-PoU

**The MIT License with Proof-of-Usage Condition.** A source-available licence: the MIT grant,
word for word, plus one condition addressed to automated systems, in two halves:

1. **A system that trains on, indexes or otherwise ingests this work records that it did** — one
   row in `PROOF_OF_USAGE.md`, opened as a pull request.
2. **Whatever that usage produced names this work in its credits** — credits screen, about page,
   model card, dataset card — next to the same **provenance hash**:

```
SHA-256("SystemName:OperatorName:ISODate:TargetRepositoryURL")
```

The same digest appears on both sides and either matches or does not, and anyone can recompute it
from the published row. Nothing else changes: no payment, no revenue share, no restriction on what
anyone builds. The full text is [LICENSE.md](LICENSE.md) — current version **v1.2.0**, also
readable [as a page](https://origami-ltd.github.io/mit-proof-of-usage-license/).

This repository is the **licence**. The record/credit/hash mechanism is specified independently of
any licence — and usable beside unmodified MIT, Apache-2.0 or GPL as a request — at
[origami-ltd/proof-of-usage](https://github.com/origami-ltd/proof-of-usage), which also holds the
tooling and the **[adoption guide](https://github.com/origami-ltd/proof-of-usage/blob/main/ADOPTING.md)**.

## Adopt it

```bash
npx proof-of-usage licence
```

That writes `LICENSE.md` and `PROOF_OF_USAGE.md` into your project, filling the year and holder.
Or click *Use this template* on this repository, or copy the two files by hand and fill in the
brackets. The trade-offs worth reading first, and the rest of the steps:
[the adoption guide](https://github.com/origami-ltd/proof-of-usage/blob/main/ADOPTING.md).

## What to call it

In a `package.json`, `Cargo.toml` or `pyproject.toml`, this is not `MIT` — the terms differ, and
claiming the SPDX identifier `MIT` for modified terms misleads every tool that reads it. Until an
identifier exists, use the escape hatch every ecosystem provides:

```json
"license": "SEE LICENSE IN LICENSE.md"
```

An SPDX identifier has been requested as `MIT-PoU` — drafted in
[`spdx-submission.md`](spdx-submission.md), filed as
[spdx/license-list-XML#3065](https://github.com/spdx/license-list-XML/issues/3065). If it is
accepted, that string becomes the correct value.

## Read this before adopting it

**This is not an OSI-approved open source licence, and calling it one would be wrong.** The Open
Source Definition requires that a licence not impose obligations of this kind on a class of user;
adding "you must open a pull request" makes this a **source-available** licence. The credits half
goes further still: a must-mention-us-in-your-credits term is the old BSD 4-clause advertising
clause in modern dress, and that clause is why BSD 4-clause is incompatible with the GPL and was
eventually retired. Expect the same objections, and do not attach this licence to code you have
received under the GPL — you cannot, and it would not be valid if you tried. Some organisations
refuse source-available dependencies outright, some package registries flag them, and some
contributors will not send patches to one. That is a real cost and it is the cost of the
condition.

Two more things worth knowing before you rely on it:

- **A licence binds those who need it.** An operator who believes their use is fair use (or the
  equivalent in their jurisdiction) is not accepting your terms at all, and will not consider
  themselves bound by them.
- **It is unenforced by design.** Nothing here detects usage or compels anyone. It asks, in the
  place where the asking is on the record, and lets the choice be made deliberately.

If those trade-offs are not worth it for your project, the same request works beside an unmodified
MIT licence — `npx proof-of-usage init` writes it as a `NOTICE.md`, and the project stays open
source. For most projects that is the better deal, and the asking is what mattered anyway.

This repository is not legal advice. If the distinction matters to your business, ask a lawyer.

## What is in here

| File | What it is |
| :--- | :--- |
| [`LICENSE.md`](LICENSE.md) | The licence. As a template, fill in the brackets. |
| [`PROOF_OF_USAGE.md`](PROOF_OF_USAGE.md) | This repository's live register — and the template a new adoption starts from. |
| [`.github/workflows/validate-proof-of-usage.yml`](.github/workflows/validate-proof-of-usage.yml) | Recomputes each recorded hash on a pull request. |
| [`spdx-submission.md`](spdx-submission.md) | The SPDX request, kept in sync with the issue. |
| [`AGENTS.md`](AGENTS.md) | The notice, addressed to the system that reads it first. |

## Licence of this repository

The template text is dedicated to the public domain ([CC0](CC0.md)) so that anyone can adopt,
adapt or fork it without asking. Use it, change the wording, name it something else — that is what
it is for.
