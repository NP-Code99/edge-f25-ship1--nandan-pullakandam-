#!/usr/bin/env node
/*
 * Preflight script for Ship 1 (Node/JS).
 *
 * This script performs a few sanity checks before submission:
 *   1. Ensures that your Node version matches the `.nvmrc` file.
 *   2. Runs ESLint to catch syntax and style errors.
 *   3. Runs the Jest test suite to verify functionality.
 *
 * If any of these steps fail, the script exits with a non‑zero status.  Fix
 * the reported issues and run it again.  You can invoke it directly via
 * `node scripts/preflight.mjs` or through npm (`npm run preflight`).
 */
import { readFileSync } from 'fs';
import { execSync, spawnSync } from 'child_process';
import process from 'process';
import path from 'path';

function checkNodeVersion() {
  const nvmrcPath = path.resolve(process.cwd(), '.nvmrc');
  const expected = readFileSync(nvmrcPath, 'utf8').trim();
  const actual = process.version.replace(/^v/, '');
  if (!actual.startsWith(expected)) {
    console.error(`❌ Node version mismatch: expected ${expected}.*, got ${actual}`);
    process.exitCode = 1;
  } else {
    console.log(`✅ Node version ${actual} matches .nvmrc (${expected})`);
  }
}

function runCommand(cmd, args, label) {
  console.log(`\n▶ ${label}`);
  const result = spawnSync(cmd, args, { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`❌ ${label} failed.`);
    process.exitCode = 1;
  } else {
    console.log(`✅ ${label} passed.`);
  }
}

function main() {
  checkNodeVersion();
  // run eslint only if it's installed
  try {
    execSync('npm exec --yes eslint --version', { stdio: 'ignore' });
    runCommand('npm', ['exec', '--yes', 'eslint', '.'], 'ESLint');
  } catch (err) {
    console.warn('⚠️  ESLint is not installed.  Skipping lint check.');
  }
  // run tests
  runCommand('npm', ['test'], 'Jest tests');
  if (process.exitCode === 0) {
    console.log('\nAll preflight checks passed!');
  }
}

main();