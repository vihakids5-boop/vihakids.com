import rateLimit from 'express-rate-limit';

// Basic abuse throttle on the two public "create" endpoints, now that they
// are plain REST endpoints reachable without executing any page JS.
export const publicCreateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { message: 'Too many submissions. Please try again later.' } },
});
