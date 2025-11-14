import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { env } from '@/backend/core/config/env';

const SIGN_NAMES = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

function formatPlanetDescription(planet: any): string {
  const retrograde = planet.isRetrograde ? ' (Retrograde)' : '';
  return `${planet.name} at ${planet.degree.toFixed(2)}° ${SIGN_NAMES[planet.sign]} in house ${planet.house}${retrograde}`;
}

function formatAspects(aspects: any[], relevantPlanets: any[]): string {
  return aspects
    .filter((a) =>
      relevantPlanets.some(
        (p) =>
          p.name.toLowerCase() === a.planet1.toLowerCase() ||
          p.name.toLowerCase() === a.planet2.toLowerCase(),
      ),
    )
    .map((a) => `${a.planet1}-${a.planet2} ${a.type} (${a.angle.toFixed(2)}°, ${a.nature})`)
    .join('\n');
}

function getContextInfo(transformedData: any): string {
  return `Chart Overview:
- Element Balance: ${transformedData.elementalBalance.dominant} dominant (${Object.entries(
    transformedData.elementalBalance.percentages,
  )
    .map(([el, pct]) => `${el}: ${Math.round(pct as number)}%`)
    .join(', ')})
- Modality Balance: ${transformedData.modalityBalance.dominant} dominant (${Object.entries(
    transformedData.modalityBalance.percentages,
  )
    .map(([mod, pct]) => `${mod}: ${Math.round(pct as number)}%`)
    .join(', ')})`;
}

async function* generateGenericSection(
  transformedData: any,
  keyPlanets: string[],
  title: string,
  subsections: string[],
  promptInstructions: string,
) {
  const relevantPlanets = transformedData.planets
    .filter((p: any) => keyPlanets.includes(p.name.toLowerCase()))
    .map((p: any) => ({
      ...p,
      name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
    }));

  const planetsDescription = relevantPlanets.map((p: any) => formatPlanetDescription(p)).join('\n');
  const aspectsDescription = formatAspects(transformedData.aspects, relevantPlanets);

  const prompt = `You are writing the "${title}" section of a birth chart report. Use the data below to create a warm, clear, and emotionally intelligent interpretation.

    🌠 Key Planets:
    ${planetsDescription}

    🔗 Relevant Aspects:
    ${aspectsDescription}

    📊 ${getContextInfo(transformedData)}

    🧭 Subsections:
    ${subsections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

    💡 Instructions:
    ${promptInstructions}

    Write each subsection as a short, clearly titled narrative. Keep the tone friendly, thoughtful, and grounded — like a conversation with a caring guide. Focus on psychological patterns, emotional insight, and practical reflection. Avoid mystical or overly abstract language.`;

  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;

  const { textStream } = streamText({
    model: openai('gpt-4o-mini'),
    messages: [
      {
        role: 'system',
        content:
          'You are a skilled psychological astrologer and empathetic writer. You explain birth chart insights in clear, modern, and emotionally intelligent language. Your tone is warm, encouraging, and down-to-earth — like a trusted mentor.',
      },
      { role: 'user', content: prompt },
    ],
  });

  for await (const chunk of textStream) {
    yield chunk;
  }
}

export async function* generateIntroduction(_: any) {
  const prompt = `Write a friendly, encouraging introduction to a birth chart report. Briefly explain what a birth chart is, why it's meaningful, and set a warm, reflective tone. Emphasize that this report helps the reader understand themselves better — it's not about predicting the future.`;

  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured');
  }

  process.env.OPENAI_API_KEY = env.OPENAI_API_KEY;

  const { textStream } = streamText({
    model: openai('gpt-4o-mini'),
    messages: [
      {
        role: 'system',
        content:
          'You are a friendly, thoughtful writer. Your goal is to make astrology feel approachable and empowering. Use plain language and focus on emotional clarity.',
      },
      { role: 'user', content: prompt },
    ],
  });

  for await (const chunk of textStream) {
    yield chunk;
  }
}

export async function* generatePersonalityAndIdentity(data: any) {
  yield* generateGenericSection(
    data,
    ['sun', 'moon'],
    'Personality and Identity',
    [
      'The Essence of Self: Sun Sign and House',
      'The Inner World: Moon Sign and Emotional Rhythm',
      'The Outer Mask: Ascendant and Personality Expression',
    ],
    "Explain how these placements shape the reader's identity and presence. Use relatable language and avoid jargon. Make the interpretation clear, kind, and psychologically insightful.",
  );
}

export async function* generateEmotionalNeedsAndSecurity(data: any) {
  yield* generateGenericSection(
    data,
    ['moon', 'venus'],
    'Emotional Needs and Security',
    [
      "Emotional Landscape: The Moon's Desires and Fears",
      'Seeking Safety and Connection: Venus and Attachment Patterns',
      'Navigating Vulnerability: Emotional Growth Through Challenges',
    ],
    'Offer practical and emotional insights into how the reader seeks comfort and safety. Highlight growth opportunities with compassion.',
  );
}

export async function* generateCommunicationAndThinking(data: any) {
  yield* generateGenericSection(
    data,
    ['mercury'],
    'Communication and Thinking',
    [
      "Cognitive Style: Mercury's Expression of Thought",
      'Learning and Expression: Strengths and Blocks',
      'Communication in Relationships: Voice and Vulnerability',
    ],
    "Explain the reader's thinking and communication style. Keep the tone positive, relatable, and non-technical.",
  );
}

export async function* generateLoveAndRelationships(data: any) {
  yield* generateGenericSection(
    data,
    ['venus', 'mars', 'moon'],
    'Love and Relationships',
    [
      'Romantic Expression and Emotional Needs',
      'Relationship Patterns and Lessons',
      'Attraction, Desire, and Growth in Intimacy',
    ],
    'Write about how the reader connects emotionally and romantically. Be warm, supportive, and avoid making fixed predictions. Focus on patterns, not outcomes.',
  );
}

export async function* generateDriveAndAmbition(data: any) {
  yield* generateGenericSection(
    data,
    ['sun', 'mars', 'saturn'],
    'Drive and Ambition',
    [
      'Core Motivation: Sun and Saturn in Purpose',
      'Action Patterns: Mars and How You Pursue Goals',
      'Balance of Willpower and Discipline',
    ],
    'Describe how the reader approaches goals and challenges. Keep the focus on self-awareness, balance, and growth.',
  );
}

export async function* generateGrowthAndChallenges(data: any) {
  yield* generateGenericSection(
    data,
    ['jupiter', 'saturn'],
    'Growth and Challenges',
    [
      'Path of Growth: Jupiter and Life Philosophy',
      "Lessons and Responsibility: Saturn's Role in Maturity",
      'Inner Conflicts: Navigating Challenges with Wisdom',
    ],
    'Describe how the reader grows through experience. Highlight potential tensions in the chart and how they can evolve with time.',
  );
}

export async function* generateTransformationAndHealing(data: any) {
  yield* generateGenericSection(
    data,
    ['pluto', 'neptune', 'uranus'],
    'Transformation and Healing',
    [
      'Deep Change: Pluto and Psychological Evolution',
      'Spiritual Insight: Neptune and Inner Knowing',
      'Liberation and Awakening: Uranus and Personal Breakthroughs',
    ],
    'Keep the language gentle, modern, and emotionally intelligent. Focus on meaningful changes and internal evolution — not dramatic spiritual claims.',
  );
}

export async function* generateLifeThemesAndGuidance(data: any) {
  yield* generateGenericSection(
    data,
    [],
    'Life Themes and Guidance',
    [
      'Elemental and Modal Balance: The Nature of Your Energy',
      'Recurring Patterns and Archetypal Lessons',
      'Empowering Practices for Growth and Alignment',
    ],
    'Summarize key psychological patterns in the chart. Offer insight and encouragement in clear, grounded language.',
  );
}
