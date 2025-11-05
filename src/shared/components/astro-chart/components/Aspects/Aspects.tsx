import * as d3 from 'd3';
import type { ChartDimensions } from '../../types';
import { CHART_COLORS } from '../../utils/constants';

interface AspectsProps {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  dimensions: ChartDimensions;
}

export function Aspects({ g, dimensions }: AspectsProps) {
  // Placeholder: draw a center dot
  g.selectAll('.aspects-center').data([0]).join('circle')
    .attr('class', 'aspects-center')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 2)
    .attr('fill', CHART_COLORS.primary);
}


