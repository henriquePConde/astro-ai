'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import * as d3 from 'd3';
import type { ChartData, ChartDimensions, PlanetInfo } from './types';
import { getPlanetColor } from '@/shared/config/planet-colors';
import { calculatePlanetPositions, getAdjustedPlanetPositions } from './utils/planetUtils';
import { getSignInfo } from './utils/signUtils';
import { useOptionalChartInteractions } from '@/features/home/components/chart-experience/context/chart-interactions.context';
import { useOptionalMobileChartInteractions } from '@/features/home/components/chart-experience/context/mobile-chart-interactions.context';
import { renderZodiacIcon } from './utils/zodiac';
import { renderPlanetIcon } from './utils/planetIconUtils';

interface AstroWheelProps {
  data: ChartData | null;
  width?: number;
  height?: number;
  initialScale?: number; // Default initial zoom scale (default: 0.7 for regular view, 1.0 for PDF)
  enableMobileInteractions?: boolean; // Enable mobile interactions (for mobile expand view)
  enableZoomPan?: boolean; // Enable zoom/pan interactions (disabled for regular mobile view)
}

// Keep the canvas size the same, but use a slightly smaller default zoom scale
// so the wheel appears visually smaller without changing the SVG dimensions.
const AstroWheel = ({
  data,
  width = 800,
  height = 800,
  initialScale = 0.6,
  enableMobileInteractions = false,
  enableZoomPan,
}: AstroWheelProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const interactions = useOptionalChartInteractions();
  const mobileInteractions = useOptionalMobileChartInteractions();
  const [effectiveInitialScale, setEffectiveInitialScale] = useState(initialScale);
  const [isDesktopViewport, setIsDesktopViewport] = useState<boolean | null>(null);

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

  // Determine which interactions to use based on viewport and mobile interactions flag
  // Desktop: use desktop interactions
  // Mobile with enableMobileInteractions: use mobile interactions (modal-based)
  // Mobile without enableMobileInteractions: no interactions (read-only)
  const desktopInteractions = isDesktopViewport ? interactions : null;
  const activeInteractions = isDesktopViewport
    ? interactions
    : enableMobileInteractions && mobileInteractions
      ? mobileInteractions
      : null;

  // Get modal state to force zoom reinitialization when modal closes
  const isModalOpen = mobileInteractions?.isModalOpen ?? false;

  // Determine if zoom/pan should be enabled
  // Default behavior: enabled on desktop, disabled on mobile unless explicitly enabled
  const shouldEnableZoomPan =
    enableZoomPan !== undefined ? enableZoomPan : (isDesktopViewport ?? false);

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

              if (activeInteractions) {
                group
                  .style('cursor', 'pointer')
                  .on('mouseenter', function (event: any) {
                    // Only show hover effects and tooltips on desktop
                    if (!desktopInteractions?.enabled) return;
                    const sel = d3.select<SVGGElement, unknown>(this);
                    const originalTransform = sel.attr('transform') || '';
                    // Store original transform so we can restore it on mouseleave
                    sel.attr('data-original-transform', originalTransform);
                    sel.attr('transform', `${originalTransform} scale(1.18)`);

                    const nativeEvent = getNativeEvent(event) as MouseEvent;
                    desktopInteractions.onSignHover(sign.signIndex, nativeEvent);
                  })
                  .on('mouseleave', function () {
                    // Only handle hover effects on desktop
                    if (!desktopInteractions?.enabled) return;
                    const sel = d3.select<SVGGElement, unknown>(this);
                    const originalTransform = sel.attr('data-original-transform');
                    if (originalTransform) {
                      sel.attr('transform', originalTransform);
                    }

                    desktopInteractions.onSignLeave();
                  })
                  .on('click', function (event: any) {
                    // Use activeInteractions for clicks (works for both desktop and mobile)
                    const nativeEvent = getNativeEvent(event) as MouseEvent;
                    try {
                      activeInteractions.onSignClick(sign.signIndex, nativeEvent);
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

            if (activeInteractions) {
              group
                .style('cursor', 'pointer')
                .on('mouseenter', function (event: any) {
                  // Only show hover effects and tooltips on desktop
                  if (!desktopInteractions?.enabled) return;
                  const sel = d3.select<SVGGElement, unknown>(this);
                  const originalTransform = sel.attr('transform') || '';
                  // Store original transform so we can restore it on mouseleave
                  sel.attr('data-original-transform', originalTransform);
                  sel.attr('transform', `${originalTransform} scale(1.18)`);

                  const nativeEvent = getNativeEvent(event) as MouseEvent;
                  desktopInteractions.onSignHover(sign.signIndex, nativeEvent);
                })
                .on('mouseleave', function () {
                  // Only handle hover effects on desktop
                  if (!desktopInteractions?.enabled) return;
                  const sel = d3.select<SVGGElement, unknown>(this);
                  const originalTransform = sel.attr('data-original-transform');
                  if (originalTransform) {
                    sel.attr('transform', originalTransform);
                  }

                  desktopInteractions.onSignLeave();
                })
                .on('click', function (event: any) {
                  // Use activeInteractions for clicks (works for both desktop and mobile)
                  const nativeEvent = getNativeEvent(event) as MouseEvent;
                  try {
                    activeInteractions.onSignClick(sign.signIndex, nativeEvent);
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

        if (activeInteractions) {
          line
            .style('cursor', 'pointer')
            .on('mouseenter', function (event: any) {
              // Only show hover effects and tooltips on desktop
              if (!desktopInteractions?.enabled) return;
              const nativeEvent = getNativeEvent(event) as MouseEvent;
              desktopInteractions.onHouseHover(
                {
                  number: index + 1,
                  degree: cusp,
                },
                nativeEvent,
              );
            })
            .on('mouseleave', function () {
              // Only handle hover effects on desktop
              if (!desktopInteractions?.enabled) return;
              desktopInteractions.onHouseLeave();
            })
            .on('click', function (event: any) {
              // Use activeInteractions for clicks (works for both desktop and mobile)
              const nativeEvent = getNativeEvent(event) as MouseEvent;
              try {
                activeInteractions.onHouseClick(
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

      // === House sector highlight overlays ===
      if (activeInteractions) {
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
              // Only show hover effects and tooltips on desktop
              if (!desktopInteractions?.enabled) return;
              sector.attr('fill-opacity', 0.15).attr('stroke-opacity', 0.9);
              const nativeEvent = getNativeEvent(event) as MouseEvent;
              desktopInteractions.onHouseHover(
                {
                  number: houseNumber,
                  degree: startCusp,
                },
                nativeEvent,
              );
            })
            .on('mouseleave', function () {
              // Only handle hover effects on desktop
              if (!desktopInteractions?.enabled) return;
              sector.attr('fill-opacity', 0).attr('stroke-opacity', 0);
              desktopInteractions.onHouseLeave();
            })
            .on('click', function (event: any) {
              // Use activeInteractions for clicks (works for both desktop and mobile)
              const nativeEvent = getNativeEvent(event) as MouseEvent;
              try {
                activeInteractions.onHouseClick(
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

      g.selectAll<SVGGElement, unknown>('.zodiac-sign').raise();

      // === Aspects ===
      const aspectGroup = g.append('g').attr('class', 'aspects');

      // Orb configuration: [planets, sun/moon/angles]
      const ASPECT_ORBS = {
        Conjunction: { planets: 7, major: 9 },
        Opposition: { planets: 7, major: 9 },
        Square: { planets: 6, major: 7.5 },
        Trine: { planets: 6, major: 7.5 },
        Sextile: { planets: 4, major: 5 },
      } as const;

      const ASPECT_DEGREES = {
        Conjunction: 0,
        Opposition: 180,
        Square: 90,
        Trine: 120,
        Sextile: 60,
      } as const;

      // Check if a planet is a major body (Sun, Moon, or Angle - ASC/MC)
      const isMajorBody = (planetName: string): boolean => {
        const nameLower = planetName.toLowerCase();
        return (
          nameLower === 'sun' ||
          nameLower === 'moon' ||
          nameLower === 'ascendant' ||
          nameLower === 'mc' ||
          nameLower === 'asc'
        );
      };

      // Get the appropriate orb for an aspect based on whether planets are major bodies
      const getAspectOrb = (
        aspectName: keyof typeof ASPECT_ORBS,
        planet1Name: string,
        planet2Name: string,
      ): number => {
        const isMajor1 = isMajorBody(planet1Name);
        const isMajor2 = isMajorBody(planet2Name);
        const hasMajorBody = isMajor1 || isMajor2;

        return hasMajorBody ? ASPECT_ORBS[aspectName].major : ASPECT_ORBS[aspectName].planets;
      };

      for (let i = 0; i < planetPositions.length; i++) {
        for (let j = i + 1; j < planetPositions.length; j++) {
          const p1 = planetPositions[i]!;
          const p2 = planetPositions[j]!;

          const angle = Math.abs(parseFloat(p1.position) - parseFloat(p2.position));
          const minor = angle > 180 ? 360 - angle : angle;

          let aspectType: string | null = null;
          let color: string | null = null;

          // Check each aspect type with appropriate orb
          for (const [aspectName, degree] of Object.entries(ASPECT_DEGREES)) {
            const orb = getAspectOrb(aspectName as keyof typeof ASPECT_ORBS, p1.name, p2.name);
            const angleDiff = Math.abs(minor - degree);

            if (angleDiff <= orb || (degree === 0 && Math.abs(minor - 360) <= orb)) {
              if (aspectName === 'Conjunction') {
                aspectType = 'Conjunction';
                color = '#5C5C5C';
              } else if (aspectName === 'Sextile') {
                aspectType = 'Sextile';
                color = '#6A89CC';
              } else if (aspectName === 'Square') {
                aspectType = 'Square';
                color = '#E74C3C';
              } else if (aspectName === 'Trine') {
                aspectType = 'Trine';
                color = '#27AE60';
              } else if (aspectName === 'Opposition') {
                aspectType = 'Opposition';
                color = '#E74C3C';
              }
              break;
            }
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
              .style('pointer-events', desktopInteractions ? 'none' : 'auto');

            if (activeInteractions) {
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
                  // Only show hover effects and tooltips on desktop
                  if (!desktopInteractions?.enabled) return;
                  line.attr('stroke-width', 2.5).attr('opacity', 1);
                  const nativeEvent = getNativeEvent(event) as MouseEvent;
                  desktopInteractions.onAspectHover(
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
                  // Only handle hover effects on desktop
                  if (!desktopInteractions?.enabled) return;
                  line.attr('stroke-width', 1).attr('opacity', 0.6);
                  desktopInteractions.onAspectLeave();
                })
                .on('click', function (event: any) {
                  // Use activeInteractions for clicks (works for both desktop and mobile)
                  const nativeEvent = getNativeEvent(event) as MouseEvent;
                  try {
                    activeInteractions.onAspectClick(
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
      // Slightly larger multiplier so planets are more pronounced
      const planetIconSize = Math.floor(radius * 0.105);

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

        // Get color from original planet data if available, otherwise fallback to shared palette
        const originalPlanet = data.planets.find((p) => p.name === planet.name);
        const color = originalPlanet?.color || getPlanetColor(planet.name);

        // Draw SVG icon for the planet
        renderPlanetIcon(group, planet.name, planetIconSize, color);

        // Hover highlight + interactions
        if (activeInteractions) {
          group
            .style('cursor', 'pointer')
            .on('mouseenter', function (event: any) {
              // Only show hover effects and tooltips on desktop
              if (!desktopInteractions?.enabled) return;

              const sel = d3.select<SVGGElement, unknown>(this);
              const originalTransform = sel.attr('transform') || '';
              // Store original transform so we can restore it on mouseleave
              sel.attr('data-original-transform', originalTransform);
              sel.attr('transform', `${originalTransform} scale(1.18)`);

              let nativeEvent: MouseEvent;
              if (event && typeof event.clientX === 'number' && typeof event.clientY === 'number') {
                nativeEvent = event as MouseEvent;
              } else {
                nativeEvent = getNativeEvent(event) as MouseEvent;
              }

              try {
                desktopInteractions.onPlanetHover(
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
              // Only handle hover effects on desktop
              if (!desktopInteractions?.enabled) return;

              const sel = d3.select<SVGGElement, unknown>(this);
              const originalTransform = sel.attr('data-original-transform');
              if (originalTransform) {
                sel.attr('transform', originalTransform);
              }

              desktopInteractions.onPlanetLeave();
            })
            .on('click', function (event: any) {
              // Use activeInteractions for clicks (works for both desktop and mobile)
              let nativeEvent: MouseEvent;
              if (event && typeof event.clientX === 'number' && typeof event.clientY === 'number') {
                nativeEvent = event as MouseEvent;
              } else {
                nativeEvent = getNativeEvent(event) as MouseEvent;
              }

              try {
                activeInteractions.onPlanetClick(
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
    [data, desktopInteractions, activeInteractions],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateScaleForViewport = () => {
      const viewportWidth = window.innerWidth;

      const isMobile = viewportWidth < 640;
      const isTablet = viewportWidth >= 640 && viewportWidth < 1200;
      const isDesktop = viewportWidth >= 1200;

      setIsDesktopViewport(isDesktop);

      // On mobile viewports, start even more zoomed out than the provided initialScale
      if (isMobile) {
        setEffectiveInitialScale(initialScale * 0.6);
      } else if (isTablet) {
        // Tablet view (between mobile breakpoint and desktop): make the wheel
        // appear a bit larger than the base initialScale.
        setEffectiveInitialScale(initialScale * 1.6);
      } else {
        setEffectiveInitialScale(initialScale);
      }
    };

    updateScaleForViewport();
    window.addEventListener('resize', updateScaleForViewport);

    return () => {
      window.removeEventListener('resize', updateScaleForViewport);
    };
  }, [initialScale]);

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

    const initialTransform = d3.zoomIdentity.scale(effectiveInitialScale);
    g.attr('transform', initialTransform.toString());

    drawChart(g, dimensions, planetPositions);
  }, [data, width, height, drawChart, effectiveInitialScale]);

  useEffect(() => {
    // Only set up zoom once the chart (and its zoom group) has been rendered
    if (!svgRef.current || !data) return;

    // Capture the current ref value for use in cleanup
    const svgElement = svgRef.current;
    const svg = d3.select(svgElement);
    const g = svg.select<SVGGElement>('.zoom-group');
    if (g.empty()) return;

    // Always remove any existing zoom behavior first to ensure clean state
    svg.on('.zoom', null);
    svg.on('dblclick.zoom', null);

    // Allow zooming out at least as far as the current effectiveInitialScale,
    // and a bit further (down to ~0.3) for flexibility.
    const minScale = Math.min(0.3, effectiveInitialScale);

    if (shouldEnableZoomPan) {
      const zoom = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([minScale, 5])
        .on('zoom', (event: any) => {
          g.attr('transform', event.transform);
        });

      // Attach zoom behavior to SVG
      svg.call(zoom);

      const currentTransformAttr = g.attr('transform');
      const defaultTransform = d3.zoomIdentity.scale(effectiveInitialScale);

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
    }

    // Cleanup function to ensure zoom is properly removed when component unmounts or shouldEnableZoomPan changes
    return () => {
      if (svgElement) {
        const cleanupSvg = d3.select(svgElement);
        cleanupSvg.on('.zoom', null);
        cleanupSvg.on('dblclick.zoom', null);
      }
    };
  }, [data, shouldEnableZoomPan, effectiveInitialScale, isModalOpen]);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const enabled = activeInteractions !== null;

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
  }, [activeInteractions]);

  if (!data) return null;

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
};

export default AstroWheel;
