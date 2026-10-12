#!/usr/bin/env node

import {
  buildProject,
  checkProject,
  listProject,
} from "./core.js";

function usage() {
  return `workflowfold — nested GitHub Actions sources, deterministic flat outputs

Usage:
  workflowfold build [--root PATH] [--source PATH] [--dest PATH] [--prune]
  workflowfold check [--root PATH] [--source PATH] [--dest PATH]
  workflowfold list  [--root PATH] [--source PATH] [--json]

Commands:
  build   Generate .github/workflows files and update the manifest.
  check   Fail when sources, generated files, or the manifest drift.
  list    Preview source-to-output mappings without writing.

Safety:
  build never deletes by default and never overwrites an unmanaged workflow.
  --prune is required to remove stale outputs recorded by workflowfold.
`;
}

function parseArgs(args) {
  const options = {
    root: process.cwd(),
    sourceDir: undefined,
    destinationDir: undefined,
    prune: false,
    json: false,
  };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--prune") {
      options.prune = true;
    } else if (arg === "--json") {
      options.json = true;
    } else if (["--root", "--source", "--dest"].includes(arg)) {
      const value = args[index + 1];
      if (!value || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      index += 1;
      if (arg === "--root") options.root = value;
      if (arg === "--source") options.sourceDir = value;
      if (arg === "--dest") options.destinationDir = value;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return options;
}

function projectOptions(options) {
  return {
    root: options.root,
    ...(options.sourceDir ? { sourceDir: options.sourceDir } : {}),
    ...(options.destinationDir ? { destinationDir: options.destinationDir } : {}),
  };
}

async function main() {
  const [command = "help", ...args] = process.argv.slice(2);
  if (["help", "--help", "-h"].includes(command)) {
    console.log(usage());
    return;
  }

  const options = parseArgs(args);
  if (command === "build") {
    const result = await buildProject({ ...projectOptions(options), prune: options.prune });
    for (const entry of result.entries) console.log(`${entry.source} -> ${entry.destination}`);
    console.log(`Built ${result.entries.length} workflow(s).`);
    if (result.pruned.length) console.log(`Pruned ${result.pruned.length} stale workflow(s).`);
    return;
  }

  if (command === "check") {
    const result = await checkProject(projectOptions(options));
    if (result.ok) {
      console.log(`OK: ${result.entries.length} workflow(s) are in sync.`);
      return;
    }
    for (const error of result.errors) console.error(`ERROR: ${error}`);
    process.exitCode = 1;
    return;
  }

  if (command === "list") {
    const entries = await listProject(projectOptions(options));
    if (options.json) {
      console.log(JSON.stringify(entries, null, 2));
    } else if (entries.length === 0) {
      console.log("No .yml or .yaml workflow sources found.");
    } else {
      for (const entry of entries) console.log(`${entry.source} -> ${entry.destination}`);
    }
    return;
  }

  throw new Error(`Unknown command: ${command}\n\n${usage()}`);
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
});
