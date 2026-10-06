import { Link } from 'react-router-dom';
import { BOARD_PAGES, CLASS_PAGES, SUBJECT_PAGES, CITY_PAGES, COUNTRY_PAGES } from '../data/tuitionLandingPages';

// Site-wide links to every tuition landing page, rendered in the footer of
// every page. Google only reliably crawls pages the site itself links to; the
// 45 landing pages were reachable only through the Explore menu (which search
// engines may not open) and a handful of cross-links, which is one reason 58
// of them sat at "Discovered – currently not indexed". Plain anchors in the
// prerendered HTML fix that permanently.
const GROUPS = [
  { heading: 'Tuition by board', pages: BOARD_PAGES.map((p) => ({ slug: p.slug, label: p.board })) },
  { heading: 'Tuition by class', pages: CLASS_PAGES.map((p) => ({ slug: p.slug, label: `Class ${p.grade}` })) },
  { heading: 'Tuition by subject', pages: SUBJECT_PAGES.map((p) => ({ slug: p.slug, label: p.subject })) },
  { heading: 'Tuition by city', pages: CITY_PAGES.map((p) => ({ slug: p.slug, label: p.city })) },
  { heading: 'Indian families abroad', pages: COUNTRY_PAGES.map((p) => ({ slug: p.slug, label: p.country })) },
];

export default function FooterLinks() {
  return (
    <nav className="footer-links" aria-label="Online tuition pages">
      <div className="wrap">
        <p className="footer-links-title">Online tuition for Classes 1–10, by board, class, subject and city</p>
        <div className="footer-links-grid">
          {GROUPS.map((g) => (
            <div className="footer-links-group" key={g.heading}>
              <h2>{g.heading}</h2>
              <ul>
                {g.pages.map((p) => (
                  <li key={p.slug}><Link to={`/${p.slug}`}>{p.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
