// src/shared/components/astro-chart/utils/zodiac/pisces.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderPiscesIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'pisces-gradient',
    gradientCoords: {
      x1: '-0.0009',
      y1: '48.5506',
      x2: '97.102',
      y2: '48.5506',
    },
    stops: [
      { offset: '0.0846', color: '#3D9AFF' },
      { offset: '1', color: '#2C4FBD' },
    ],
    // use default center/radius/targetRadius/glyphScaleFactor
  });

  const strokeWidth = 4.7424;

  // Left arc
  glyphGroup
    .append('path')
    .attr(
      'd',
      [
        'M33.74 22.454',
        'C40.077 24.599 45.439 39.606 46.055 46.444',
        'C47.654 64.197 38.659 71.477 32.569 74.647',
      ].join(''),
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');

  // Right arc
  glyphGroup
    .append('path')
    .attr(
      'd',
      [
        'M66.173 23.204',
        'C58.01 28.094 53.97 38.241 54.57 47.738',
        'C55.17 57.235 59.772 66.086 65.613 73.598',
      ].join(''),
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');

  // Center bar
  glyphGroup
    .append('path')
    .attr('d', ['M30.928 49.759', 'C41.682 43.791 55.736 44.333 65.997 51.113'].join(''))
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');
}
