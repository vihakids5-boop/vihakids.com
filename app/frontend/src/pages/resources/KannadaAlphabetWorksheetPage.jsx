import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MinimalPageLayout from '../../components/MinimalPageLayout';
import { useDocumentHead } from '../../lib/useDocumentHead';

const FONT_LINK_ID = 'noto-sans-kannada-font';

const VOWELS = [
  { kn: 'ಅ', translit: 'a' },
  { kn: 'ಆ', translit: 'ā' },
  { kn: 'ಇ', translit: 'i' },
  { kn: 'ಈ', translit: 'ī' },
  { kn: 'ಉ', translit: 'u' },
  { kn: 'ಊ', translit: 'ū' },
  { kn: 'ಋ', translit: 'ṛ' },
  { kn: 'ಎ', translit: 'e' },
  { kn: 'ಏ', translit: 'ē' },
  { kn: 'ಐ', translit: 'ai' },
  { kn: 'ಒ', translit: 'o' },
  { kn: 'ಓ', translit: 'ō' },
  { kn: 'ಔ', translit: 'au' },
  { kn: 'ಅಂ', translit: 'aṁ' },
  { kn: 'ಅಃ', translit: 'aḥ' },
];

const CONSONANT_GROUPS = [
  {
    label: 'ಕ ವರ್ಗ',
    letters: [
      { kn: 'ಕ', translit: 'ka' }, { kn: 'ಖ', translit: 'kha' }, { kn: 'ಗ', translit: 'ga' }, { kn: 'ಘ', translit: 'gha' }, { kn: 'ಙ', translit: 'ṅa' },
    ],
  },
  {
    label: 'ಚ ವರ್ಗ',
    letters: [
      { kn: 'ಚ', translit: 'cha' }, { kn: 'ಛ', translit: 'chha' }, { kn: 'ಜ', translit: 'ja' }, { kn: 'ಝ', translit: 'jha' }, { kn: 'ಞ', translit: 'ña' },
    ],
  },
  {
    label: 'ಟ ವರ್ಗ',
    letters: [
      { kn: 'ಟ', translit: 'ṭa' }, { kn: 'ಠ', translit: 'ṭha' }, { kn: 'ಡ', translit: 'ḍa' }, { kn: 'ಢ', translit: 'ḍha' }, { kn: 'ಣ', translit: 'ṇa' },
    ],
  },
  {
    label: 'ತ ವರ್ಗ',
    letters: [
      { kn: 'ತ', translit: 'ta' }, { kn: 'ಥ', translit: 'tha' }, { kn: 'ದ', translit: 'da' }, { kn: 'ಧ', translit: 'dha' }, { kn: 'ನ', translit: 'na' },
    ],
  },
  {
    label: 'ಪ ವರ್ಗ',
    letters: [
      { kn: 'ಪ', translit: 'pa' }, { kn: 'ಫ', translit: 'pha' }, { kn: 'ಬ', translit: 'ba' }, { kn: 'ಭ', translit: 'bha' }, { kn: 'ಮ', translit: 'ma' },
    ],
  },
  {
    label: 'ಯ ಲ ವ ಶ ಳ',
    letters: [
      { kn: 'ಯ', translit: 'ya' }, { kn: 'ರ', translit: 'ra' }, { kn: 'ಲ', translit: 'la' }, { kn: 'ವ', translit: 'va' },
      { kn: 'ಶ', translit: 'śa' }, { kn: 'ಷ', translit: 'ṣa' }, { kn: 'ಸ', translit: 'sa' }, { kn: 'ಹ', translit: 'ha' }, { kn: 'ಳ', translit: 'ḷa' },
    ],
  },
];

function TraceCard({ kn, translit }) {
  return (
    <div className="trace-card">
      <span className="trace-letter" lang="kn">{kn}</span>
      <span className="trace-translit">{translit}</span>
      <div className="practice-boxes" aria-hidden="true">
        <span className="practice-box" lang="kn">{kn}</span>
        <span className="practice-box" />
        <span className="practice-box" />
      </div>
    </div>
  );
}

export default function KannadaAlphabetWorksheetPage() {
  useDocumentHead({
    title: 'Free Kannada Alphabet (Varnamale) Tracing Worksheet — Printable | Vihakids',
    description: 'A free, printable Kannada Varnamale tracing worksheet — all 15 vowels (swaragalu) and 34 consonants (vyanjanagalu), for children just starting to read and write Kannada. Print at home, no sign-up required.',
  });

  useEffect(() => {
    if (document.getElementById(FONT_LINK_ID)) return;
    const link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;600&display=swap';
    document.head.appendChild(link);
  }, []);

  // Scopes the print stylesheet to just this page, so the site header/
  // footer are hidden when printing without affecting other pages that
  // share MinimalPageLayout.
  useEffect(() => {
    document.body.classList.add('print-worksheet');
    return () => document.body.classList.remove('print-worksheet');
  }, []);

  return (
    <MinimalPageLayout backTo="/kannada-online-tuition" backLabel="Kannada tuition">
      <div className="page-head">
        <span className="eyebrow no-print">Free Printable · Kannada</span>
        <h1>Kannada Alphabet (Varnamale) Tracing Worksheet</h1>
        <p className="post-meta no-print">Free to print · No sign-up required</p>
      </div>

      <div className="worksheet-intro prose no-print">
        <p>This is a complete, printable Kannada Varnamale worksheet — all 15 vowels (<span lang="kn">ಸ್ವರಗಳು</span>, swaragalu) and all 34 consonants (<span lang="kn">ವ್ಯಂಜನಗಳು</span>, vyanjanagalu), grouped the way they're traditionally taught in school. It's meant for children just starting to read and write Kannada, including kids who don't hear the language much at home.</p>
        <p><strong>How to use it:</strong> trace over the light grey letter first, then copy it freehand in the two blank boxes next to it. Ten minutes a day, a few letters at a time, works better than doing the whole sheet in one sitting.</p>
        <button type="button" className="btn btn-primary worksheet-print-btn" onClick={() => window.print()}>
          🖨️ Print this worksheet
        </button>
      </div>

      <section className="worksheet-section">
        <h2>Vowels — <span lang="kn">ಸ್ವರಗಳು</span></h2>
        <div className="worksheet-grid">
          {VOWELS.map((v) => <TraceCard key={v.kn} {...v} />)}
        </div>
      </section>

      {CONSONANT_GROUPS.map((group) => (
        <section className="worksheet-section" key={group.label}>
          <h2><span lang="kn">{group.label}</span></h2>
          <div className="worksheet-grid">
            {group.letters.map((l) => <TraceCard key={l.kn} {...l} />)}
          </div>
        </section>
      ))}

      <div className="cta-band no-print">
        <h2>Need more than a worksheet?</h2>
        <p>
          For children who are still reading noticeably slower than their grade level, our{' '}
          <Link to="/blog-kannada-reading-tips.html">5 tips for building Kannada reading confidence at home</Link>{' '}
          is a good next step — and for one-on-one support from native-speaker tutors, see{' '}
          <Link to="/kannada-online-tuition">online Kannada tuition for Classes 1–10</Link>.
        </p>
        <Link className="btn btn-primary" to="/register">Book a free demo class</Link>
      </div>
    </MinimalPageLayout>
  );
}
