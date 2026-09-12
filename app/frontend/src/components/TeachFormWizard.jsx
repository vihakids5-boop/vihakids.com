import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { trackEvent } from '../lib/gtag';
import { SUBJECTS, GRADE_BAND_OPTIONS, GRADE_LABELS, EXPERIENCE_OPTIONS, EXPERIENCE_LABELS } from '../constants/options';

const WHATSAPP_NUMBER = '919972577828';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUBJECT_ICONS = {
  English: '🔤',
  Hindi: '📖',
  Math: '➗',
  Science: '🔬',
  Kannada: '📝',
};

const GRADE_ICONS = { '1-5': '🌱', '6-8': '🌿', '9-10': '🌳' };

const STEPS = [
  { id: 1, label: 'About', icon: '👋' },
  { id: 2, label: 'Subjects', icon: '📚' },
  { id: 3, label: 'Grades', icon: '🎯' },
  { id: 4, label: 'Details', icon: '✍️' },
];

function initialState() {
  return {
    fullName: '', phone: '', email: '', subjects: [], grades: [],
    experience: '', qualification: '', message: '', website: '',
  };
}

// A 4-step guided version of the teacher-application form, used only on
// /teach. The plain single-screen TeachForm stays available if needed.
export default function TeachFormWizard() {
  const [step, setStep] = useState(1);
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

  function validateStep1() {
    const fullName = values.fullName.trim().replace(/\s+/g, ' ');
    const digits = values.phone.replace(/\D/g, '');
    const email = values.email.trim();
    const next = {};
    if (!(fullName.length >= 2 && fullName.length <= 80)) next.fullName = true;
    if (!/^[6-9]\d{9}$/.test(digits)) next.phone = true;
    if (email && !EMAIL_RE.test(email)) next.email = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateStep2() {
    const next = {};
    if (values.subjects.length < 1) next.subjects = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function validateStep3() {
    const next = {};
    if (values.grades.length < 1) next.grades = true;
    if (!EXPERIENCE_OPTIONS.includes(values.experience)) next.experience = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setErrors({});
    setStep((s) => s + 1);
  }

  function goBack() {
    setErrors({});
    setStep((s) => s - 1);
  }

  function handleEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      goNext();
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatusMsg('');

    if (values.website.trim()) {
      // Honeypot tripped — pretend success, submit nothing.
      setSuccess(true);
      return;
    }

    const fullName = values.fullName.trim().replace(/\s+/g, ' ');
    const digits = values.phone.replace(/\D/g, '');
    const email = values.email.trim();

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
      trackEvent('generate_lead', { method: 'teacher_application_wizard' });
    } catch (err) {
      setStatusMsg(err.message || 'Sorry, something went wrong. Please try again or message us on WhatsApp at +91 99725 77828.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="hf-card wizard-card">
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
    <div className="hf-card wizard-card">
      <div className="wizard-steps" role="list">
        {STEPS.map((s, i) => (
          <div className={`wizard-step${step === s.id ? ' active' : ''}${step > s.id ? ' done' : ''}`} key={s.id} role="listitem">
            <span className="wizard-step-dot">{step > s.id ? '✓' : s.icon}</span>
            <span className="wizard-step-label">{s.label}</span>
            {i < STEPS.length - 1 && <span className="wizard-step-line" aria-hidden="true" />}
          </div>
        ))}
      </div>

      {step > 1 && (
        <div className="wizard-summary">
          <span className="wizard-pill">👋 {values.fullName.split(' ')[0]}</span>
          {step > 2 && values.subjects.length > 0 && (
            <span className="wizard-pill">📚 {values.subjects.join(', ')}</span>
          )}
          {step > 3 && values.grades.length > 0 && (
            <span className="wizard-pill">🎯 {values.grades.map((g) => GRADE_LABELS[g]).join(', ')} Std</span>
          )}
        </div>
      )}

      <form noValidate onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="wizard-panel" key="step1">
            <h2 className="wizard-question">Let&rsquo;s start with you</h2>
            <div className="hf-field">
              <label htmlFor="fullName">Full name</label>
              <input
                type="text" id="fullName" maxLength={80} placeholder="e.g. Anita Rao"
                value={values.fullName} aria-invalid={errors.fullName ? 'true' : 'false'}
                onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
                onKeyDown={handleEnter}
                autoFocus
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
                  onKeyDown={handleEnter}
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
                onKeyDown={handleEnter}
              />
              <p className={`hf-error${errors.email ? ' show' : ''}`}>Please enter a valid email address.</p>
            </div>
            <button type="button" className="btn btn-primary wizard-solo-btn" onClick={goNext}>Continue →</button>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-panel" key="step2">
            <h2 className="wizard-question">What can you teach?</h2>
            <p className="wizard-hint">Pick one or more subjects</p>
            <div className="wizard-subject-grid">
              {SUBJECTS.map((s) => (
                <label className={`wizard-subject-tile${values.subjects.includes(s) ? ' checked' : ''}`} key={s}>
                  <input type="checkbox" checked={values.subjects.includes(s)} onChange={() => toggleIn('subjects', s)} />
                  <span className="wizard-subject-icon" aria-hidden="true">{SUBJECT_ICONS[s]}</span>
                  <span>{s}</span>
                </label>
              ))}
            </div>
            <p className={`hf-error${errors.subjects ? ' show' : ''}`}>Please pick at least one subject.</p>
            <div className="wizard-actions">
              <button type="button" className="btn btn-ghost wizard-back-btn" onClick={goBack}>← Back</button>
              <button type="button" className="btn btn-primary wizard-next-btn" onClick={goNext}>Continue →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="wizard-panel" key="step3">
            <h2 className="wizard-question">Which grades, and how much experience?</h2>
            <p className="wizard-hint">Pick one or more grade bands</p>
            <div className="wizard-subject-grid">
              {GRADE_BAND_OPTIONS.map((g) => (
                <label className={`wizard-subject-tile${values.grades.includes(g) ? ' checked' : ''}`} key={g}>
                  <input type="checkbox" checked={values.grades.includes(g)} onChange={() => toggleIn('grades', g)} />
                  <span className="wizard-subject-icon" aria-hidden="true">{GRADE_ICONS[g]}</span>
                  <span>{GRADE_LABELS[g]} Std</span>
                </label>
              ))}
            </div>
            <p className={`hf-error${errors.grades ? ' show' : ''}`}>Please pick at least one grade band.</p>

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

            <div className="wizard-actions">
              <button type="button" className="btn btn-ghost wizard-back-btn" onClick={goBack}>← Back</button>
              <button type="button" className="btn btn-primary wizard-next-btn" onClick={goNext}>Continue →</button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="wizard-panel" key="step4">
            <h2 className="wizard-question">Tell us a little more</h2>
            <div className="hf-field">
              <label htmlFor="qualification">Qualification <span className="hf-hint">(optional)</span></label>
              <input
                type="text" id="qualification" maxLength={120} placeholder="e.g. B.Ed, M.A. Kannada"
                value={values.qualification}
                onChange={(e) => setValues((v) => ({ ...v, qualification: e.target.value }))}
                autoFocus
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

            <div className="wizard-actions">
              <button type="button" className="btn btn-ghost wizard-back-btn" onClick={goBack}>← Back</button>
              <button type="submit" className="btn btn-primary wizard-next-btn" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit application'}
              </button>
            </div>
            <p className="hf-fineprint">By applying you agree to our <Link to="/privacy.html">Privacy Policy</Link>.</p>
            {statusMsg && <div className="hf-status show" role="alert">{statusMsg}</div>}
          </div>
        )}

        <div className="hf-honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text" id="website" tabIndex={-1} autoComplete="off"
            value={values.website}
            onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
          />
        </div>
      </form>
    </div>
  );
}
