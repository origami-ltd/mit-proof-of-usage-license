# Security policy

## Reporting a vulnerability

**Do not open a public issue.** Use GitHub's private vulnerability reporting on the affected
repository — the *Security* tab, *Report a vulnerability* — or write to
**lbj.erasmo@gmail.com** with `SECURITY` in the subject.

Tell me what you found, how to reproduce it, and what an attacker gets out of it. A proof of
concept helps and is never required.

You will get a reply within a week. These are side projects maintained by one person; that is the
honest expectation to set rather than a service level nobody would meet.

## What is in scope

- the tooling lives at https://github.com/origami-ltd/proof-of-usage and has its own policy.
  code it should not, or clobber a licence without `--force` is in scope.
- The GitHub Action, which parses text from untrusted pull requests.

## What is out of scope

- Disagreements about whether the licence is enforceable. That is not a vulnerability; the README
  says outright that it is not enforced by design.
- Missing hardening headers that do not lead to an exploit, automated scanner output without a
  demonstrated impact, and reports about the game's own anti-cheat or piracy properties.

## Disclosure

Report privately, give me a chance to fix it, then publish whatever you like. I will credit you
unless you would rather I did not.
