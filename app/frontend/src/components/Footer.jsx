import { Link } from 'react-router-dom';

const linkStyle = { color: 'var(--ink-soft)', fontSize: '0.88rem', textDecoration: 'underline' };

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
        <a href="https://www.vihakids.com/about.html" style={linkStyle}>About Us</a>
        <a href="https://www.vihakids.com/blog.html" style={linkStyle}>Blog</a>
        <a href="https://www.facebook.com/profile.php?id=61592292419267" target="_blank" rel="noopener noreferrer" aria-label="Vihakids on Facebook (opens in a new tab)" style={linkStyle}>Facebook</a>
        <a href="https://www.instagram.com/vihakids5/" target="_blank" rel="noopener noreferrer" aria-label="Vihakids on Instagram (opens in a new tab)" style={linkStyle}>Instagram</a>
        <a href="https://www.youtube.com/@vihakids5" target="_blank" rel="noopener noreferrer" aria-label="Vihakids on YouTube (opens in a new tab)" style={linkStyle}>YouTube</a>
        <a href="https://x.com/vihakids" target="_blank" rel="noopener noreferrer" aria-label="Vihakids on X (opens in a new tab)" style={linkStyle}>X</a>
        <a href="https://www.vihakids.com/terms.html" style={linkStyle}>Terms &amp; Conditions</a>
        <a href="https://www.vihakids.com/privacy.html" style={linkStyle}>Privacy Policy</a>
        <a href="https://www.vihakids.com/cookies.html" style={linkStyle}>Cookies Policy</a>
        <Link to="/teach" style={linkStyle}>Teach with us</Link>
        <Link to="/admin" rel="nofollow" style={linkStyle}>Admin login</Link>
        <p>© 2026 Vihakids, Bengaluru · Online Kannada, Hindi, Math &amp; Science tuitions</p>
      </div>
    </footer>
  );
}
