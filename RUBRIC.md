# Grading Rubric

This rubric explains how points are allocated for Ship 1 in the Node/JS track.  Each numbered item corresponds directly to one or more automated tests in the `tests/` folder.  Your final grade is the sum of points earned.  The hard mode is optional; you can achieve full credit for the baseline without attempting hard mode.  If you opt in to hard mode, the additional points can only help your score.

| Requirement | Points | Tested by |
|---|---:|---|
| **Baseline** | | |
| Proper Node version (`>=18`) and project setup | 5 | `scripts/preflight.mjs` | 
| `addEntry(entries, text)` returns a new entry with trimmed text and timestamp (`YYYY‑MM‑DD HH:MM:SS`) | 15 | `tests/logic.test.js::addEntry` |
| Timestamps are stored as strings and newest entries appear first in the returned array | 10 | same as above |
| The UI lists entries with numbering and timestamps (newest first) | 10 | manual TA check |
| Clear action removes all entries from localStorage and updates the UI | 5 | manual TA check |
| `meanLength()` reports the correct average entry length | 5 | `tests/stats.test.js` |
| At least two meaningful commits on a correctly named branch | 5 | manual TA check |
| README and repository follow submission guidelines (correct repo name, branch, screenshot if applicable) | 5 | manual TA check |
| **Hard mode (optional)** | | |
| `deleteEntry(entries, index)` removes the entry at the given 1‑based index and returns the updated array; invalid indices return the original array | 10 | `tests/logic.test.js::deleteEntry` |
| The UI provides a delete button for each entry and updates the list when clicked | 5 | manual TA check |
| `searchEntries(entries, query)` performs a case‑insensitive search and returns all matching entries; empty query returns all entries | 10 | `tests/logic.test.js::searchEntries` |
| The UI filters entries as you type in the search box | 5 | manual TA check |
| Clean code: passes ESLint/Prettier without warnings | 5 | `npm run preflight` |
| Clear documentation of optional stretch features (if implemented) | 5 | manual TA check |

Total baseline points: **60**.  Total with hard mode: **100**.  Your final grade is scaled based on how many points you earn.  Manual TA checks are noted and usually quick to verify.

## Autograding notes

The CI workflow runs `npm run preflight` followed by `npm test`.  Failing tests will appear in the GitHub Actions log with the test name and a descriptive message.  The TA will correlate test failures with rubric items.  Linting warnings count against the “clean code” item.  Use the messages provided by Jest and ESLint to guide your fixes.

Manual checks include verifying your commit history and branch name, ensuring that your output formatting is human friendly, and reading your README for clarity.  These items are straightforward but require that you follow the instructions.