# Contributing

These are small projects with one maintainer. That shapes everything below.

## Before you write code

**Open an issue first** for anything larger than a typo. Not for ceremony — because most of these
repositories are ports, and half the good ideas belong upstream rather than here. An issue costs
you two minutes and can save you an afternoon of work I have to turn down.

## Where a change belongs

This repository is a licence template and the tooling around it. Wording changes are welcome and
should say what a reader misunderstood; changes to the terms themselves need a reason a lawyer
would recognise, because anyone who has adopted the licence is relying on them.

The templates are CC0. You do not need permission to fork this and publish your own variant, and
that is often the better move than arguing here.

## Pull requests

- One subject per pull request.
- Explain **why**, not what. The diff says what changed; the message has to say what was wrong.
- No AI attribution in commit messages, no generated footers. Commits are written by whoever
  authored them.
- If it touches `bin/setup.js` or the workflow, run them. Both are testable in a scratch directory.

## Recording a use rather than contributing one

If you are here because an automated system read one of these repositories, you are looking for
`PROOF_OF_USAGE.md` and the `proof-of-usage` branch. That pull request is welcome, wanted, and the
one contribution nobody has to ask permission for.

## Reporting something broken

Issues are fine for bugs. For anything with a security dimension, read SECURITY.md first — some
things should not be opened in public.
