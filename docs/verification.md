# Verification record

Fresh release verification run: 2026-10-12.

## Required checks

- [x] TDD RED observed before implementation: `ERR_MODULE_NOT_FOUND` for the intentionally absent `src/core.js`.
- [x] Unit/integration tests: `npm test` — **5 passed, 0 failed**.
- [x] Syntax/lint checks: `npm run lint` — passed.
- [x] Build check: `npm run build` — passed for `workflowfold@0.1.0`.
- [x] Package smoke test: packed CLI listed both example mappings successfully.
- [x] Dependency audit: `npm audit --omit=dev` — **0 vulnerabilities**.
- [x] `git diff --check` — passed on the staged release.
- [x] Generated example check: `workflowfold check --root examples/project` — **2 workflows in sync**.
- [x] Package SHA-256: `8f37f73f8d9bf35ede40442d1eb9fe10ff3e6c4413c0dfd92b7f7171929ec63d`.

## Real input to result

Fixture input: `examples/project/.github/workflow-src/services/{api,web}/ci.yml`.

Observed result: two generated flat workflows and a manifest mapping each source to its output. The package smoke command was:

```text
npm exec --yes --package=./workflowfold-0.1.0.tgz -- workflowfold list --root examples/project --json
```

Remote verification:

- CI matrix run: https://github.com/juwonllee2024-dotcom/workflowfold/actions/runs/38297092320 — completed successfully for Node 18/20/22.
- Public release: https://github.com/juwonllee2024-dotcom/workflowfold/releases/tag/v0.1.0.
- Release asset digest: GitHub reports `sha256:8f37f73f8d9bf35ede40442d1eb9fe10ff3e6c4413c0dfd92b7f7171929ec63d` for `workflowfold-0.1.0.tgz`.
