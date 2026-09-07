import { useEffect } from 'react';

// Keeps the browser tab title and meta description in sync with each route.
// The static <head> in index.html only ships the homepage's title/description,
// so client-rendered routes need this to avoid showing stale SEO metadata.
export function useDocumentHead({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const tag = document.querySelector('meta[name="description"]');
      if (tag) tag.setAttribute('content', description);
    }
  }, [title, description]);
}
