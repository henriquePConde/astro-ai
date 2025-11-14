import * as d3 from 'd3';
import type { ChartDimensions, Planet } from '../../types';

interface PlanetSymbolsProps {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  dimensions: ChartDimensions;
  planets: Planet[];
}

export function PlanetSymbols({ g, dimensions, planets }: PlanetSymbolsProps) {
  // Placeholder: draw simple planet markers on a circle
  const r = dimensions.radius * 0.7;
  const nodes = planets.map((p, i) => ({ angle: (i / Math.max(1, planets.length)) * Math.PI * 2 }));

  const sel = g.selectAll('.planet-marker').data(nodes);
  sel
    .enter()
    .append('circle')
    .attr('class', 'planet-marker')
    .merge(sel as any)
    .attr('cx', (d) => r * Math.cos(d.angle))
    .attr('cy', (d) => r * Math.sin(d.angle))
    .attr('r', 3)
    .attr('fill', '#fff');
  sel.exit().remove();
}
