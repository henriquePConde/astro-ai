// src/shared/components/astro-chart/utils/zodiac/scorpio.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderScorpioIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'scorpio-gradient',
    gradientCoords: {
      x1: '-0.0009',
      y1: '48.5513',
      x2: '97.102',
      y2: '48.5513',
    },
    stops: [
      { offset: '0.0846', color: '#3D9AFF' },
      { offset: '1', color: '#2C4FBD' },
    ],
    // center/radius/targetRadius/glyphScaleFactor use defaults
  });

  const strokeWidth = 4.7424;

  // Main Scorpio vertical/glyph flow
  glyphGroup
    .append('path')
    .attr(
      'd',
      'M16.017 39.792C15.893 36.803 17.128 33.784 19.311 31.739C19.906 31.182 20.598 30.68 21.401 30.539C22.703 30.309 24.017 31.103 24.778 32.184C25.539 33.265 25.855 34.59 26.129 35.883C27.49 42.309 28.194 48.875 28.228 55.444C28.139 50.835 28.054 46.185 28.936 41.661C29.818 37.136 31.755 32.686 35.15 29.568C36.518 28.311 38.681 27.295 40.128 28.46C40.635 28.868 40.937 29.472 41.2 30.068C44.137 36.712 44.007 44.251 43.825 51.512C42.848 43.994 43.78 35.627 49.028 30.155C49.806 29.344 50.751 28.574 51.873 28.493C53.484 28.376 54.838 29.71 55.651 31.106C58.441 35.894 57.537 41.853 57.605 47.394C57.654 51.395 58.26 55.39 59.4 59.226C59.648 60.06 59.94 60.919 60.55 61.541C61.502 62.512 63.054 62.68 64.357 62.291C65.659 61.902 66.766 61.047 67.811 60.177C73.613 55.344 78.549 49.474 82.314 42.928',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');

  // Tail / flourish segment
  glyphGroup
    .append('path')
    .attr(
      'd',
      'M70.495 42.669C73.334 43.605 76.439 43.407 79.348 42.72C80.602 42.424 81.853 42.031 82.931 41.325C83.617 40.876 84.222 40.305 84.71 39.648C82.022 45.018 81.6 51.478 83.657 57.119',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');
}
