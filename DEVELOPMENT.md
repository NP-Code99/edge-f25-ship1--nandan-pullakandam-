# Development Guide

**How to code, test, and debug your Edge Labs Ship 1 (Node/JS)**

---

## What You’re Building

An in‑browser log app with:
- Baseline: real‑time search with 300ms debounce
- Hard Mode: keyboard shortcuts for common actions

Logic is already implemented and tested. You’ll extend `src/app.js` (events + DOM).

---

## Files You’ll Touch

- `src/app.js` — add debounced search (baseline) and keyboard shortcuts (hard mode)
- `tests/app.debounce.test.js` — tests for baseline
- `tests/app.shortcuts.test.js` — tests for hard mode

Helpful reference code:
- `src/logic.js` — pure functions (add/delete/search)
- `src/storage.js` — localStorage helpers
- `src/stats.js` — meanLength

---

## Baseline (Required)

Goal: implement debounced search in `src/app.js`.

Requirements:
1. Listen to `input` events on the search box
2. Debounce by ~300ms before filtering and rendering
3. Case‑insensitive filter using existing `searchEntries(entries, query)`
4. Clearing search restores full list
5. Stats should reflect the displayed (filtered) list

Tests: run `npm test` and make `tests/app.debounce.test.js` pass (uses fake timers).

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
