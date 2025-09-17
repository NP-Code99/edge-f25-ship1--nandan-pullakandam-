# Frequently Asked Questions

This FAQ is based on real feedback from Ship 0 submissions.  Most of the friction students encountered can be avoided by following the steps in the setup guide and reading the README carefully.  If you run into a problem that isn’t answered here, please ask on Slack—chances are someone else has the same question.

## General setup

**Q: Git complains about my email or I get “permission denied” when pushing.**  
A: Configure your Git name and email once via:

```bash
git config --global user.name "Your Name"
git config --global user.email "your_email@unc.edu"
```

Then clone this template or use the “Use this template” button on GitHub.  Do **not** work directly in the shared template repository—you won’t have permission to push there.

**Q: I cloned the template and now I can’t push.**  
A: You likely cloned the original template instead of your own copy.  Create your own repo from the template, then clone *that* repository.  You should see your GitHub username in the URL.

**Q: Which branch should I use?**  
A: Always create and work on a branch named `<firstname-lastname>` (all lowercase, dash separated).  Do not commit to `main`.  Example:

```bash
git checkout -b weston-voglesonger
```

**Q: How many commits do I need?**  
A: At least two meaningful commits.  Make a checkpoint after completing the baseline and another after finishing hard mode.  Avoid committing huge dumps of work at the very end.

**Q: Node says my version is unsupported.**  
A: The project requires Node 18.x.  Run `nvm use` in the project root to switch versions.  If you don’t have `nvm`, install Node 18 from [nodejs.org](https://nodejs.org/).

**Q: `npm install` prints audit warnings.**  
A: You can safely ignore `npm audit` warnings for this assignment.  We use the `--no-audit --no-fund` flags in the README example to avoid noise.  Do **not** run `npm audit fix` unless instructed.

## Running and testing

**Q: How do I run the application?**  
A: Simply open `index.html` in your browser.  You should see a text box to add entries, a **Clear** button and a search box.  If you prefer using a local server, install [`http-server`](https://www.npmjs.com/package/http-server) globally and run `npx http-server` from the project root, then visit the provided URL.  There is no CLI in Ship 1 for the browser track.

**Q: What does `npm run preflight` do?**  
A: It checks that you’re using the correct Node version (for tests), lints your code, runs the test suite and prints guidance if something fails.  Run it before pushing your code.

**Q: The tests are failing but I don’t know why.**  
A: Read the error messages in the test output.  They tell you which assertion failed and often what value was expected.  The tests are your specification.  If a test mentions that a function is not implemented or returns the wrong value, open the corresponding file and fill in the `TODO` or correct your logic.  Run `npm test` frequently as you work.

**Q: Jest can’t find my module.**  
A: Make sure your files are named exactly as expected and exported correctly.  The project uses ES modules (`type: "module"` in `package.json`), so you must use `import` and `export` syntax.  When in doubt, look at the provided functions for examples.

## Features and logic

**Q: How should I format the timestamp?**  
A: Use JavaScript’s `Date` API.  The following snippet produces the desired format:

```js
const now = new Date();
const iso = now.toISOString();      // e.g. "2025-09-16T13:45:23.000Z"
const local = iso.replace('T', ' ').slice(0, 19); // "2025-09-16 13:45:23"
```

Make sure to record the timestamp as a string and not a number; this avoids locale differences.

**Q: My delete or search isn’t working.**  
A: Double‑check the indices and casing.  Delete uses **1‑based** indexing (`1` deletes the first/newest entry).  Search should convert both the query and the entry text to lower case before comparing.  If your function returns `undefined` or throws an error, read the tests to see what behaviour is expected and adjust accordingly.

**Q: What if I get stuck?**  
A: Use the glossary and guides from the Python Ship 1 (`GLOSSARY.md`, `SETUP.md`, `TROUBLESHOOTING.md`)—almost all definitions apply here as well.  When you ask for help, include the exact command you ran, the error message and what you’ve tried so far.  That makes it much easier for others to help you.

## Using AI tools

AI tools like ChatGPT, Copilot and Cursor can be useful for generating snippets or explaining errors.  However, always verify that the code they produce satisfies the tests and the rubric.  In several Ship 0 submissions, AI hallucinated files or functions that didn’t exist.  If you use AI, treat it as a helper—not as an oracle—and cite any significant assistance in your submission form.

## Summary of fixes from Ship 0 feedback

Based on the responses to the Ship 0 feedback form, we made the following improvements:

- Added a **preflight script** that checks Node version and runs tests before submission.
- Provided **explicit Git commands** and branch naming conventions to avoid push permission errors.
- Clarified the difference between working in the template repository vs your own copy.
- Included **copy‑paste** commands for Mac, Linux and Windows for cloning, running and testing.
- Added simple **examples** in the code to show how to implement timestamp formatting and searches.
- Wrote this FAQ to address the most common questions and pain points from Ship 0 participants.

Refer to `CHANGELOG.md` for a more detailed change log.