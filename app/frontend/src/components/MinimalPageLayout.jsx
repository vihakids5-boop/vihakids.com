import { Link } from 'react-router-dom';
import Footer from './Footer';

export default function MinimalPageLayout({ backTo, backLabel, children }) {
  return (
    <>
      <a href="#top" className="skip-link">Skip to content</a>
      <header>
        <nav className="wrap" aria-label="Primary">
          <Link to="/" className="brand">
            <span className="brand-word"><span className="v-accent">V</span>ihakids</span>
            <span className="brand-tagline">Online Tuitions</span>
          </Link>
          <Link to={backTo} className="back-link">&larr; {backLabel}</Link>
        </nav>
      </header>
      <main id="top">
        <div className="wrap">{children}</div>
      </main>
      <Footer />
    </>
  );
}
