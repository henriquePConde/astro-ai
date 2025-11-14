/**
 * Configuration and copy text for the chart tooltip overlay component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const CHART_TOOLTIP_OVERLAY_CONFIG = {
  copy: {
    house: {
      label: 'House',
      cusp: 'Cusp at',
    },
    planet: {
      in: 'in',
    },
    sign: {
      fallback: 'Sign',
    },
    aspect: {
      angle: 'Angle',
    },
    close: 'close',
  },
  ui: {
    typography: {
      title: {
        variant: 'subtitle2' as const,
      },
      content: {
        variant: 'body2' as const,
      },
    },
    formatting: {
      degree: {
        decimalPlaces: 2,
        symbol: '°',
      },
      aspect: {
        transform: 'uppercase' as const,
      },
    },
    position: {
      offset: 12,
    },
  },
} as const;
