// src/shared/components/astro-chart/utils/zodiac/aquarius.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderAquariusIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'aquarius-gradient',
    gradientCoords: {
      x1: '0',
      y1: '48.5511',
      x2: '97.1029',
      y2: '48.5511',
    },
    stops: [
      { offset: '0', color: '#6C34BA' },
      { offset: '0.7676', color: '#3D1E69' },
    ],
    // center/radius/targetRadius/glyphScaleFactor use defaults
  });

  const strokeWidth = 4.7424;

  // Top wave
  glyphGroup
    .append('path')
    .attr(
      'd',
      [
        'M14.686 39.282',
        'C16.097 36.46 17.892 33.831 20.006 31.489',
        'C20.737 30.679 21.563 29.869 22.621 29.6',
        'C24.765 29.054 26.821 30.994 27.556 33.081',
        'C28.291 35.168 28.199 37.462 28.802 39.59',
        'C29.406 41.719 31.129 43.854 33.338 43.717',
        'C34.8 43.626 36.01 42.568 36.975 41.467',
        'C40.253 37.729 42.194 32.841 46.022 29.669',
        'C47.926 28.091 50.597 27.001 52.859 27.999',
        'C55.729 29.266 56.345 32.946 57.184 35.969',
        'C58.355 40.193 61.144 44.412 65.413 45.408',
        'C68.94 46.231 72.706 44.595 75.224 41.991',
        'C77.742 39.387 79.201 35.946 80.308 32.497',
      ].join(''),
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');

  // Bottom wave
  glyphGroup
    .append('path')
    .attr(
      'd',
      [
        'M14.686 59.821',
        'C16.097 56.999 17.892 54.37 20.006 52.028',
        'C20.737 51.218 21.563 50.409 22.621 50.139',
        'C24.765 49.593 26.821 51.533 27.556 53.62',
        'C28.291 55.707 28.199 58 28.802 60.129',
        'C29.406 62.258 31.129 64.393 33.338 64.256',
        'C34.8 64.165 36.01 63.107 36.975 62.006',
        'C40.253 58.268 42.194 53.38 46.022 50.208',
        'C47.926 48.63 50.597 47.54 52.859 48.538',
        'C55.729 49.805 56.345 53.485 57.184 56.508',
        'C58.355 60.732 61.144 64.951 65.413 65.947',
        'C68.94 66.77 72.706 65.134 75.224 62.53',
        'C77.742 59.926 79.201 56.485 80.308 53.036',
      ].join(''),
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');
}
