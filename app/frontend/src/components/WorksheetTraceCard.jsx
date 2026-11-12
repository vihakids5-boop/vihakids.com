import { useEffect } from 'react';
import { Link } from 'react-router-dom';

// One tracing cell: a large faint letter to trace, a small hint underneath,
// then three practice boxes (the first pre-filled faintly, two blank).
// Shared by the printable alphabet worksheets.
export function TraceCard({ letter, hint, lang }) {
  return (
    <div className="trace-card">
      <span className="trace-letter" lang={lang}>{letter}</span>
      <span className="trace-translit">{hint}</span>
      <div className="practice-boxes" aria-hidden="true">
        <span className="practice-box" lang={lang}>{letter}</span>
        <span className="practice-box" />
        <span className="practice-box" />
      </div>
    </div>
  );
}

// Loads a script-specific Google Font once, and scopes the print stylesheet
// (hide header/footer/intro) to the worksheet page while it is mounted.
export function useWorksheetPage(fontId, fontHref) {
  useEffect(() => {
    if (!fontHref || document.getElementById(fontId)) return;
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    link.href = fontHref;
    document.head.appendChild(link);
  }, [fontId, fontHref]);

  useEffect(() => {
    document.body.classList.add('print-worksheet');
    return () => document.body.classList.remove('print-worksheet');
  }, []);
}

const ALL_WORKSHEETS = [
  { to: '/kannada-alphabet-tracing-worksheet', label: 'Kannada Varnamale' },
  { to: '/hindi-varnamala-tracing-worksheet', label: 'Hindi Varnamala' },
  { to: '/english-alphabet-tracing-worksheet', label: 'English A to Z' },
];

// "More free worksheets" links, excluding the page you are on.
export function MoreWorksheets({ current }) {
  return (
    <p className="worksheet-more no-print">
      <strong>More free worksheets:</strong>{' '}
      {ALL_WORKSHEETS.filter((w) => w.to !== current).map((w, i) => (
        <span key={w.to}>
          {i > 0 && ' · '}
          <Link to={w.to}>{w.label}</Link>
        </span>
      ))}
      {' · '}<Link to="/worksheets">All free worksheets →</Link>
    </p>
  );
}

// Parent guidance shown under the tracing grid (hidden when printing). The
// first list applies to any script; `children` adds the script-specific part.
export function TracingTips({ children }) {
  return (
    <div className="worksheet-intro worksheet-tips prose no-print">
      <h2>Tips for parents</h2>
      <ul>
        <li><strong>Start with the grip.</strong> A short pencil or a thick crayon is easier for small hands than a long, thin pencil. It rests on the middle finger and is held by the thumb and first finger.</li>
        <li><strong>Finger first, pencil second.</strong> Let your child trace the big letter with a finger once or twice before picking up the pencil, so the hand learns the shape and the direction.</li>
        <li><strong>Same strokes, same order.</strong> Show where the letter starts and write it the same way every time. A fixed order is what makes handwriting quick and neat later on.</li>
        <li><strong>Stop while it is going well.</strong> Three or four letters written carefully are worth more than a full page done in a hurry. When the letters start getting untidy, put the sheet away and come back tomorrow.</li>
        <li><strong>Revise before adding.</strong> Begin each sitting by writing yesterday&rsquo;s letters once from memory, then move on to new ones.</li>
        <li><strong>Print it again.</strong> The worksheet is free, so print a fresh copy whenever your child wants another go.</li>
      </ul>
      {children}
    </div>
  );
}
