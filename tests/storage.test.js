/*
 * Tests for the storage helpers in Ship 1 (Node/JS).
 *
 * These tests verify that entries are persisted correctly, timestamps are
 * formatted as `YYYY‑MM‑DD HH:MM:SS`, deletion behaves as expected, and
 * search functions operate in a case‑insensitive manner.  Each test uses
 * a fresh temporary file for the log via the SHIP1_DATA_PATH environment
 * variable so that state does not bleed between tests.
 */

import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';

describe('storage.js', () => {
  /**
   * Create a new temporary file for the data store.  Returns the path to
   * the file and sets the SHIP1_DATA_PATH environment variable so that
   * storage.js reads/writes to this file.
   */
  function setupTmpFile() {
    const dir = mkdtempSync(join(tmpdir(), 'ship1-storage-test-'));
    const file = join(dir, 'log.json');
    process.env.SHIP1_DATA_PATH = file;
    return file;
  }

  /**
   * Clean up by removing the SHIP1_DATA_PATH environment variable and
   * deleting the temporary file.  Note: fs.rmSync with force:true will
   * silently ignore missing files.
   *
   * @param {string} file
   */
  function cleanup(file) {
    delete process.env.SHIP1_DATA_PATH;
    try {
      rmSync(file, { force: true });
    } catch (_) {
      /* ignore */
    }
  }

  test('addEntry inserts at the start with a formatted timestamp', async () => {
    const tmpFile = setupTmpFile();
    const storage = await import('../src/ship1/storage.js');
    storage.addEntry('hello');
    const entries = storage.loadEntries();
    expect(entries.length).toBe(1);
    const entry = entries[0];
    expect(entry.v).toBe('hello');
    expect(entry.t).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
    cleanup(tmpFile);
  });

  test('addEntry trims whitespace and rejects empty values', async () => {
    const tmpFile = setupTmpFile();
    const storage = await import('../src/ship1/storage.js');
    // whitespace only should throw
    expect(() => storage.addEntry('   ')).toThrow();
    // surrounding whitespace should be trimmed
    storage.addEntry('  hi there   ');
    const entries = storage.loadEntries();
    expect(entries.length).toBe(1);
    expect(entries[0].v).toBe('hi there');
    cleanup(tmpFile);
  });

  test('deleteEntry removes the correct item and reports success/failure', async () => {
    const tmpFile = setupTmpFile();
    const storage = await import('../src/ship1/storage.js');
    // Add three entries: c (latest), b, a (oldest)
    storage.addEntry('a');
    storage.addEntry('b');
    storage.addEntry('c');
    let entries = storage.loadEntries();
    expect(entries.map(e => e.v)).toEqual(['c', 'b', 'a']);
    // Delete second entry (1‑based index 2) → removes 'b'
    const ok = storage.deleteEntry(2);
    expect(ok).toBe(true);
    entries = storage.loadEntries();
    expect(entries.map(e => e.v)).toEqual(['c', 'a']);
    // Deleting out of range should fail and not modify state
    const fail = storage.deleteEntry(5);
    expect(fail).toBe(false);
    expect(storage.loadEntries().length).toBe(2);
    cleanup(tmpFile);
  });

  test('searchEntries returns matches in a case‑insensitive manner', async () => {
    const tmpFile = setupTmpFile();
    const storage = await import('../src/ship1/storage.js');
    storage.addEntry('Alpha');
    storage.addEntry('beta');
    storage.addEntry('alphA test');
    storage.addEntry('gamma');
    // At this point the entries are ordered: 'gamma', 'alphA test', 'beta', 'Alpha'
    const results = storage.searchEntries('alpha');
    expect(results.map(e => e.v)).toEqual(['alphA test', 'Alpha']);
    // An empty query should return all entries
    const all = storage.searchEntries('');
    expect(all.length).toBe(storage.loadEntries().length);
    cleanup(tmpFile);
  });
});