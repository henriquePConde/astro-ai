import * as d3 from 'd3';
import type { ChartDimensions } from '../../types';
import { CHART_COLORS } from '../../utils/constants';

interface ZodiacSignsProps {
  g: d3.Selection<SVGGElement, unknown, null, undefined>;
  dimensions: ChartDimensions;
}

export function ZodiacSigns({ g, dimensions }: ZodiacSignsProps) {
  // Placeholder: draw outer ring for signs
  g.selectAll('.zodiac-ring')
    .data([0])
    .join('circle')
    .attr('class', 'zodiac-ring')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', dimensions.radius)
    .attr('fill', 'none')
    .attr('stroke', CHART_COLORS.secondary);
}
