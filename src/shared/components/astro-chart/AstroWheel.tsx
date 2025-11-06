'use client';

import { useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import type { ChartData, ChartDimensions, PlanetInfo } from './types';
import { planetColors } from './types';
import { zodiacSymbols } from './utils/zodiacUtils';
import { calculatePlanetPositions, getAdjustedPlanetPositions } from './utils/planetUtils';
import { getSignInfo } from './utils/signUtils';

interface AstroWheelProps {
  data: ChartData | null;
  width?: number;
  height?: number;
}

const AstroWheel = ({ data, width = 800, height = 800 }: AstroWheelProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const calculateDimensions = (w: number, h: number): ChartDimensions => {
    const size = Math.min(w, h);
    return {
      width: size,
      height: size,
      centerX: size / 2,
      centerY: size / 2,
      radius: (size / 2) * 0.95,
    };
  };

  const drawChart = useCallback(
    (
      g: d3.Selection<SVGGElement, unknown, null, undefined>,
      dimensions: ChartDimensions,
      planetPositions: PlanetInfo[],
    ) => {
      if (!data) return;
      const houseCusps = [
        data.houses.firstHouse,
        data.houses.secondHouse,
        data.houses.thirdHouse,
        data.houses.fourthHouse,
        data.houses.fifthHouse,
        data.houses.sixthHouse,
        data.houses.seventhHouse,
        data.houses.eighthHouse,
        data.houses.ninthHouse,
        data.houses.tenthHouse,
        data.houses.eleventhHouse,
        data.houses.twelfthHouse,
      ];

      const { radius } = dimensions;
      const outerRadius = radius;
      const middleRadius = radius * 0.88;
      const innerRadius = radius * 0.45;
      const housesRadius = radius * 0.35;
      const planetRadius = (innerRadius + middleRadius) / 2;

      const gradient = g
        .append('defs')
        .append('linearGradient')
        .attr('id', 'lineGradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', -radius)
        .attr('y1', '0')
        .attr('x2', radius)
        .attr('y2', '0');
      const stops = ['#ffd6e6', '#e6ccff', '#ccf2ff', '#ffe6cc', '#ffccf2', '#ffd6e6'];
      [0, 20, 40, 60, 80, 100].forEach((offset, idx) => {
        gradient.append('stop').attr('offset', `${offset}%`).attr('stop-color', stops[idx]);
      });

      [outerRadius, middleRadius, innerRadius, housesRadius].forEach((r) => {
        g.append('circle')
          .attr('r', r)
          .attr('fill', 'none')
          .attr('stroke', 'url(#lineGradient)')
          .attr('stroke-width', 1)
          .attr('stroke-opacity', 0.6);
      });

      const rotationOffset = 180;
      const houseNumberFontSize = Math.floor(radius * 0.045);
      const symbolRadius = (outerRadius + middleRadius) / 2;

      // Render zodiac signs
      const signInfo = getSignInfo(data);
      g.selectAll('.zodiac-sign').remove();

      signInfo.forEach((sign) => {
        if (sign.isIntercepted) {
          // Render intercepted signs in gray at midpoint of house span
          const mid = sign.signIndex * 30 + 15;

          for (let i = 0; i < 12; i++) {
            const current = houseCusps[i];
            const next = houseCusps[(i + 1) % 12];

            const inSameSpan =
              current < next ? mid >= current && mid <= next : mid >= current || mid <= next;

            if (inSameSpan) {
              const angle =
                (((mid - data.houses.firstHouse + rotationOffset) % 360) * Math.PI) / 180;
              const x = symbolRadius * Math.cos(angle);
              const y = -symbolRadius * Math.sin(angle);

              g.append('text')
                .attr('x', x)
                .attr('y', y)
                .attr('text-anchor', 'middle')
                .attr('dominant-baseline', 'middle')
                .attr('font-size', '28px')
                .attr('fill', '#666')
                .attr('class', `zodiac-sign zodiac-sign-${sign.name.toLowerCase()}`)
                .text(zodiacSymbols[sign.signIndex]);
            }
          }
        } else {
          // Render signs at house cusps
          sign.rulingHouses.forEach((_, i) => {
            const degree = sign.signIndex * 30 + sign.cuspDegrees[i];
            const angle =
              (((degree - data.houses.firstHouse + rotationOffset) % 360) * Math.PI) / 180;
            const x = symbolRadius * Math.cos(angle);
            const y = -symbolRadius * Math.sin(angle);

            g.append('text')
              .attr('x', x)
              .attr('y', y)
              .attr('text-anchor', 'middle')
              .attr('dominant-baseline', 'middle')
              .attr('font-size', '28px')
              .attr('fill', '#fff')
              .attr('class', `zodiac-sign zodiac-sign-${sign.name.toLowerCase()}`)
              .text(zodiacSymbols[sign.signIndex]);
          });
        }
      });

      houseCusps.forEach((cusp, index) => {
        const angle = (((cusp - data.houses.firstHouse + rotationOffset) % 360) * Math.PI) / 180;
        const isCardinal = [0, 3, 6, 9].includes(index);
        const isAscDesc = [0, 6].includes(index);

        const lineGradientId = `lineGradient_${index}`;
        const lg = g
          .append('defs')
          .append('linearGradient')
          .attr('id', lineGradientId)
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', housesRadius * Math.cos(angle))
          .attr('y1', -housesRadius * Math.sin(angle))
          .attr('x2', outerRadius * Math.cos(angle))
          .attr('y2', -outerRadius * Math.sin(angle));
        [0, 20, 40, 60, 80, 100].forEach((offset, idx) =>
          lg.append('stop').attr('offset', `${offset}%`).attr('stop-color', stops[idx]!),
        );

        g.append('line')
          .attr('x1', housesRadius * Math.cos(angle))
          .attr('y1', -housesRadius * Math.sin(angle))
          .attr('x2', outerRadius * Math.cos(angle))
          .attr('y2', -outerRadius * Math.sin(angle))
          .attr('stroke', `url(#${lineGradientId})`)
          .attr('stroke-width', isAscDesc ? 3 : isCardinal ? 2 : 1)
          .attr('stroke-opacity', isAscDesc ? 1 : isCardinal ? 0.8 : 0.6)
          .attr('stroke-dasharray', isCardinal ? 'none' : '3,2');

        const textRadius = (innerRadius + housesRadius) / 2;
        const nextCusp = houseCusps[(index + 1) % 12];
        let midpointAngle;
        if (nextCusp < cusp) midpointAngle = (cusp + (nextCusp + 360 - cusp) / 2) % 360;
        else midpointAngle = cusp + (nextCusp - cusp) / 2;
        const textAngle =
          (((midpointAngle - data.houses.firstHouse + rotationOffset) % 360) * Math.PI) / 180;

        const textGradientId = `textGradient_${index}`;
        const tg = g
          .append('defs')
          .append('linearGradient')
          .attr('id', textGradientId)
          .attr('gradientUnits', 'userSpaceOnUse')
          .attr('x1', '0%')
          .attr('y1', '0%')
          .attr('x2', '100%')
          .attr('y2', '0%');
        [0, 20, 40, 60, 80, 100].forEach((offset, idx) =>
          tg.append('stop').attr('offset', `${offset}%`).attr('stop-color', stops[idx]!),
        );

        g.append('text')
          .attr('x', textRadius * Math.cos(textAngle))
          .attr('y', -textRadius * Math.sin(textAngle))
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('font-size', `${houseNumberFontSize}px`)
          .attr('fill', `url(#${textGradientId})`)
          .text((index + 1).toString());
      });

      const aspectGroup = g.append('g').attr('class', 'aspects');
      for (let i = 0; i < planetPositions.length; i++) {
        for (let j = i + 1; j < planetPositions.length; j++) {
          const p1 = planetPositions[i]!;
          const p2 = planetPositions[j]!;
          const angle = Math.abs(parseFloat(p1.position) - parseFloat(p2.position));
          const minor = angle > 180 ? 360 - angle : angle;
          const orb = 8;
          const aspect =
            Math.abs(minor - 0) <= orb || Math.abs(minor - 360) <= orb
              ? { color: '#5C5C5C' }
              : Math.abs(minor - 60) <= orb
                ? { color: '#6A89CC' }
                : Math.abs(minor - 90) <= orb
                  ? { color: '#E74C3C' }
                  : Math.abs(minor - 120) <= orb
                    ? { color: '#27AE60' }
                    : Math.abs(minor - 180) <= orb
                      ? { color: '#E74C3C' }
                      : null;
          if (aspect) {
            const a1 =
              (((parseFloat(p1.position) - data.houses.firstHouse + rotationOffset) % 360) *
                Math.PI) /
              180;
            const a2 =
              (((parseFloat(p2.position) - data.houses.firstHouse + rotationOffset) % 360) *
                Math.PI) /
              180;
            const x1 = planetRadius * Math.cos(a1);
            const y1 = -planetRadius * Math.sin(a1);
            const x2 = planetRadius * Math.cos(a2);
            const y2 = -planetRadius * Math.sin(a2);
            aspectGroup
              .append('line')
              .attr('x1', x1)
              .attr('y1', y1)
              .attr('x2', x2)
              .attr('y2', y2)
              .attr('stroke', aspect.color)
              .attr('stroke-width', 1)
              .attr('opacity', 0.6);
          }
        }
      }

      // Use adjusted positions to prevent planet overlap
      const adjustedPositions = getAdjustedPlanetPositions(planetPositions);
      const planetFontSize = Math.floor(radius * 0.085);

      planetPositions.forEach((planet) => {
        // Use adjusted position if available, otherwise use original position
        const adjustedPosition = adjustedPositions.get(planet.name) ?? parseFloat(planet.position);
        const angle =
          (((adjustedPosition - data.houses.firstHouse + rotationOffset) % 360) * Math.PI) / 180;
        const gPlanet = g
          .append('g')
          .attr(
            'transform',
            `translate(${planetRadius * Math.cos(angle)},${-planetRadius * Math.sin(angle)})`,
          );
        gPlanet
          .append('text')
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('font-size', `${planetFontSize}px`)
          .attr('fill', (planetColors as any)[planet.name] || '#ffffff')
          .text(planet.symbol || planet.name);
      });
    },
    [data],
  );

  useEffect(() => {
    if (!svgRef.current || !data) return;
    const dimensions = calculateDimensions(width, height);
    // Use calculatePlanetPositions to get proper house numbers and planet info
    const planetPositions: PlanetInfo[] = calculatePlanetPositions(data);

    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3
      .select(svgRef.current)
      .attr('width', dimensions.width)
      .attr('height', dimensions.height)
      .attr(
        'viewBox',
        `${-dimensions.width / 2} ${-dimensions.height / 2} ${dimensions.width} ${dimensions.height}`,
      );
    const g = svg.append('g').attr('class', 'zoom-group');
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    svg.call(zoom);
    svg.on('dblclick.zoom', () => {
      svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
    });
    drawChart(g, dimensions, planetPositions);
  }, [data, width, height, drawChart]);

  if (!data) return null;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full max-w-[600px] max-h-[600px]" />
    </div>
  );
};

export default AstroWheel;
