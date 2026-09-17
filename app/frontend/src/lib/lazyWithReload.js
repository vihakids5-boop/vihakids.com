import { lazy } from 'react';

// Page chunks are content-hashed, so every deploy renames them. A tab that
// was opened before a deploy still points at the old names; clicking a link
// to a lazy page then fails to load its chunk and nothing happens until the
// visitor reloads. Reload once for them instead — index.html is never cached,
// so the reload picks up the new chunk names and lands on the page they
// clicked. The sessionStorage stamp stops a genuinely missing chunk from
// causing a reload loop.
const RELOAD_KEY = 'vk-chunk-reload-at';

export function reloadOnceForStaleChunk() {
  try {
    const last = Number(sessionStorage.getItem(RELOAD_KEY) || 0);
    if (Date.now() - last < 30000) return false;
    sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

export function lazyWithReload(load) {
  return lazy(() =>
    load().catch((err) => {
      if (reloadOnceForStaleChunk()) return new Promise(() => {});
      throw err;
    }),
  );
}
