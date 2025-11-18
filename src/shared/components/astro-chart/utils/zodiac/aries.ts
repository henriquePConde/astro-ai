// src/shared/components/astro-chart/utils/zodiac/aries.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderAriesIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'aries-gradient',
    gradientCoords: {
      x1: '-0.0002',
      y1: '48.5509',
      x2: '97.1028',
      y2: '48.5509',
    },
    stops: [
      { offset: '0', color: '#ED9200' },
      { offset: '1', color: '#DE5014' },
    ],
    // center/radius/targetRadius/glyphScaleFactor use defaults:
    // center=48.551, radius=48.551, targetRadius=10, glyphScaleFactor=1.2
  });

  // Main horns only (no twinkles)
  glyphGroup
    .append('path')
    .attr(
      'd',
      'M29.146 51.932C27.718 52.814 25.845 51.885 24.643 50.714C20.851 47.02 20.062 40.543 23.073 36.19C26.084 31.836 32.657 30.339 37.128 33.174C38.59 34.101 39.79 35.399 40.759 36.834C43.36 40.688 44.284 45.408 44.949 50.01C46.35 59.7 46.862 69.519 46.476 79.303',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 6.4517)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');

  glyphGroup
    .append('path')
    .attr(
      'd',
      'M61.777 52.317C65.171 54.486 70.006 53.295 72.704 50.305C75.402 47.314 76.209 42.987 75.751 38.986C75.571 37.419 75.208 35.85 74.438 34.474C72.318 30.687 67.32 29.125 63.111 30.185C58.902 31.245 49.592 35.687 45.954 54.785',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 6.4517)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');
}
