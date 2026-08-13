# SPDX submission draft — `MIT-PoU`

Submitted, and kept here so the request and the repository do not drift apart. SPDX asks that a
licence be in use before it is listed — a licence with no users is a request for a namespace
rather than an identifier — and the honest state of that is in the "Is it in use?" section below.

**Filed as spdx/license-list-XML#3065**, at tag `v1.1.1`. Two earlier requests are closed: #3063,
in favour of #3064 when the identifier was settled, and #3064 in favour of this one when the tag
it named stopped being the current text. Nothing in the terms changed across any of them - a
request that names a superseded tag is a request a reviewer has to reconcile before reading it.

**What happens next:** the legal team may ask for a pull request adding the XML. Any further
re-filing goes to the same place — an issue on
[spdx/license-list-XML](https://github.com/spdx/license-list-XML/issues) using the "New license/
exception request" template.

---

**Proposed full name:** MIT License with Proof-of-Usage Condition

**Proposed short identifier:** `MIT-PoU`

**License author or steward:** Erasmo Bellumat / Origami 限

**URL of the license text:**
https://github.com/origami-ltd/mit-proof-of-usage-license/blob/v1.1.1/LICENSE.md

Tagged and frozen at `v1.1.1`, which differs from `v1.0.1` in its heading alone: the title now
carries the short identifier, so the text names itself. `main` may gain clarifications; the tag is
what an identifier would point at, and any change to the terms themselves would be a new version.

The same text renders as a page at
https://origami-ltd.github.io/mit-proof-of-usage-license/#text for anyone who would rather read it
without a repository around it.

**Definitive factors, in their words:**

- **A — does not match a listed licence.** The grant is MIT verbatim, but the added condition is
  roughly forty lines no listed licence contains, so the texts are not substantially similar under
  the matching guidelines. Nearest relative in effect, not in wording: BSD-4-Clause.
- **B — not OSI-approved,** so it does not apply.
- **C — it is a source licence.** MIT grant, source distributed under it, no restriction on source
  availability.
- **D — the text is stable and not in drafting.** Frozen at `v1.1.1`. That tag differs from
  `v1.0.1` in its heading alone; the terms have not changed since `v1.0`.
- **E — the steward commits to stability.** The text at `v1.1.1` will not be modified after
  addition: the tag stays where it points, and no revision of those terms is published under it or
  under the identifier `MIT-PoU`. A change to the terms would be a new version, a new tag and a
  separate request with its own identifier, so anything already labelled `MIT-PoU` keeps meaning
  what it means today. Documentation around the licence may keep changing; the file at the tag may
  not.

**OSI status:** Not submitted to OSI, and not expected to be approved. The added condition places
an obligation on a class of user, which the Open Source Definition does not permit. This is a
source-available licence and is described as one wherever it appears.

**Is it in use?** Yes, by five repositories at the time of writing:

- https://github.com/mrxenginner/reVC — the first adopter that is not the author's. Proposed by
  the author (as maintainer of a downstream port), reviewed and merged by that repository's
  maintainer in [reVC#37](https://github.com/mrxenginner/reVC/pull/37).
- https://github.com/origami-ltd/wasm.com.br
- https://github.com/origami-ltd/wasm-revc
- https://github.com/origami-ltd/wasm-generals (the `web/` portion; the engine is GPL-3.0)
- https://github.com/origami-ltd/mit-proof-of-usage-license (the template itself)

Four of the five are by the same author, which remains the honest weakness of this submission:
SPDX asks for a licence in use, and one outside adoption is a start rather than a settlement. If
the list team would rather wait for more, that is a reasonable answer and this can sit until there
is some.

**Description:**

The MIT License, unmodified, with one added condition in two halves. An operator whose automated
system reads, ingests, indexes, embeds, trains on, fine-tunes from, or produces output derived
from the software must (a) record that usage in the repository, by opening a pull request against
a provenance branch and adding a row naming the system, the operator, an ISO 8601 timestamp, the
scope accessed, the purpose, a contact address and a provenance hash; and (b) name the repository
in the credits of the resulting product, alongside the same hash.

The hash is SHA-256("SystemName:OperatorName:ISODate:TargetRepositoryURL"), lowercase hex, and
exists so that the two halves can be checked against each other by anyone.

Nothing further is required: no payment, no revenue share, and no restriction on what may be
built.

Note for reviewers: half (b) is an attribution-in-credits term of the kind the BSD 4-clause
advertising clause introduced, with the known GPL-incompatibility that implies. It is stated
plainly in the licence's own documentation rather than left to be discovered.

**Why a new identifier rather than an exception:** the condition adds an obligation to the grant
rather than removing one from it, and it applies to all use by automated systems rather than to a
carve-out. It reads as a licence variant, not as an exception in the SPDX sense — but if the legal
team prefers to model it as `MIT WITH AI-Provenance-exception`, that is fine and the text needs no
change.

**Markup notes for the XML:** `[Year]` and `[Copyright Holders]` are the standard copyright
replaceable fields. The provenance branch name (`proof-of-usage`) and the record filename
(`PROOF_OF_USAGE.md`) are given as examples in the text and should be marked optional/replaceable
so a project may name them differently without forking the identifier.
