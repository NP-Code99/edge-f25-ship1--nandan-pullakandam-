# Requirements & Learning Outcomes

This file outlines what you are expected to achieve by completing Ship 1 in the Node/JS track.  The goals mirror those in the Python track but are implemented using modern JavaScript in the **browser**.  If you’re completely new to any of these concepts, don’t worry—our guides, glossary and tests will help you get there.

## Skills you will practice

- **Working with `localStorage`.** You will persist your log in the browser’s `localStorage` and learn how to serialize and deserialize arrays of objects.
- **Formatting dates and times.** You’ll produce ISO‑like timestamps formatted as `YYYY‑MM‑DD HH:MM:SS` using JavaScript’s `Date` API.
- **Writing pure functions.** Functions in `logic.js` should not depend on the DOM or global state; they take an array of entries and return a new array.  This makes them easy to test.
- **Manipulating the DOM.** In `app.js` you’ll respond to user actions (clicks, keypresses) and update the interface accordingly.
- **Implementing search and delete operations.** The hard mode requires you to remove entries by index and to filter entries by query text, both case‑insensitively.
- **Unit testing with Jest.** You’ll run `npm test` to verify that your functions behave correctly.  Tests live in the `tests/` directory and you are encouraged to read them as a specification.
- **Using Git and GitHub effectively.** You will create a personal branch, commit frequently with clear messages and push your work to a public repository.  The CI workflow will run your tests automatically.

## Outcomes

By the end of Ship 1 you should be comfortable with:

1. Managing a small front‑end project with `npm` and `package.json` (for tests and linting).
2. Persisting structured data in the browser using `localStorage`.
3. Formatting and parsing dates in JavaScript.
4. Designing pure functions that are easy to test and re‑use across different environments.
5. Creating a simple interactive web page without external frameworks.
6. Using Jest to write and run tests, interpret test failures and fix your code.
7. Following a rubric and meeting explicit acceptance criteria.
8. Configuring Git (name/email), creating branches and pushing to GitHub without permission errors.

## Parity notes vs Python Ship 1

- **Same learning objectives.** Both tracks teach you how to add timestamps, implement delete/search features and work with a log stored persistently.
- **Different runtime.** Python uses a CLI built with `argparse`.  Here we build a browser app: no argument parsing, but event handling and DOM manipulation instead.
- **Storage mechanism.** Python writes to a JSON file on disk; the browser version uses `localStorage`.  Both persist data across sessions.
- **Tests and tooling.** Python uses `pytest`; this project uses **Jest**.  Both test suites check the same behaviours.  A `preflight` script replaces Python’s virtualenv check.
- **Stats helper.** In Python we used NumPy; in JavaScript we compute the mean manually since adding a heavy dependency is unnecessary.

Refer to `MAPPING.md` for a one‑to‑one mapping of modules and functions between the Python and Node versions.