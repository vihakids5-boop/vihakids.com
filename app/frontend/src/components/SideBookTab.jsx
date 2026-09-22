import { useEffect, useRef, useState } from 'react';
import RegisterFormWizard from './RegisterFormWizard';

// A vertical "Book a free demo" tab pinned to the right edge of the window.
// Clicking it slides out a panel with the booking form, so a parent can book
// from any page without losing their place. Desktop only: on phones the
// sticky bottom bar already does this job (see v2.css).
export default function SideBookTab() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const tabRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      tabRef.current?.focus();
    };
  }, [open]);

  return (
    <div className="vk-sidebook">
      <button
        type="button"
        ref={tabRef}
        className="vk-sidetab"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="vk-book-panel"
      >
        <span className="vk-sidetab-icon" aria-hidden="true">🎁</span>
        <span className="vk-sidetab-text">Book a free demo</span>
      </button>

      {open && (
        <div className="vk-drawer-backdrop" onClick={() => setOpen(false)} role="presentation" />
      )}

      <aside
        id="vk-book-panel"
        className={`vk-drawer${open ? ' is-open' : ''}`}
        aria-hidden={!open}
        aria-label="Book a free demo class"
        tabIndex={-1}
        ref={panelRef}
      >
        <div className="vk-drawer-head">
          <div>
            <p className="vk-drawer-kicker">Free 30-minute class</p>
            <h2 className="vk-drawer-title">Book your child&rsquo;s demo</h2>
          </div>
          <button type="button" className="vk-drawer-close" onClick={() => setOpen(false)} aria-label="Close booking panel">
            ✕
          </button>
        </div>

        <p className="vk-drawer-sub">
          Takes 30 seconds. No payment, no card. We message you on WhatsApp today to fix a time.
        </p>

        {open && <RegisterFormWizard />}

        <p className="vk-drawer-foot">🔒 Your number is used only to arrange the class.</p>
      </aside>
    </div>
  );
}
