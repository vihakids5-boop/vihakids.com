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

// Each chat message is a billed LLM call, so this caps cost/abuse per visitor
// while still allowing a real back-and-forth conversation.
export const chatLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: { message: "You're sending messages too quickly. Please wait a bit and try again." } },
});
