import { z } from 'zod';
import { nameField, phoneField, subjectsField, REGISTRATION_STATUSES } from './shared.js';

// Mirrors isValidRegistration() in firestore.rules.
export const registrationCreateSchema = z.object({
  parentName: nameField(80),
  phone: phoneField,
  grade: z.coerce.number().int().min(1).max(10),
  subjects: subjectsField,
  source: z.string().max(40).optional(),
  page: z.string().max(200).optional(),
});

export const registrationUpdateSchema = z
  .object({
    status: z.enum(REGISTRATION_STATUSES).optional(),
    notes: z.string().max(2000).optional(),
  })
  .strict()
  .refine((v) => v.status !== undefined || v.notes !== undefined, {
    message: 'Provide status and/or notes',
  });
