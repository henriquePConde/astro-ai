// src/shared/components/astro-chart/utils/zodiac/fallbackIcons.ts
import * as d3 from 'd3';
import type { ZodiacGroup } from './helpers';

export function renderFallbackZodiacIcon(
  root: ZodiacGroup,
  signIndex: number,
  strokeWidth: number,
  color: string,
  applyAttrs: (sel: d3.Selection<SVGPathElement, unknown, null, undefined>) => any,
) {
  switch (signIndex) {
    // Aries ♈ – horns + twin stems
    case 0: {
      const p = root
        .append('path')
        .attr(
          'd',
          [
            'M -7 -4 C -5 -10, -1 -10, 0 -4',
            'M 0 -4 C 1 -10, 5 -10, 7 -4',
            'M -2 -4 L -2 8',
            'M 2 -4 L 2 8',
          ].join(' '),
        );
      applyAttrs(p);
      break;
    }

    // Taurus ♉ – circle + horns
    case 1: {
      root
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 1)
        .attr('r', 6)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      const p = root.append('path').attr('d', 'M -6 -2 C -4 -8, 4 -8, 6 -2');
      applyAttrs(p);
      break;
    }

    // ... the rest of your existing cases (2–11) unchanged ...
    // (Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, Pisces)

    default: {
      root
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 6)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);
    }
  }
}
