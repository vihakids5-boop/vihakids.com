import { ZodError } from 'zod';

export class ApiError extends Error {
  constructor(status, message, fields) {
    super(message);
    this.status = status;
    this.fields = fields;
  }
}

// Centralizes error responses as { error: { message, fields? } }.
export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  if (err instanceof ZodError) {
    const fields = {};
    for (const issue of err.issues) {
      fields[issue.path.join('.') || '_'] = issue.message;
    }
    return res.status(400).json({ error: { message: 'Validation failed', fields } });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({ error: { message: err.message, fields: err.fields } });
  }

  console.error(err); // eslint-disable-line no-console
  res.status(500).json({ error: { message: 'Something went wrong' } });
}
