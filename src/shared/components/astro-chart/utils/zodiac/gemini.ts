// src/shared/components/astro-chart/utils/zodiac/gemini.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderGeminiIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'gemini-gradient',
    gradientCoords: {
      x1: '0',
      y1: '48.5509',
      x2: '97.1029',
      y2: '48.5509',
    },
    stops: [
      { offset: '0', color: '#6C34BA' },
      { offset: '0.7676', color: '#3D1E69' },
    ],
    // center/radius/targetRadius/glyphScaleFactor use defaults
  });

  const strokeWidth = 4.7424;

  // Top horizontal bar
  glyphGroup
    .append('path')
    .attr('d', 'M23.682 29.162H73.294')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');

  // Bottom horizontal bar
  glyphGroup
    .append('path')
    .attr('d', 'M23.682 68.598H73.294')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');

  // Left vertical bar
  glyphGroup
    .append('path')
    .attr('d', 'M40.392 31L37.743 67.498')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');

  // Right vertical bar
  glyphGroup
    .append('path')
    .attr('d', 'M56.875 31L54.226 67.498')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');
}
