import { Link } from 'react-router-dom';
import MinimalPageLayout from '../../components/MinimalPageLayout';
import { TraceCard, useWorksheetPage, MoreWorksheets } from '../../components/WorksheetTraceCard';
import { useDocumentHead } from '../../lib/useDocumentHead';
import { STATIC_ROUTE_HEADS } from '../../data/staticRouteHeads';

const ROUTE = '/hindi-varnamala-tracing-worksheet';
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;600&display=swap';

const VOWELS = [
  ['अ', 'a'], ['आ', 'ā'], ['इ', 'i'], ['ई', 'ī'], ['उ', 'u'], ['ऊ', 'ū'], ['ऋ', 'ṛ'],
  ['ए', 'e'], ['ऐ', 'ai'], ['ओ', 'o'], ['औ', 'au'], ['अं', 'aṁ'], ['अः', 'aḥ'],
];

const CONSONANT_GROUPS = [
  { label: 'क वर्ग', letters: [['क', 'ka'], ['ख', 'kha'], ['ग', 'ga'], ['घ', 'gha'], ['ङ', 'ṅa']] },
  { label: 'च वर्ग', letters: [['च', 'cha'], ['छ', 'chha'], ['ज', 'ja'], ['झ', 'jha'], ['ञ', 'ña']] },
  { label: 'ट वर्ग', letters: [['ट', 'ṭa'], ['ठ', 'ṭha'], ['ड', 'ḍa'], ['ढ', 'ḍha'], ['ण', 'ṇa']] },
  { label: 'त वर्ग', letters: [['त', 'ta'], ['थ', 'tha'], ['द', 'da'], ['ध', 'dha'], ['न', 'na']] },
  { label: 'प वर्ग', letters: [['प', 'pa'], ['फ', 'pha'], ['ब', 'ba'], ['भ', 'bha'], ['म', 'ma']] },
  { label: 'अंतःस्थ', letters: [['य', 'ya'], ['र', 'ra'], ['ल', 'la'], ['व', 'va']] },
  { label: 'ऊष्म', letters: [['श', 'śa'], ['ष', 'ṣa'], ['स', 'sa'], ['ह', 'ha']] },
  { label: 'संयुक्त व्यंजन', letters: [['क्ष', 'kṣa'], ['त्र', 'tra'], ['ज्ञ', 'jña'], ['श्र', 'śra']] },
];

export default function HindiVarnamalaWorksheetPage() {
  useDocumentHead(STATIC_ROUTE_HEADS[ROUTE]);
  useWorksheetPage('noto-sans-devanagari-font', FONT_HREF);

  return (
    <MinimalPageLayout backTo="/hindi-online-tuition" backLabel="Hindi tuition">
      <div className="page-head">
        <span className="eyebrow no-print">Free Printable · Hindi</span>
        <h1>Hindi Alphabet (Varnamala) Tracing Worksheet</h1>
        <p className="post-meta no-print">Free to print · No sign-up required</p>
      </div>

      <div className="worksheet-intro prose no-print">
        <p>This is a complete, printable Hindi Varnamala worksheet — all 13 vowels (<span lang="hi">स्वर</span>, swar), the 33 consonants (<span lang="hi">व्यंजन</span>, vyanjan) and the four joined letters <span lang="hi">क्ष, त्र, ज्ञ, श्र</span>, grouped the way they are taught in Class 1. It suits children starting Hindi at school, and children who do not hear Hindi much at home.</p>
        <p><strong>How to use it:</strong> trace over the light grey letter first, then copy it freehand in the two blank boxes next to it. Say the sound aloud each time. Ten minutes a day, a few letters at a time, works better than the whole sheet in one sitting.</p>
        <button type="button" className="btn btn-primary worksheet-print-btn" onClick={() => window.print()}>
          🖨️ Print this worksheet
        </button>
      </div>

      <section className="worksheet-section">
        <h2>Vowels — <span lang="hi">स्वर</span></h2>
        <div className="worksheet-grid">
          {VOWELS.map(([l, h]) => <TraceCard key={l} letter={l} hint={h} lang="hi" />)}
        </div>
      </section>

      {CONSONANT_GROUPS.map((group) => (
        <section className="worksheet-section" key={group.label}>
          <h2><span lang="hi">{group.label}</span></h2>
          <div className="worksheet-grid">
            {group.letters.map(([l, h]) => <TraceCard key={l} letter={l} hint={h} lang="hi" />)}
          </div>
        </section>
      ))}

      <MoreWorksheets current={ROUTE} />

      <div className="cta-band no-print">
        <h2>Need more than a worksheet?</h2>
        <p>
          Once the letters are settled, the next step is reading short words and sentences with the right
          <span lang="hi"> मात्रा</span>. For patient, one-on-one help that follows your child&rsquo;s own school textbook, see{' '}
          <Link to="/hindi-online-tuition">online Hindi tuition for Classes 1–10</Link>.
        </p>
        <Link className="btn btn-primary" to="/register">Book a free demo class</Link>
      </div>
    </MinimalPageLayout>
  );
}
