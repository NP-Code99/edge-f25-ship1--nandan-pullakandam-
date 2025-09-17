# Design Decisions

This file documents the key choices made while porting the Python Ship 1 assignment to Node/JS.  Understanding these decisions will help instructors and contributors maintain consistency across tracks.

## Why stay in the browser instead of switching to a Node CLI?

Ship 0’s baseline was a web page that used `localStorage` for persistence and ES modules for structure.  For Ship 1 we considered moving to a Node CLI (as the Python track does), but feedback indicated that many students valued continuity with the web stack.  Keeping the assignment in the browser avoids introducing file‑system APIs, keeps the project cross‑platform, and allows learners to focus on JavaScript itself rather than shell usage.  We achieve parity with the Python assignment by adding a pure logic layer and robust tests.

## Separation of concerns

We separate our app into three distinct layers:

- `logic.js` contains pure functions that operate on arrays of entries and return new arrays.  These functions have no side effects and are fully testable without a browser.
- `storage.js` encapsulates reads/writes to `localStorage`.  It hides the storage key and JSON serialization details from the rest of the code.
- `app.js` deals with the DOM.  It reads the current entries from `storage.js`, invokes pure functions from `logic.js` when the user performs actions (add, delete, search, clear) and then saves and re-renders the list.

This separation makes the code easier to reason about and aligns with the Python version’s separation of concerns between CLI, storage and stats.

## Timestamp formatting

We format timestamps as `YYYY‑MM‑DD HH:MM:SS` using the ISO string returned by `Date.prototype.toISOString()`.  We deliberately avoid locale‑specific formatting like `toLocaleString()` because test output must be predictable across machines.  This mirrors Python’s use of `time.strftime()`.

## Storage mechanism

The Python version writes to a JSON file on disk.  In the browser we use `localStorage` under a single key.  This requires no environment variables or special configuration.  The storage helpers in `src/storage.js` hide the details and make it trivial to swap out for another persistence mechanism (e.g. IndexedDB) in the future.

## ES modules and strictness

We configure `type: "module"` in `package.json` so that Node uses native ES modules.  This matches modern JavaScript practices and reduces friction when students transition to browser work or frameworks that use modules.  It also encourages the use of `import`/`export` rather than CommonJS `require()`.

## Testing framework

Although Ship 0 used Vitest, we switched to Jest for Ship 1 to align with Python’s `pytest` in terms of mindset and because Jest integrates smoothly with CI and ESLint.  Jest’s API is very similar to Vitest’s, so the change should not be disruptive.

## Linting and formatting

We include ESLint with the recommended rule set and the Jest plugin, plus Prettier.  Ship 0 feedback highlighted confusion about code organisation and syntax errors.  Linting early helps catch mistakes and teaches students about best practices.  We configured Prettier to avoid style debates; formatting can be run via `npm run format`.

## Node version

Ship 0 pinned Node 18 via `.nvmrc`.  To minimise friction, we kept the same version for Ship 1.  Newer versions of Node may work, but using the same LTS version ensures consistency across students’ machines and the CI environment.  If a future cohort upgrades Node, update `.nvmrc`, the `engines` field and the CI workflow accordingly.

## Where did we diverge from Python?

– **Stats implementation:**  Python uses NumPy; in JavaScript we compute the mean manually to avoid adding a heavy dependency.
– **File organisation:**  Python uses a package (`src/ship1`) with `__main__.py`.  In the browser version we split code into `logic.js` (pure functions), `storage.js` (localStorage), `app.js` (DOM) and `stats.js` (utility).  There is no CLI entry point.
– **Exception handling:**  Python raises `NotImplementedError` for TODO functions.  In JavaScript we throw generic `Error` objects.  Tests expect thrown errors to indicate unimplemented functionality.

If you make changes that diverge further from Python, document them here along with your rationale.