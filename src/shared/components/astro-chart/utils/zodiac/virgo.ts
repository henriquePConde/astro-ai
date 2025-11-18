// src/shared/components/astro-chart/utils/zodiac/virgo.ts
import type { ZodiacGroup } from './helpers';
import { createGradientCoin } from './helpers';

export function renderVirgoIcon(root: ZodiacGroup) {
  const { glyphGroup } = createGradientCoin(root, {
    gradientBaseId: 'virgo-gradient',
    gradientCoords: {
      x1: '-0.0001',
      y1: '48.5513',
      x2: '97.1028',
      y2: '48.5513',
    },
    stops: [
      { offset: '0.1561', color: '#48A791' },
      { offset: '1', color: '#3C6978' },
    ],
    // center/radius/targetRadius/glyphScaleFactor use defaults
  });

  const strokeWidth = 4.7424;

  // Main Virgo glyph
  glyphGroup
    .append('path')
    .attr(
      'd',
      'M16.146 43.787C16.425 40.965 17.286 38.203 18.659 35.722C19.145 34.844 19.72 33.975 20.568 33.438C21.416 32.902 22.596 32.781 23.393 33.39C23.959 33.822 24.235 34.525 24.478 35.195C27.751 44.214 29.632 53.736 30.034 63.322C28.65 53.335 31.353 42.842 37.39 34.766C38.232 33.639 39.226 32.498 40.585 32.134C42.418 31.643 44.379 32.78 45.421 34.366C46.463 35.952 46.782 37.893 47.03 39.774C47.808 45.67 48.131 51.627 47.995 57.573C46.634 49.156 49.454 40.419 54.404 33.476C55.521 31.909 56.748 30.414 58.146 29.092C59.028 28.258 60.115 27.448 61.324 27.557C63.402 27.744 64.235 30.305 64.474 32.378C65.528 41.517 64.69 50.788 65.606 59.942C65.797 61.848 66.078 63.794 66.988 65.48C67.897 67.166 69.559 68.563 71.472 68.66C73.968 68.786 76.049 66.765 77.399 64.662C78.985 62.192 80.071 59.242 79.623 56.342C79.17 53.408 76.812 50.66 73.85 50.456C70.888 50.251 67.969 53.323 68.88 56.149',
    )
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', strokeWidth)
    .attr('stroke-miterlimit', 10)
    .attr('stroke-linecap', 'round');
}
