/**
 * Domain entities and business rules for the interpretation feature.
 */

export type ChartPlanet = {
  name: string;
  sign: string;
  house: number;
  position: string;
};

export type ChartAspect = {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
};

export type ChartContext = {
  planets: ChartPlanet[];
  aspects: ChartAspect[];
  houses: {
    ascendant: number;
    midheaven: number;
  };
};

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

/**
 * Validates that a message is not empty.
 */
export function isValidMessage(message: string): boolean {
  return message.trim().length > 0;
}

/**
 * Validates that chart context has required data.
 */
export function isValidChartContext(context: ChartContext): boolean {
  return (
    Array.isArray(context.planets) &&
    context.planets.length > 0 &&
    Array.isArray(context.aspects) &&
    context.houses &&
    typeof context.houses.ascendant === 'number' &&
    typeof context.houses.midheaven === 'number'
  );
}
