// src/shared/components/astro-chart/utils/zodiac/capricorn.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderCapricornIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'capricorn-gradient',
    gradientCoords: {
      x1: '-0.0001',
      y1: '48.5507',
      x2: '97.1028',
      y2: '48.5507',
    },
    stops: [
      { offset: '0.1561', color: '#48A791' },
      { offset: '1', color: '#3C6978' },
    ],
    // center/radius/targetRadius/glyphScaleFactor use defaults
  });

  const strokeWidth = 4.7424;

  // Main Capricorn glyph path
  glyphGroup
    .append('path')
    .attr(
      'd',
      [
        'M17.601 37.196C17.597 31.949 18.762 26.271 22.718 22.824',
        'C23.418 22.214 24.258 21.666 25.187 21.671',
        'C27.129 21.681 28.184 23.901 28.733 25.764',
        'C31.259 34.331 32.976 43.137 33.856 52.025',
        'C32.532 39.945 35.68 26.669 44.957 18.819',
        'C46.315 17.67 48.015 16.598 49.757 16.959',
        'C51.434 17.306 52.569 18.878 53.263 20.444',
        'C55.637 25.802 54.732 32.018 53.213 37.679',
        'C51.694 43.339 49.589 48.973 49.679 54.833',
        'C49.71 56.882 50.096 59.092 51.58 60.504',
        'C52.514 61.393 53.776 61.853 55.033 62.142',
        'C60.328 63.358 66.189 61.737 70.106 57.972',
        'C74.023 54.207 75.876 48.415 74.87 43.076',
        'C74.558 41.42 73.763 39.587 72.136 39.148',
        'C71.333 38.931 61.622 37.432 60.68 51.743',
        'C60.273 57.937 62.218 62.617 62.542 66.355',
        'C62.866 70.094 62.414 74.04 60.38 77.194',
        'C58.346 80.348 54.473 82.49 50.806 81.695',
      ].join(''),
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');
}
