import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BOARD_PAGES, SUBJECT_PAGES, CLASS_PAGES, COUNTRY_PAGES, CITY_PAGES } from '../data/tuitionLandingPages';

const WHATSAPP_URL =
  'https://wa.me/919972577828?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20English%2C%20Hindi%2C%20Math%2C%20Science%20and%20Kannada%20tuitions';

const GENERAL_LINKS = [
  { href: '/about.html', label: 'About Us' },
  { href: '/#reality', label: 'Why Us' },
  { href: '/#subjects', label: 'Subjects' },
  { href: '/#programs', label: 'Programs' },
  { href: '/#how', label: 'How it works' },
  { href: '/#reviews', label: 'Reviews' },
  { href: '/blog.html', label: 'Blog' },
  { href: '/#contact', label: 'Contact' },
];

function NavLink({ href, label, onClick, className }) {
  return <Link to={href} className={className} onClick={onClick}>{label}</Link>;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth > 1220) setOpen(false);
    }
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') { setOpen(false); setMenuOpen(false); }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    function onClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const closeMega = () => setMenuOpen(false);
  const closeMobile = () => setOpen(false);

  return (
    <header>
      <nav className="wrap" aria-label="Primary">
        <div className="nav-left">
          <Link to="/" className="brand">
            <span className="brand-word"><span className="v-accent">V</span>ihakids</span>
            <span className="brand-tagline">Online Tuitions</span>
          </Link>

          <div className="nav-dropdown navlinks-mobile-hide" ref={menuRef}>
            <button
              type="button"
              className="nav-dropdown-trigger"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              aria-controls="navMenuPanel"
              onClick={() => setMenuOpen((v) => !v)}
            >
              Explore
              <svg className="nav-dropdown-caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={`nav-dropdown-panel${menuOpen ? ' open' : ''}`} id="navMenuPanel">
              <div className="mega-col">
                <h3 className="mega-heading">Explore</h3>
                {GENERAL_LINKS.map((l) => (
                  <NavLink key={l.label} {...l} className="nav-dropdown-link" onClick={closeMega} />
                ))}
              </div>

              <div className="mega-col">
                <h3 className="mega-heading">By board</h3>
                {BOARD_PAGES.map((p) => (
                  <NavLink key={p.slug} href={`/${p.slug}`} label={p.board} className="nav-dropdown-link" onClick={closeMega} />
                ))}
              </div>

              <div className="mega-col">
                <h3 className="mega-heading">By subject</h3>
                {SUBJECT_PAGES.map((p) => (
                  <NavLink key={p.slug} href={`/${p.slug}`} label={p.subject} className="nav-dropdown-link" onClick={closeMega} />
                ))}
              </div>

              <div className="mega-col mega-col-class">
                <h3 className="mega-heading">By class</h3>
                <div className="mega-class-grid">
                  {CLASS_PAGES.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/${p.slug}`}
                      className="mega-class-chip"
                      aria-label={`Online tuition for Class ${p.grade}`}
                      onClick={closeMega}
                    >
                      {p.grade}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mega-col">
                <h3 className="mega-heading">Tuition abroad</h3>
                {COUNTRY_PAGES.map((p) => (
                  <NavLink key={p.slug} href={`/${p.slug}`} label={p.country} className="nav-dropdown-link" onClick={closeMega} />
                ))}
              </div>

              <div className="mega-col">
                <h3 className="mega-heading">By city</h3>
                {CITY_PAGES.map((p) => (
                  <NavLink key={p.slug} href={`/${p.slug}`} label={p.city} className="nav-dropdown-link" onClick={closeMega} />
                ))}
              </div>
            </div>
          </div>
        </div>

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
          {GENERAL_LINKS.map((l) => (
            <NavLink key={l.label} {...l} onClick={closeMobile} />
          ))}

          <span className="mobile-menu-heading">By board</span>
          {BOARD_PAGES.map((p) => (
            <NavLink key={p.slug} href={`/${p.slug}`} label={p.board} onClick={closeMobile} />
          ))}

          <span className="mobile-menu-heading">By subject</span>
          {SUBJECT_PAGES.map((p) => (
            <NavLink key={p.slug} href={`/${p.slug}`} label={p.subject} onClick={closeMobile} />
          ))}

          <span className="mobile-menu-heading">By class</span>
          <div className="mobile-class-grid">
            {CLASS_PAGES.map((p) => (
              <Link
                key={p.slug}
                to={`/${p.slug}`}
                className="mobile-class-chip"
                aria-label={`Online tuition for Class ${p.grade}`}
                onClick={closeMobile}
              >
                {p.grade}
              </Link>
            ))}
          </div>

          <span className="mobile-menu-heading">Tuition abroad</span>
          {COUNTRY_PAGES.map((p) => (
            <NavLink key={p.slug} href={`/${p.slug}`} label={p.country} onClick={closeMobile} />
          ))}

          <span className="mobile-menu-heading">By city</span>
          {CITY_PAGES.map((p) => (
            <NavLink key={p.slug} href={`/${p.slug}`} label={p.city} onClick={closeMobile} />
          ))}

          <Link to="/teach" className="mobile-teach" onClick={closeMobile}>
            🎓 Are you a tutor? Teach with us
          </Link>
        </div>
      </nav>
    </header>
  );
}
