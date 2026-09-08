import { Link } from 'react-router-dom';
import { useDocumentHead } from '../lib/useDocumentHead';
import RegisterForm from '../components/RegisterForm';
import { BOARD_PAGES, CLASS_PAGES, SUBJECT_PAGES } from '../data/tuitionLandingPages';

const CATEGORY_LABEL = {
  board: 'Explore by board',
  class: 'Explore by class',
  subject: 'Explore by subject',
};

function RelatedLinks({ label, items, currentSlug }) {
  const others = items.filter((p) => p.slug !== currentSlug);
  if (!others.length) return null;
  return (
    <div className="related-links">
      <h2>{label}</h2>
      <ul>
        {others.map((p) => (
          <li key={p.slug}>
            <Link to={`/${p.slug}`}>{p.h1}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TuitionLandingPage({ data }) {
  const { slug, metaTitle, metaDescription, eyebrow, h1, lead, paragraphs, highlights, showBoardBadges } = data;

  useDocumentHead({ title: metaTitle, description: metaDescription });

  return (
    <main id="top">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">{eyebrow}</span>
          <h1>{h1}</h1>
          <p className="lead">{lead}</p>
          {showBoardBadges && (
            <div className="board-badges">
              <span className="board-badge b-cbse">CBSE</span>
              <span className="board-badge b-icse">ICSE</span>
              <span className="board-badge b-state">State Board</span>
            </div>
          )}
        </div>

        <div className="page-body prose">
          {paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}

          <h2>Why parents choose Vihakids for this</h2>
          <ul>
            {highlights.map((h) => <li key={h.slice(0, 24)}>{h}</li>)}
          </ul>
        </div>
      </div>

      <div className="page-form-wrap">
        <RegisterForm variant="page" />
      </div>

      <div className="wrap">
        <div className="related-links-grid">
          <RelatedLinks label={CATEGORY_LABEL.board} items={BOARD_PAGES} currentSlug={slug} />
          <RelatedLinks label={CATEGORY_LABEL.class} items={CLASS_PAGES} currentSlug={slug} />
          <RelatedLinks label={CATEGORY_LABEL.subject} items={SUBJECT_PAGES} currentSlug={slug} />
        </div>
      </div>
    </main>
  );
}
