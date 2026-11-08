# Project summaries (Phase 1)

Secret-free, statically served audience summaries. Phase 1 ships contracts, validators, atomic release selection, and progressive-enhancement UI. The production site stays original-only until a later trusted publication verifier exists.

## Production posture

- Original is the default on every load.
- With an empty `src/content/project-summaries/release.json` and a deny-all approval verifier, real project cards render original summary text only. Audience controls do not appear.
- Title, role, client, outcomes, and links remain original constants.
- `getSummaryCatalog` never accepts `trust: owner` JSON as approval. A self-declared owner receipt cannot publish.
- There is no Spark gateway call, worker, secret, or generation pipeline in this phase.

## Local tests

```text
npm ci
npm run test:summaries
npm run lint:check
npx --no-install tsc --noEmit
npx --no-install playwright install --with-deps chromium
npm run test:summaries:ui
npm run build
npm run test:e2e
```

`test:summaries` is Node-only (no web server, no secrets). `test:summaries:ui` builds the isolated harness at `tests/summary-site` on port 3457. Existing `test:e2e` continues to use port 3456.

## Hashes and fields

- Source hash covers `schemaVersion`, `policyVersion`, `project`, and `claims` after NFC/LF canonical JSON. `sourceRevision` is provenance and is excluded.
- Output hash covers all draft fields except `outputHash`.
- Unknown keys, prototype keys, non-HTTPS locators, and nonfinite numbers are rejected.
- Policy checks are deterministic lexical guards, not entailment or confidentiality proofs. False positives block review rather than waive policy.

## Rollback

- Choose `lastGood` only when the candidate source hash matches the current live project source and the hash is not revoked.
- If source changed or was withdrawn, serve original-only. Never mix a newer original with older audience summaries.
- Worker outage (later phases) leaves the last approved release intact; Phase 1 has no approved production artifacts.

## Visual demo

`/labs/audience-summaries-demo` is a noindex, nofollow, sitemap-excluded route with clearly labeled synthetic fixtures. It is not linked from navigation and must not be treated as owner-approved content.

## Blocked later work

Worker host, secret provisioning, generation, and trusted publication controls are out of scope. Do not add gateway hostnames, API keys, env vars, or generated summaries of real projects in this phase.
