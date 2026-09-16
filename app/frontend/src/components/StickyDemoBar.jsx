import { useEffect, useState } from 'react';

// Mobile-only bar that appears once the hero booking form has scrolled out
// of view, so a parent always has a one-tap way back to it.
export default function StickyDemoBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById('book');
    if (!target || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('has-sticky-demo', visible);
    return () => document.body.classList.remove('has-sticky-demo');
  }, [visible]);

  return (
    <div className={`sticky-demo${visible ? ' show' : ''}`} aria-hidden={!visible}>
      <div className="sticky-demo-text">
        <strong>&#11088; 5.0 on Google</strong>
        <span>Free 30-min demo &middot; no payment</span>
      </div>
      <a href="#book" className="btn btn-primary sticky-demo-btn" tabIndex={visible ? 0 : -1}>Book a free demo</a>
    </div>
  );
}
