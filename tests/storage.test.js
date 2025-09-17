/*
 * Tests for the storage helpers in Ship 1 (Node/JS).
 *
 * These tests verify that entries are persisted correctly to localStorage,
 * timestamps are formatted as `YYYY‑MM‑DD HH:MM:SS`, deletion behaves as expected, and
 * search functions operate in a case‑insensitive manner.
 */

describe("storage.js", () => {
  beforeEach(() => {
    // Clear localStorage before each test to ensure isolation
    localStorage.clear();
  });

  test("addEntry inserts at the start with a formatted timestamp", async () => {
    const storage = await import("../src/storage.js");
    storage.addEntry("hello");
    const entries = storage.loadEntries();
    expect(entries.length).toBe(1);
    const entry = entries[0];
    expect(entry.v).toBe("hello");
    expect(entry.t).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });

  test("addEntry trims whitespace and rejects empty values", async () => {
    const storage = await import("../src/storage.js");
    // whitespace only should throw
    expect(() => storage.addEntry("   ")).toThrow();
    // surrounding whitespace should be trimmed
    storage.addEntry("  hi there   ");
    const entries = storage.loadEntries();
    expect(entries.length).toBe(1);
    expect(entries[0].v).toBe("hi there");
  });

  test("deleteEntry removes the correct item and reports success/failure", async () => {
    const storage = await import("../src/storage.js");
    // Add three entries: c (latest), b, a (oldest)
    storage.addEntry("a");
    storage.addEntry("b");
    storage.addEntry("c");
    let entries = storage.loadEntries();
    expect(entries.map((e) => e.v)).toEqual(["c", "b", "a"]);
    // Delete second entry (1‑based index 2) → removes 'b'
    const ok = storage.deleteEntry(2);
    expect(ok).toBe(true);
    entries = storage.loadEntries();
    expect(entries.map((e) => e.v)).toEqual(["c", "a"]);
    // Deleting out of range should fail and not modify state
    const fail = storage.deleteEntry(5);
    expect(fail).toBe(false);
    expect(storage.loadEntries().length).toBe(2);
  });

  test("searchEntries returns matches in a case‑insensitive manner", async () => {
    const storage = await import("../src/storage.js");
    storage.addEntry("Alpha");
    storage.addEntry("beta");
    storage.addEntry("alphA test");
    storage.addEntry("gamma");
    // At this point the entries are ordered: 'gamma', 'alphA test', 'beta', 'Alpha'
    const results = storage.searchEntries("alpha");
    expect(results.map((e) => e.v)).toEqual(["alphA test", "Alpha"]);
    // An empty query should return all entries
    const all = storage.searchEntries("");
    expect(all.length).toBe(storage.loadEntries().length);
  });
});
