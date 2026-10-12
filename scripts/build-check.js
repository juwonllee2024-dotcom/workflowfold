import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "package.json",
  "src/core.js",
  "src/cli.js",
  "LICENSE",
  "README.md",
];

for (const file of requiredFiles) {
  await access(file);
}

const packageJson = JSON.parse(await readFile("package.json", "utf8"));
if (packageJson.name !== "workflowfold") throw new Error("package name mismatch");
if (!packageJson.bin?.workflowfold) throw new Error("CLI entry point missing");
console.log(`Build check passed for ${packageJson.name}@${packageJson.version}.`);
