import { useState } from 'react';
import { flushSync } from 'react-dom';
import { Link } from 'react-router-dom';
import MinimalPageLayout from '../../components/MinimalPageLayout';
import { useWorksheetPage, MoreWorksheets } from '../../components/WorksheetTraceCard';
import { useDocumentHead } from '../../lib/useDocumentHead';
import { PRACTICE_WORKSHEETS, questionCount } from '../../data/practiceWorksheets';
import { PRACTICE_WORKSHEET_ROUTES } from '../../data/practiceWorksheetRoutes';

// Fredoka: round, friendly display face for titles and part stickers.
const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap';
const TONES = ['oxide', 'lotus', 'marigold', 'sky', 'peacock', 'banana'];
const LETTERS = 'ABCDEFGHIJ';
const UNNUMBERED = new Set(['rule', 'story', 'bank', 'reference']);

function Blank({ wide }) {
  return <span className={`pw-blank${wide ? ' pw-blank-wide' : ''}`} aria-label="blank" />;
}

// Renders "The cat is ___ the box." with the ___ replaced by a writing line.
function WithBlanks({ text }) {
  const parts = text.split('___');
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && <Blank />}
    </span>
  ));
}

function WorkLines({ n }) {
  return (
    <span className="pw-lines" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => <span key={i} className="pw-line" />)}
    </span>
  );
}

// Tiny emoji picture for the prepositions sheet: "a" is placed relative to "b".
function Scene({ type, a, b, c }) {
  return (
    <span className={`pw-scene pw-scene-${type}`} aria-hidden="true">
      {type === 'between' ? (
        <>
          <span className="pw-s-b">{b}</span>
          <span className="pw-s-a">{a}</span>
          <span className="pw-s-b">{c}</span>
        </>
      ) : (
        <>
          <span className="pw-s-b">{b}</span>
          <span className="pw-s-a">{a}</span>
        </>
      )}
    </span>
  );
}

function SectionBody({ s }) {
  switch (s.type) {
    case 'rule':
      return (
        <ul className="pw-rule-list">
          {s.points.map((p) => <li key={p}>{p}</li>)}
        </ul>
      );
    case 'story':
      return <p className="pw-story">{s.text}</p>;
    case 'bank':
      return (
        <div className="pw-bank">
          {s.words.map((w) => <span className="pw-chip" key={w}>{w}</span>)}
        </div>
      );
    case 'grid':
      return (
        <ol className="pw-grid">
          {s.items.map((it) => (
            <li className="pw-card" key={it.prompt}>
              {it.emoji && <span className="pw-emoji" aria-hidden="true">{it.emoji}</span>}
              <span className="pw-prompt">{it.prompt}</span>
              {s.arrow && <span className="pw-arrow" aria-hidden="true">→</span>}
              <Blank />
            </li>
          ))}
        </ol>
      );
    case 'fill':
      return (
        <ol className="pw-list">
          {s.items.map((it) => (
            <li key={it.text}>
              {it.emoji && <span className="pw-emoji-inline" aria-hidden="true">{it.emoji}</span>}
              <span><WithBlanks text={it.text} />{it.hint && <span className="pw-hint"> ({it.hint})</span>}</span>
            </li>
          ))}
        </ol>
      );
    case 'mcq':
      return (
        <ol className="pw-list pw-mcq">
          {s.items.map((it) => (
            <li key={it.text}>
              <span><WithBlanks text={it.text} /></span>
              <span className="pw-options">
                {it.options.map((o, j) => (
                  <span className="pw-option" key={o}><b>{LETTERS[j]}</b> {o}</span>
                ))}
              </span>
            </li>
          ))}
        </ol>
      );
    case 'sort':
      return (
        <>
          {s.bank && (
            <div className="pw-bank">
              {s.bank.map((w) => <span className="pw-chip" key={w}>{w}</span>)}
            </div>
          )}
          <div className="table-scroll">
            <table className="pw-sort" style={{ '--cols': s.columns.length }}>
              <thead>
                <tr>
                  {s.columns.map((c, i) => (
                    <th key={c.label} className={`tone-${TONES[(i + 1) % TONES.length]}`}>
                      {c.emoji && <span aria-hidden="true">{c.emoji} </span>}{c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: s.rows }, (_, r) => (
                  <tr key={r}>{s.columns.map((c) => <td key={c.label} />)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    case 'scenes':
      return (
        <ol className="pw-grid pw-scenes">
          {s.items.map((it) => (
            <li className="pw-card pw-scene-card" key={it.text}>
              <Scene {...it.scene} />
              <span className="pw-scene-text"><WithBlanks text={it.text} /></span>
            </li>
          ))}
        </ol>
      );
    case 'problems':
      return (
        <ol className={s.compact ? 'pw-grid pw-work' : 'pw-list pw-work-list'}>
          {s.items.map((it) => (
            <li className={s.compact ? 'pw-card' : undefined} key={it.text}>
              <span className="pw-q">{it.text}</span>
              <WorkLines n={s.lines || 2} />
            </li>
          ))}
        </ol>
      );
    case 'table':
      return (
        <div className="table-scroll">
          <table className="pw-table">
            <thead><tr>{s.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {s.rows.map((row, r) => (
                <tr key={r}>{row.map((cell, c) => (c === 0 ? <th key={c}>{cell}</th> : <td key={c}>{cell}</td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'reference': {
      let n = 0;
      return (
        <div className="table-scroll">
          <table className="pw-reference">
            <thead>
              <tr><th>No.</th>{s.head.map((h) => <th key={h}>{h}</th>)}</tr>
            </thead>
            {s.groups.map((g, gi) => (
              <tbody key={g.label} className={`tone-${TONES[gi % TONES.length]}`}>
                <tr className="pw-ref-group"><th colSpan={s.head.length + 1}>{g.label}</th></tr>
                {g.rows.map((row) => {
                  n += 1;
                  return (
                    <tr key={row[0]}>
                      <td className="pw-ref-n">{n}</td>
                      {row.map((cell, c) => <td key={c} className={c === 0 ? 'pw-ref-key' : undefined}>{cell}</td>)}
                    </tr>
                  );
                })}
              </tbody>
            ))}
          </table>
        </div>
      );
    }
    case 'writing':
      return (
        <div className="pw-writing">
          <p>{s.prompt}</p>
          <WorkLines n={s.lines} />
        </div>
      );
    default:
      return null;
  }
}

function AnswerBody({ s }) {
  switch (s.type) {
    case 'sort':
      return (
        <ul className="pw-ans-sort">
          {s.columns.map((c) => <li key={c.label}><b>{c.label}:</b> {c.answers.join(', ')}</li>)}
        </ul>
      );
    case 'table':
      return (
        <div className="table-scroll">
          <table className="pw-table pw-table-answers">
            <thead><tr>{s.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
            <tbody>
              {s.answerRows.map((row, r) => (
                <tr key={r}>{row.map((cell, c) => (c === 0 ? <th key={c}>{cell}</th> : <td key={c}>{cell}</td>))}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'writing':
      return <p>{s.answer}</p>;
    case 'mcq':
      return (
        <ol className="pw-ans-list">
          {s.items.map((it) => <li key={it.text}>{LETTERS[it.answer]}) {it.options[it.answer]}</li>)}
        </ol>
      );
    default:
      return (
        <ol className="pw-ans-list">
          {s.items.map((it) => <li key={it.text || it.prompt}>{it.answer}</li>)}
        </ol>
      );
  }
}

export default function PracticeWorksheetPage({ slug }) {
  const ws = PRACTICE_WORKSHEETS[slug];
  const head = PRACTICE_WORKSHEET_ROUTES.find((r) => r.slug === slug);
  useDocumentHead({ title: head.metaTitle, description: head.metaDescription });
  useWorksheetPage('fredoka-font', FONT_HREF);
  const [showAnswers, setShowAnswers] = useState(false);

  const total = questionCount(ws);
  let part = 0;
  const sections = ws.sections.map((s, i) => ({
    ...s,
    tone: TONES[i % TONES.length],
    part: UNNUMBERED.has(s.type) ? null : LETTERS[part++],
  }));

  function print(withAnswers) {
    // Render the answer key (or remove it) before the print dialog snapshots the page.
    flushSync(() => setShowAnswers(withAnswers));
    window.print();
  }

  return (
    <MinimalPageLayout backTo="/worksheets" backLabel="All worksheets">
      <div className="pw">
        <div className="pw-hero">
          <span className="pw-mascot" aria-hidden="true">{ws.mascot}</span>
          <div className="pw-hero-text">
            <p className="pw-tags">
              <span className="pw-tag">{ws.subject}</span>
              <span className="pw-tag pw-tag-alt">{ws.classes}</span>
              <span className="pw-tag pw-tag-free no-print">Free printable</span>
            </p>
            <h1>{ws.title}</h1>
            <p className="pw-subtitle">{ws.subtitle}</p>
            <p className="pw-meta">{total} questions · about {ws.minutes} minutes · answer key included</p>
          </div>
        </div>

        <div className="pw-namebar">
          <span>Name <Blank wide /></span>
          <span>Class <Blank /></span>
          <span>Date <Blank /></span>
          <span className="pw-score">⭐ Score <Blank /> / {total}</span>
        </div>

        <div className="pw-intro no-print">
          <p>{ws.intro}</p>
          <div className="pw-actions">
            <button type="button" className="btn btn-primary" onClick={() => print(false)}>🖨️ Print worksheet</button>
            <button type="button" className="btn btn-ghost" onClick={() => print(true)}>🖨️ Print with answer key</button>
            <button type="button" className="btn btn-ghost" onClick={() => setShowAnswers((v) => !v)} aria-expanded={showAnswers}>
              {showAnswers ? 'Hide answers' : 'Show answers'}
            </button>
          </div>
        </div>

        {sections.map((s, i) => (
          <section
            key={i}
            className={`pw-section pw-sec-${s.type} tone-${s.tone}`}
          >
            {s.type === 'rule' ? (
              <p className="pw-rule-title">💡 {s.title}</p>
            ) : (
              <h2 className="pw-section-title">
                {s.part && <span className="pw-part">Part {s.part}</span>}
                <span>{s.title}</span>
              </h2>
            )}
            {s.instructions && <p className="pw-instructions">{s.instructions}</p>}
            <SectionBody s={s} />
          </section>
        ))}

        <p className="pw-print-brand">
          Free worksheet from Vihakids · www.vihakids.com · Live 1-on-1 online tuition, Classes 1–10 · Free demo class: +91 99725 77828
        </p>

        {showAnswers && (
          <section className="pw-answers" aria-label="Answer key">
            <h2>✅ Answer key</h2>
            {sections.filter((s) => s.part).map((s) => (
              <div className="pw-ans-block" key={s.part}>
                <h3>Part {s.part} · {s.title}</h3>
                <AnswerBody s={s} />
              </div>
            ))}
          </section>
        )}

        <MoreWorksheets current={`/${slug}`} />

        <div className="cta-band no-print">
          <h2>Want a tutor to go through this with your child?</h2>
          <p>
            Our tutors follow your child&rsquo;s own school textbook and explain each step patiently, one-on-one. See{' '}
            <Link to={ws.tuition.to}>{ws.tuition.label}</Link>, or book a free 30-minute demo class.
          </p>
          <Link className="btn btn-primary" to="/register">Book a free demo class</Link>
        </div>
      </div>
    </MinimalPageLayout>
  );
}
