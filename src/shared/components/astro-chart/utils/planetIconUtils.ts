// src/shared/components/astro-chart/utils/planetIconUtils.ts
import * as d3 from 'd3';

type PlanetGroup = d3.Selection<SVGGElement, unknown, null, undefined>;

/**
 * Draws a planet icon into the given group.
 * The group is assumed to already be translated to the desired (x, y).
 *
 * Coordinate system:
 * - Designed on a ~24×24 grid, centered at (0,0), roughly from -12..+12.
 * - Then uniformly scaled by sizePx / 24.
 */
export function renderPlanetIcon(
  group: PlanetGroup,
  planetName: string,
  sizePx: number,
  color: string,
) {
  const scale = sizePx / 24;
  const root = group.append('g').attr('class', 'planet-icon').attr('transform', `scale(${scale})`);

  const strokeWidth = 1.6;
  const commonAttrs = {
    fill: 'none',
    stroke: color,
    'stroke-width': strokeWidth,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  } as const;

  const applyAttrs = (sel: d3.Selection<SVGPathElement, unknown, null, undefined>) => {
    Object.entries(commonAttrs).forEach(([k, v]) => sel.attr(k, v as any));
    return sel;
  };

  const nameKey = (planetName || '').toLowerCase();

  switch (nameKey) {
    // Sun ☉ – classical: circle with central dot
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

    // Moon ☾ – slimmer classical crescent
    // Moon ☾ – more angular waxing half-moon style
    case 'moon': {
      // Outer crescent edge (curved)
      applyAttrs(
        root.append('path').attr(
          'd',
          // From top-left down to bottom-left in a smooth arc
          'M -5 -8 C 2 -9, 6 -3, 6 0 C 6 3, 2 9, -5 8',
        ),
      );

      // Inner edge: sharper, more "angular" waxing side
      applyAttrs(root.append('path').attr('d', 'M -1 -7 C 3 -3, 3 3, -1 7'));

      break;
    }

    // Mercury ☿ – circle with bigger half-circle horn and cross
    case 'mercury': {
      // Main circle
      root
        .append('circle')
        .attr('cx', 0)
        .attr('cy', -2)
        .attr('r', 5)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      // Horn: bigger bottom half of a circle sitting on top of the main one
      // - main circle top: (0, -7)
      // - horn circle center: (0, -11), radius = 4
      // - we keep the lower semicircle from (-4, -11) to (4, -11),
      //   whose "belly" touches (0, -7)
      applyAttrs(root.append('path').attr('d', 'M -4 -11 A 4 4 0 0 0 4 -11'));

      // Vertical stem
      root
        .append('line')
        .attr('x1', 0)
        .attr('y1', 3.5)
        .attr('x2', 0)
        .attr('y2', 9.5)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth)
        .attr('stroke-linecap', 'round');

      // Cross bar
      root
        .append('line')
        .attr('x1', -4)
        .attr('y1', 6.5)
        .attr('x2', 4)
        .attr('y2', 6.5)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth)
        .attr('stroke-linecap', 'round');

      break;
    }

    // Venus ♀ – classical female symbol
    case 'venus': {
      // Circle
      root
        .append('circle')
        .attr('cx', 0)
        .attr('cy', -3)
        .attr('r', 5.5)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      // Vertical stem
      root
        .append('line')
        .attr('x1', 0)
        .attr('y1', 2.5)
        .attr('x2', 0)
        .attr('y2', 10)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth)
        .attr('stroke-linecap', 'round');

      // Cross bar
      root
        .append('line')
        .attr('x1', -4)
        .attr('y1', 6.5)
        .attr('x2', 4)
        .attr('y2', 6.5)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth)
        .attr('stroke-linecap', 'round');

      break;
    }

    // Mars ♂ – classical male symbol: circle + arrow up-right
    case 'mars': {
      // Circle
      root
        .append('circle')
        .attr('cx', -3)
        .attr('cy', 3)
        .attr('r', 5.5)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      // Arrow shaft + head
      applyAttrs(
        root.append('path').attr(
          'd',
          [
            // Shaft from circle toward top-right
            'M 0 0 L 7 -7',
            // Arrow head
            'M 4 -7 L 7 -7 L 7 -4',
          ].join(' '),
        ),
      );

      break;
    }

    // Jupiter ♃ – from SVG (viewBox 0 0 12 12), centered & scaled to ~Sun size
    case 'jupiter': {
      applyAttrs(
        root
          .append('path')
          .attr('d', 'M2.25 1a4.33 4.33 0 0 1 0 7.5h7.5M7.25 6v5')
          // center around (0,0) and enlarge from 12→16 units
          .attr('transform', 'translate(-6,-6) scale(1.3333)'),
      );
      break;
    }

    // Saturn ♄ – bigger + thick stroke
    case 'saturn': {
      const saturnStroke = strokeWidth * 6; // your current value

      root
        .append('path')
        .attr(
          'd',
          'M30 90h40m-20 20V60c0 11.055 8.945 20 20 20s20-8.945 20-20c0-5.313-2.11-10.39-5.86-14.14C75.079 36.796 70 22.812 70 10',
        )
        // was scale(0.20,-0.20); bump to 0.24 for a bit more presence
        .attr('transform', 'scale(0.24,-0.24) translate(-60,-60)')
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', saturnStroke)
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round');

      break;
    }

    // Uranus ♅ – pillar + cross + ring + inner half-arcs, slightly smaller
    case 'uranus': {
      // extra group to scale the whole symbol
      const u = root.append('g').attr('transform', 'scale(0.9)');

      // Central vertical pillar
      u.append('line')
        .attr('x1', 0)
        .attr('y1', -9)
        .attr('x2', 0)
        .attr('y2', 7)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth)
        .attr('stroke-linecap', 'round');

      // Crossbar above the ring
      u.append('line')
        .attr('x1', -4)
        .attr('y1', -2)
        .attr('x2', 4)
        .attr('y2', -2)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth)
        .attr('stroke-linecap', 'round');

      // Bottom ring
      u.append('circle')
        .attr('cx', 0)
        .attr('cy', 11)
        .attr('r', 3.5)
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth);

      // Side inner half-arcs
      applyAttrs(
        u.append('path').attr(
          'd',
          [
            // left inner half
            'M -7.5 -5.5',
            'A 3.5 3.5 0 0 1 -7.5 1.5',
          ].join(' '),
        ),
      );

      applyAttrs(
        u.append('path').attr(
          'd',
          [
            // right inner half
            'M 7.5 -5.5',
            'A 3.5 3.5 0 0 0 7.5 1.5',
          ].join(' '),
        ),
      );

      break;
    }

    // Neptune ♆ – trident, slightly larger
    case 'neptune': {
      applyAttrs(
        root
          .append('path')
          .attr('d', 'M6 11V1M3.5 7.25h5M2.25 1a3.751 3.751 0 0 0 7.5 0')
          // was scale(1.3333); bump to ~1.6
          .attr('transform', 'scale(1.6) translate(-6,-6)'),
      );
      break;
    }

    // Pluto ♇ – monogram-style "P" with long stem and cross
    case 'pluto': {
      // Main stem
      root
        .append('line')
        .attr('x1', -2)
        .attr('y1', -9)
        .attr('x2', -2)
        .attr('y2', 7)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth)
        .attr('stroke-linecap', 'round');

      // P-style bowl
      applyAttrs(
        root
          .append('path')
          .attr('d', ['M -2 -9', 'C 4 -9, 6 -4, 2 -1', 'C 0 0, -1 0, -2 -1.5'].join(' ')),
      );

      // Cross at bottom of stem
      root
        .append('line')
        .attr('x1', -6)
        .attr('y1', 5)
        .attr('x2', 2)
        .attr('y2', 5)
        .attr('stroke', color)
        .attr('stroke-width', strokeWidth)
        .attr('stroke-linecap', 'round');

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
