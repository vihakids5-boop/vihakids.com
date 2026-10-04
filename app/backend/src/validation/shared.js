import { z } from 'zod';

export const SUBJECTS = ['English', 'Hindi', 'Math', 'Science', 'Kannada'];
export const GRADE_BANDS = ['1-5', '6-8', '9-10'];
export const EXPERIENCE_BANDS = ['0-1', '1-3', '3-5', '5+'];

export const REGISTRATION_STATUSES = ['new', 'contacted', 'demo', 'enrolled', 'closed'];
export const TEACHER_STATUSES = ['new', 'contacted', 'interviewed', 'hired', 'rejected'];

// Phone numbers, stored in international form (+<country code><number>).
//
// A plain 10-digit number is an Indian mobile and gets +91, exactly as before
// — every older form still sends that. A number that starts with "+" must use
// one of the country codes below: India plus the four countries we have
// tuition pages for (USA, UAE, UK, Singapore). Anything else is rejected, so
// the field cannot be used to store arbitrary text.
//
// The national-number patterns are deliberately loose (length and first digit
// only) — strict enough to catch a mistyped number, not a carrier database.
export const PHONE_COUNTRIES = {
  '+91': /^[6-9][0-9]{9}$/, // India
  '+1': /^[2-9][0-9]{9}$/, // USA
  '+971': /^5[0-9]{8}$/, // UAE mobiles
  '+44': /^7[0-9]{9}$/, // UK mobiles
  '+65': /^[689][0-9]{7}$/, // Singapore
};

export function normalizePhone(value) {
  const raw = String(value ?? '').trim();
  if (!raw.startsWith('+')) {
    const digits = raw.replace(/[^0-9]/g, '');
    return PHONE_COUNTRIES['+91'].test(digits) ? `+91${digits}` : null;
  }
  const digits = raw.replace(/[^0-9]/g, '');
  // Longest code first, so +971 is not mistaken for something starting "+9".
  const codes = Object.keys(PHONE_COUNTRIES).sort((x, y) => y.length - x.length);
  for (const code of codes) {
    const cc = code.slice(1);
    if (!digits.startsWith(cc)) continue;
    // People often keep the trunk "0" (07911… in the UK, 050… in the UAE).
    const national = digits.slice(cc.length).replace(/^0+/, '');
    if (PHONE_COUNTRIES[code].test(national)) return `${code}${national}`;
  }
  return null;
}

export const phoneField = z
  .preprocess((v) => normalizePhone(v) ?? '', z.string().min(1, 'Enter a valid mobile number for India, USA, UAE, UK or Singapore'));

export const nameField = (max) =>
  z.preprocess(
    (v) => String(v ?? '').trim().replace(/\s+/g, ' '),
    z.string().min(2, 'Too short').max(max, 'Too long')
  );

// Optional free-text fields that today's forms silently truncate to a max
// length rather than rejecting (qualification/message) — mirrored here so
// direct API calls behave the same as the browser forms.
export const optionalTruncated = (max) =>
  z.preprocess((v) => {
    const s = typeof v === 'string' ? v.trim() : '';
    return s ? s.slice(0, max) : undefined;
  }, z.string().max(max).optional());

export const subjectsField = z
  .array(z.enum(SUBJECTS))
  .min(1, 'Select at least one subject')
  .max(SUBJECTS.length);
