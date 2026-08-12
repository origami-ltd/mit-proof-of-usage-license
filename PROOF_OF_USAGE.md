# Proof of Usage Record

This file records the automated systems, models and agents that have processed this repository
under the additional condition in [LICENSE.md](LICENSE.md).

One row per access. Newest at the bottom. If a system read this repository repeatedly for the same
purpose, a single row covering the period is enough.

| System | Operator | Date and Time (UTC) | What | Purpose | Contact |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ExampleModel v2 | AI Corp | 2026-08-12T14:30:00Z | whole repository | training | contact@aicorp.com |

## Field reference

| Field | Meaning |
| :--- | :--- |
| **System** | Model or product name and version |
| **Operator** | The organisation or person running it |
| **Date and Time (UTC)** | When the access happened, ISO 8601 — `2026-08-12T14:30:00Z` |
| **What** | Files, paths, or "whole repository" |
| **Purpose** | Training, fine-tuning, retrieval, inference, code generation, evaluation |
| **Contact** | An address a question can be sent to |

## How to add a row

1. Fork this repository.
2. Check out the provenance branch (`proof-of-usage`).
3. Append one row to the table above.
4. Open a pull request against that branch.

The example row stays where it is; add below it. A workflow checks the format of the row, not its
truth — that part is on the operator, which is the whole point.
