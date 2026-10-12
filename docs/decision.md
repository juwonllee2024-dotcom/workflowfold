# Product decision: Workflowfold

Date: 2026-10-12

## Problem

GitHub Actions currently expects runnable workflow files directly under `.github/workflows`. Large repositories can accumulate a flat, hard-to-navigate list, even when the workflows belong to different services.

## Four independent invention questions

### 1. Workflowfold — selected

- **Fact:** Maintainers report that dozens of workflows are hard to find and organize in the flat workflow directory; community discussion #181437 asks for better folder support.
- **Innovation hypothesis:** A deterministic local compiler can restore nested ownership without asking GitHub to change its execution path.
- **One difference:** It separates human source layout from GitHub’s generated runtime layout and proves the mapping in a manifest.
- **Smallest seven-day experiment:** Migrate one workflow from one monorepo, run `build` and `check` in CI, and ask whether the generated diff is understandable.
- **Score:** pain 5/5, novelty 4/5, build today 5/5, organic shareability 4/5, open-source fit 5/5 — **23/25**.

### 2. WorktreeHome — rejected

- **Fact:** Developers repeatedly lose time choosing and finding worktree directories.
- **Innovation hypothesis:** A tiny convention file could make worktrees discoverable from any shell.
- **One difference:** Project-local naming rules instead of a global manager.
- **Smallest experiment:** Use it on three repositories for one week.
- **Score:** 4/5, 2/5, 5/5, 3/5, 4/5 — **18/25**.
- **Why rejected:** Existing worktree managers and editor integrations make the first wedge crowded; the visible result is weaker than a generated workflow diff.

### 3. Shareveil — rejected

- **Fact:** People still share screenshots and documents containing metadata they did not intend to publish.
- **Innovation hypothesis:** A local pre-share preview could expose risky fields before upload.
- **One difference:** A reversible share packet rather than a generic metadata cleaner.
- **Smallest experiment:** Preview 20 real files and record prevented disclosures.
- **Score:** 4/5, 2/5, 4/5, 4/5, 5/5 — **19/25**.
- **Why rejected:** Mature tools already cover much of metadata removal; the remaining differentiation needs broader format coverage.

### 4. ContextCapsule — rejected

- **Fact:** AI coding sessions lose context when a task moves between tabs or tools.
- **Innovation hypothesis:** A portable, inspectable context file could reduce repeated setup.
- **One difference:** Context is a reviewed artifact with explicit file boundaries.
- **Smallest experiment:** Resume five tasks using only the capsule and compare setup time.
- **Score:** 4/5, 2/5, 4/5, 3/5, 4/5 — **17/25**.
- **Why rejected:** It overlaps several existing portfolio projects and agent handoff products; a new repository would not add a sharp enough wedge today.

## Decision

Ship Workflowfold as a separate, dependency-free public repository. It is a bounded invention: local source organization, deterministic compilation, explicit deletion, and CI drift proof. It does not promise that GitHub will accept nested workflow files directly.

## Growth hypothesis

The most credible organic loop is a pull request showing a before/after workflow tree and a failing drift check. We will test that with monorepo maintainers before adding features.
