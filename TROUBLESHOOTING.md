# Troubleshooting Guide

**Common issues and solutions for Edge Carolina Ship 1 (Node/JS)**

---

## Permission / Repo Issues

- Permission denied when pushing
  - You cloned the original template. Create your own repo via “Use this template” and push there.

---

## Node & Jest Issues

- Node version mismatch in preflight
  - Run `nvm use` to match `.nvmrc` (Node 18).

- `ReferenceError: window is not defined`
  - Ensure tests run under jsdom. We set `testEnvironment: "jsdom"` in package.json.

- `Cannot use import statement outside a module`
  - This project uses ES modules. Tests run with `NODE_OPTIONS='--experimental-vm-modules'` (already set in npm scripts).

- Debounce tests not behaving
  - Import `jest` from `@jest/globals` and use fake timers. Advance time with `jest.advanceTimersByTime(ms)`.

---

## DOM / App Issues

- Nothing renders
  - Open DevTools → Console for errors. Serve via `npx http-server .` to avoid module/CORS issues.

- Search doesn’t filter
  - Confirm you’re using the debounced handler and calling `searchEntries(entries, q)`

- Stats don’t match visible list
  - Update stats from the currently displayed (filtered) list, not the canonical array.

---

## Git Basics

```bash
git status
git add -A
git commit -m "Clear message"
git push -u origin <firstname-lastname>
```

If Git email/name is wrong, set it in `git config --global`.

---

## Still Stuck?

- Check `SETUP.md`
- Ask in Slack / office hours

---

## Using AI Tools (Guidance)

- AI assistants (ChatGPT, Copilot, Cursor) can help explain errors or draft code.
- Always validate generated code against the tests and rubric.
- Watch for hallucinated files/paths; stick to this repo’s structure.
- Cite significant AI assistance in your submission if required by course policy.
