# Assessment (Requirements + Rubric)

This document combines the learning outcomes and grading rubric for Ship 1 (Node/JS). Items map directly to automated tests in `tests/` and a small number of manual checks.

---

## Learning Outcomes

You will be able to:

- Persist data in the browser using `localStorage`
- Work with ES Modules and DOM events
- Implement debounced UI behavior using timers
- Design pure, testable functions and read tests as specifications
- Run tests with Jest + jsdom and interpret failures
- Use Git/GitHub effectively (branching, meaningful commits)

---

## Acceptance Criteria & Points

| Requirement                                                                  | Points | Verified by                   |
| ---------------------------------------------------------------------------- | -----: | ----------------------------- |
| **Baseline**                                                                 |        |                               |
| Proper Node version (`.nvmrc` → Node 18) and project setup                   |      5 | `scripts/preflight.mjs`       |
| Logic functions implemented correctly (addEntry, deleteEntry, searchEntries) |     25 | `tests/logic.test.js`         |
| Storage integration works                                                    |     10 | `tests/storage.test.js`       |
| Debounced search (300ms) filters entries case‑insensitively                  |     10 | `tests/app.debounce.test.js`  |
| Stats reflect displayed list                                                 |      5 | `tests/app.debounce.test.js`  |
| At least two meaningful commits on a correctly named branch                  |      5 | manual TA check               |
| **Hard Mode (optional)**                                                     |        |                               |
| Keyboard shortcuts implemented (Escape clears search)                        |     30 | `tests/app.shortcuts.test.js` |

Baseline: **60** points. With Hard Mode: **90** points. Instructors may scale to 100.

---

## Test Mapping

- `tests/logic.test.js`: Pure functions (addEntry, deleteEntry, searchEntries)
- `tests/storage.test.js`: Storage integration with logic functions
- `tests/stats.test.js`: `meanLength()` correctness (already implemented)
- `tests/app.debounce.test.js`: Debounced search behavior and filtered rendering
- `tests/app.shortcuts.test.js`: Keyboard shortcuts behavior

---

## Submission Checklist

- Repo named `edge-f25-ship1-<firstname-lastname>` (public)
- Work on branch `<firstname-lastname>`
- `npm test` is green locally
- Optional: `npm run preflight` before submitting
- Submit repo URL, branch name, and what you completed (Baseline/Hard Mode)

---

## Notes

- Tests run under jsdom; no real browser needed
- Keep commits small and messages meaningful
- If using AI assistance, you are responsible for understanding and validating changes
