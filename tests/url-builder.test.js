import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildGoogleUrl } from '../url-builder.js';

// ── Web tab (no ia / empty ia) ──────────────────────────────────────────────

test('web search — empty ia maps to plain Google search', () => {
  assert.equal(
    buildGoogleUrl('best pizza near me', ''),
    'https://www.google.com/search?q=best%20pizza%20near%20me'
  );
});

test('web search — undefined ia falls through to web', () => {
  assert.equal(
    buildGoogleUrl('test query', undefined),
    'https://www.google.com/search?q=test%20query'
  );
});

// ── Known tab mappings ───────────────────────────────────────────────────────

test('images tab → tbm=isch', () => {
  assert.equal(
    buildGoogleUrl('cats', 'images'),
    'https://www.google.com/search?q=cats&tbm=isch'
  );
});

test('videos tab → tbm=vid', () => {
  assert.equal(
    buildGoogleUrl('tutorial', 'videos'),
    'https://www.google.com/search?q=tutorial&tbm=vid'
  );
});

test('news tab → tbm=nws', () => {
  assert.equal(
    buildGoogleUrl('headlines', 'news'),
    'https://www.google.com/search?q=headlines&tbm=nws'
  );
});

// ── Unknown / future ia values fall back to web search ──────────────────────

test('unknown ia "shopping" falls through to web search', () => {
  assert.equal(
    buildGoogleUrl('shoes', 'shopping'),
    'https://www.google.com/search?q=shoes'
  );
});

test('unknown ia "maps" falls through to web search', () => {
  assert.equal(
    buildGoogleUrl('coffee shops', 'maps'),
    'https://www.google.com/search?q=coffee%20shops'
  );
});

// ── Query encoding ───────────────────────────────────────────────────────────

test('encodes spaces as %20', () => {
  const url = buildGoogleUrl('hello world', '');
  assert.ok(url.includes('q=hello%20world'));
});

test('encodes special characters — C++ query', () => {
  assert.equal(
    buildGoogleUrl('C++ programming', ''),
    'https://www.google.com/search?q=C%2B%2B%20programming'
  );
});

test('encodes ampersand in query', () => {
  assert.equal(
    buildGoogleUrl('black & white', 'images'),
    'https://www.google.com/search?q=black%20%26%20white&tbm=isch'
  );
});

test('encodes query with slash', () => {
  assert.ok(
    buildGoogleUrl('node/express', '').includes('node%2Fexpress')
  );
});

// ── Edge cases ───────────────────────────────────────────────────────────────

test('empty query produces valid (empty) URL', () => {
  assert.equal(
    buildGoogleUrl('', ''),
    'https://www.google.com/search?q='
  );
});

test('result is always an absolute https URL', () => {
  for (const ia of ['', 'images', 'videos', 'news', 'unknown']) {
    const url = buildGoogleUrl('test', ia);
    assert.ok(url.startsWith('https://www.google.com/'), `Expected https URL for ia=${ia}`);
  }
});
