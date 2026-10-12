# Contributing

Thanks for improving Workflowfold.

1. Create a focused branch.
2. Add a failing test before changing behavior.
3. Keep the CLI local, deterministic, dependency-free, and safe by default.
4. Run `npm ci`, `npm test`, `npm run lint`, `npm run build`, `npm audit --omit=dev`, and `git diff --check`.
5. Update the README or CHANGELOG when user-visible behavior changes.
6. Explain safety and migration impact in the pull request.

Please do not add network calls, credential discovery, silent deletion, or automatic workflow execution without a separate design review.
