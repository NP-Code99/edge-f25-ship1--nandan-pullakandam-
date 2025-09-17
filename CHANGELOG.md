# Changelog

This document records the major changes introduced in the Node/JS Ship 1 template compared to the Ship 0 template.  Use it to understand why certain design decisions were made and what improvements you’ll benefit from as you work through the assignment.

## v1.0.0 – Initial release (Fall 2025)

– **New project structure.**  The repository now mirrors the Python Ship 1 layout with clearly separated documentation (`README.md`, `REQUIREMENTS.md`, `RUBRIC.md`, `FAQ.md`, `DECISIONS.md`, `MAPPING.md`), source code (`index.html`, `src/logic.js`, `src/storage.js`, `src/stats.js`, `src/app.js`), tests (`tests`) and tooling (`scripts`, `.github/workflows`).
– **Remains a browser app.**  Unlike Ship 0’s minimal log, Ship 1 keeps the app in the browser but introduces a pure logic layer (`src/logic.js`) that is fully tested.  The UI in `app.js` reads and writes to `localStorage` instead of a JSON file on disk.
– **Timestamp support.**  Entries are now stamped with a human‑readable `YYYY‑MM‑DD HH:MM:SS` string when added.  The list displays timestamps alongside each entry.
– **Delete and search features.**  Hard mode introduces functions to delete entries by 1‑based index and to search entries by a case‑insensitive query.  These features correspond to the Python Ship 1 hard mode.
– **Improved tooling.**  Added a `preflight` script to catch common misconfigurations (wrong Node version, failing tests, lint errors) before submission.  Added ESLint and Prettier with sensible defaults.
– **Jest test suite.**  Replaced Vitest with Jest for consistency with the Python track’s `pytest`.  Tests are minimal, self‑explanatory and fast.
– **CI pipeline.**  Added a GitHub Actions workflow that runs preflight checks and tests on every push and pull request.  Caching of npm dependencies speeds up repeated runs.
– **Expanded documentation.**  Wrote detailed setup and usage instructions in `README.md`, included a glossary in the FAQ, added a clear rubric and pointed to common troubleshooting tips from the Python track.
– **Feedback‑driven FAQ.**  Incorporated the top pain points from Ship 0 participants: Git configuration, branch naming, push permissions, unclear instructions and test confusion.

All of these changes aim to make the assignment smoother for beginners while maintaining the learning objectives and difficulty of the Python Ship 1.  If you have suggestions for further improvements, please open an issue in the template repository after completing your submission.