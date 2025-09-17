/*
 * Statistics helpers for Ship 1 .
 *
 * This module exports a single function `meanLength()` that computes the
 * average character length of an iterable of strings.  If the iterable is
 * empty, it returns 0.  This function is pure and does not touch the DOM
 * or localStorage.
 */

/**
 * Compute the mean character length of strings in `items`.
 * Returns 0.0 for an empty array.
 *
 * @param {Iterable<string>} items an iterable of strings
 * @returns {number} the average length
 */
export function meanLength(items) {
  const arr = Array.from(items);
  if (arr.length === 0) {
    return 0.0;
  }
  const total = arr.reduce((sum, s) => sum + String(s).length, 0);
  return total / arr.length;
}