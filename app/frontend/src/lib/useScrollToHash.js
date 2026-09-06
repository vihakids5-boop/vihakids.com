import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// React Router's <Link> updates the URL but, unlike a native <a href="#foo">,
// does not scroll to the matching element itself. This restores that
// behavior (the nav's #reality/#subjects/etc. links rely on it), and scrolls
// to the top on a plain route change otherwise.
export function useScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [hash, pathname]);
}
