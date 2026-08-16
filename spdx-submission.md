# SPDX submission draft — `MIT-PoU`

Submitted, and kept here so the request and the repository do not drift apart. SPDX asks that a
licence be in use before it is listed — a licence with no users is a request for a namespace
rather than an identifier — and the honest state of that is in the "Is it in use?" section below.

**Filed as spdx/license-list-XML#3068**, at tag `v1.2.0` with the adoption list current. Three
earlier requests are closed, each with a pointer forward: #3063 (identifier settled), #3064 (tag
superseded), #3065 (tracked two versions by edits; refiled clean once the wording settled).

**Prepared for acceptance:** the XML and the test text are filed as
[spdx/license-list-XML#3069](https://github.com/spdx/license-list-XML/pull/3069), opened ahead of
the decision so nothing waits on the submitter; the sources live in [`spdx/`](spdx/).

**What happens next:** the legal team may ask for a pull request adding the XML. Any further
re-filing goes to the same place — an issue on
[spdx/license-list-XML](https://github.com/spdx/license-list-XML/issues) using the "New license/
exception request" template.

---

**Proposed full name:** MIT License with Proof-of-Usage Condition

**Proposed short identifier:** `MIT-PoU`

**License author or steward:** Erasmo Bellumat / Origami 限

**URL of the license text:**
https://github.com/origami-ltd/mit-proof-of-usage-license/blob/v1.2.0/LICENSE.md

Tagged and frozen at `v1.2.0`. Since `v1.0.1`: the heading carries the short identifier so the
text names itself (`v1.1.1`), and the record clause now says explicitly what the markup notes
always intended - the branch name is a suggestion, any branch that accepts pull requests serves,
and absent a designation the default branch is the one (`v1.2.0`). `main` may gain clarifications; the tag is
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
- **D — the text is stable and not in drafting.** Frozen at `v1.2.0`. The grant and both halves
  of the condition are unchanged since `v1.0`; `v1.1.1` renamed the heading and `v1.2.0` made the
  branch-name-is-a-suggestion reading explicit in the clause itself.
- **E — the steward commits to stability.** The text at `v1.2.0` will not be modified after
  addition: the tag stays where it points, and no revision of those terms is published under it or
  under the identifier `MIT-PoU`. A change to the terms would be a new version, a new tag and a
  separate request with its own identifier, so anything already labelled `MIT-PoU` keeps meaning
  what it means today. Documentation around the licence may keep changing; the file at the tag may
  not.

**OSI status:** Not submitted to OSI, and not expected to be approved. The added condition places
an obligation on a class of user, which the Open Source Definition does not permit. This is a
source-available licence and is described as one wherever it appears.

**Is it in use?** Yes, by seven repositories at the time of writing:

- https://github.com/mrxenginner/reVC — the first adopter that is not the author's. Proposed by
  the author (as maintainer of a downstream port), reviewed and merged by that repository's
  maintainer in [reVC#37](https://github.com/mrxenginner/reVC/pull/37).
- https://github.com/Polyphase-Labs/Polyphase-Engine — adopted 16 August 2026 in
  [#50](https://github.com/Polyphase-Labs/Polyphase-Engine/pull/50), merged by the project's own
  maintainer, with its own copyright holder in the notice. Previously unlicensed.
- https://github.com/gumiranda/cloudfunding — adopted 14 August 2026, replaceable fields filled;
  its copyright notice names its author and the licence's author jointly, a caveat stated in the
  request rather than left to be found.
- https://github.com/origami-ltd/wasm.com.br
- https://github.com/origami-ltd/wasm-revc
- https://github.com/origami-ltd/wasm-generals (the `web/` portion; the engine is GPL-3.0)
- https://github.com/origami-ltd/mit-proof-of-usage-license (the template itself)

Four of the seven are by the same author, which remains the honest weakness of this submission:
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
