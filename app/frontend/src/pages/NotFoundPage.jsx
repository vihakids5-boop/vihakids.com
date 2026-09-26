import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentHead } from '../lib/useDocumentHead';

// Shown for any URL the app does not know. Previously unknown URLs silently
// redirected to the homepage, which Google treats as "soft 404s" (the same
// homepage content under many made-up URLs). This page says clearly that the
// page does not exist and is marked noindex; the prerendered dist/404.html
// is what CloudFront returns, with a real 404 status, for missing files.
export default function NotFoundPage() {
  useDocumentHead({
    title: 'Page not found | Vihakids',
    description: 'This page does not exist. Find online tuition for Classes 1–10, free worksheets and parent guides on Vihakids.',
  });

  useEffect(() => {
    const tag = document.querySelector('meta[name="robots"]');
    if (!tag) return undefined;
    const previous = tag.getAttribute('content');
    tag.setAttribute('content', 'noindex, follow');
    return () => tag.setAttribute('content', previous);
  }, []);

  return (
    <main id="top" data-not-found="">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">Error 404</span>
          <h1>Sorry, we couldn’t find that page</h1>
          <p className="lead">The link may be old or mistyped. Here are the pages parents usually look for:</p>
        </div>
        <div className="page-body prose">
          <ul>
            <li><Link to="/">Vihakids home — online tuition for Classes 1–10</Link></li>
            <li><Link to="/register">Book a free demo class</Link></li>
            <li><Link to="/cbse-online-tuition">CBSE online tuition</Link></li>
            <li><Link to="/icse-online-tuition">ICSE online tuition</Link></li>
            <li><Link to="/state-board-online-tuition">State Board online tuition</Link></li>
            <li><Link to="/kannada-online-tuition">Kannada online tuition</Link></li>
            <li><Link to="/worksheets">Free printable worksheets</Link></li>
            <li><Link to="/fees">Fees</Link></li>
            <li><Link to="/faq">Parent FAQ</Link></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
