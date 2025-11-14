import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { ChartContext, Message } from '../domain/interpretation.entities';
import { env } from '@/backend/core/config/env';

function createSystemMessage(context: ChartContext): string {
  return `You are an expert astrologer with deep knowledge of natal chart interpretation. 
You have access to the following chart data:

Planets:
${context.planets.map((p) => `- ${p.name} in ${p.sign} (${p.position}°) in House ${p.house}`).join('\n')}

Aspects:
${context.aspects.map((a) => `- ${a.planet1} ${a.type} ${a.planet2} (${a.angle.toFixed(2)}°)`).join('\n')}

Houses:
- Ascendant: ${context.houses.ascendant}°
- Midheaven: ${context.houses.midheaven}°

Provide insightful, personalized interpretations based on this chart data. Focus on:
1. The significance of planetary positions in signs and houses
2. The meaning of aspects between planets
3. The overall themes and patterns in the chart
4. Practical advice based on the chart's indications

Keep responses clear, informative, and supportive. Maintain continuity with previous responses and build upon the ongoing conversation.`;
}

export async function* interpretChart(
  message: string,
  context: ChartContext,
  chatHistory: Message[] = [],
): AsyncGenerator<string, void, unknown> {
  if (!message || !message.trim()) {
    throw new Error('Message is required');
  }
  if (!context || !context.planets || context.planets.length === 0) {
    throw new Error('Context with planets is required');
  }

  const systemMessage = createSystemMessage(context);

  const formattedMessages: Message[] = [
    { role: 'system', content: systemMessage },
    ...chatHistory.slice(-10), // Keep last 10 messages for context
    { role: 'user', content: message },
  ];

  // Ensure API key is set
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;

  const { textStream } = streamText({
    model: openai('gpt-4o-mini'),
    messages: formattedMessages,
  });

  for await (const chunk of textStream) {
    yield chunk;
  }
}
