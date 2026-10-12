# Verification record

This file is updated from fresh commands before each release.

## Required checks

- [ ] TDD RED observed before implementation
- [ ] Unit/integration tests
- [ ] Syntax/lint checks
- [ ] Build check
- [ ] Package smoke test
- [ ] Dependency audit
- [ ] `git diff --check`
- [ ] Generated example check
- [ ] Package SHA-256 recorded

## Real input to result

Fixture input: `examples/project/.github/workflow-src/services/{api,web}/ci.yml`.

Expected result: two generated flat workflows and a manifest mapping each source to its output. The final release record will include the exact command output and package hash.
