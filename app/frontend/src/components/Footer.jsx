import { Link } from 'react-router-dom';

const linkStyle = { color: 'var(--ink-soft)', fontSize: '0.88rem', textDecoration: 'underline' };
const iconLinkStyle = { color: 'var(--ink-soft)', display: 'inline-flex' };

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46c-.27-.04-1.2-.12-2.29-.12-2.26 0-3.81 1.38-3.81 3.92v2.19H7.98v2.96h2.46V21h3.06Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.6a2.8 2.8 0 0 0-2-2C17.9 5.2 12 5.2 12 5.2s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.4 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.4ZM10 15V9l5.2 3-5.2 3Z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M18.9 3H21l-6.7 7.6L22.2 21h-6.5l-5.1-6.4L4.7 21H2.6l7.1-8.1L2 3h6.6l4.6 5.9L18.9 3Zm-1.1 16h1.2L7.3 4.9H6L17.8 19Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <Link to="/" className="brand">
          <span className="brand-word"><span className="v-accent">V</span>ihakids</span>
        </Link>
        <p className="footer-tagline">Inspire young minds.</p>
        <address style={{ fontStyle: 'normal', margin: 0, color: 'var(--ink-soft)', fontSize: '0.88rem' }}>
          349, Begur - Koppa Rd, near Eagle Ridge, Chikkakammana Halli, Bengaluru, Karnataka 560068
        </address>
        <p style={{ margin: 0, fontSize: '0.88rem' }}>
          <a href="tel:+919972577828" style={{ color: 'var(--ink-soft)' }}>📞 +91 99725 77828</a>
        </p>
        <Link to="/about.html" style={linkStyle}>About Us</Link>
        <Link to="/blog.html" style={linkStyle}>Blog</Link>
        <div className="footer-socials" style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          <a href="https://www.facebook.com/profile.php?id=61592292419267" target="_blank" rel="noopener noreferrer" aria-label="Vihakids on Facebook (opens in a new tab)" style={iconLinkStyle}><FacebookIcon /></a>
          <a href="https://www.instagram.com/vihakids5/" target="_blank" rel="noopener noreferrer" aria-label="Vihakids on Instagram (opens in a new tab)" style={iconLinkStyle}><InstagramIcon /></a>
          <a href="https://www.youtube.com/@vihakids5" target="_blank" rel="noopener noreferrer" aria-label="Vihakids on YouTube (opens in a new tab)" style={iconLinkStyle}><YouTubeIcon /></a>
          <a href="https://x.com/vihakids" target="_blank" rel="noopener noreferrer" aria-label="Vihakids on X (opens in a new tab)" style={iconLinkStyle}><XIcon /></a>
        </div>
        <Link to="/terms.html" style={linkStyle}>Terms &amp; Conditions</Link>
        <Link to="/privacy.html" style={linkStyle}>Privacy Policy</Link>
        <Link to="/cookies.html" style={linkStyle}>Cookies Policy</Link>
        <Link to="/teach" style={linkStyle}>Teach with us</Link>
        <Link to="/admin" rel="nofollow" style={linkStyle}>Admin login</Link>
        <p>© 2026 Vihakids, Bengaluru · Online English, Hindi, Math, Science &amp; Kannada tuitions across India</p>
      </div>
    </footer>
  );
}
