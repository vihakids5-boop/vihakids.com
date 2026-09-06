import { useState } from 'react';
import { api } from '../lib/api';
import { trackEvent } from '../lib/gtag';
import { SUBJECTS, GRADE_BAND_OPTIONS, GRADE_LABELS, EXPERIENCE_OPTIONS, EXPERIENCE_LABELS } from '../constants/options';

const WHATSAPP_NUMBER = '919972577828';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function initialState() {
  return {
    fullName: '', phone: '', email: '', subjects: [], grades: [],
    experience: '', qualification: '', message: '', website: '',
  };
}

export default function TeachForm() {
  const [values, setValues] = useState(initialState());
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [waLink, setWaLink] = useState('https://wa.me/' + WHATSAPP_NUMBER);

  function toggleIn(field, value) {
    setValues((v) => ({
      ...v,
      [field]: v[field].includes(value) ? v[field].filter((x) => x !== value) : [...v[field], value],
    }));
  }

  function validate() {
    const fullName = values.fullName.trim().replace(/\s+/g, ' ');
    const digits = values.phone.replace(/\D/g, '');
    const email = values.email.trim();

    const next = {};
    if (!(fullName.length >= 2 && fullName.length <= 80)) next.fullName = true;
    if (!/^[6-9]\d{9}$/.test(digits)) next.phone = true;
    if (email && !EMAIL_RE.test(email)) next.email = true;
    if (values.subjects.length < 1) next.subjects = true;
    if (values.grades.length < 1) next.grades = true;
    if (!EXPERIENCE_OPTIONS.includes(values.experience)) next.experience = true;

    setErrors(next);
    return { ok: Object.keys(next).length === 0, fullName, digits, email };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatusMsg('');

    if (values.website.trim()) {
      setSuccess(true);
      return;
    }

    const { ok, fullName, digits, email } = validate();
    if (!ok) return;

    setSubmitting(true);
    try {
      await api.createTeacherApplication({
        fullName,
        phone: digits,
        email: email || undefined,
        subjects: values.subjects,
        grades: values.grades,
        experience: values.experience,
        qualification: values.qualification.trim() || undefined,
        message: values.message.trim() || undefined,
        source: new URLSearchParams(window.location.search).get('utm_source') || 'website',
        page: window.location.pathname,
      });

      const gradeText = values.grades.map((g) => GRADE_LABELS[g]).join(', ');
      const msg = `Hi, I'm ${fullName}. I just applied on vihakids.com to teach ${values.subjects.join(', ')} (${gradeText}). Please call me back.`;
      setWaLink(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
      setSuccess(true);
      trackEvent('generate_lead', { method: 'teacher_application' });
    } catch (err) {
      setStatusMsg(err.message || 'Sorry, something went wrong. Please try again or message us on WhatsApp at +91 99725 77828.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="hf-card">
        <div className="hf-success show">
          <div className="hf-tick" aria-hidden="true">✓</div>
          <h3>Application received!</h3>
          <p>We'll message you on WhatsApp shortly.</p>
          <a className="btn btn-primary" href={waLink} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <div className="hf-card">
      <h2 className="hf-title">Apply to teach with Vihakids</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className="hf-field">
          <label htmlFor="fullName">Full name</label>
          <input
            type="text" id="fullName" maxLength={80} placeholder="e.g. Anita Rao"
            value={values.fullName} aria-invalid={errors.fullName ? 'true' : 'false'}
            onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
          />
          <p className={`hf-error${errors.fullName ? ' show' : ''}`}>Please enter your name.</p>
        </div>

        <div className="hf-field">
          <label htmlFor="phone">WhatsApp number <span className="hf-hint">(10 digits)</span></label>
          <div className="hf-phone-row">
            <span className="hf-phone-prefix" aria-hidden="true">+91</span>
            <input
              type="tel" id="phone" inputMode="numeric" maxLength={10} placeholder="99725 77828"
              value={values.phone} aria-invalid={errors.phone ? 'true' : 'false'}
              onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            />
          </div>
          <p className={`hf-error${errors.phone ? ' show' : ''}`}>Please enter a valid 10-digit Indian mobile number.</p>
        </div>

        <div className="hf-field">
          <label htmlFor="email">Email <span className="hf-hint">(optional)</span></label>
          <input
            type="email" id="email" maxLength={100} placeholder="you@example.com"
            value={values.email} aria-invalid={errors.email ? 'true' : 'false'}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
          />
          <p className={`hf-error${errors.email ? ' show' : ''}`}>Please enter a valid email address.</p>
        </div>

        <div className="hf-field">
          <fieldset>
            <legend className="hf-legend">Subjects you can teach</legend>
            <div className="hf-chips">
              {SUBJECTS.map((s) => (
                <label className="hf-chip" key={s}>
                  <input type="checkbox" checked={values.subjects.includes(s)} onChange={() => toggleIn('subjects', s)} />
                  <span>{s}</span>
                </label>
              ))}
            </div>
            <p className={`hf-error${errors.subjects ? ' show' : ''}`}>Please pick at least one subject.</p>
          </fieldset>
        </div>

        <div className="hf-field">
          <fieldset>
            <legend className="hf-legend">Grades you're comfortable teaching</legend>
            <div className="hf-chips">
              {GRADE_BAND_OPTIONS.map((g) => (
                <label className="hf-chip" key={g}>
                  <input type="checkbox" checked={values.grades.includes(g)} onChange={() => toggleIn('grades', g)} />
                  <span>{GRADE_LABELS[g]} Std</span>
                </label>
              ))}
            </div>
            <p className={`hf-error${errors.grades ? ' show' : ''}`}>Please pick at least one grade band.</p>
          </fieldset>
        </div>

        <div className="hf-field">
          <label htmlFor="experience">Teaching experience</label>
          <select
            id="experience" value={values.experience} aria-invalid={errors.experience ? 'true' : 'false'}
            onChange={(e) => setValues((v) => ({ ...v, experience: e.target.value }))}
          >
            <option value="" disabled>Select experience</option>
            {EXPERIENCE_OPTIONS.map((ex) => (
              <option key={ex} value={ex}>{EXPERIENCE_LABELS[ex]}</option>
            ))}
          </select>
          <p className={`hf-error${errors.experience ? ' show' : ''}`}>Please select your experience.</p>
        </div>

        <div className="hf-field">
          <label htmlFor="qualification">Qualification <span className="hf-hint">(optional)</span></label>
          <input
            type="text" id="qualification" maxLength={120} placeholder="e.g. B.Ed, M.A. Kannada"
            value={values.qualification}
            onChange={(e) => setValues((v) => ({ ...v, qualification: e.target.value }))}
          />
        </div>

        <div className="hf-field">
          <label htmlFor="message">Anything else? <span className="hf-hint">(optional)</span></label>
          <textarea
            id="message" maxLength={500} rows={3}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
          />
        </div>

        <div className="hf-honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text" id="website" tabIndex={-1} autoComplete="off"
            value={values.website}
            onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
          />
        </div>

        <button type="submit" className="btn btn-primary hf-submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit application'}
        </button>
        <p className="hf-fineprint">By applying you agree to our <a href="https://www.vihakids.com/privacy.html">Privacy Policy</a>.</p>
        {statusMsg && <div className="hf-status show" role="alert">{statusMsg}</div>}
      </form>
    </div>
  );
}
