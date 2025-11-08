'use client';

import { Box, Typography } from '@mui/material';
import { useTooltip } from '@/features/chart/context/tooltip.context';

const SIGNS = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces',
];

const getSignLabel = (degree: number, provided?: string) => {
  if (provided) return provided;
  const index = ((Math.floor(degree / 30) % 12) + 12) % 12;
  return SIGNS[index] ?? '—';
};

export function ChartTooltipOverlay() {
  const { tooltip, hideTooltip } = useTooltip();

  if (!tooltip) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: tooltip.y + 12,
        left: tooltip.x + 12,
        maxWidth: 260,
        bgcolor: 'rgba(10,10,20,0.98)',
        color: '#fff',
        borderRadius: 1,
        border: '1px solid rgba(255,255,255,0.15)',
        p: 1.5,
        zIndex: 9999,
        pointerEvents: 'auto',
        boxShadow: 3,
        fontSize: 12,
      }}
    >
      {tooltip.kind === 'planet' && (
        <>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {tooltip.symbol} {tooltip.name}
          </Typography>
          <Typography variant="body2">
            {tooltip.degree.toFixed(2)}° in {getSignLabel(tooltip.degree, tooltip.signLabel)}
          </Typography>
          {tooltip.house != null && <Typography variant="body2">House {tooltip.house}</Typography>}
        </>
      )}

      {tooltip.kind === 'house' && (
        <>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            House {tooltip.number}
          </Typography>
          <Typography variant="body2">Cusp at {tooltip.degree.toFixed(2)}°</Typography>
        </>
      )}

      {tooltip.kind === 'sign' && (
        <>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {SIGNS[tooltip.index] ?? 'Sign'}
          </Typography>
        </>
      )}

      {tooltip.kind === 'aspect' && (
        <>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {tooltip.type.toUpperCase()}
          </Typography>
          {(tooltip.p1 || tooltip.p2) && (
            <Typography variant="body2">
              {tooltip.p1}
              {tooltip.p2 && ` – ${tooltip.p2}`}
            </Typography>
          )}
          {typeof tooltip.angle === 'number' && (
            <Typography variant="body2">Angle {tooltip.angle.toFixed(2)}°</Typography>
          )}
        </>
      )}

      <Box
        sx={{
          mt: 0.5,
          textAlign: 'right',
          cursor: 'pointer',
          fontSize: 10,
          opacity: 0.7,
        }}
        onClick={hideTooltip}
      >
        close
      </Box>
    </Box>
  );
}
