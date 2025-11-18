// src/shared/components/astro-chart/utils/zodiac/libra.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderLibraIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'libra-gradient',
    gradientCoords: {
      x1: '0',
      y1: '48.5513',
      x2: '97.1029',
      y2: '48.5513',
    },
    stops: [
      { offset: '0', color: '#6C34BA' },
      { offset: '0.7676', color: '#3D1E69' },
    ],
    // center/radius/targetRadius/glyphScaleFactor use defaults
  });

  const strokeWidth = 4.7424;

  // Bottom baseline
  glyphGroup
    .append('path')
    .attr('d', 'M16.894 68.924C21.196 69.053 25.498 69.235 29.794 69.49H32.544H73.17')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');

  // Libra arch + lower curve
  glyphGroup
    .append('path')
    .attr(
      'd',
      'M80.209 50.236C71.002 51.123 61.88 52.884 53.005 55.487C54.641 53.069 56.278 50.651 57.914 48.233C60.509 44.398 63.227 39.837 61.833 35.42C61.215 33.461 59.828 31.816 58.207 30.555C51.98 25.717 41.906 27.001 37.091 33.246C32.276 39.491 33.599 49.56 39.862 54.351C32.867 51.449 24.899 50.957 17.6 52.975',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');
}
