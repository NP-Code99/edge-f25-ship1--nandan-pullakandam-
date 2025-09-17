# Setup Guide

**Detailed setup instructions for Edge Carolina Ship 1 (Node/JS)**

---

## Quick Git Setup (Do This First!)

If Git isn’t using your name/email correctly, fix it now:

```bash
git config --global user.name "Your Full Name"
git config --global user.email "yourname@unc.edu"
```

Verify:
```bash
git config --global user.name
git config --global user.email
```

---

## Step 1: Create Your Own Repo from the Template

1. Open the template repository on GitHub (link from instructors)
2. Click “Use this template” → Create a new repository
3. Name: `edge-f25-ship1-<firstname-lastname>` (public)
4. Create the repo

Clone your repo locally using your IDE (VS Code or Cursor) or via terminal:
```bash
git clone https://github.com/YOUR-USERNAME/edge-f25-ship1-YOUR-NAME.git
cd edge-f25-ship1-YOUR-NAME
```

Create and switch to your branch:
```bash
git checkout -b <firstname-lastname>
```

---

## Step 2: Node and Tools

We run tests with Node and Jest. Use the Node version in `.nvmrc`.

```bash
nvm use
# or
nvm install
```

Install dev tools (Jest, jsdom, etc.):
```bash
npm install --no-audit --no-fund
```

Run tests to verify the environment:
```bash
npm test
```

Optional preflight (Node version + lint + tests):
```bash
npm run preflight
```

---

## Step 3: Open the App

- Easiest: serve locally to avoid module/CORS quirks
```bash
npx http-server .
# then open the printed http://localhost:XXXX
```
- Or double‑click `index.html` to open in your browser

---

## Step 4: Save Your Work

```bash
git status
git add -A
git commit -m "Ship 1: baseline work"
git push -u origin <firstname-lastname>
```

Make small, meaningful commits. Keep your branch name consistent.

---

## Need Help?

- See `TROUBLESHOOTING.md` for common issues
- Ask in Slack or come to office hours


