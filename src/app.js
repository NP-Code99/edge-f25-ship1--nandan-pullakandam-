/*
 * Entry point for the Ship 1 browser application.
 *
 * This file wires together the pure functions in `logic.js` with the DOM and
 * persistence helpers in `storage.js`.  It loads entries from
 * localStorage on startup, renders them, and listens for user actions
 * (add, delete, clear, search) to update the list and stats accordingly.
 */

import { loadEntries, saveEntries, clearEntries } from './storage.js';
import { addEntry, deleteEntry, searchEntries } from './logic.js';
import { meanLength } from './stats.js';

// Grab DOM elements
const entryInput = document.getElementById('entry-input');
const addBtn = document.getElementById('add-btn');
const clearBtn = document.getElementById('clear-btn');
const searchInput = document.getElementById('search-input');
const listEl = document.getElementById('entries-list');
const statsEl = document.getElementById('stats');

// Keep the canonical entries array here.  It is updated when entries
// are added or deleted.  Searching does not mutate this array; it
// simply filters it for display.
let entries = loadEntries();

/**
 * Render the given array of entries to the DOM.  Also updates the stats
 * display using the full `entries` array (not the filtered one).
 *
 * @param {Array<{t: string, v: string}>} list entries to display
 */
function render(list) {
  // Clear existing list
  while (listEl.firstChild) {
    listEl.removeChild(listEl.firstChild);
  }
  // Populate new list
  list.forEach((entry, idx) => {
    const li = document.createElement('li');
    const index = idx + 1;
    const timestampSpan = document.createElement('span');
    timestampSpan.className = 'timestamp';
    timestampSpan.textContent = `${entry.t} — `;
    const textSpan = document.createElement('span');
    textSpan.textContent = entry.v;
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    // Store the 1‑based index as a data attribute so we can find it later
    delBtn.dataset.index = index.toString();
    li.append(index.toString() + '. ');
    li.appendChild(timestampSpan);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    listEl.appendChild(li);
  });
  // Update stats based on the canonical entries array (not the filtered list)
  const count = entries.length;
  const avg = meanLength(entries.map(e => e.v));
  statsEl.textContent = `Count: ${count} | Mean length: ${avg.toFixed(2)} chars`;
}

// Initial render
render(entries);

// Event listeners
// TODO (baseline): Implement real-time search with 300ms debounce. Replace the
// immediate filtering below with a debounced handler so rapid typing does not
// re-render on every keystroke. Also update the stats so they reflect the
// currently displayed (filtered) list rather than the full entries array.
addBtn.addEventListener('click', () => {
    const raw = entryInput.value;
    try {
      const updated = addEntry(entries, raw);
      entries = updated;
      saveEntries(entries);
      entryInput.value = '';
      // After adding, re‑apply any current search filter
      const q = searchInput.value;
      const list = q ? searchEntries(entries, q) : entries;
      render(list);
    } catch (err) {
      alert(err && err.message ? err.message : String(err));
    }
});

clearBtn.addEventListener('click', () => {
  if (!window.confirm('This will erase all entries. Continue?')) return;
  clearEntries();
  entries = [];
  render(entries);
});

listEl.addEventListener('click', event => {
  const target = event.target;
  if (target instanceof HTMLButtonElement && target.classList.contains('delete-btn')) {
    const indexStr = target.dataset.index;
    const index = Number(indexStr);
    try {
      const updated = deleteEntry(entries, index);
      // If nothing changed (invalid index), do nothing
      if (updated !== entries) {
        entries = updated;
        saveEntries(entries);
      }
      const q = searchInput.value;
      const list = q ? searchEntries(entries, q) : entries;
      render(list);
    } catch (err) {
      alert(err && err.message ? err.message : String(err));
    }
  }
});

searchInput.addEventListener('input', () => {
  const q = searchInput.value;
  const list = q ? searchEntries(entries, q) : entries;
  render(list);
});

// TODO (hard mode): Add keyboard shortcuts.
// - Enter in the add input should add the entry if non-empty
// - Ctrl/Cmd+K should focus the search input
// - Escape should clear the search box and restore the full list
// - Ctrl/Cmd+Backspace should clear all entries (with confirmation)
// Hint: listen for 'keydown' on the document and check modifier keys.
document.addEventListener('keydown', (_event) => {
  // implement in hard mode
});