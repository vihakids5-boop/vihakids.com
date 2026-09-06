import { Router } from 'express';
import { requireAdmin } from '../middleware/requireAdmin.js';
import { publicCreateLimiter } from '../middleware/rateLimit.js';
import {
  teacherApplicationCreateSchema,
  teacherApplicationUpdateSchema,
} from '../validation/teacherApplicationSchema.js';
import {
  createTeacherApplication,
  listTeacherApplications,
  updateTeacherApplication,
  deleteTeacherApplication,
} from '../services/teacherApplicationsService.js';

export const teacherApplicationsRouter = Router();

teacherApplicationsRouter.post('/', publicCreateLimiter, async (req, res, next) => {
  try {
    if (req.body && typeof req.body.website === 'string' && req.body.website.trim()) {
      return res.status(201).json({ id: 'ok' });
    }

    const data = teacherApplicationCreateSchema.parse(req.body);
    const id = await createTeacherApplication(data);
    res.status(201).json({ id });
  } catch (err) {
    next(err);
  }
});

teacherApplicationsRouter.get('/', requireAdmin, async (req, res, next) => {
  try {
    res.json(await listTeacherApplications());
  } catch (err) {
    next(err);
  }
});

teacherApplicationsRouter.patch('/:id', requireAdmin, async (req, res, next) => {
  try {
    const patch = teacherApplicationUpdateSchema.parse(req.body);
    res.json(await updateTeacherApplication(req.params.id, patch));
  } catch (err) {
    next(err);
  }
});

teacherApplicationsRouter.delete('/:id', requireAdmin, async (req, res, next) => {
  try {
    await deleteTeacherApplication(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
