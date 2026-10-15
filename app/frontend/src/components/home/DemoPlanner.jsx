import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { trackEvent } from '../../lib/gtag';
import { SUBJECTS, ordinal } from '../../constants/options';
import { PHONE_COUNTRIES, DEFAULT_PHONE_CODE, phoneCountry, toApiPhone, phoneErrorText } from '../../constants/phone';
import { CLASS_PAGES } from '../../data/tuitionLandingPages';

// The homepage booking, kept to one screen: class, subject, name, WhatsApp
// number, one button. It replaced a five-step planner (class, subject, goal,
// time, you) on 2026-10-15 — the extra answers were nice to have in the admin
// table, but every one of them is also the first thing we ask on WhatsApp, so
// the form only has to get the parent to the WhatsApp step. The "demo pass"
// on the left fills in as the parent taps, so the page still shows what they
// are getting before it asks for a phone number.
//
// The backend accepts parentName, phone, grade, subjects, source and page
// (see app/backend/src/validation/registrationSchema.js). The admin table and
// the Chrome extension still read goal/time/language from older records that
// carried them as query parameters on `page` (lib/demoPlan.js).

const WHATSAPP_NUMBER = '919972577828';

const SUBJECT_ICONS = { English: '🔤', Hindi: '📖', Math: '➗', Science: '🔬', Kannada: '📝' };

// The class picker is the one place the form can show a parent that we know
// their child's year. Classes sit in the same three stages the class pages
// use (Foundation, Building blocks, Board ready), and tapping a class reveals
// that year's one-line focus from the class page, so the pick itself answers
// "do they understand what my child needs?". Built from CLASS_PAGES so the two
// never drift apart.
const STAGES = CLASS_PAGES.reduce((acc, p) => {
  const [range, band] = p.eyebrow.split(' · ');
  const last = acc[acc.length - 1];
  if (last && last.band === band) last.grades.push(p.grade);
  else acc.push({ band, range, grades: [p.grade] });
  return acc;
}, []);
const CLASS_LEAD = Object.fromEntries(CLASS_PAGES.map((p) => [p.grade, p.lead]));

function initial() {
  return { grade: null, subjects: [], parentName: '', phoneCode: DEFAULT_PHONE_CODE, phone: '', website: '' };
}

export function DemoPass({ values, reserved }) {
  const rows = [
    ['Class', values.grade ? `${ordinal(values.grade)} Std` : null],
    ['Subject', values.subjects.length ? values.subjects.join(' · ') : null],
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
        <span className="v3-pass-meter" aria-label={`${filled} of 2 details chosen`}>
          {rows.map(([label, value]) => <i key={label} className={value ? 'on' : ''} />)}
        </span>
      </div>
    </div>
  );
}

export default function DemoPlanner({ values, setValues, reserved, setReserved }) {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [waLink, setWaLink] = useState(`https://wa.me/${WHATSAPP_NUMBER}`);

  // Any edit clears the error messages, so a corrected field stops shouting.
  const set = (patch) => { setErrors({}); setValues((v) => ({ ...v, ...patch })); };

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
    // null if the number does not fit the chosen country (see constants/phone.js)
    const digits = toApiPhone(values.phoneCode, values.phone);
    const errs = {};
    if (!values.grade) errs.grade = true;
    if (!values.subjects.length) errs.subjects = true;
    if (!(parentName.length >= 2 && parentName.length <= 80)) errs.parentName = true;
    if (!digits) errs.phone = true;
    setErrors(errs);
    if (Object.keys(errs).length) {
      // On a phone the class grid may be above the fold; bring the first
      // problem into view instead of leaving the parent staring at the button.
      document.querySelector('.v3-planner .v3-error.show')?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    try {
      await api.createRegistration({
        parentName,
        phone: digits,
        grade: values.grade,
        subjects: values.subjects,
        source: new URLSearchParams(window.location.search).get('utm_source') || 'website',
        page: window.location.pathname.slice(0, 200),
      });
      const text = `Hi, I'm ${parentName}. I booked a free demo on vihakids.com for my child in ${ordinal(values.grade)} Std — ${values.subjects.join(', ')}. Please confirm a time.`;
      setWaLink(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`);
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
        <h2>Your demo is booked</h2>
        <ol className="v3-done-steps">
          <li><strong>Today:</strong> we message you on WhatsApp to fix the time.</li>
          <li><strong>In the class:</strong> a real 30-minute lesson from your child’s own textbook. You are welcome to watch.</li>
          <li><strong>Afterwards:</strong> we tell you honestly what we noticed. You decide — no payment until then.</li>
        </ol>
        <a className="btn btn-primary v3-btn" href={waLink} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>
        <p className="v3-fine">Messaging now gets you the fastest reply — the message already has your child’s class and subject.</p>
      </div>
    );
  }

  return (
    <form className="v3-planner" noValidate onSubmit={submit}>
      <h2 className="v3-form-title">Book a free demo class</h2>

      <fieldset className="v3-group">
        <legend>Which class is your child in?</legend>
        <div className="v3-stages">
          {STAGES.map((stage, i) => (
            <div className={`v3-stage v3-stage-${i}${stage.grades.includes(values.grade) ? ' is-on' : ''}`} key={stage.band}>
              <p className="v3-stage-name"><strong>{stage.band}</strong><span>{stage.range}</span></p>
              <div className="v3-stage-grades">
                {stage.grades.map((g) => (
                  <button
                    type="button"
                    key={g}
                    className={`v3-chip v3-grade${values.grade === g ? ' is-on' : ''}`}
                    aria-pressed={values.grade === g}
                    aria-label={`Class ${g}`}
                    onClick={() => set({ grade: g })}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        {values.grade && (
          <p className="v3-class-insight" key={values.grade}>
            <strong>Class {values.grade}:</strong> {CLASS_LEAD[values.grade]} Your tutor starts right there.
          </p>
        )}
        <p className={`v3-error${errors.grade ? ' show' : ''}`}>Tap your child’s class.</p>
      </fieldset>

      <fieldset className="v3-group">
        <legend>Which subject? <span>Tap one or more</span></legend>
        <div className="v3-subject-row">
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
      </fieldset>

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
          {/* India first; the other four are the countries we have tuition pages for. */}
          <select
            className="v3-phone-code"
            aria-label="Country code"
            value={values.phoneCode}
            onChange={(e) => set({ phoneCode: e.target.value })}
          >
            {PHONE_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>{c.flag} {c.code} {c.name}</option>
            ))}
          </select>
          <input
            id="planner-phone"
            type="tel"
            inputMode="numeric"
            maxLength={14}
            autoComplete="tel-national"
            placeholder={phoneCountry(values.phoneCode).placeholder}
            value={values.phone}
            aria-invalid={errors.phone ? 'true' : 'false'}
            onChange={(e) => set({ phone: e.target.value })}
          />
        </div>
        <p className={`v3-error${errors.phone ? ' show' : ''}`}>{phoneErrorText(values.phoneCode)}</p>
      </div>

      <button type="submit" className="btn btn-primary v3-btn v3-submit" disabled={submitting}>
        {submitting ? 'Booking…' : 'Book my free demo'}
      </button>
      <p className="v3-fine">
        No payment, no commitment. We only use your number to fix the class time.
        See our <Link to="/privacy.html">Privacy Policy</Link>.
      </p>
      {statusMsg && <div className="v3-status" role="alert">{statusMsg}</div>}

      <div className="hf-honeypot" aria-hidden="true">
        <label htmlFor="planner-website">Website</label>
        <input id="planner-website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set({ website: e.target.value })} />
      </div>
    </form>
  );
}

export { initial as initialPlannerValues };
