// src/shared/components/astro-chart/utils/zodiac/cancer.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderCancerIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'cancer-gradient',
    gradientCoords: {
      x1: '11.175',
      y1: '83.0877',
      x2: '110.31',
      y2: '-8.51759',
    },
    stops: [
      { offset: '0.0846', color: '#3D9AFF' },
      { offset: '1', color: '#2C4FBD' },
    ],
    // center/radius/targetRadius/glyphScaleFactor use defaults
  });

  const strokeWidth = 4.7424;

  // Upper Cancer curve
  glyphGroup
    .append('path')
    .attr(
      'd',
      'M63.287 36.429C56.633 28.611 46.128 24.241 35.893 25.033C31.714 25.356 27.331 26.662 24.674 29.905C22.035 33.127 21.622 37.842 23.124 41.727C24.626 45.612 27.832 48.683 31.525 50.609C34.995 52.418 39.316 53.257 42.778 51.433C46.235 49.611 48.027 45.349 47.457 41.483C46.887 37.617 44.242 34.245 40.898 32.222C38.42 30.722 35.544 29.885 32.648 29.821',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');

  // Lower Cancer curve
  glyphGroup
    .append('path')
    .attr(
      'd',
      'M36.051 61.334C40.689 64.59 45.465 67.778 50.812 69.655C56.159 71.533 62.203 71.997 67.43 69.806C70.025 68.718 72.42 66.919 73.693 64.41C74.497 62.826 74.821 61.03 74.842 59.254C74.905 53.694 71.865 48.2 67.12 45.301C64.28 43.566 60.339 42.855 57.779 44.983C56.117 46.365 55.442 48.627 55.311 50.785C54.834 58.669 61.402 66.317 69.268 67.037',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');
}
