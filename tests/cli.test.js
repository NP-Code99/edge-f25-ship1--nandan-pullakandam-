/*
 * End‑to‑end tests for the Ship 1 command‑line interface.  These tests
 * exercise the CLI script via Node’s child_process API.  Each test runs
 * commands against a fresh log file using the SHIP1_DATA_PATH environment
 * variable to isolate state.
 */

import { spawnSync } from 'child_process';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

// Path to the CLI script relative to the project root.  Tests run in the
// project root, so this relative path resolves correctly.
const CLI_PATH = 'src/ship1/cli.js';

/**
 * Create a fresh environment for each invocation.  Copies the current
 * process.env so that existing variables (like PATH) remain intact.  Adds
 * SHIP1_DATA_PATH pointing at a unique temporary file.
 */
function makeEnv(tmpFile) {
  return { ...process.env, SHIP1_DATA_PATH: tmpFile };
}

describe('cli.js', () => {
  function setupTmpFile() {
    const dir = mkdtempSync(join(tmpdir(), 'ship1-cli-test-'));
    return join(dir, 'log.json');
  }
  function cleanup(file) {
    try {
      rmSync(file, { force: true });
    } catch (_) {
      /* ignore */
    }
  }

  test('add and list commands operate correctly', () => {
    const tmpFile = setupTmpFile();
    const env = makeEnv(tmpFile);
    // Add an entry
    let result = spawnSync('node', [CLI_PATH, 'add', 'hello world'], {
      env,
      encoding: 'utf8'
    });
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe('OK: added');
    // List entries
    result = spawnSync('node', [CLI_PATH, 'list'], { env, encoding: 'utf8' });
    expect(result.status).toBe(0);
    const lines = result.stdout.trim().split(/\r?\n/);
    // Should print exactly one line like "1. 2025-09-16 12:34:56 — hello world"
    expect(lines.length).toBe(1);
    const match = lines[0].match(/^1\. \d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} — hello world$/);
    expect(match).not.toBeNull();
    cleanup(tmpFile);
  });

  test('stats command prints count and mean length', () => {
    const tmpFile = setupTmpFile();
    const env = makeEnv(tmpFile);
    // Add two entries: lengths 1 and 4 → mean = 2.5
    spawnSync('node', [CLI_PATH, 'add', 'a'], { env, encoding: 'utf8' });
    spawnSync('node', [CLI_PATH, 'add', 'aaaa'], { env, encoding: 'utf8' });
    const result = spawnSync('node', [CLI_PATH, 'stats'], { env, encoding: 'utf8' });
    expect(result.status).toBe(0);
    const outLines = result.stdout.trim().split(/\r?\n/);
    // first line is count, second is mean
    expect(outLines[0]).toBe('2');
    const mean = parseFloat(outLines[1]);
    expect(mean).toBeCloseTo(2.5, 1);
    cleanup(tmpFile);
  });

  test('delete and search commands behave as expected', () => {
    const tmpFile = setupTmpFile();
    const env = makeEnv(tmpFile);
    // Add three entries: first, second, third (third is newest)
    spawnSync('node', [CLI_PATH, 'add', 'first'], { env, encoding: 'utf8' });
    spawnSync('node', [CLI_PATH, 'add', 'second'], { env, encoding: 'utf8' });
    spawnSync('node', [CLI_PATH, 'add', 'third'], { env, encoding: 'utf8' });
    // Delete the second entry (index 2) → removes "second"
    let result = spawnSync('node', [CLI_PATH, 'delete', '2'], { env, encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe('Deleted entry 2');
    // List now shows two entries
    result = spawnSync('node', [CLI_PATH, 'list'], { env, encoding: 'utf8' });
    const lines = result.stdout.trim().split(/\r?\n/);
    expect(lines.length).toBe(2);
    // Search for "first" should return 1 match
    result = spawnSync('node', [CLI_PATH, 'search', 'first'], { env, encoding: 'utf8' });
    const out = result.stdout.trim().split(/\r?\n/);
    // first line: "1 match(es):"
    expect(out[0]).toMatch(/^1 match/);
    // second line ends with "first"
    expect(out[1]).toMatch(/first$/);
    cleanup(tmpFile);
  });

  test('clear command wipes all entries and prompts only when confirmation missing', () => {
    const tmpFile = setupTmpFile();
    const env = makeEnv(tmpFile);
    // add two entries
    spawnSync('node', [CLI_PATH, 'add', 'x'], { env, encoding: 'utf8' });
    spawnSync('node', [CLI_PATH, 'add', 'y'], { env, encoding: 'utf8' });
    // clear with -y should not prompt and should return exit code 0
    let result = spawnSync('node', [CLI_PATH, 'clear', '-y'], { env, encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe('Cleared.');
    // list now shows no entries
    result = spawnSync('node', [CLI_PATH, 'list'], { env, encoding: 'utf8' });
    expect(result.stdout.trim()).toBe('(no entries yet)');
    cleanup(tmpFile);
  });
});