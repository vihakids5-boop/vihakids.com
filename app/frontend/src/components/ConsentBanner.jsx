import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { acceptTracking, declineTracking, getConsent, OPEN_SETTINGS_EVENT } from '../lib/consent';

// Asks before Google Analytics and the Meta Pixel load. Accept and Decline
// are deliberately equal-weight buttons. Rendered only after mount, since
// the stored choice lives in the browser and the page HTML is prerendered.
export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('has-consent-banner', open);
    return () => document.body.classList.remove('has-consent-banner');
  }, [open]);

  if (!open) return null;

  const choose = (accept) => {
    setOpen(false);
    if (accept) acceptTracking();
    else declineTracking();
  };

  return (
    <section className="consent-banner" role="region" aria-label="Cookie choices">
      <p>
        May we use cookies from Google Analytics and Meta (Facebook and Instagram)? They show us how the site is
        used and whether our ads work. Nothing loads unless you accept. <Link to="/cookies.html">Cookies Policy</Link>
      </p>
      <div className="consent-actions">
        <button type="button" className="btn btn-ghost" onClick={() => choose(false)}>Decline</button>
        <button type="button" className="btn btn-ghost" onClick={() => choose(true)}>Accept</button>
      </div>
    </section>
  );
}
