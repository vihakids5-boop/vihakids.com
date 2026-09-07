import { z } from 'zod';

export const SUBJECTS = ['English', 'Hindi', 'Math', 'Science', 'Kannada'];
export const GRADE_BANDS = ['1-5', '6-8', '9-10'];
export const EXPERIENCE_BANDS = ['0-1', '1-3', '3-5', '5+'];

export const REGISTRATION_STATUSES = ['new', 'contacted', 'demo', 'enrolled', 'closed'];
export const TEACHER_STATUSES = ['new', 'contacted', 'interviewed', 'hired', 'rejected'];

// Same rule register.html/teach.html apply client-side, then stored with a
// +91 prefix to match firestore.rules' ^\+91[6-9][0-9]{9}$ shape.
export const phoneField = z
  .preprocess((v) => String(v ?? '').replace(/\D/g, ''), z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'))
  .transform((digits) => `+91${digits}`);

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
