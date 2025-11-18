// src/shared/components/astro-chart/utils/zodiac/leo.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderLeoIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'leo-gradient',
    gradientCoords: {
      x1: '-0.0003',
      y1: '48.5513',
      x2: '97.1026',
      y2: '48.5513',
    },
    stops: [
      { offset: '0', color: '#ED9200' },
      { offset: '1', color: '#DE5014' },
    ],
    // center/radius/targetRadius/glyphScaleFactor use defaults
  });

  const strokeWidth = 4.7424;

  // Main Leo glyph
  glyphGroup
    .append('path')
    .attr(
      'd',
      'M45.744 53.276C41.97 46.829 34.367 46.982 30.177 50.288C25.987 53.594 25.366 61.045 29.392 64.55C30.816 65.79 34.254 68.347 40.555 66.955C44.827 66.011 46.57 61.906 46.563 57.532C46.555 53.157 44.533 49.065 42.472 45.206C40.411 41.347 38.218 37.391 37.822 33.034C37.317 27.489 40.143 21.682 45.003 18.965C49.863 16.248 56.52 17 60.413 20.981C64.22 24.873 64.966 30.927 63.988 36.283C63.01 41.639 60.57 46.597 58.755 51.731C57.569 55.086 56.645 58.534 55.994 62.033C55.376 65.355 55.011 68.815 55.855 72.087C56.699 75.359 58.96 78.432 62.183 79.448C65.406 80.464 69.465 78.821 70.422 75.58',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');
}
