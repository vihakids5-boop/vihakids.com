// Anthropic tool-use schema for letting the chatbot register a child for a
// free demo class directly in the conversation, instead of only pointing
// people at the website form or WhatsApp.
export const CHAT_TOOLS = [
  {
    name: 'create_registration',
    description:
      "Register a child for a free Vihakids demo class. Only call this after you have collected all four fields below AND the parent has explicitly confirmed you should go ahead - never call it mid-conversation on a guess.",
    input_schema: {
      type: 'object',
      properties: {
        parentName: {
          type: 'string',
          description: "Parent or guardian's full name",
        },
        phone: {
          type: 'string',
          description: '10-digit Indian mobile/WhatsApp number, digits only (no +91, spaces, or dashes)',
        },
        grade: {
          type: 'integer',
          description: "Child's grade/standard, from 1 to 10",
        },
        subjects: {
          type: 'array',
          items: { type: 'string', enum: ['English', 'Hindi', 'Math', 'Science', 'Kannada'] },
          description: 'One or more subjects the child needs help with',
        },
      },
      required: ['parentName', 'phone', 'grade', 'subjects'],
    },
  },
];
