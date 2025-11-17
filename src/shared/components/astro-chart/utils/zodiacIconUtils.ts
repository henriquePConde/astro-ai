// src/shared/components/astro-chart/utils/zodiacIconUtils.ts
import * as d3 from 'd3';

type ZodiacGroup = d3.Selection<SVGGElement, unknown, null, undefined>;

/**
 * Draws a zodiac icon into the given group.
 * The group is assumed to already be translated to the desired (x, y).
 * We only apply a scale based on sizePx.
 */
export function renderZodiacIcon(
  group: ZodiacGroup,
  signIndex: number,
  sizePx: number,
  color: string,
) {
  // Normalized coordinate system: roughly [-10, 10] in both axes.
  // We scale that to ~sizePx.
  const scale = sizePx / 24;
  const root = group.append('g').attr('class', 'zodiac-icon').attr('transform', `scale(${scale})`);

  const strokeWidth = 1.4;
  const commonAttrs = {
    fill: 'none',
    stroke: color,
    'stroke-width': strokeWidth,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  } as any;

  const applyAttrs = (sel: d3.Selection<SVGPathElement, unknown, null, undefined>) => {
    Object.entries(commonAttrs).forEach(([k, v]) => sel.attr(k, v as any));
    return sel;
  };

  // Helper to append a path with common attrs
  const path = (d: string) => applyAttrs(root.append('path').attr('d', d));

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

    // Gemini ♊ – twin columns
    case 2: {
      const p = root
        .append('path')
        .attr('d', ['M -6 -7 L 6 -7', 'M -6 7 L 6 7', 'M -4 -7 L -4 7', 'M 4 -7 L 4 7'].join(' '));
      applyAttrs(p);
      break;
    }

    // Cancer ♋ – two circles with connecting arcs
    case 3: {
      root
        .append('circle')
        .attr('cx', -4)
        .attr('cy', -2)
        .attr('r', 3.5)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root
        .append('circle')
        .attr('cx', 4)
        .attr('cy', 2)
        .attr('r', 3.5)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      const p = root
        .append('path')
        .attr('d', 'M -1 -5 C 2 -7, 5 -6, 7 -4 M -7 4 C -5 6, -2 7, 1 5');
      applyAttrs(p);
      break;
    }

    // Leo ♌ – circle with tail
    case 4: {
      root
        .append('circle')
        .attr('cx', -2)
        .attr('cy', 0)
        .attr('r', 4)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      const p = root.append('path').attr('d', 'M -2 -4 C 2 -9, 7 -6, 5 -1 C 4 2, 3 4, 1 6');
      applyAttrs(p);
      break;
    }

    // Virgo ♍ – stylised "m" with loop
    case 5: {
      const p = root
        .append('path')
        .attr(
          'd',
          [
            'M -7 7 L -7 -6',
            'M -7 -6 C -3 -9, -1 -9, 0 -6 L 0 7',
            'M 0 -6 C 4 -9, 6 -9, 7 -6 L 7 -2 C 5 -1, 4 1, 4 3',
          ].join(' '),
        );
      applyAttrs(p);
      break;
    }

    // Libra ♎ – horizon + arc
    case 6: {
      const p = root.append('path').attr(
        'd',
        [
          'M -8 3 L 8 3', // base line
          'M -6 0 C -2 -6, 2 -6, 6 0', // arc
          'M -8 -3 L 8 -3', // upper line
        ].join(' '),
      );
      applyAttrs(p);
      break;
    }

    // Scorpio ♏ – stylised "m" with arrow tail
    case 7: {
      const p = root
        .append('path')
        .attr(
          'd',
          [
            'M -7 7 L -7 -6',
            'M -7 -6 C -3 -9, -1 -9, 0 -6 L 0 7',
            'M 0 -6 C 4 -9, 6 -9, 7 -6 L 7 4',
            'M 7 4 L 10 1',
            'M 7 4 L 4 1',
          ].join(' '),
        );
      applyAttrs(p);
      break;
    }

    // Sagittarius ♐ – arrow
    case 8: {
      const p = root.append('path').attr(
        'd',
        [
          'M -8 6 L 4 -6', // main diagonal
          'M -4 -8 L 6 -8', // top bar
          'M 4 -6 L 4 4', // vertical
          'M 4 -6 L 8 -10',
        ].join(' '),
      );
      applyAttrs(p);
      break;
    }

    // Capricorn ♑ – stylised hook
    case 9: {
      const p = root
        .append('path')
        .attr(
          'd',
          [
            'M -7 -6 L -3 7',
            'M -3 7 C -1 3, 1 1, 3 2',
            'M 3 2 C 5 3, 6 5, 5 7',
            'M 5 7 C 3 9, 0 9, -1 7',
          ].join(' '),
        );
      applyAttrs(p);
      break;
    }

    // Aquarius ♒ – double waves
    case 10: {
      const p = root
        .append('path')
        .attr(
          'd',
          [
            'M -8 -3 L -5 -1 L -2 -3 L 1 -1 L 4 -3 L 7 -1',
            'M -8 3 L -5 5 L -2 3 L 1 5 L 4 3 L 7 5',
          ].join(' '),
        );
      applyAttrs(p);
      break;
    }

    // Pisces ♓ – two curves with a bar
    case 11: {
      const p = root
        .append('path')
        .attr(
          'd',
          ['M -6 -8 C -4 -2, -4 2, -6 8', 'M 6 -8 C 4 -2, 4 2, 6 8', 'M -8 0 L 8 0'].join(' '),
        );
      applyAttrs(p);
      break;
    }

    default: {
      // Fallback: simple circle
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
