import { Link } from 'react-router-dom';
import MinimalPageLayout from '../../components/MinimalPageLayout';
import { TraceCard, useWorksheetPage, MoreWorksheets } from '../../components/WorksheetTraceCard';
import { useDocumentHead } from '../../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../../data/staticRouteHeads';

const ROUTE = '/english-alphabet-tracing-worksheet';
// Andika is designed for early readers: single-storey "a" and "g", and
// clearly different b/d/p/q, the way children are taught to write them.
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Andika&display=swap';

const WORDS = {
  A: 'apple', B: 'ball', C: 'cat', D: 'dog', E: 'egg', F: 'fish', G: 'goat', H: 'hat', I: 'ink',
  J: 'jug', K: 'kite', L: 'lion', M: 'mango', N: 'nest', O: 'orange', P: 'parrot', Q: 'queen', R: 'rabbit',
  S: 'sun', T: 'tiger', U: 'umbrella', V: 'van', W: 'watch', X: 'xylophone', Y: 'yak', Z: 'zebra',
};

const GROUPS = [
  { label: 'A to I', letters: 'ABCDEFGHI' },
  { label: 'J to R', letters: 'JKLMNOPQR' },
  { label: 'S to Z', letters: 'STUVWXYZ' },
];

export default function EnglishAlphabetWorksheetPage() {
  useDocumentHead(STATIC_ROUTE_HEADS[ROUTE]);
  useWorksheetPage('andika-font', FONT_HREF);

  return (
    <MinimalPageLayout backTo="/english-online-tuition" backLabel="English tuition">
      <div className="page-head">
        <span className="eyebrow no-print">Free Printable · English</span>
        <h1>English Alphabet Tracing Worksheet (A to Z)</h1>
        <p className="post-meta no-print">Free to print · No sign-up required</p>
      </div>

      <div className="worksheet-intro prose no-print">
        <p>A printable A to Z worksheet with every capital and small letter side by side, and a simple picture word for each — A for apple, B for ball. It is made for nursery, LKG, UKG and Class 1 children learning to write the alphabet.</p>
        <p><strong>How to use it:</strong> trace the light grey capital and small letter first, then write both freehand in the two blank boxes. Say the letter&rsquo;s sound and the word aloud as your child writes. A few letters a day is plenty.</p>
        <button type="button" className="btn btn-primary worksheet-print-btn" onClick={() => window.print()}>
          🖨️ Print this worksheet
        </button>
      </div>

      <div className="worksheet-english">
        {GROUPS.map((group) => (
          <section className="worksheet-section" key={group.label}>
            <h2>Letters {group.label}</h2>
            <div className="worksheet-grid">
              {[...group.letters].map((c) => (
                <TraceCard key={c} letter={`${c}${c.toLowerCase()}`} hint={`${c} for ${WORDS[c]}`} lang="en" />
              ))}
            </div>
          </section>
        ))}
      </div>

      <MoreWorksheets current={ROUTE} />

      <div className="cta-band no-print">
        <h2>Need more than a worksheet?</h2>
        <p>
          After the alphabet comes phonics and confident reading aloud. For patient, one-on-one help that follows your
          child&rsquo;s own school textbook, see <Link to="/english-online-tuition">online English tuition for Classes 1–10</Link>,
          or read our guide to <Link to="/blog-english-grammar-basics.html">English grammar basics for kids</Link>.
        </p>
        <Link className="btn btn-primary" to="/register">Book a free demo class</Link>
      </div>
    </MinimalPageLayout>
  );
}
