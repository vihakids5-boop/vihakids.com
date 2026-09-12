import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { trackEvent } from '../lib/gtag';
import { GRADE_OPTIONS, SUBJECTS, ordinal } from '../constants/options';

const WHATSAPP_NUMBER = '919972577828';

const SUBJECT_ICONS = {
  English: '🔤',
  Hindi: '📖',
  Math: '➗',
  Science: '🔬',
  Kannada: '📝',
};

const STEPS = [
  { id: 1, label: 'Child', icon: '🎒' },
  { id: 2, label: 'Subjects', icon: '📚' },
  { id: 3, label: 'Contact', icon: '💬' },
];

function initialState() {
  return { parentName: '', phone: '', grade: '', subjects: [], website: '' };
}

// A 3-step guided version of the registration form, used only on the
// standalone /register page. The plain single-screen RegisterForm stays
// unchanged for the homepage hero and the 40+ landing pages.
export default function RegisterFormWizard() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState(initialState());
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [waLink, setWaLink] = useState('https://wa.me/' + WHATSAPP_NUMBER);

  function toggleSubject(subject) {
    setValues((v) => ({
      ...v,
      subjects: v.subjects.includes(subject)
        ? v.subjects.filter((s) => s !== subject)
        : [...v.subjects, subject],
    }));
  }

  function validateStep1() {
    const parentName = values.parentName.trim().replace(/\s+/g, ' ');
    const grade = parseInt(values.grade, 10);
    const next = {};
    if (!(parentName.length >= 2 && parentName.length <= 80)) next.parentName = true;
    if (!(Number.isInteger(grade) && grade >= 1 && grade <= 10)) next.grade = true;
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
    const digits = values.phone.replace(/\D/g, '');
    const next = {};
    if (!/^[6-9]\d{9}$/.test(digits)) next.phone = true;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
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

    if (!validateStep3()) return;

    const parentName = values.parentName.trim().replace(/\s+/g, ' ');
    const digits = values.phone.replace(/\D/g, '');
    const grade = parseInt(values.grade, 10);

    setSubmitting(true);
    try {
      await api.createRegistration({
        parentName,
        phone: digits,
        grade,
        subjects: values.subjects,
        source: new URLSearchParams(window.location.search).get('utm_source') || 'website',
        page: window.location.pathname,
      });

      const msg = `Hi, I'm ${parentName}. I just registered on vihakids.com for ${values.subjects.join(', ')} tuition (${ordinal(grade)} Std). Please call me back.`;
      setWaLink(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`);
      setSuccess(true);
      trackEvent('generate_lead', { method: 'register_wizard' });
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
          <h3>You're registered!</h3>
          <p>We'll message you on WhatsApp shortly to fix the demo class.</p>
          <a className="btn btn-primary" href={waLink} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
        </div>
      </div>
    );
  }

  const grade = parseInt(values.grade, 10);

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
          <span className="wizard-pill">🎒 {ordinal(grade)} Std{values.parentName ? ` · ${values.parentName.split(' ')[0]}` : ''}</span>
          {step > 2 && values.subjects.length > 0 && (
            <span className="wizard-pill">📚 {values.subjects.join(', ')}</span>
          )}
        </div>
      )}

      <form noValidate onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="wizard-panel" key="step1">
            <h2 className="wizard-question">Let&rsquo;s start with your child</h2>
            <div className="hf-field">
              <label htmlFor="parentName">Parent&rsquo;s name</label>
              <input
                type="text"
                id="parentName"
                maxLength={80}
                placeholder="e.g. Lakshmi Rao"
                value={values.parentName}
                aria-invalid={errors.parentName ? 'true' : 'false'}
                onChange={(e) => setValues((v) => ({ ...v, parentName: e.target.value }))}
                onKeyDown={handleEnter}
                autoFocus
              />
              <p className={`hf-error${errors.parentName ? ' show' : ''}`}>Please enter your name.</p>
            </div>
            <div className="hf-field">
              <label htmlFor="grade">Child&rsquo;s grade</label>
              <select
                id="grade"
                value={values.grade}
                aria-invalid={errors.grade ? 'true' : 'false'}
                onChange={(e) => setValues((v) => ({ ...v, grade: e.target.value }))}
                onKeyDown={handleEnter}
              >
                <option value="" disabled>Select standard</option>
                {GRADE_OPTIONS.map((g) => (
                  <option key={g} value={g}>{ordinal(g)} Std</option>
                ))}
              </select>
              <p className={`hf-error${errors.grade ? ' show' : ''}`}>Please select your child's grade.</p>
            </div>
            <button type="button" className="btn btn-primary wizard-solo-btn" onClick={goNext}>Continue →</button>
          </div>
        )}

        {step === 2 && (
          <div className="wizard-panel" key="step2">
            <h2 className="wizard-question">What do they need help with?</h2>
            <p className="wizard-hint">Pick one or more subjects</p>
            <div className="wizard-subject-grid">
              {SUBJECTS.map((s) => (
                <label className={`wizard-subject-tile${values.subjects.includes(s) ? ' checked' : ''}`} key={s}>
                  <input type="checkbox" checked={values.subjects.includes(s)} onChange={() => toggleSubject(s)} />
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
            <h2 className="wizard-question">Almost done! Where should we reach you?</h2>
            <div className="hf-field">
              <label htmlFor="phone">WhatsApp number <span className="hf-hint">(10 digits)</span></label>
              <div className="hf-phone-row">
                <span className="hf-phone-prefix" aria-hidden="true">+91</span>
                <input
                  type="tel"
                  id="phone"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="99725 77828"
                  value={values.phone}
                  aria-invalid={errors.phone ? 'true' : 'false'}
                  onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
                  autoFocus
                />
              </div>
              <p className={`hf-error${errors.phone ? ' show' : ''}`}>Please enter a valid 10-digit Indian mobile number.</p>
            </div>

            <div className="wizard-actions">
              <button type="button" className="btn btn-ghost wizard-back-btn" onClick={goBack}>← Back</button>
              <button type="submit" className="btn btn-primary wizard-next-btn" disabled={submitting}>
                {submitting ? 'Registering…' : 'Register for free demo'}
              </button>
            </div>
            <p className="hf-fineprint">By registering you agree to our <Link to="/privacy.html">Privacy Policy</Link>.</p>
            {statusMsg && <div className="hf-status show" role="alert">{statusMsg}</div>}
          </div>
        )}

        <div className="hf-honeypot" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
          />
        </div>
      </form>
    </div>
  );
}
