# Ship 1 — Node/JS

Quick links: [Setup](SETUP.md) · [Development](DEVELOPMENT.md) · [Troubleshooting](TROUBLESHOOTING.md) · [Glossary](GLOSSARY.md) · [Assessment](RUBRIC.md)

Welcome to your next voyage with Edge Labs! This ship builds on Ship 0’s browser app and strengthens your JavaScript fundamentals with test‑driven development and meaningful UX features. This repository mirrors the structure and clarity of our Python track docs while staying 100% Node/JS and browser‑focused.

---

## Quick Overview

You will extend a simple browser log app that persists entries in `localStorage`. Ship 1 emphasizes clean, testable JavaScript and adds:

- Baseline: real‑time search with 300ms debounce
- Hard Mode: keyboard shortcuts for a smoother UX

Pure logic lives in `src/logic.js`, storage helpers in `src/storage.js`, and DOM wiring in `src/app.js`. Tests run with Jest + jsdom.

---

## Get Started (Choose Your Path)

### New to this? Start here!
1. Read SETUP: `SETUP.md`
2. Read DEVELOPMENT: `DEVELOPMENT.md`
3. If something breaks: `TROUBLESHOOTING.md`

### Already set up? Jump to coding
- Go straight to `DEVELOPMENT.md`

---

## What You’ll Learn

- ES Modules in the browser (`<script type="module">`)
- Working with `localStorage`
- DOM events and timers (debouncing)
- Designing pure, testable functions
- Running and writing tests with Jest + jsdom
- Git/GitHub workflow and clear commits

---

## Project Files

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
├── README.md         # You are here
├── SETUP.md          # Setup instructions (Node/JS specific)
├── DEVELOPMENT.md    # What to build and how (baseline + hard mode)
├── TROUBLESHOOTING.md# Common issues and fixes (Node/Jest/jsdom)
├── GLOSSARY.md       # Terms explained simply
├── RUBRIC.md         # Assessment (requirements + rubric)
├── package.json      # project metadata and scripts (for tests)
├── .nvmrc            # Node version (18.x) used for tests
├── .gitignore        # files to ignore
├── scripts/
│   └── preflight.mjs # environment and test checker
```

The only file you modify for baseline is `src/app.js` (add debounced search). Logic functions are already implemented and covered by tests. Hard mode extends `src/app.js` with keyboard shortcuts. The new `tests/` files describe exactly what is expected.

---

## Tasks

### Baseline (required)

1. Implement debounced search in `src/app.js` (300ms, case‑insensitive).
2. Rendering should only update after the debounce window.
3. Clearing search restores the full list. Stats reflect the displayed list.
4. Keep add/delete/clear working as before.
5. Run tests: `npm test` — `tests/app.debounce.test.js` should pass.

### Hard mode (optional)

Add keyboard shortcuts in `src/app.js`:
- Enter in add input → add entry if non‑empty
- Cmd/Ctrl+K → focus search
- Escape → clear search and restore full list
- Cmd/Ctrl+Backspace → clear all entries (confirm)

Run tests: `tests/app.shortcuts.test.js` should pass.

---

## How to Test

Run the test suite at any time with:

```bash
npm test
```

All tests should pass before you submit.  The tests are deliberately simple and run in under a second.  They check that your functions behave correctly and that timestamps are formatted properly.

The `preflight` script wraps common checks:

```bash
npm run preflight
```

It will verify your Node version matches `.nvmrc`, run the test suite and (optionally) lint. Tests use jsdom so no real browser is needed.

---

## Submission

1. **Create your own repository** from this template.  Use GitHub’s “Use this template” button or fork it.  Name your repo `edge-f25-ship1-<firstname-lastname>` (replace with your details).  Make it public.
2. **Create a branch** named `<firstname-lastname>` (all lowercase, dash separated).
3. **Do your work** on that branch.  Commit early and often with clear messages.
4. **Push your branch** to GitHub and verify that CI is green.
5. **Submit the Google Form** with your repo URL, branch name and whether you completed the baseline or hard mode.

---

## What Changed from Ship 0 (Node)

Ship 0 introduced a simple browser log that stored plain strings in `localStorage` and offered only add and clear actions.  Ship 1 builds on that foundation:

- **Debounced search** (baseline) with tests.
- **Keyboard shortcuts** (hard mode) with tests.
- Clearer separation of concerns (logic vs storage vs DOM).
- Jest + jsdom test environment for browser‑like behavior in Node.

For a full list of differences see `CHANGELOG.md`.

---

## Need Help?

- Read `RUBRIC.md` (assessment + learning outcomes)
- Read `TROUBLESHOOTING.md` for solutions to common problems
- Ask questions on Slack or during office hours.  We’re here to help!

Good luck, and enjoy your voyage into Node!