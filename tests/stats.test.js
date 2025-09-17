/*
 * Tests for the statistics helpers in Ship 1 (Node/JS).
 */

describe('stats.js', () => {
  test('meanLength returns 0 for an empty iterable', async () => {
    const { meanLength } = await import('../src/stats.js');
    expect(meanLength([])).toBe(0);
    // also works with an empty Set
    expect(meanLength(new Set())).toBe(0);
  });

  test('meanLength computes the average character length', async () => {
    const { meanLength } = await import('../src/stats.js');
    const items = ['a', 'abc', 'de'];
    const avg = meanLength(items);
    // (1 + 3 + 2) / 3 = 2
    expect(avg).toBeCloseTo(2.0, 5);
    // Should accept any iterable (e.g. Set)
    const avgSet = meanLength(new Set(items));
    expect(avgSet).toBeCloseTo(2.0, 5);
  });
});