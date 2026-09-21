import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { healthRouter } from './routes/health.js';
import { registrationsRouter } from './routes/registrations.js';
import { teacherApplicationsRouter } from './routes/teacherApplications.js';
import { chatRouter } from './routes/chat.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim());

  // maxAge lets the browser reuse a preflight result for 2 hours (Chrome's
  // cap) instead of sending an extra OPTIONS round trip before every admin
  // request and every 25-second admin refresh.
  app.use(cors({ origin: allowedOrigins, maxAge: 7200 }));
  app.use(express.json());
  if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

  app.use('/api/health', healthRouter);
  app.use('/api/registrations', registrationsRouter);
  app.use('/api/teacher-applications', teacherApplicationsRouter);
  app.use('/api/chat', chatRouter);

  app.use(errorHandler);

  return app;
}
