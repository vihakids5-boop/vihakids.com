import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { trackEvent } from '../../lib/gtag';
import { GRADE_OPTIONS, SUBJECTS, ordinal } from '../../constants/options';

// The homepage booking: instead of a form, the parent plans the demo class in
// five taps and watches a "demo pass" fill in as they go. Single-choice steps
// advance on tap, so the whole thing is about four taps plus a phone number.
//
// The backend accepts parentName, phone, grade, subjects, source and page
// (see app/backend/src/validation/registrationSchema.js). The extra answers —
// what the parent would like help with, when the family is free, the comfort
// language — ride along in two places: as query parameters on `page`, so they
// reach the admin table, and in the prefilled WhatsApp message on the success
// screen, which is where the demo time actually gets fixed.

const WHATSAPP_NUMBER = '919972577828';

const SUBJECT_ICONS = { English: '🔤', Hindi: '📖', Math: '➗', Science: '🔬', Kannada: '📝' };

// Phrased as what the parent wants for their child, not what is wrong with the
// child — a parent should be able to tap one of these with the child watching.
// The ids are stored with the registration, so keep them stable.
const FOCUS = [
  { id: 'behind', icon: '📘', label: 'Keep up with school lessons', pass: 'Keeping up with school' },
  { id: 'exam', icon: '📝', label: 'Get ready for a test or exam', pass: 'Exam preparation' },
  { id: 'marks', icon: '⭐', label: 'Score better marks', pass: 'Better marks' },
  { id: 'basics', icon: '🧱', label: 'Build strong basics', pass: 'Strong basics' },
  { id: 'fear', icon: '🌱', label: 'Feel confident in the subject', pass: 'Confidence' },
  { id: 'homework', icon: '✏️', label: 'Help with homework', pass: 'Homework help' },
];

// Day-parts only — the exact slot is agreed on WhatsApp after booking.
const SLOTS = [
  { id: 'morning', label: 'Before school', icon: '🌅' },
  { id: 'afternoon', label: 'After school', icon: '🎒' },
  { id: 'evening', label: 'Evening', icon: '🌙' },
  { id: 'weekend', label: 'Weekend', icon: '📅' },
];

const LANGS = ['English', 'English + Kannada', 'English + Hindi'];

const STEP_TITLES = ['Class', 'Subject', 'Goal', 'Time', 'You'];

function initial() {
  return { grade: null, subjects: [], focus: null, slot: null, lang: null, parentName: '', phone: '', website: '' };
}

export function DemoPass({ values, reserved }) {
  const focus = FOCUS.find((f) => f.id === values.focus);
  const slot = SLOTS.find((s) => s.id === values.slot);
  const rows = [
    ['Class', values.grade ? `${ordinal(values.grade)} Std` : null],
    ['Subject', values.subjects.length ? values.subjects.join(' · ') : null],
    ['Goal', focus ? focus.pass : null],
    ['Time', slot ? slot.label : null],
  ];
  const filled = rows.filter(([, v]) => v).length;
  return (
    <div className={`v3-pass${reserved ? ' is-reserved' : ''}`} aria-live="polite">
      <div className="v3-pass-main">
        <p className="v3-pass-kicker">Free demo pass{reserved && <span className="v3-pass-stamp">Reserved</span>}</p>
        <p className="v3-pass-title">One child. One tutor. 30&nbsp;minutes.</p>
        <dl className="v3-pass-rows">
          {rows.map(([label, value]) => (
            <div key={label} className={value ? 'is-set' : ''}>
              <dt>{label}</dt>
              <dd>{value || '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="v3-pass-stub">
        <span className="v3-pass-price">₹0</span>
        <span className="v3-pass-stub-note">no card<br />no commitment</span>
        <span className="v3-pass-meter" aria-label={`${filled} of 4 details chosen`}>
          {rows.map(([label, value]) => <i key={label} className={value ? 'on' : ''} />)}
        </span>
      </div>
    </div>
  );
}

export default function DemoPlanner({ values, setValues, reserved, setReserved }) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [waLink, setWaLink] = useState(`https://wa.me/${WHATSAPP_NUMBER}`);

  // Any edit clears the error messages, so a corrected field stops shouting.
  const set = (patch) => { setErrors({}); setValues((v) => ({ ...v, ...patch })); };
  const next = () => { setErrors({}); setStep((s) => Math.min(s + 1, 4)); };
  const back = () => { setErrors({}); setStep((s) => Math.max(s - 1, 0)); };

  function toggleSubject(s) {
    setErrors({});
    setValues((v) => {
      const has = v.subjects.includes(s);
      if (!has && v.subjects.length >= 4) return v;
      return { ...v, subjects: has ? v.subjects.filter((x) => x !== s) : [...v.subjects, s] };
    });
  }

  async function submit(e) {
    e.preventDefault();
    setStatusMsg('');
    if (values.website.trim()) { setReserved(true); return; } // honeypot

    const parentName = values.parentName.trim().replace(/\s+/g, ' ');
    const digits = values.phone.replace(/\D/g, '');
    const errs = {};
    if (!(parentName.length >= 2 && parentName.length <= 80)) errs.parentName = true;
    if (!/^[6-9]\d{9}$/.test(digits)) errs.phone = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const focus = FOCUS.find((f) => f.id === values.focus);
    const slot = SLOTS.find((s) => s.id === values.slot);
    const extras = new URLSearchParams();
    if (values.slot) extras.set('time', values.slot);
    if (values.focus) extras.set('focus', values.focus);
    if (values.lang) extras.set('lang', values.lang);

    setSubmitting(true);
    try {
      await api.createRegistration({
        parentName,
        phone: digits,
        grade: values.grade,
        subjects: values.subjects,
        source: new URLSearchParams(window.location.search).get('utm_source') || 'website',
        page: `${window.location.pathname}?${extras.toString()}`.slice(0, 200),
      });
      const parts = [
        `Hi, I'm ${parentName}. I reserved a free demo on vihakids.com for my child in ${ordinal(values.grade)} Std — ${values.subjects.join(', ')}.`,
        focus ? `We would like help to ${focus.label.charAt(0).toLowerCase()}${focus.label.slice(1)}.` : '',
        slot ? `Best time for us: ${slot.label.toLowerCase()}.` : '',
        values.lang ? `Please explain in ${values.lang}.` : '',
        'Please confirm a slot.',
      ].filter(Boolean);
      setWaLink(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(' '))}`);
      setReserved(true);
      trackEvent('generate_lead', { method: 'demo_planner' });
    } catch (err) {
      setStatusMsg(err.message || 'Sorry, something went wrong. Please try again or message us on WhatsApp at +91 99725 77828.');
    } finally {
      setSubmitting(false);
    }
  }

  if (reserved) {
    return (
      <div className="v3-planner v3-planner-done">
        <span className="v3-done-tick" aria-hidden="true">✓</span>
        <h2>Your demo is reserved</h2>
        <ol className="v3-done-steps">
          <li><strong>Today:</strong> we message you on WhatsApp to fix the exact time.</li>
          <li><strong>In the class:</strong> a real 30-minute lesson from your child’s own textbook. You are welcome to watch.</li>
          <li><strong>Afterwards:</strong> we tell you honestly what we noticed. You decide — no payment until then.</li>
        </ol>
        <a className="btn btn-primary v3-btn" href={waLink} target="_blank" rel="noopener noreferrer">Send my plan on WhatsApp</a>
        <p className="v3-fine">Sending the plan now gets you a faster reply — it carries your class, subject and preferred time.</p>
      </div>
    );
  }

  return (
    <form className="v3-planner" noValidate onSubmit={submit}>
      <div className="v3-progress" role="list" aria-label="Booking steps">
        {STEP_TITLES.map((t, i) => (
          <button
            type="button"
            role="listitem"
            key={t}
            className={`v3-progress-step${i === step ? ' is-now' : ''}${i < step ? ' is-done' : ''}`}
            onClick={() => i < step && setStep(i)}
            disabled={i > step}
            aria-current={i === step ? 'step' : undefined}
          >
            <span>{i < step ? '✓' : i + 1}</span>{t}
          </button>
        ))}
      </div>

      {step === 0 && (
        <fieldset className="v3-step">
          <legend>Which class is your child in?</legend>
          <div className="v3-grade-grid">
            {GRADE_OPTIONS.map((g) => (
              <button
                type="button"
                key={g}
                className={`v3-chip v3-grade${values.grade === g ? ' is-on' : ''}`}
                aria-pressed={values.grade === g}
                onClick={() => { set({ grade: g }); next(); }}
              >
                {g}
              </button>
            ))}
          </div>
          <p className="v3-hint">Tap a class to begin.</p>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="v3-step">
          <legend>What should the demo class be on?</legend>
          <div className="v3-subject-grid">
            {SUBJECTS.map((s) => (
              <button
                type="button"
                key={s}
                className={`v3-chip v3-subject${values.subjects.includes(s) ? ' is-on' : ''}`}
                aria-pressed={values.subjects.includes(s)}
                onClick={() => toggleSubject(s)}
              >
                <span aria-hidden="true">{SUBJECT_ICONS[s]}</span>{s}
              </button>
            ))}
          </div>
          <p className={`v3-error${errors.subjects ? ' show' : ''}`}>Pick at least one subject.</p>
          <div className="v3-actions">
            <button type="button" className="v3-back" onClick={back}>← Back</button>
            <button
              type="button"
              className="btn btn-primary v3-btn"
              onClick={() => (values.subjects.length ? next() : setErrors({ subjects: true }))}
            >
              Continue
            </button>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="v3-step">
          <legend>What would you like us to help with?</legend>
          <div className="v3-stack">
            {FOCUS.map((f) => (
              <button
                type="button"
                key={f.id}
                className={`v3-chip v3-row${values.focus === f.id ? ' is-on' : ''}`}
                aria-pressed={values.focus === f.id}
                onClick={() => { set({ focus: f.id }); next(); }}
              >
                <span aria-hidden="true">{f.icon}</span>{f.label}
              </button>
            ))}
          </div>
          <div className="v3-actions">
            <button type="button" className="v3-back" onClick={back}>← Back</button>
            <button type="button" className="v3-skip" onClick={next}>Not sure yet — skip</button>
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="v3-step">
          <legend>When is your family usually free?</legend>
          <div className="v3-slot-grid">
            {SLOTS.map((s) => (
              <button
                type="button"
                key={s.id}
                className={`v3-chip v3-slot${values.slot === s.id ? ' is-on' : ''}`}
                aria-pressed={values.slot === s.id}
                onClick={() => set({ slot: s.id })}
              >
                <span aria-hidden="true">{s.icon}</span>{s.label}
              </button>
            ))}
          </div>
          <p className="v3-sublegend">Explain in <span>(optional)</span></p>
          <div className="v3-lang-row">
            {LANGS.map((l) => (
              <button
                type="button"
                key={l}
                className={`v3-chip v3-lang${values.lang === l ? ' is-on' : ''}`}
                aria-pressed={values.lang === l}
                onClick={() => set({ lang: values.lang === l ? null : l })}
              >
                {l}
              </button>
            ))}
          </div>
          <p className={`v3-error${errors.slot ? ' show' : ''}`}>Pick a time that usually works — we fix the exact slot with you on WhatsApp.</p>
          <div className="v3-actions">
            <button type="button" className="v3-back" onClick={back}>← Back</button>
            <button
              type="button"
              className="btn btn-primary v3-btn"
              onClick={() => (values.slot ? next() : setErrors({ slot: true }))}
            >
              Continue
            </button>
          </div>
        </fieldset>
      )}

      {step === 4 && (
        <fieldset className="v3-step">
          <legend>Where do we send the demo time?</legend>
          <div className="v3-field">
            <label htmlFor="planner-name">Your name</label>
            <input
              id="planner-name"
              type="text"
              maxLength={80}
              autoComplete="name"
              placeholder="e.g. Lakshmi Rao"
              value={values.parentName}
              aria-invalid={errors.parentName ? 'true' : 'false'}
              onChange={(e) => set({ parentName: e.target.value })}
            />
            <p className={`v3-error${errors.parentName ? ' show' : ''}`}>Please enter your name.</p>
          </div>
          <div className="v3-field">
            <label htmlFor="planner-phone">WhatsApp number</label>
            <div className="v3-phone">
              <span aria-hidden="true">+91</span>
              <input
                id="planner-phone"
                type="tel"
                inputMode="numeric"
                maxLength={10}
                autoComplete="tel-national"
                placeholder="10-digit mobile"
                value={values.phone}
                aria-invalid={errors.phone ? 'true' : 'false'}
                onChange={(e) => set({ phone: e.target.value })}
              />
            </div>
            <p className={`v3-error${errors.phone ? ' show' : ''}`}>Please enter a valid 10-digit Indian mobile number.</p>
          </div>
          <div className="v3-actions">
            <button type="button" className="v3-back" onClick={back}>← Back</button>
            <button type="submit" className="btn btn-primary v3-btn" disabled={submitting}>
              {submitting ? 'Reserving…' : 'Reserve my free demo'}
            </button>
          </div>
          <p className="v3-fine">We only use your number to arrange the class. See our <Link to="/privacy.html">Privacy Policy</Link>.</p>
          {statusMsg && <div className="v3-status" role="alert">{statusMsg}</div>}
        </fieldset>
      )}

      <div className="hf-honeypot" aria-hidden="true">
        <label htmlFor="planner-website">Website</label>
        <input id="planner-website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set({ website: e.target.value })} />
      </div>
    </form>
  );
}

export { initial as initialPlannerValues };
