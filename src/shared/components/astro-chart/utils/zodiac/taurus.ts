// src/shared/components/astro-chart/utils/zodiac/taurus.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderTaurusIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'taurus-gradient',
    gradientCoords: {
      x1: '5.7949',
      y1: '81.0045',
      x2: '130.897',
      y2: '-13.9522',
    },
    stops: [
      { offset: '0.1561', color: '#48A791' },
      { offset: '1', color: '#3C6978' },
    ],
    // same circle normalization & glyphScaleFactor as Aries
  });

  // Main Taurus glyph: big loop + horns (the large stroked path)
  glyphGroup
    .append('path')
    .attr(
      'd',
      'M24.635 19.671C23.974 29.807 36.033 36.176 41.775 37.237C47.517 38.298 53.601 37.849 59.004 40.063C63.983 42.103 67.975 46.42 69.622 51.542C71.269 56.664 71.404 63.809 68.548 68.369C66.425 71.757 62.695 78.124 50.163 79.185C37.37 80.268 29.918 72.544 27.327 66.689C24.736 60.834 25.349 53.534 29.346 48.532C32.784 44.229 37.471 40.997 42.777 39.521C48.083 38.045 55.172 37.101 60.279 35.039C71.449 30.528 72.018 25.221 71.966 19.306',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 6.4517)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');
}
