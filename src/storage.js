/*
 * Persistence helpers for Ship 1 (browser version).
 *
 * These functions read from and write to the browser’s `localStorage` under
 * a single key.  You should not have to modify this file for the baseline
 * assignment.  If you wish to replace `localStorage` with another storage
 * mechanism (e.g. IndexedDB), you can do so here without touching the rest
 * of your logic or UI.
 */

const STORAGE_KEY = 'ship1Entries';

/**
 * Load the current array of entries from `localStorage`.
 *
 * @returns {Array<{t: string, v: string}>}
 */
export function loadEntries() {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch (_) {
    return [];
  }
}

/**
 * Persist the given array of entries to `localStorage`.
 *
 * @param {Array<{t: string, v: string}>} entries
 */
export function saveEntries(entries) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

/**
 * Remove all entries from storage.
 */
export function clearEntries() {
  window.localStorage.removeItem(STORAGE_KEY);
}