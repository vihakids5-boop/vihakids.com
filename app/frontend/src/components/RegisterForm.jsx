import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../lib/api';
import { trackEvent } from '../lib/gtag';
import { GRADE_OPTIONS, SUBJECTS, ordinal } from '../constants/options';

const WHATSAPP_NUMBER = '919972577828';

function initialState() {
  return { parentName: '', phone: '', grade: '', subjects: [], website: '' };
}

/**
 * variant="hero"   — embedded card in the homepage hero (id prefix hf-, as on index.html)
 * variant="page"   — standalone /register page (mirrors register.html)
 */
export default function RegisterForm({ variant = 'page' }) {
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

  function validate() {
    const parentName = values.parentName.trim().replace(/\s+/g, ' ');
    const digits = values.phone.replace(/\D/g, '');
    const grade = parseInt(values.grade, 10);

    const next = {};
    if (!(parentName.length >= 2 && parentName.length <= 80)) next.parentName = true;
    if (!/^[6-9]\d{9}$/.test(digits)) next.phone = true;
    if (!(Number.isInteger(grade) && grade >= 1 && grade <= 10)) next.grade = true;
    if (values.subjects.length < 1) next.subjects = true;

    setErrors(next);
    return { ok: Object.keys(next).length === 0, parentName, digits, grade };
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatusMsg('');

    if (values.website.trim()) {
      // Honeypot tripped — pretend success, submit nothing.
      setSuccess(true);
      return;
    }

    const { ok, parentName, digits, grade } = validate();
    if (!ok) return;

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
      trackEvent('generate_lead', { method: variant === 'hero' ? 'hero_register_form' : 'register_form' });
    } catch (err) {
      setStatusMsg(err.message || 'Sorry, something went wrong. Please try again or message us on WhatsApp at +91 99725 77828.');
    } finally {
      setSubmitting(false);
    }
  }

  const eyebrow = variant === 'hero' ? 'Free demo class' : null;
  const title = variant === 'hero' ? 'Register in 30 seconds' : 'Register for a free demo class';

  if (success) {
    return (
      <div className="hf-card">
        <div className="hf-success show">
          <div className="hf-tick" aria-hidden="true">✓</div>
          <h3>You're registered!</h3>
          <p>We'll message you on WhatsApp shortly to fix the demo class.</p>
          <a className="btn btn-primary" href={waLink} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a>
        </div>
      </div>
    );
  }

  return (
    <div className="hf-card">
      {eyebrow && <span className="hf-eyebrow">{eyebrow}</span>}
      <h2 className="hf-title">{title}</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div className="hf-field">
          <label htmlFor="parentName">Parent's name</label>
          <input
            type="text"
            id="parentName"
            maxLength={80}
            placeholder="e.g. Lakshmi Rao"
            value={values.parentName}
            aria-invalid={errors.parentName ? 'true' : 'false'}
            onChange={(e) => setValues((v) => ({ ...v, parentName: e.target.value }))}
          />
          <p className={`hf-error${errors.parentName ? ' show' : ''}`}>Please enter your name.</p>
        </div>

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
            />
          </div>
          <p className={`hf-error${errors.phone ? ' show' : ''}`}>Please enter a valid 10-digit Indian mobile number.</p>
        </div>

        <div className="hf-field">
          <label htmlFor="grade">Child's grade</label>
          <select
            id="grade"
            value={values.grade}
            aria-invalid={errors.grade ? 'true' : 'false'}
            onChange={(e) => setValues((v) => ({ ...v, grade: e.target.value }))}
          >
            <option value="" disabled>Select standard</option>
            {GRADE_OPTIONS.map((g) => (
              <option key={g} value={g}>{ordinal(g)} Std</option>
            ))}
          </select>
          <p className={`hf-error${errors.grade ? ' show' : ''}`}>Please select your child's grade.</p>
        </div>

        <div className="hf-field">
          <fieldset>
            <legend className="hf-legend">Subjects <span className="hf-hint">(pick one or more)</span></legend>
            <div className="hf-chips">
              {SUBJECTS.map((s) => (
                <label className="hf-chip" key={s}>
                  <input type="checkbox" checked={values.subjects.includes(s)} onChange={() => toggleSubject(s)} />
                  <span>{s}</span>
                </label>
              ))}
            </div>
            <p className={`hf-error${errors.subjects ? ' show' : ''}`}>Please pick at least one subject.</p>
          </fieldset>
        </div>

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

        <button type="submit" className="btn btn-primary hf-submit" disabled={submitting}>
          {submitting ? 'Registering…' : 'Register for free demo'}
        </button>
        <p className="hf-fineprint">By registering you agree to our <Link to="/privacy.html">Privacy Policy</Link>.</p>
        {statusMsg && <div className="hf-status show" role="alert">{statusMsg}</div>}
      </form>
    </div>
  );
}
