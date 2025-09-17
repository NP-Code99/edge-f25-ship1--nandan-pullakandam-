/*
 * Debounced real-time search (baseline) tests for Ship 1.
 */
import { jest } from '@jest/globals';

jest.useFakeTimers();

describe('app.js - debounced search', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="entry-input" />
      <button id="add-btn">Add</button>
      <button id="clear-btn">Clear</button>
      <input id="search-input" />
      <p id="stats"></p>
      <ul id="entries-list"></ul>
    `;
    // Provide a minimal localStorage mock for app.js via the storage.js module
    Object.defineProperty(window, 'localStorage', {
      value: {
        _data: {},
        getItem(key) { return this._data[key] || null; },
        setItem(key, val) { this._data[key] = String(val); },
        removeItem(key) { delete this._data[key]; },
        clear() { this._data = {}; }
      },
      configurable: true
    });
  });

  test('typing in search does not re-render until 300ms elapse', async () => {
    await import('../src/app.js');
    const search = document.getElementById('search-input');
    const list = document.getElementById('entries-list');
    const addBtn = document.getElementById('add-btn');
    const input = document.getElementById('entry-input');

    // Seed with some entries via the UI
    input.value = 'alpha';
    addBtn.click();
    input.value = 'beta';
    addBtn.click();
    input.value = 'alphA test';
    addBtn.click();

    // Start typing in the search box
    search.value = 'alp';
    search.dispatchEvent(new Event('input'));

    // Immediately after input, debounced render should not have updated yet
    // Expect full list of 3 items still present
    expect(list.children.length).toBe(3);

    // Advance time less than debounce window
    jest.advanceTimersByTime(200);
    expect(list.children.length).toBe(3);

    // Advance past debounce threshold (assumed 300ms)
    jest.advanceTimersByTime(150);

    // Now the list should be filtered to entries containing "alp" (2 items)
    expect(list.children.length).toBe(2);
  });
});


