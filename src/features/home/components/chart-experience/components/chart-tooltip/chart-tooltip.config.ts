export const CHART_TOOLTIP_CONFIG = {
  kinds: {
    planet: 'planet',
    house: 'house',
    sign: 'sign',
    aspect: 'aspect',
  },
  copy: {
    house: 'House',
    in: 'in',
    cusp: 'Cusp:',
    angle: 'Angle:',
    sign: 'Sign',
    separator: ' – ',
  },
  ui: {
    degree: {
      decimalPlaces: 2,
    },
  },
} as const;
