'use client';

import { useMemo } from 'react';
import type { ChartData } from '../../services/chart.service';

export function ChartSvg({ data }: { data: ChartData }) {
  const size = 560;
  const center = size / 2;
  const radius = size * 0.45;

  const planetAngles = useMemo(() => {
    const n = Math.max(1, data.planets.length);
    return data.planets.map((_, i) => (i / n) * Math.PI * 2);
  }, [data.planets]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${center}, ${center})`}>
        <circle cx={0} cy={0} r={radius} fill="none" stroke="#999" />
        {planetAngles.map((a, i) => {
          const x = radius * Math.cos(a);
          const y = radius * Math.sin(a);
          return <circle key={i} cx={x} cy={y} r={4} fill="#fff" />;
        })}
      </g>
    </svg>
  );
}
