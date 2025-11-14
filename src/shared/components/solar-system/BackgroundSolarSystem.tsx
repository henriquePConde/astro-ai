'use client';

import { Box, useTheme } from '@mui/material';
import { GeocentricSystem } from './geocentric-system';
import type { ReactElement } from 'react';

type BackgroundSolarSystemProps = {
  overlayOpacity?: number;
};

export function BackgroundSolarSystem({
  overlayOpacity = 0.8,
}: BackgroundSolarSystemProps): ReactElement {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <GeocentricSystem onIntroEnd={() => {}} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          background: `linear-gradient(135deg, ${theme.cosmic.colors.deepSpace} 0%, ${theme.cosmic.colors.spaceCard} 100%)`,
          opacity: overlayOpacity,
        }}
      />
    </Box>
  );
}
