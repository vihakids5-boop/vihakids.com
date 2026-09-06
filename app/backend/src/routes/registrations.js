import { Router } from 'express';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { publicCreateLimiter } from '../middleware/rateLimit.js';
import { registrationCreateSchema, registrationUpdateSchema } from '../validation/registrationSchema.js';
import {
  createRegistration,
  listRegistrations,
  updateRegistration,
  deleteRegistration,
} from '../services/registrationsService.js';

export const registrationsRouter = Router();

// Public: anyone can submit a registration (mirrors "allow create" in rules).
registrationsRouter.post('/', publicCreateLimiter, async (req, res, next) => {
  try {
    // Honeypot: bots that fill this hidden field get a fake success and
    // nothing is written — checked server-side since this endpoint is now
    // directly callable without executing any page JS.
    if (req.body && typeof req.body.website === 'string' && req.body.website.trim()) {
      return res.status(201).json({ id: 'ok' });
    }

    const data = registrationCreateSchema.parse(req.body);
    const id = await createRegistration(data);
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
});

registrationsRouter.get('/', requireAdmin, async (req, res, next) => {
  try {
    res.json(await listRegistrations());
  } catch (err) {
    next(err);
  }
});

registrationsRouter.patch('/:id', requireAdmin, async (req, res, next) => {
  try {
    const patch = registrationUpdateSchema.parse(req.body);
    res.json(await updateRegistration(req.params.id, patch));
  } catch (err) {
    next(err);
  }
});

registrationsRouter.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    await deleteRegistration(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
