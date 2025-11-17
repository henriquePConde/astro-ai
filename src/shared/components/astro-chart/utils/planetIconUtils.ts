// src/shared/components/astro-chart/utils/planetIconUtils.ts
import * as d3 from 'd3';

type PlanetGroup = d3.Selection<SVGGElement, unknown, null, undefined>;

/**
 * Draws a planet icon into the given group.
 * The group is assumed to already be translated to the desired (x, y).
 */
export function renderPlanetIcon(
  group: PlanetGroup,
  planetName: string,
  sizePx: number,
  color: string,
) {
  const scale = sizePx / 28;
  const root = group.append('g').attr('class', 'planet-icon').attr('transform', `scale(${scale})`);

  const strokeWidth = 1.6;
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

  const nameKey = (planetName || '').toLowerCase();

  switch (nameKey) {
    // Sun ☉ – circle with dot
    case 'sun': {
      root
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 8)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 3).attr('fill', color);
      break;
    }

    // Moon ☾ – crescent
    case 'moon': {
      root
        .append('circle')
        .attr('cx', 1)
        .attr('cy', 0)
        .attr('r', 7)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root
        .append('circle')
        .attr('cx', -2)
        .attr('cy', 0)
        .attr('r', 7)
        .attr('fill', 'white')
        .attr('stroke', 'none');
      break;
    }

    // Mercury ☿ – circle + horns + cross
    case 'mercury': {
      root
        .append('circle')
        .attr('cx', 0)
        .attr('cy', -1)
        .attr('r', 5)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      applyAttrs(root.append('path').attr('d', 'M -4 -7 C -2 -10, 2 -10, 4 -7'));

      root
        .append('line')
        .attr('x1', 0)
        .attr('y1', 4)
        .attr('x2', 0)
        .attr('y2', 10)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root
        .append('line')
        .attr('x1', -4)
        .attr('y1', 7)
        .attr('x2', 4)
        .attr('y2', 7)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);
      break;
    }

    // Venus ♀ – circle + cross
    case 'venus': {
      root
        .append('circle')
        .attr('cx', 0)
        .attr('cy', -2)
        .attr('r', 6)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root
        .append('line')
        .attr('x1', 0)
        .attr('y1', 4)
        .attr('x2', 0)
        .attr('y2', 11)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root
        .append('line')
        .attr('x1', -4)
        .attr('y1', 7.5)
        .attr('x2', 4)
        .attr('y2', 7.5)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);
      break;
    }

    // Mars ♂ – circle + arrow
    case 'mars': {
      root
        .append('circle')
        .attr('cx', -2)
        .attr('cy', 2)
        .attr('r', 6)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      applyAttrs(root.append('path').attr('d', 'M 2 -2 L 8 -8 M 4 -8 L 8 -8 L 8 -4'));
      break;
    }

    // Jupiter ♃ – stylised shape
    case 'jupiter': {
      applyAttrs(
        root
          .append('path')
          .attr(
            'd',
            [
              'M -6 -8 L -2 -8 C 1 -8, 3 -6, 3 -3',
              'M 3 -3 C 3 0, 1 2, -2 2 L -6 2',
              'M -6 2 L -1 8',
            ].join(' '),
          ),
      );
      break;
    }

    // Saturn ♄ – cross + hook
    case 'saturn': {
      applyAttrs(
        root
          .append('path')
          .attr('d', ['M -4 -8 L -4 3', 'M -8 -4 L 0 -4', 'M -4 3 C -1 3, 2 4, 4 6'].join(' ')),
      );
      break;
    }

    // Uranus ♅ – central pillar and side bars
    case 'uranus': {
      root
        .append('line')
        .attr('x1', 0)
        .attr('y1', -8)
        .attr('x2', 0)
        .attr('y2', 8)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 4)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root
        .append('line')
        .attr('x1', -7)
        .attr('y1', -2)
        .attr('x2', 7)
        .attr('y2', -2)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root
        .append('line')
        .attr('x1', -7)
        .attr('y1', 2)
        .attr('x2', 7)
        .attr('y2', 2)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);
      break;
    }

    // Neptune ♆ – trident
    case 'neptune': {
      applyAttrs(
        root
          .append('path')
          .attr(
            'd',
            [
              'M 0 -8 L 0 8',
              'M -6 -4 C -4 -6, -2 -7, 0 -7',
              'M 6 -4 C 4 -6, 2 -7, 0 -7',
              'M -4 2 L 4 2',
            ].join(' '),
          ),
      );
      break;
    }

    // Pluto ♇ – circle + stem + cross
    case 'pluto': {
      root
        .append('circle')
        .attr('cx', 0)
        .attr('cy', -3)
        .attr('r', 5)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root
        .append('line')
        .attr('x1', 0)
        .attr('y1', 2)
        .attr('x2', 0)
        .attr('y2', 9)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      root
        .append('line')
        .attr('x1', -4)
        .attr('y1', 6)
        .attr('x2', 4)
        .attr('y2', 6)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);
      break;
    }

    default: {
      // Fallback: simple filled circle
      root.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 6).attr('fill', color);
    }
  }

  // Invisible hit area for pointer events
  root.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 12).attr('fill', 'transparent');
}
