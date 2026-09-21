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
