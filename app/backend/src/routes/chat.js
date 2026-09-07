import { Router } from 'express';
import { chatLimiter } from '../middleware/rateLimit.js';
import { chatRequestSchema } from '../validation/chatSchema.js';
import { CHAT_SYSTEM_PROMPT } from '../config/chatSystemPrompt.js';
import { ApiError } from '../middleware/errorHandler.js';

export const chatRouter = Router();

const FALLBACK_MESSAGE =
  "Sorry, I'm having trouble replying right now. You can message us directly on WhatsApp at +91 99725 77828.";

chatRouter.post('/', chatLimiter, async (req, res, next) => {
  try {
    const { messages } = chatRequestSchema.parse(req.body);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new ApiError(503, FALLBACK_MESSAGE);
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: CHAT_SYSTEM_PROMPT,
        messages,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error('Anthropic API error:', response.status, detail); // eslint-disable-line no-console
      throw new ApiError(502, FALLBACK_MESSAGE);
    }

    const data = await response.json();
    const reply = data.content?.find((block) => block.type === 'text')?.text || FALLBACK_MESSAGE;

    res.json({ reply });
  } catch (err) {
    next(err);
  }
});
