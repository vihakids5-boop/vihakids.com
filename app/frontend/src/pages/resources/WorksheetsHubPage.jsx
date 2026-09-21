import { Link } from 'react-router-dom';
import { useDocumentHead } from '../../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../../data/staticRouteHeads';
import { PRACTICE_WORKSHEETS, WORKSHEET_HUB, questionCount } from '../../data/practiceWorksheets';
import { useWorksheetPage } from '../../components/WorksheetTraceCard';

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap';
const TONES = ['oxide', 'lotus', 'marigold', 'sky', 'peacock', 'banana'];

function cardFor(item) {
  if (!item.slug) return { ...item, count: null };
  const ws = PRACTICE_WORKSHEETS[item.slug];
  return {
    to: `/${item.slug}`,
    subject: ws.subject,
    classes: ws.classes,
    mascot: ws.mascot,
    title: ws.title,
    blurb: ws.subtitle,
    count: questionCount(ws),
  };
}

export default function WorksheetsHubPage() {
  useDocumentHead(STATIC_ROUTE_HEADS['/worksheets']);
  useWorksheetPage('fredoka-font', FONT_HREF);
  let n = 0;

  return (
    <main id="top" className="pw-hub">
      <div className="wrap">
        <div className="page-head">
          <span className="eyebrow">Free printables · Classes 1 to 10</span>
          <h1>Free worksheets for every class</h1>
          <p className="lead">
            Colourful, print-at-home practice sheets that follow the CBSE, ICSE and State Board syllabus — from tracing
            the alphabet to quadratic equations. Every practice sheet comes with an answer key. No sign-up, no payment.
          </p>
        </div>

        {WORKSHEET_HUB.map((group) => (
          <section className="pw-hub-band" key={group.band}>
            <h2>{group.band}</h2>
            <div className="pw-hub-grid">
              {group.items.map(cardFor).map((c) => {
                const tone = TONES[n++ % TONES.length];
                return (
                  <Link key={c.to} to={c.to} className={`pw-hub-card tone-${tone}`}>
                    <span className="pw-hub-mascot" aria-hidden="true">{c.mascot}</span>
                    <span className="pw-hub-tags">
                      <span className="pw-tag">{c.subject}</span>
                      <span className="pw-tag pw-tag-alt">{c.classes}</span>
                    </span>
                    <span className="pw-hub-title">{c.title}</span>
                    <span className="pw-hub-blurb">{c.blurb}</span>
                    <span className="pw-hub-meta">{c.count ? `${c.count} questions · answer key` : 'Tracing sheet'} →</span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        <div className="cta-band">
          <h2>Practice sheets help. A patient tutor helps more.</h2>
          <p>
            If your child gets stuck on the same kind of question again and again, a 1-on-1 tutor can find the gap and fix it,
            using your child&rsquo;s own school textbook.
          </p>
          <Link className="btn btn-primary" to="/register">Book a free demo class</Link>
        </div>
      </div>
    </main>
  );
}
