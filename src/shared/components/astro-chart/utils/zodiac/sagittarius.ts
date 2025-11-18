// src/shared/components/astro-chart/utils/zodiac/sagittarius.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderSagittariusIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'sagittarius-gradient',
    gradientCoords: {
      x1: '-0.0003',
      y1: '48.5514',
      x2: '97.1026',
      y2: '48.5514',
    },
    stops: [
      { offset: '0', color: '#ED9200' },
      { offset: '1', color: '#DE5014' },
    ],
    // center/radius/targetRadius/glyphScaleFactor use defaults
  });

  const strokeWidth = 6.0605;

  // Main diagonal / arrow shaft
  glyphGroup
    .append('path')
    .attr('d', 'M26.753 78.569C39.639 59.163 54.364 40.98 70.667 24.342')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');

  // Upper arc / bow + tail of arrow
  glyphGroup
    .append('path')
    .attr(
      'd',
      'M37.214 30.122C43.992 34.334 60.85 31.189 69.694 24.5C65.452 29.369 63.254 35.082 61.684 41.347C60.114 47.611 60.355 54.397 62.852 60.353',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');

  // Lower arc / supporting curve
  glyphGroup
    .append('path')
    .attr('d', 'M28.399 49.929C34.816 56.548 42.224 62.204 50.3 66.65')
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');
}
