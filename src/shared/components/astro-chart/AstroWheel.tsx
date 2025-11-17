// src/shared/components/astro-chart/AstroWheel.tsx
'use client';

import { useRef, useEffect, useCallback } from 'react';
import * as d3 from 'd3';
import type { ChartData, ChartDimensions, PlanetInfo } from './types';
import { planetColors } from './types';
import { calculatePlanetPositions, getAdjustedPlanetPositions } from './utils/planetUtils';
import { getSignInfo } from './utils/signUtils';
import { useOptionalChartInteractions } from '@/features/home/components/chart-experience/context/chart-interactions.context';
import { renderZodiacIcon } from './utils/zodiacIconUtils';
import { renderPlanetIcon } from './utils/planetIconUtils';

interface AstroWheelProps {
  data: ChartData | null;
  width?: number;
  height?: number;
  initialScale?: number; // Default initial zoom scale (default: 0.7 for regular view, 1.0 for PDF)
}

const AstroWheel = ({ data, width = 800, height = 800, initialScale = 0.7 }: AstroWheelProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const interactions = useOptionalChartInteractions();

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

      // Helper to extract native MouseEvent from D3 event
      const getNativeEvent = (d3Event: any): MouseEvent => {
        if (d3Event && typeof d3Event.clientX === 'number' && typeof d3Event.clientY === 'number') {
          return d3Event as MouseEvent;
        }
        if (d3Event?.sourceEvent) {
          const source = d3Event.sourceEvent;
          if (typeof source.clientX === 'number' && typeof source.clientY === 'number') {
            return source as MouseEvent;
          }
        }
        if (d3Event && d3Event.target) {
          const target = d3Event.target as Element;
          const rect = target.getBoundingClientRect();
          const clientX = (d3Event.pageX ?? rect.left + rect.width / 2) - (window.scrollX || 0);
          const clientY = (d3Event.pageY ?? rect.top + rect.height / 2) - (window.scrollY || 0);

          return {
            clientX,
            clientY,
          } as MouseEvent;
        }
        const svgNode = g.node()?.ownerSVGElement || svgRef.current;
        if (svgNode && d3Event) {
          try {
            const svgRect = svgNode.getBoundingClientRect();
            const [x, y] = d3.pointer(d3Event, svgNode);
            return {
              clientX: svgRect.left + x,
              clientY: svgRect.top + y,
            } as MouseEvent;
          } catch {
            return {
              clientX: window.innerWidth / 2,
              clientY: window.innerHeight / 2,
            } as MouseEvent;
          }
        }
        return {
          clientX: 0,
          clientY: 0,
        } as MouseEvent;
      };

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

      const rotationOffset = 180;
      const houseNumberFontSize = Math.floor(radius * 0.045);
      const symbolRadius = (outerRadius + middleRadius) / 2;

      // === Base gradient + concentric circles ===
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

      // === Zodiac signs (as SVG icons now) ===
      const signInfo = getSignInfo(data);
      g.selectAll('.zodiac-sign').remove();

      signInfo.forEach((sign) => {
        if (sign.isIntercepted) {
          // Intercepted sign: place a single icon at middle of intercepted span
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

              const group = g
                .append('g')
                .attr('class', `zodiac-sign zodiac-sign-${sign.name.toLowerCase()}`)
                .attr('transform', `translate(${x},${y})`);

              // grey-ish intercepted color
              renderZodiacIcon(group, sign.signIndex, 28, '#666');

              if (interactions) {
                group
                  .style('cursor', 'pointer')
                  .on('mouseenter', function (event: any) {
                    if (!interactions.enabled) return;
                    const nativeEvent = getNativeEvent(event) as MouseEvent;
                    interactions.onSignHover(sign.signIndex, nativeEvent);
                  })
                  .on('mouseleave', function () {
                    if (!interactions.enabled) return;
                    interactions.onSignLeave();
                  })
                  .on('click', function (event: any) {
                    if (!interactions.enabled) return;
                    const nativeEvent = getNativeEvent(event) as MouseEvent;
                    try {
                      interactions.onSignClick(sign.signIndex, nativeEvent);
                    } catch (error) {
                      console.error('Error handling sign click:', error);
                    }
                  });
              }
            }
          }
        } else {
          // Non-intercepted: place at each ruling house cusp position
          sign.rulingHouses.forEach((_, i) => {
            const degree = sign.signIndex * 30 + sign.cuspDegrees[i];
            const angle =
              (((degree - data.houses.firstHouse + rotationOffset) % 360) * Math.PI) / 180;
            const x = symbolRadius * Math.cos(angle);
            const y = -symbolRadius * Math.sin(angle);

            const group = g
              .append('g')
              .attr('class', `zodiac-sign zodiac-sign-${sign.name.toLowerCase()}`)
              .attr('transform', `translate(${x},${y})`);

            // bright color for normal sign
            renderZodiacIcon(group, sign.signIndex, 28, '#ffffff');

            if (interactions) {
              group
                .style('cursor', 'pointer')
                .on('mouseenter', function (event: any) {
                  if (!interactions.enabled) return;
                  const nativeEvent = getNativeEvent(event) as MouseEvent;
                  interactions.onSignHover(sign.signIndex, nativeEvent);
                })
                .on('mouseleave', function () {
                  if (!interactions.enabled) return;
                  interactions.onSignLeave();
                })
                .on('click', function (event: any) {
                  if (!interactions.enabled) return;
                  const nativeEvent = getNativeEvent(event) as MouseEvent;
                  try {
                    interactions.onSignClick(sign.signIndex, nativeEvent);
                  } catch (error) {
                    console.error('Error handling sign click:', error);
                  }
                });
            }
          });
        }
      });

      // === Houses: cusp lines + numbers ===
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
          lg.append('stop').attr('offset', `${offset}%`).attr('stop-color', stops[idx]),
        );

        const line = g
          .append('line')
          .attr('class', 'house-cusp-line')
          .attr('x1', housesRadius * Math.cos(angle))
          .attr('y1', -housesRadius * Math.sin(angle))
          .attr('x2', outerRadius * Math.cos(angle))
          .attr('y2', -outerRadius * Math.sin(angle))
          .attr('stroke', `url(#${lineGradientId})`)
          .attr('stroke-width', isAscDesc ? 3 : isCardinal ? 2 : 1)
          .attr('stroke-opacity', isAscDesc ? 1 : isCardinal ? 0.8 : 0.6)
          .attr('stroke-dasharray', isCardinal ? 'none' : '3,2');

        if (interactions) {
          line
            .style('cursor', 'pointer')
            .on('mouseenter', function (event: any) {
              if (!interactions.enabled) return;
              const nativeEvent = getNativeEvent(event) as MouseEvent;
              interactions.onHouseHover(
                {
                  number: index + 1,
                  degree: cusp,
                },
                nativeEvent,
              );
            })
            .on('mouseleave', function () {
              if (!interactions.enabled) return;
              interactions.onHouseLeave();
            })
            .on('click', function (event: any) {
              if (!interactions.enabled) return;
              const nativeEvent = getNativeEvent(event) as MouseEvent;
              try {
                interactions.onHouseClick(
                  {
                    number: index + 1,
                    degree: cusp,
                  },
                  nativeEvent,
                );
              } catch (error) {
                console.error('Error handling house click:', error);
              }
            });
        }

        const textRadius = (innerRadius + housesRadius) / 2;
        const nextCusp = houseCusps[(index + 1) % 12];
        let midpointAngle: number;
        if (nextCusp < cusp) {
          midpointAngle = (cusp + (nextCusp + 360 - cusp) / 2) % 360;
        } else {
          midpointAngle = cusp + (nextCusp - cusp) / 2;
        }

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
          tg.append('stop').attr('offset', `${offset}%`).attr('stop-color', stops[idx]),
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

      // === House sector highlight overlays (hover only) ===
      if (interactions) {
        for (let i = 0; i < 12; i++) {
          const startCusp = houseCusps[i];
          const endCusp = houseCusps[(i + 1) % 12];
          const houseNumber = i + 1;

          let startAngleDeg = (startCusp - data.houses.firstHouse + rotationOffset) % 360;
          let endAngleDeg = (endCusp - data.houses.firstHouse + rotationOffset) % 360;

          if (startAngleDeg < 0) startAngleDeg += 360;
          if (endAngleDeg < 0) endAngleDeg += 360;
          if (endAngleDeg < startAngleDeg) endAngleDeg += 360;

          const startAngleRad = (startAngleDeg * Math.PI) / 180;
          const endAngleRad = (endAngleDeg * Math.PI) / 180;
          const largeArcFlag = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

          const path = `
            M ${housesRadius * Math.cos(startAngleRad)} ${-housesRadius * Math.sin(startAngleRad)}
            L ${outerRadius * Math.cos(startAngleRad)} ${-outerRadius * Math.sin(startAngleRad)}
            A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 0
              ${outerRadius * Math.cos(endAngleRad)} ${-outerRadius * Math.sin(endAngleRad)}
            L ${housesRadius * Math.cos(endAngleRad)} ${-housesRadius * Math.sin(endAngleRad)}
            A ${housesRadius} ${housesRadius} 0 ${largeArcFlag} 1
              ${housesRadius * Math.cos(startAngleRad)} ${-housesRadius * Math.sin(startAngleRad)}
            Z
          `;

          const sector = g
            .append('path')
            .attr('d', path)
            .attr('class', `house-highlight house-highlight-${houseNumber}`)
            .attr('fill', '#4a90e2')
            .attr('fill-opacity', 0)
            .attr('stroke', '#4a90e2')
            .attr('stroke-opacity', 0)
            .attr('stroke-width', 1.5)
            .style('pointer-events', 'all')
            .style('cursor', 'pointer');

          sector
            .on('mouseenter', function (event: any) {
              if (!interactions.enabled) return;
              sector.attr('fill-opacity', 0.15).attr('stroke-opacity', 0.9);
              const nativeEvent = getNativeEvent(event) as MouseEvent;
              interactions.onHouseHover(
                {
                  number: houseNumber,
                  degree: startCusp,
                },
                nativeEvent,
              );
            })
            .on('mouseleave', function () {
              if (!interactions.enabled) return;
              sector.attr('fill-opacity', 0).attr('stroke-opacity', 0);
              interactions.onHouseLeave();
            })
            .on('click', function (event: any) {
              if (!interactions.enabled) return;
              const nativeEvent = getNativeEvent(event) as MouseEvent;
              try {
                interactions.onHouseClick(
                  {
                    number: houseNumber,
                    degree: startCusp,
                  },
                  nativeEvent,
                );
              } catch (error) {
                console.error('Error handling house click:', error);
              }
            });
        }
      }

      // === Aspects ===
      const aspectGroup = g.append('g').attr('class', 'aspects');

      for (let i = 0; i < planetPositions.length; i++) {
        for (let j = i + 1; j < planetPositions.length; j++) {
          const p1 = planetPositions[i]!;
          const p2 = planetPositions[j]!;

          const angle = Math.abs(parseFloat(p1.position) - parseFloat(p2.position));
          const minor = angle > 180 ? 360 - angle : angle;
          const orb = 8;

          let aspectType: string | null = null;
          let color: string | null = null;

          if (Math.abs(minor - 0) <= orb || Math.abs(minor - 360) <= orb) {
            aspectType = 'Conjunction';
            color = '#5C5C5C';
          } else if (Math.abs(minor - 60) <= orb) {
            aspectType = 'Sextile';
            color = '#6A89CC';
          } else if (Math.abs(minor - 90) <= orb) {
            aspectType = 'Square';
            color = '#E74C3C';
          } else if (Math.abs(minor - 120) <= orb) {
            aspectType = 'Trine';
            color = '#27AE60';
          } else if (Math.abs(minor - 180) <= orb) {
            aspectType = 'Opposition';
            color = '#E74C3C';
          }

          if (aspectType && color) {
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

            const line = aspectGroup
              .append('line')
              .attr('x1', x1)
              .attr('y1', y1)
              .attr('x2', x2)
              .attr('y2', y2)
              .attr('stroke', color)
              .attr('stroke-width', 1)
              .attr('opacity', 0.6)
              .style('pointer-events', interactions ? 'none' : 'auto');

            if (interactions) {
              const hit = aspectGroup
                .append('line')
                .attr('class', 'aspect-hit')
                .attr('x1', x1)
                .attr('y1', y1)
                .attr('x2', x2)
                .attr('y2', y2)
                .attr('stroke', 'transparent')
                .attr('stroke-width', 12)
                .style('pointer-events', 'stroke')
                .style('cursor', 'pointer');

              hit
                .on('mouseenter', function (event: any) {
                  if (!interactions.enabled) return;
                  line.attr('stroke-width', 2.5).attr('opacity', 1);
                  const nativeEvent = getNativeEvent(event) as MouseEvent;
                  interactions.onAspectHover(
                    {
                      type: aspectType!,
                      p1: p1.name,
                      p2: p2.name,
                      angle: minor,
                    },
                    nativeEvent,
                  );
                })
                .on('mouseleave', function () {
                  if (!interactions.enabled) return;
                  line.attr('stroke-width', 1).attr('opacity', 0.6);
                  interactions.onAspectLeave();
                })
                .on('click', function (event: any) {
                  if (!interactions.enabled) return;
                  const nativeEvent = getNativeEvent(event) as MouseEvent;
                  try {
                    interactions.onAspectClick(
                      {
                        type: aspectType!,
                        p1: p1.name,
                        p2: p2.name,
                        angle: minor,
                      },
                      nativeEvent,
                    );
                  } catch (error) {
                    console.error('Error handling aspect click:', error);
                  }
                });
            }
          }
        }
      }

      // === Planets (as SVG icons now) ===
      const adjustedPositions = getAdjustedPlanetPositions(planetPositions);
      const planetIconSize = Math.floor(radius * 0.085);

      planetPositions.forEach((planet) => {
        const adjustedPosition = adjustedPositions.get(planet.name) ?? parseFloat(planet.position);
        const angle =
          (((adjustedPosition - data.houses.firstHouse + rotationOffset) % 360) * Math.PI) / 180;

        const x = planetRadius * Math.cos(angle);
        const y = -planetRadius * Math.sin(angle);

        const group = g
          .append('g')
          .attr('class', 'planet-group')
          .attr('transform', `translate(${x},${y})`);

        const color = (planetColors as any)[planet.name] || '#ffffff';

        renderPlanetIcon(group, planet.name, planetIconSize, color);

        if (interactions) {
          group
            .style('cursor', 'pointer')
            .on('mouseenter', function (event: any) {
              if (!interactions.enabled) return;

              let nativeEvent: MouseEvent;
              if (event && typeof event.clientX === 'number' && typeof event.clientY === 'number') {
                nativeEvent = event as MouseEvent;
              } else {
                nativeEvent = getNativeEvent(event) as MouseEvent;
              }

              try {
                interactions.onPlanetHover(
                  {
                    name: planet.name,
                    symbol: planet.symbol || planet.name,
                    degree: adjustedPosition,
                    signLabel: planet.sign,
                    house: planet.house,
                    color,
                  },
                  nativeEvent,
                );
              } catch (error) {
                console.error('Error showing planet tooltip:', error);
              }
            })
            .on('mouseleave', function () {
              if (!interactions.enabled) return;
              interactions.onPlanetLeave();
            })
            .on('click', function (event: any) {
              if (!interactions.enabled) return;

              let nativeEvent: MouseEvent;
              if (event && typeof event.clientX === 'number' && typeof event.clientY === 'number') {
                nativeEvent = event as MouseEvent;
              } else {
                nativeEvent = getNativeEvent(event) as MouseEvent;
              }

              try {
                interactions.onPlanetClick(
                  {
                    name: planet.name,
                    symbol: planet.symbol || planet.name,
                    degree: adjustedPosition,
                    signLabel: planet.sign,
                    house: planet.house,
                    color,
                  },
                  nativeEvent,
                );
              } catch (error) {
                console.error('Error handling planet click:', error);
              }
            });
        }
      });
    },
    [data, interactions],
  );

  useEffect(() => {
    if (!svgRef.current || !data) return;

    const dimensions = calculateDimensions(width, height);
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

    const initialTransform = d3.zoomIdentity.scale(initialScale);
    g.attr('transform', initialTransform.toString());

    drawChart(g, dimensions, planetPositions);
  }, [data, width, height, drawChart, initialScale]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const g = svg.select<SVGGElement>('.zoom-group');
    if (g.empty()) return;

    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .filter(() => interactions?.enabled ?? true)
      .scaleExtent([0.5, 5])
      .on('zoom', (event: any) => {
        g.attr('transform', event.transform);
      });

    if (interactions?.enabled) {
      svg.call(zoom);

      const currentTransformAttr = g.attr('transform');
      const defaultTransform = d3.zoomIdentity.scale(initialScale);

      let transformToUse = defaultTransform;
      if (currentTransformAttr) {
        const scaleMatch = currentTransformAttr.match(/scale\(([^)]+)\)/);
        if (scaleMatch) {
          const scale = parseFloat(scaleMatch[1]);
          if (!isNaN(scale)) {
            transformToUse = d3.zoomIdentity.scale(scale);
          }
        }
      }

      svg.call(zoom.transform, transformToUse);

      svg.on('dblclick.zoom', () => {
        svg.transition().duration(750).call(zoom.transform, defaultTransform);
      });
    } else {
      svg.on('.zoom', null);
      svg.on('dblclick.zoom', null);
    }
  }, [interactions?.enabled, initialScale]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const enabled = interactions?.enabled ?? true;

    svg
      .selectAll<SVGGElement, unknown>('.zodiac-sign')
      .style('pointer-events', enabled ? 'auto' : 'none')
      .style('cursor', enabled ? 'pointer' : 'default');

    svg
      .selectAll<SVGPathElement, unknown>('.house-highlight')
      .style('pointer-events', enabled ? 'all' : 'none')
      .style('cursor', enabled ? 'pointer' : 'default');

    svg
      .selectAll<SVGLineElement, unknown>('.house-cusp-line')
      .style('pointer-events', enabled ? 'all' : 'none')
      .style('cursor', enabled ? 'pointer' : 'default');

    svg
      .selectAll<SVGLineElement, unknown>('.aspect-hit')
      .style('pointer-events', enabled ? 'stroke' : 'none')
      .style('cursor', enabled ? 'pointer' : 'default');

    svg
      .selectAll<SVGGElement, unknown>('.planet-group')
      .style('pointer-events', enabled ? 'all' : 'none')
      .style('cursor', enabled ? 'pointer' : 'default');
  }, [interactions?.enabled]);

  if (!data) return null;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg ref={svgRef} className="w-full h-full max-w-[600px] max-h-[600px]" />
    </div>
  );
};

export default AstroWheel;
