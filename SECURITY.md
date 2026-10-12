# Security policy

## Scope

Workflowfold is a local file transformer. It does not make network requests, access credentials, or execute workflow commands.

## Safe use

- Review generated workflow diffs before committing them.
- Run `workflowfold check` in CI to catch drift.
- Treat workflow YAML as code and review changes with the same care as any other CI change.
- Use `--prune` only when you intend to remove stale generated files.

## Reporting

Please do not disclose a suspected vulnerability in a public issue. Open a private GitHub security advisory for this repository or contact the maintainer through the address listed on the GitHub profile. Include reproduction steps, affected versions, and a minimal fixture. Do not include secrets.
