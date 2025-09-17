# Python–Node Mapping

This table maps each key component of the Python Ship 1 template to its equivalent in the Node/JS Ship 1 template.  Use it to orient yourself if you have already looked at the Python version or are porting solutions between languages.

| Concept / file (Python) | Equivalent in Node/JS | Notes |
|---|---|---|
| `src/ship1/storage.py` | `src/storage.js` and `src/logic.js` | Python’s `storage.py` handles file I/O and pure functions.  In the browser version we split this into `storage.js` (localStorage helpers) and `logic.js` (pure functions for adding, deleting, searching). |
| `src/ship1/cli.py` | `src/app.js` | Python’s CLI parses arguments and prints output.  In the browser version `app.js` listens to DOM events, calls pure functions and updates the page. |
| `src/ship1/stats.py` | `src/stats.js` | Provides `mean_length`/`meanLength` to compute average string length.  The JavaScript implementation does not depend on third‑party libraries. |
| `tests/test_storage.py` | `tests/logic.test.js` | Verifies `addEntry`, `deleteEntry` and `searchEntries` behaviour on arrays of entries.  Uses Jest instead of pytest. |
| `tests/test_stats.py` | `tests/stats.test.js` | Tests `mean_length`/`meanLength`. |
| `SETUP.md`, `DEVELOPMENT.md`, `TROUBLESHOOTING.md` | This `README.md` and `FAQ.md` | The Node template consolidates setup, development and troubleshooting guidance into a single README and FAQ.  The Python glossary remains referenced for definitions. |
| `pyproject.toml` / `requirements.txt` | `package.json` | Project metadata and dependency management.  Node uses npm scripts for tests and linting. |
| Virtual environment `.venv` | `.nvmrc` + npm | Node uses nvm to manage versions; dependencies are installed via `npm install`. |
| `pytest` and `pytest.ini` | `jest` and `jest.config.js` | Testing frameworks differ but serve the same purpose.  Jest configuration is minimal and embedded in `package.json`. |
| `Mean length using NumPy` | Mean length computed manually | Avoids adding heavy dependencies in JavaScript. |
| `README.md` sections: Quick Overview, Get Started, What to Build, Submit | Same sections in this README | The narrative flow is preserved but adapted to a browser app (no CLI). |

This mapping should make it straightforward to translate your understanding of the Python Ship 1 assignment into the Node ecosystem.  Whenever in doubt, consult the Python version’s files and find the matching function or file here.