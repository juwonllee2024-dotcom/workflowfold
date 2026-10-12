# Workflowfold 🧩

**Put GitHub Actions where they belong. Generate them where GitHub requires.**

GitHub Actions discovers workflow files directly inside `.github/workflows`. That is simple for a few workflows and painful for a monorepo with dozens of services. **Workflowfold** lets you keep source workflows in nested folders, then deterministically generates the flat files GitHub can execute.

No cloud. No AI. No runtime dependency. No silent deletion.

## Quick start

```powershell
npm install --save-dev github:juwonllee2024-dotcom/workflowfold

# Put source workflows anywhere below this directory:
# .github/workflow-src/services/api/ci.yml
# .github/workflow-src/services/web/ci.yml

npx workflowfold build
npx workflowfold check
```

`services/api/ci.yml` becomes `.github/workflows/services-api-ci.yml`.

The repository includes a static example in [`examples/project`](examples/project). Try it from that directory:

```powershell
cd examples/project
node ../../src/cli.js list
node ../../src/cli.js check
```

## Commands

```text
workflowfold build [--root PATH] [--source PATH] [--dest PATH] [--prune]
workflowfold check [--root PATH] [--source PATH] [--dest PATH]
workflowfold list  [--root PATH] [--source PATH] [--json]
```

- `build` discovers `.yml` and `.yaml` files recursively, generates flat `.yml` files, and records `.workflowfold/manifest.json`.
- `check` is read-only and fails on source, output, or manifest drift. Use it in CI.
- `list` previews mappings without writing.
- `--prune` is explicit. Without it, stale generated outputs stop the build instead of being deleted.

## Safety model

- Generated files carry a visible header pointing to their source.
- An existing workflow without that header is never overwritten.
- A stale output is never deleted unless `--prune` is supplied and the output was recorded by Workflowfold.
- Source paths are constrained to the selected project root; symbolic links in the source tree are rejected.
- The tool never calls a network, reads credentials, runs a workflow, or executes installation commands.

Keep generated `.github/workflows` files committed. That makes pull requests reviewable and keeps GitHub Actions working from the checkout. Edit only `.github/workflow-src` files.

## Why this exists

GitHub community members describe the maintainability cost of flat workflow lists in large repositories and ask for subdirectory support in workflow UX: [GitHub Actions community discussion #181437](https://github.com/orgs/community/discussions/181437). Workflowfold is a small local compatibility layer while the platform constraint remains.

## First-user experiment

The first users are maintainers of monorepos with 20+ Actions workflows. The seven-day experiment is to give 10 maintainers a fixture, ask them to migrate one service workflow, and measure whether `build` plus `check` replaces manual scrolling and naming work without producing a false-positive drift failure.

## Business hypothesis

The core stays MIT and local. A future paid layer could provide hosted migration previews, repository-wide workflow maps, and organization policy checks; this is a hypothesis, not a promise. The open-source CLI must remain useful without an account or hosted service.

## Development

```powershell
npm ci
npm test
npm run lint
npm run build
npm audit --omit=dev
```

See [CONTRIBUTING.md](CONTRIBUTING.md), [SECURITY.md](SECURITY.md), [CHANGELOG.md](CHANGELOG.md), and the [decision record](docs/decision.md).

## License

MIT. See [LICENSE](LICENSE).
