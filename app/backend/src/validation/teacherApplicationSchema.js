import { z } from 'zod';
import {
  nameField,
  phoneField,
  subjectsField,
  optionalTruncated,
  GRADE_BANDS,
  EXPERIENCE_BANDS,
  TEACHER_STATUSES,
} from './shared.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Mirrors isValidTeacherApplication() in firestore.rules, plus a light
// format check on email (the rules only check length; the client already
// checked format, so we keep that check here now that the client can be
// bypassed).
export const teacherApplicationCreateSchema = z.object({
  fullName: nameField(80),
  phone: phoneField,
  subjects: subjectsField,
  grades: z.array(z.enum(GRADE_BANDS)).min(1).max(3),
  experience: z.enum(EXPERIENCE_BANDS),
  email: z.preprocess(
    (v) => (typeof v === 'string' && v.trim() ? v.trim() : undefined),
    z.string().max(100).regex(EMAIL_RE, 'Enter a valid email').optional()
  ),
  qualification: optionalTruncated(120),
  message: optionalTruncated(500),
  source: z.string().max(40).optional(),
  page: z.string().max(200).optional(),
});

export const teacherApplicationUpdateSchema = z
  .object({
    status: z.enum(TEACHER_STATUSES).optional(),
    notes: z.string().max(2000).optional(),
  })
  .strict()
  .refine((v) => v.status !== undefined || v.notes !== undefined, {
    message: 'Provide status and/or notes',
  });
