// unduck — inject "Search Google" button into DuckDuckGo and survive SPA navigation

(function () {
  // Early-exit: only run on search result pages that have a query
  if (!new URLSearchParams(window.location.search).get('q')) return;

  /**
   * Build the Google search URL from a query string and DDG tab context.
   * Mirrors the exported function in url-builder.js — keep in sync.
   *
   * @param {string} q   - raw (decoded) query value
   * @param {string} ia  - value of the DDG "ia" URL param ("images", "videos", "news").
   *                       Any unrecognised value (including empty string and unknown tabs
   *                       such as "maps" or "shopping") falls through to a plain Google
   *                       web search — no tbm parameter appended.
   * @returns {string}   - full Google search URL
   */
  function buildGoogleUrl(q, ia) {
    const tbmMap = { images: 'isch', videos: 'vid', news: 'nws' };
    const tbm = tbmMap[ia];
    const encoded = encodeURIComponent(q);
    return tbm
      ? `https://www.google.com/search?q=${encoded}&tbm=${tbm}`
      : `https://www.google.com/search?q=${encoded}`;
  }

  function injectButton() {
    // Guard: don't inject twice
    if (document.getElementById('unduck-btn')) return;

    // Slot selection: prefer the dedicated React slot, fall back to the header aside
    const slot =
      document.getElementById('react-ai-button-slot') ||
      document.querySelector('.header--aside');

    if (!slot) return;

    const btn = document.createElement('button');
    btn.id = 'unduck-btn';
    btn.textContent = 'Search Google';
    btn.type = 'button';

    btn.addEventListener('click', function () {
      // Re-read location at click time so SPA navigation is reflected
      const p = new URLSearchParams(window.location.search);
      const q = p.get('q') || '';
      const ia = p.get('ia') || '';
      window.location.href = buildGoogleUrl(q, ia);
    });

    slot.appendChild(btn);
  }

  // Initial injection attempt (may already be rendered)
  injectButton();

  // Persistent observer for SPA re-renders.
  // Debounced via cancelAnimationFrame so that rapid back-to-back mutations
  // (React reconciliation can fire hundreds per navigation) collapse into a
  // single injectButton call at the next paint frame — satisfying CWS
  // performance policy and avoiding unnecessary DOM queries.
  let rafHandle = 0;
  new MutationObserver(() => {
    cancelAnimationFrame(rafHandle);
    rafHandle = requestAnimationFrame(injectButton);
  }).observe(document.body, { childList: true, subtree: true });
})();
