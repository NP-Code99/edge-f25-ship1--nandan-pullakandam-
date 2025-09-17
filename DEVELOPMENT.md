# Development Guide

**How to code, test, and debug your Edge Labs Ship 1 (Node/JS)**

---

## What You’re Building

An in‑browser log app with:

- Baseline: implement core logic functions + real‑time search with 300ms debounce
- Hard Mode: keyboard shortcuts for common actions

You'll implement pure functions in `src/logic.js` and extend `src/app.js` (events + DOM).

---

## Files You'll Touch

- `src/logic.js` — implement addEntry, deleteEntry, searchEntries functions
- `src/app.js` — add debounced search (baseline) and keyboard shortcuts (hard mode)

Tests that guide you:

- `tests/logic.test.js` — tests for pure functions
- `tests/storage.test.js` — tests for storage integration
- `tests/app.debounce.test.js` — tests for baseline debounced search
- `tests/app.shortcuts.test.js` — tests for hard mode shortcuts

Reference code:

- `src/stats.js` — meanLength helper (already implemented)

---

## Baseline (Required)

Goal: implement logic functions and debounced search.

**Step 1: Implement logic functions in `src/logic.js`**

- `addEntry(entries, text)` - trim text, add timestamp, return new array
- `deleteEntry(entries, index)` - remove by 1-based index, return new array
- `searchEntries(entries, query)` - case-insensitive filter, return new array

**Step 2: Implement debounced search in `src/app.js`**

- Listen to `input` events on the search box
- Debounce by 300ms before filtering and rendering
- Update stats to reflect the displayed (filtered) list

Tests: `tests/logic.test.js`, `tests/storage.test.js`, `tests/app.debounce.test.js` should pass.

---

## Hard Mode (Optional)

Add keyboard shortcuts in `src/app.js`:

- Enter in add input → add entry if non‑empty
- Cmd/Ctrl+K → focus search
- Escape → clear search and restore full list
- Cmd/Ctrl+Backspace → clear all entries (with confirmation)

Tests: make `tests/app.shortcuts.test.js` pass.

---

## Run Tests

```bash
npm test
```

The suite runs fast under Jest + jsdom (no real browser needed). Debounce tests use Jest fake timers (import `jest` from `@jest/globals`).

---

## Tips

- Keep `entries` as the canonical array; search should not mutate it
- Use a small helper for debouncing; don’t over‑optimize
- Update stats from the currently displayed list to match UX expectations
- Commit in small steps; keep tests green

---

## What to Submit

- Repository URL to your copy
- Branch name `firstname-lastname`
- Whether you completed Baseline and/or Hard Mode

Good luck — build iteratively and rely on the tests as your spec!
