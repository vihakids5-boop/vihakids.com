import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_ORIGIN = 'https://www.vihakids.com';

function setAttr(selector, attr, value) {
  const tag = document.querySelector(selector);
  if (tag) tag.setAttribute(attr, value);
}

// Keeps title, description, canonical and social tags in sync with the
// current route during client-side navigation. The initial HTML for each
// route is prerendered with the same values by scripts/prerender.mjs.
// During the build-time render (src/entry-server.jsx) there is no document and
// effects never run, so the hook records what the page asked for instead.
// scripts/prerender.mjs bakes it into that route's <head>. This lets pages
// that keep their title inline (About, Blog, blog posts, legal) be prerendered
// without copying their titles into a second list.
let ssrHead = null;
export function takeSsrHead() {
  const head = ssrHead;
  ssrHead = null;
  return head;
}

export function useDocumentHead({ title, description }) {
  const { pathname } = useLocation();
  if (typeof document === 'undefined') ssrHead = { title, description };

  useEffect(() => {
    const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : '/';
    const canonical = SITE_ORIGIN + path;
    setAttr('link[rel="canonical"]', 'href', canonical);
    setAttr('meta[property="og:url"]', 'content', canonical);

    if (title) {
      document.title = title;
      setAttr('meta[property="og:title"]', 'content', title);
      setAttr('meta[name="twitter:title"]', 'content', title);
    }
    if (description) {
      setAttr('meta[name="description"]', 'content', description);
      setAttr('meta[property="og:description"]', 'content', description);
      setAttr('meta[name="twitter:description"]', 'content', description);
    }
  }, [pathname, title, description]);
}
