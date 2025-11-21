'use client';

export const ASTRO_INTERPRETER_CONFIG = {
  copy: {
    suggestions: {
      title: 'Suggested questions',
      subtitle:
        'Click a question to prefill the chat. You can edit it before sending to tailor it to your situation.',
    },
    tooltipLimitReached: (timeRemaining: string) =>
      `You have reached the limit of messages. Try again in ${timeRemaining}!`,
  },
  suggestedQuestions: [
    'What are the main strengths and challenges shown in my birth chart?',
    'How do my Sun, Moon, and Rising signs work together in my personality?',
    'Which themes in my chart are most important for my life direction and purpose?',
    'What does my chart suggest about love, relationships, and partnership patterns?',
    'What do my placements say about career, money, and feeling successful?',
    'Which aspects in my chart are the most significant and why?',
    'How does my Saturn placement describe my long-term lessons and responsibilities?',
    'What does my chart reveal about my emotional needs and attachment style?',
    'Where in my chart can I find clues about creativity, hobbies, and self-expression?',
    'Which talents or potentials in my chart might I be underusing?',
    'How might my chart influence how I experience major life transitions or changes?',
    'What does my chart say about areas where I am meant to grow outside my comfort zone?',
  ],
} as const;
