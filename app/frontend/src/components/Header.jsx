import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const WHATSAPP_URL =
  'https://wa.me/919972577828?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Kannada%2C%20Hindi%2C%20Math%20and%20Science%20tuitions';

const LINKS = [
  { href: 'https://www.vihakids.com/about.html', label: 'About Us', external: true },
  { href: '/#reality', label: 'Why Us' },
  { href: '/#subjects', label: 'Subjects' },
  { href: '/#programs', label: 'Programs' },
  { href: '/#how', label: 'How it works' },
  { href: '/#reviews', label: 'Reviews' },
  { href: 'https://www.vihakids.com/blog.html', label: 'Blog', external: true },
  { href: '/#contact', label: 'Contact' },
];

function NavLink({ href, label, external, onClick }) {
  if (external) {
    return <a href={href} onClick={onClick}>{label}</a>;
  }
  return <Link to={href} onClick={onClick}>{label}</Link>;
}

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 1220) setOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header>
      <nav className="wrap" aria-label="Primary">
        <Link to="/" className="brand">
          <span className="brand-word"><span className="v-accent">V</span>ihakids</span>
          <span className="brand-tagline">Online Tuitions</span>
        </Link>

        <ul className="navlinks navlinks-mobile-hide">
          {LINKS.map((l) => (
            <li key={l.label}><NavLink {...l} /></li>
          ))}
        </ul>

        <div className="nav-ctas">
          <a
            className="nav-cta"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener"
            aria-label="Message Vihakids on WhatsApp (opens in a new tab)"
          >
            WhatsApp Us
          </a>
          <Link className="teach-chip teach-chip-nav" to="/teach">
            <span className="teach-chip-icon" aria-hidden="true">🎓</span>
            <strong>Teach with us</strong>
          </Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobileMenu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className={`mobile-menu${open ? ' open' : ''}`} id="mobileMenu">
          {LINKS.map((l) => (
            <NavLink key={l.label} {...l} onClick={() => setOpen(false)} />
          ))}
          <Link to="/teach" className="mobile-teach" onClick={() => setOpen(false)}>
            🎓 Are you a tutor? Teach with us
          </Link>
        </div>
      </nav>
    </header>
  );
}
