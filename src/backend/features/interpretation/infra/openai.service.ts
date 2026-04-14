import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import type { ChartContext, Message } from '../domain/interpretation.entities';
import { env } from '@/backend/core/config/env';

function createSystemMessage(context: ChartContext): string {
  const houseDetailsLines =
    context.houses.details && Object.keys(context.houses.details).length > 0
      ? Object.entries(context.houses.details)
          .map(([house, d]) => {
            const degree = d.cuspDegree.toFixed(2);
            const within = d.signsWithin.length ? d.signsWithin.join(', ') : '—';
            return `- House ${house} cusp: ${degree}° in ${d.cuspSign}; signs within: ${within}`;
          })
          .join('\n')
      : '';

  const houseRulersLines =
    context.houses.rulers && Object.keys(context.houses.rulers).length > 0
      ? Object.entries(context.houses.rulers)
          .map(([house, sign]) => `- House ${house} is ruled by ${sign} (cusp sign)`)
          .join('\n')
      : '';

  const intercepted =
    context.houses.interceptedSigns && context.houses.interceptedSigns.length > 0
      ? context.houses.interceptedSigns.join(', ')
      : '';

  return `You are an expert astrologer with deep knowledge of natal chart interpretation. 
You have access to the following chart data:

Planets:
${context.planets.map((p) => `- ${p.name} in ${p.sign} (${p.position}°) in House ${p.house}`).join('\n')}

Aspects:
${context.aspects.map((a) => `- ${a.planet1} ${a.type} ${a.planet2} (${a.angle.toFixed(2)}°)`).join('\n')}

Houses:
- Ascendant: ${context.houses.ascendant}°
- Midheaven: ${context.houses.midheaven}°
${houseDetailsLines ? `\nHouse cusps and signs:\n${houseDetailsLines}\n` : ''}
${houseRulersLines ? `\nHouse rulers (by cusp sign):\n${houseRulersLines}\n` : ''}
${intercepted ? `Intercepted signs in this chart: ${intercepted}\n` : ''}

Provide insightful, personalized interpretations based on this chart data. Focus on:
1. The significance of planetary positions in signs and houses
2. The meaning of aspects between planets
3. The overall themes and patterns in the chart
4. Practical advice based on the chart's indications
5. When the user asks about a specific zodiac sign, always explain using this chart's house cusps (do not assume Aries = 1st, Taurus = 2nd, etc.):
   - Which house or houses that sign rules or occupies in this chart, based on which house cusps and house spans contain that sign (including intercepted signs)
   - Where that sign's ruler planet is placed (its sign and house in this chart) and what that means for the ruled house or houses
   - How any aspects to the ruler modify the expression of that sign and its ruled houses in the chart

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

  // Ensure API key is set
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;

  const conversationMessages: Message[] = [
    ...chatHistory.slice(-10), // Keep last 10 messages for context
    { role: 'user', content: message },
  ];

  console.log(
    '[openai.service] calling streamText, messages:',
    JSON.stringify(conversationMessages.map((m) => ({ role: m.role, length: m.content.length }))),
  );

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: systemMessage,
    messages: conversationMessages,
  });

  for await (const part of result.fullStream) {
    console.log('[openai.service] part type:', part.type);
    if (part.type === 'text-delta') {
      yield part.textDelta;
    } else if (part.type === 'error') {
      console.error('[openai.service] stream error part:', part.error);
      throw part.error instanceof Error ? part.error : new Error(String(part.error));
    } else if (part.type === 'finish') {
      console.log('[openai.service] finish — reason:', part.finishReason, '| usage:', part.usage);
    }
  }
}
