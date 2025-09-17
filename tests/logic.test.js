/*
 * Tests for the pure logic functions in `src/logic.js`.
 *
 * These tests exercise the baseline and hard‑mode behaviours described in
 * the assignment.  They ensure that functions are pure (return new
 * arrays without mutating the input), that timestamps are formatted
 * correctly, and that deletion and searching behave as specified.
 */

describe('logic.js', () => {
  test('addEntry trims text, adds a timestamp and inserts at start', async () => {
    const { addEntry } = await import('../src/logic.js');
    const original = [];
    const newEntries = addEntry(original, '  Hello World   ');
    // Should not modify the original array
    expect(original.length).toBe(0);
    // Should return a new array
    expect(newEntries).not.toBe(original);
    expect(newEntries.length).toBe(1);
    const entry = newEntries[0];
    // Trimmed text
    expect(entry.v).toBe('Hello World');
    // Timestamp matches YYYY‑MM‑DD HH:MM:SS
    expect(entry.t).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });

  test('addEntry inserts newest entries at the beginning', async () => {
    const { addEntry } = await import('../src/logic.js');
    let entries = [];
    entries = addEntry(entries, 'first');
    entries = addEntry(entries, 'second');
    // Newest entry should be first
    expect(entries.map(e => e.v)).toEqual(['second', 'first']);
  });

  test('addEntry throws on empty or whitespace-only input', async () => {
    const { addEntry } = await import('../src/logic.js');
    const entries = [];
    expect(() => addEntry(entries, '   ')).toThrow();
    expect(() => addEntry(entries, '')).toThrow();
  });

  test('deleteEntry removes the correct item and returns a new array', async () => {
    const { addEntry, deleteEntry } = await import('../src/logic.js');
    // Build an entries array using addEntry to ensure ordering
    let entries = [];
    entries = addEntry(entries, 'a'); // newest: a
    entries = addEntry(entries, 'b'); // newest: b
    entries = addEntry(entries, 'c'); // newest: c
    // Current order: ['c','b','a']
    const original = entries;
    const updated = deleteEntry(entries, 2); // remove 'b'
    // Should not mutate original
    expect(entries).toBe(original);
    expect(updated).not.toBe(original);
    expect(updated.map(e => e.v)).toEqual(['c', 'a']);
    // Deleting out of range returns original array
    const tooLow = deleteEntry(entries, 0);
    expect(tooLow).toBe(entries);
    const tooHigh = deleteEntry(entries, 10);
    expect(tooHigh).toBe(entries);
  });

  test('searchEntries performs case‑insensitive search and preserves order', async () => {
    const { searchEntries } = await import('../src/logic.js');
    // Use a fixed entries array to control ordering.  Only the `v` field is
    // relevant for searching; the timestamp can be empty strings.
    const entries = [
      { t: '', v: 'gamma' },
      { t: '', v: 'alphA test' },
      { t: '', v: 'beta' },
      { t: '', v: 'Alpha' }
    ];
    const results = searchEntries(entries, 'alpha');
    expect(results.map(e => e.v)).toEqual(['alphA test', 'Alpha']);
    // An empty query should return the same array (by reference)
    const all = searchEntries(entries, '');
    expect(all).toBe(entries);
  });
});