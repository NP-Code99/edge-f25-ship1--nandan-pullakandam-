/*
 * Keyboard shortcuts (hard mode) tests for Ship 1.
 */

describe('app.js - keyboard shortcuts', () => {
  beforeEach(async () => {
    document.body.innerHTML = `
      <input id="entry-input" />
      <button id="add-btn">Add</button>
      <button id="clear-btn">Clear</button>
      <input id="search-input" />
      <p id="stats"></p>
      <ul id="entries-list"></ul>
    `;
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
    await import('../src/app.js');
  });

  test('Enter in the add input adds an entry', () => {
    const input = document.getElementById('entry-input');
    const list = document.getElementById('entries-list');
    input.value = 'hello';
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    expect(list.children.length).toBe(1);
  });

  test('Ctrl/Cmd+K focuses the search input', () => {
    const search = document.getElementById('search-input');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, metaKey: false, bubbles: true }));
    expect(document.activeElement).toBe(search);
  });

  test('Escape clears the search and restores full list', () => {
    const input = document.getElementById('entry-input');
    const addBtn = document.getElementById('add-btn');
    const search = document.getElementById('search-input');
    const list = document.getElementById('entries-list');
    input.value = 'alpha';
    addBtn.click();
    input.value = 'beta';
    addBtn.click();
    search.value = 'alp';
    search.dispatchEvent(new Event('input'));
    expect(list.children.length).toBe(1);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    expect(search.value).toBe('');
    expect(list.children.length).toBe(2);
  });
});


