import * as d3 from 'd3';
import type { ChartDimensions, ChartDataMinimal } from '../../types';
import { CHART_COLORS } from '../../utils/constants';

interface HousesProps {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  data: ChartDataMinimal;
  dimensions: ChartDimensions;
  onHouseHover?: (houseNumber: number, x: number, y: number, name?: string) => void;
  onHouseLeave?: () => void;
}

export function Houses({ g, data, dimensions }: HousesProps) {
  // Placeholder: draw a simple ring to indicate where houses will be rendered
  const r = dimensions.radius * 0.45;
  g.selectAll('.house-ring')
    .data([0])
    .join('circle')
    .attr('class', 'house-ring')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', r)
    .attr('fill', 'none')
    .attr('stroke', CHART_COLORS.secondary)
    .attr('stroke-dasharray', '4,3');
}
