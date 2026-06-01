/**
 * Build the Google search URL from a decoded query string and a DDG tab context.
 *
 * DDG signals the active search tab via the "ia" URL parameter:
 *   images  → Google Images  (tbm=isch)
 *   videos  → Google Videos  (tbm=vid)
 *   news    → Google News    (tbm=nws)
 *
 * Any unrecognised value — including empty string and unknown tabs such as
 * "maps", "shopping", or future DDG tabs — falls through to a plain Google
 * web search with no tbm parameter appended.
 *
 * @param {string} q   - raw (decoded) query value from the "q" URL param
 * @param {string} ia  - value of the DDG "ia" URL param; empty string for Web tab
 * @returns {string}   - fully-formed Google search URL
 */
export function buildGoogleUrl(q, ia) {
  const tbmMap = { images: 'isch', videos: 'vid', news: 'nws' };
  const tbm = tbmMap[ia];
  const encoded = encodeURIComponent(q);
  return tbm
    ? `https://www.google.com/search?q=${encoded}&tbm=${tbm}`
    : `https://www.google.com/search?q=${encoded}`;
}
