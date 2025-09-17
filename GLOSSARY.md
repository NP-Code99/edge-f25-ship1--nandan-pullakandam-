# Glossary - Simple Definitions for Edge Carolina (Node/JS)

**New to coding?** This glossary explains confusing words in simple terms.

---

## GitHub & Git

- Repository (Repo): A project folder on the internet (GitHub) that holds your code
- Clone: Copy a repo to your computer
- Branch: A separate line of work (use `firstname-lastname`)
- Commit: Save a checkpoint of your work with a message
- Push: Upload your commits to GitHub
- Template: A starter repo you copy to begin your project

---

## JavaScript & Node

- Node: Runs JavaScript outside the browser (we use it for tests and tooling)
- npm: Node’s package manager (installs dependencies)
- ES Modules: Modern JS imports/exports (`import { x } from './file.js'`)
- localStorage: Browser key–value storage that survives refreshes

---

## Testing

- Jest: Test runner for JavaScript
- jsdom: Simulates a browser DOM in Node so tests can run without a real browser
- Test: Code that checks your code
- CI (Continuous Integration): Automatically runs tests when you push to GitHub

---

## Web/DOM Terms

- DOM: The page structure your JS can read/change
- Event: Something that happens (click, keypress, input)
- Debounce: Wait a short time after typing before doing work (prevents excessive renders)

---

## Files & Config

- `.nvmrc`: Specifies the Node version (use `nvm use`)
- `package.json`: Project info, dependencies, and scripts
- `index.html`: The web page
- `src/app.js`: Your app’s event handlers and rendering
- `src/logic.js`: Pure functions (easy to test)

---

## Common Commands

```bash
nvm use                   # use project Node version
npm install               # install dependencies
npm test                  # run tests
npx http-server .         # serve the app locally
```

Still confused? Ask in Slack or office hours! We’re here to help.
