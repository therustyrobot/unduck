# Privacy Policy

**unduck** collects no data of any kind.

- **No permissions requested.** The extension does not request access to tabs, browsing history, cookies, storage, or any browser API beyond running a content script on `duckduckgo.com`.
- **No network requests.** The extension never contacts any server. There is no telemetry, analytics, crash reporting, or update check beyond the browser's built-in extension update mechanism.
- **No background processes.** There is no background service worker or event page.
- **No storage.** The extension does not read or write `localStorage`, `sessionStorage`, `IndexedDB`, or any browser storage API.
- **What it reads.** The content script reads `window.location.search` on the current DuckDuckGo tab to extract the search query and tab context (`q` and `ia` URL parameters). This value never leaves your browser — it is used only to construct the Google search URL you are navigating to.

The full source code is available at [github.com/therustyrobot/unduck](https://github.com/therustyrobot/unduck) for inspection.

---

*Last updated: May 2026*
