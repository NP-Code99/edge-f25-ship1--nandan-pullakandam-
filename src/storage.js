/*
 * Persistence helpers for Ship 1 .
 *
 * These functions read from and write to the browser’s `localStorage` under
 * a single key.  You should not have to modify this file for the baseline
 * assignment.  If you wish to replace `localStorage` with another storage
 * mechanism (e.g. IndexedDB), you can do so here without touching the rest
 * of your logic or UI.
 */

import {
  addEntry as addEntryLogic,
  deleteEntry as deleteEntryLogic,
  searchEntries as searchEntriesLogic,
} from "./logic.js";

const STORAGE_KEY = "ship1Entries";

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

/**
 * Add a new entry and persist it to storage.
 *
 * @param {string} text raw text from the input
 * @returns {Array<{t: string, v: string}>} new entries array
 */
export function addEntry(text) {
  const entries = loadEntries();
  const newEntries = addEntryLogic(entries, text);
  saveEntries(newEntries);
  return newEntries;
}

/**
 * Delete an entry by index and persist the change.
 *
 * @param {number} index 1-based index to delete
 * @returns {boolean} true if deletion succeeded, false otherwise
 */
export function deleteEntry(index) {
  const entries = loadEntries();
  const newEntries = deleteEntryLogic(entries, index);
  const success = newEntries.length < entries.length;
  if (success) {
    saveEntries(newEntries);
  }
  return success;
}

/**
 * Search entries by query (without modifying storage).
 *
 * @param {string} query search string
 * @returns {Array<{t: string, v: string}>} filtered entries
 */
export function searchEntries(query) {
  const entries = loadEntries();
  return searchEntriesLogic(entries, query);
}
