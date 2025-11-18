// src/shared/components/astro-chart/utils/zodiac/helpers.ts
import * as d3 from 'd3';

export type ZodiacGroup = d3.Selection<SVGGElement, unknown, null, undefined>;

let gradientCounter = 0;
export function createUniqueGradientId(base: string) {
  gradientCounter += 1;
  return `${base}-${gradientCounter}`;
}

// Same circle path used by Aries/Taurus SVGs
export const COIN_CIRCLE_PATH =
  'M48.551 97.102C75.365 97.102 97.102 75.365 97.102 48.551C97.102 21.737 75.365 0 48.551 0C21.737 0 0 21.737 0 48.551C0 75.365 21.737 97.102 48.551 97.102Z';

export interface GradientStop {
  offset: string; // e.g. '0', '0.1561', '1'
  color: string; // e.g. '#ED9200'
}

export interface GradientCoords {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}

export interface CoinOptions {
  center?: number;
  radius?: number;
  targetRadius?: number;
  glyphScaleFactor?: number;
  gradientBaseId: string;
  gradientCoords: GradientCoords;
  stops: GradientStop[];
}

/**
 * Creates a gradient coin:
 *  - background circle with gradient fill
 *  - a separate glyphGroup scaled a bit larger inside the circle
 *
 * Returns the `glyphGroup` to which each sign renderer can append its glyph paths.
 */
export function createGradientCoin(
  root: ZodiacGroup,
  options: CoinOptions,
): { glyphGroup: ZodiacGroup } {
  const {
    center = 48.551,
    radius = 48.551,
    targetRadius = 10,
    glyphScaleFactor = 1.2,
    gradientBaseId,
    gradientCoords,
    stops,
  } = options;

  const scaleNorm = targetRadius / radius;
  const glyphScaleNorm = scaleNorm * glyphScaleFactor;

  // Background circle group (coin)
  const circleGroup = root
    .append('g')
    .attr('class', 'zodiac-coin-bg')
    .attr('transform', `scale(${scaleNorm}) translate(${-center},${-center})`);

  const gradientId = createUniqueGradientId(gradientBaseId);

  const defs = circleGroup.append('defs');
  const lg = defs
    .append('linearGradient')
    .attr('id', gradientId)
    .attr('x1', gradientCoords.x1)
    .attr('y1', gradientCoords.y1)
    .attr('x2', gradientCoords.x2)
    .attr('y2', gradientCoords.y2)
    .attr('gradientUnits', 'userSpaceOnUse');

  stops.forEach((stop) => {
    lg.append('stop').attr('offset', stop.offset).attr('stop-color', stop.color);
  });

  circleGroup.append('path').attr('d', COIN_CIRCLE_PATH).attr('fill', `url(#${gradientId})`);

  // Glyph group (slightly bigger inside the coin)
  const glyphGroup = root
    .append('g')
    .attr('class', 'zodiac-coin-glyph')
    .attr('transform', `scale(${glyphScaleNorm}) translate(${-center},${-center})`);

  return { glyphGroup };
}
