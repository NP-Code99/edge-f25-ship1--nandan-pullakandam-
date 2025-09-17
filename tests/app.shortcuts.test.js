/*
 * Keyboard shortcuts (hard mode) tests for Ship 1.
 */
import { jest } from "@jest/globals";

jest.useFakeTimers();

describe("app.js - keyboard shortcuts", () => {
  beforeEach(async () => {
    document.body.innerHTML = `
      <input id="entry-input" />
      <button id="add-btn">Add</button>
      <button id="clear-btn">Clear</button>
      <input id="search-input" />
      <p id="stats"></p>
      <ul id="entries-list"></ul>
    `;
    Object.defineProperty(window, "localStorage", {
      value: {
        _data: {},
        getItem(key) {
          return this._data[key] || null;
        },
        setItem(key, val) {
          this._data[key] = String(val);
        },
        removeItem(key) {
          delete this._data[key];
        },
        clear() {
          this._data = {};
        },
      },
      configurable: true,
    });
    await import("../src/app.js");
  });

  test("Escape clears the search box", () => {
    const search = document.getElementById("search-input");
    search.value = "test search";
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    expect(search.value).toBe("");
  });
});
