# SPDX submission draft — `MIT-AI-Provenance`

Not submitted. This is the request, written out, ready to send when the licence has actually been
used somewhere — SPDX asks that a licence be in use before it is listed, and a licence with no
users is a request for a namespace rather than an identifier.

**Where it goes:** open an issue on
[spdx/license-list-XML](https://github.com/spdx/license-list-XML/issues) using the "New license/
exception request" template, then follow up with a pull request adding the XML if the legal team
asks for one.

---

**Proposed full name:** MIT License with AI Provenance Condition

**Proposed short identifier:** `MIT-AI-Provenance`

**License author or steward:** Erasmo Bellumat / Origami 限

**URL of the license text:**
https://github.com/origami-ltd/mit-proof-of-usage-license/blob/main/LICENSE.md

**OSI status:** Not submitted to OSI, and not expected to be approved. The added condition places
an obligation on a class of user, which the Open Source Definition does not permit. This is a
source-available licence and is described as one wherever it appears.

**Is it in use?** [list repositories and their URLs here before submitting]

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
