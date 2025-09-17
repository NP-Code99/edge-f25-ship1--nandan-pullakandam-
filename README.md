# Ship 1 — Node/JS (Web version)

Welcome to your second voyage with Edge Labs!  In Ship 0 you built a tiny web app that stored data in `localStorage`.  In Ship 1 we **stay in the browser** but extend that app with timestamps, search and delete features.  You will still follow the structure, grading and stretch goals of the Python Ship 1 assignment, but instead of a CLI you’ll build a small client‑side web page.  The documentation and rubric mirror the Python version; the implementation remains idiomatic JavaScript for the browser.

---

## Quick overview

You are going to create a simple logging web page that stores entries in `localStorage`.  When you add an entry the app will stamp it with the current date and time.  You can view your entries, clear them, see basic stats, delete by index and search for text.  The pure logic functions live in `src/logic.js` and persistence helpers in `src/storage.js`; the user interface lives in `src/app.js`.  The logic is tested with Jest.

### What you'll learn

- Working with the browser’s `localStorage` to persist data between sessions
- Manipulating the DOM and handling events to build interactive interfaces
- Formatting dates and times in JavaScript
- Writing testable, pure functions that operate on arrays of objects
- Working with Git and GitHub on a real project

---

## Setup

1. **Check your Node version** (for tests). We require Node 18 (matching Ship 0) to run the test suite.  The file `.nvmrc` contains the exact version.  Use [`nvm`](https://github.com/nvm-sh/nvm) if you have it:

   ```bash
   nvm use
   # or
   nvm install
   ```

2. **Install dependencies** (for linting and tests). Run this once in the project root:

   ```bash
   npm install --no-audit --no-fund
   ```

3. **Run the preflight script**. This checks your Node version, lints your code and runs the test suite.  It will help catch most issues before you submit:

   ```bash
   npm run preflight
   ```

4. **View the application**.  Open `index.html` in your browser.  You can double‑click the file or use a simple HTTP server like `npx http-server` if you prefer.  You should see a text box to add entries, buttons to clear and search, a stats display, and a list of existing entries (if any).

   You do **not** run this project via `node`.  All of the logic runs in the browser.

---

## Project layout

```
ship1-template-node/
├── index.html        # single-page application for your log
├── src/
│   ├── app.js        # DOM interaction and rendering (browser only)
│   ├── logic.js      # pure functions for adding, deleting and searching
│   ├── storage.js    # localStorage helpers
│   └── stats.js      # statistics helper (`meanLength`)
├── tests/
│   ├── logic.test.js   # tests for add/delete/search logic
│   └── stats.test.js   # tests for stats helper
├── README.md         # assignment spec (this file)
├── REQUIREMENTS.md   # learning outcomes and required skills
├── RUBRIC.md         # points breakdown mapped to tests
├── FAQ.md            # common issues and fixes from Ship 0 feedback
├── CHANGELOG.md      # what changed since Ship 0 (Node)
├── DECISIONS.md      # design decisions for this version
├── MAPPING.md        # mapping from Python Ship 1 to Node Ship 1
├── package.json      # project metadata and scripts (for tests and linting)
├── .nvmrc            # Node version (18.x) used for tests
├── .editorconfig     # editor preferences
├── .gitignore        # files to ignore
├── scripts/
│   └── preflight.mjs # environment and test checker
└── .github/
    └── workflows/
        └── ci.yml   # GitHub Actions configuration
```

The only files you need to modify for the baseline are `src/logic.js` and `src/app.js`.  The pure functions in `logic.js` are tested; `app.js` wires those functions into the page.  The hard mode also requires you to implement deletion and search logic and corresponding UI.  The tests in the `tests/` folder describe exactly what is expected.

---

## Tasks

### Baseline (required)

1. **Add timestamps on entry creation.**  Implement the `addEntry(entries, text)` function in `src/logic.js`.  It should create a new object with keys `t` (timestamp) and `v` (trimmed text) and return a new array with the entry inserted at the start.  The timestamp must be formatted as `YYYY‑MM‑DD HH:MM:SS` in your local time.
2. **Render and persist entries.**  Use `src/app.js` to wire up the UI.  When a user adds an entry via the input box, call your `addEntry()` function with the current entries array, then save the new array to `localStorage` using `src/storage.js` and re-render the list.  Each line should look like `1. 2025-09-16 14:22:03 — message` with the newest entries at the top.
3. **Show basic stats.**  Display the total number of entries and the mean entry length beneath the controls.  Use the provided `meanLength()` function in `src/stats.js`.
4. **Clear entries.**  Implement a “Clear” button in `app.js` that removes all entries from `localStorage` and updates the list and stats.
5. **Pass the tests.**  Run `npm test` and make sure all baseline tests in `tests/logic.test.js` and `tests/stats.test.js` pass.
6. **Commit and push.**  Make at least two meaningful commits on your branch.  Avoid a single giant “final” commit.

### Hard mode (optional stretch)

1. **Delete by index.**  Implement `deleteEntry(entries, index)` in `src/logic.js`.  It should return a new array with the entry at the given 1‑based index removed.  Update `app.js` so that each list item includes a delete button; clicking it removes the entry and saves the updated list to `localStorage`.  Tests describe the expected behaviour.
2. **Search entries.**  Implement `searchEntries(entries, query)` in `src/logic.js`.  This pure function should return all entries whose `v` contains the query string (case‑insensitive).  Update the page to include a search box that filters the list as you type.
3. **Enhance stats.**  The `meanLength()` function is already provided; consider adding median or longest‑word stats as a stretch (not graded).
4. **Extra ideas.**  Add an `edit` feature to modify an existing entry, improve the UI with CSS, or store data in IndexedDB.  These stretch goals are not graded but are great practice.

---

## How to test

Run the test suite at any time with:

```bash
npm test
```

All tests should pass before you submit.  The tests are deliberately simple and run in under a second.  They check that your functions behave correctly and that timestamps are formatted properly.

The `preflight` script wraps common checks:

```bash
npm run preflight
```

It will verify your Node version matches `.nvmrc`, run the test suite and lint your files.  Fix any issues it reports before submitting.  These tests run in Node and do **not** require a browser; they operate on the pure functions in `src/logic.js` and `src/stats.js`.

---

## Submission

1. **Create your own repository** from this template.  Use GitHub’s “Use this template” button or fork it.  Name your repo `edge-f25-ship1-<firstname-lastname>` (replace with your details).  Make it public.
2. **Create a branch** named `<firstname-lastname>` (all lowercase, dash separated).
3. **Do your work** on that branch.  Commit early and often with clear messages.
4. **Push your branch** to GitHub and verify that CI is green.
5. **Submit the Google Form** with your repo URL, branch name and whether you completed the baseline or hard mode.

---

## What changed from Ship 0 (Node)

Ship 0 introduced a simple browser log that stored plain strings in `localStorage` and offered only add and clear actions.  Ship 1 builds on that foundation:

- **Timestamps.**  Each entry now includes a human‑readable timestamp when you add it.
- **Pure logic layer.**  We separate business logic (`src/logic.js`) from persistence (`src/storage.js`) and the DOM (`src/app.js`) so that tests can run on functions without a browser.
- **Delete and search features.**  Hard mode adds functions to remove an entry by its 1‑based index and to filter entries by a query string (case‑insensitive).
- **Stats display.**  A new stats area shows the count of entries and their mean length.
- **Preflight script and Jest.**  Added a preflight script to check Node version, run ESLint and Jest.  Tests are updated to match the new API.
- **Expanded documentation and FAQ.**  The README mirrors the Python Ship 1 flow and calls out common pitfalls from Ship 0.
- Ensured all instructions are clear for beginners: definitions live in `GLOSSARY.md` in the Python repo; we provide a shortened glossary in the FAQ.
- Added separate sections for **stretch goals** so you can continue learning beyond the baseline.

For a full list of differences see `CHANGELOG.md`.

---

## Need help?

- Read `REQUIREMENTS.md` for the skills you’ll gain.
- Read `FAQ.md` for solutions to common problems.
- Ask questions on Slack or during office hours.  We’re here to help!

Good luck, and enjoy your voyage into Node!