import { z } from 'zod';

const chatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().trim().min(1).max(1000),
});

// Capped history length + message length bound both cost and abuse, since
// every message is a billed call to the LLM API.
export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1).max(20),
});
