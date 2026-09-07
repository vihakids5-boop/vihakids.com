import { Router } from 'express';
import { ZodError } from 'zod';
import { chatLimiter } from '../middleware/rateLimit.js';
import { chatRequestSchema } from '../validation/chatSchema.js';
import { registrationCreateSchema } from '../validation/registrationSchema.js';
import { createRegistration } from '../services/registrationsService.js';
import { CHAT_SYSTEM_PROMPT } from '../config/chatSystemPrompt.js';
import { CHAT_TOOLS } from '../config/chatTools.js';
import { ApiError } from '../middleware/errorHandler.js';

export const chatRouter = Router();

const MODEL = 'claude-haiku-4-5-20251001';
const FALLBACK_MESSAGE =
  "Sorry, I'm having trouble replying right now. You can message us directly on WhatsApp at +91 99725 77828.";
// Bounds how many tool-use round trips one incoming chat message can trigger
// (a single registration call resolves in one round trip; this just guards
// against the model chaining unexpectedly many calls).
const MAX_TOOL_ROUNDS = 3;

async function callClaude(apiKey, messages) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 500,
      system: CHAT_SYSTEM_PROMPT,
      tools: CHAT_TOOLS,
      messages,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Anthropic API error:', response.status, detail); // eslint-disable-line no-console
    throw new ApiError(502, FALLBACK_MESSAGE);
  }

  return response.json();
}

// Runs the create_registration tool: validates with the exact same schema
// the public /api/registrations endpoint uses, then writes via the same
// service, so chatbot-created leads behave identically to form submissions.
async function runCreateRegistration(input) {
  try {
    const data = registrationCreateSchema.parse({ ...input, source: 'chatbot', page: 'chatbot' });
    const id = await createRegistration(data);
    return { ok: true, id };
  } catch (err) {
    if (err instanceof ZodError) {
      const detail = err.issues.map((i) => `${i.path.join('.') || 'value'}: ${i.message}`).join('; ');
      return { ok: false, error: detail };
    }
    throw err;
  }
}

chatRouter.post('/', chatLimiter, async (req, res, next) => {
  try {
    const { messages } = chatRequestSchema.parse(req.body);

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new ApiError(503, FALLBACK_MESSAGE);
    }

    const conversation = [...messages];
    let registrationCreated = false;
    let reply = null;

    for (let round = 0; round < MAX_TOOL_ROUNDS; round += 1) {
      const data = await callClaude(apiKey, conversation);
      const toolUses = (data.content || []).filter((block) => block.type === 'tool_use');

      if (toolUses.length === 0) {
        reply = data.content?.find((block) => block.type === 'text')?.text || FALLBACK_MESSAGE;
        break;
      }

      conversation.push({ role: 'assistant', content: data.content });

      const toolResults = [];
      for (const toolUse of toolUses) {
        if (toolUse.name === 'create_registration') {
          const result = await runCreateRegistration(toolUse.input);
          if (result.ok) registrationCreated = true;
          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: result.ok
              ? `Registration created successfully (id: ${result.id}).`
              : `Registration failed validation: ${result.error}`,
            is_error: !result.ok,
          });
        } else {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: `Unknown tool "${toolUse.name}"`,
            is_error: true,
          });
        }
      }
      conversation.push({ role: 'user', content: toolResults });
    }

    res.json({ reply: reply || FALLBACK_MESSAGE, registrationCreated });
  } catch (err) {
    next(err);
  }
});
