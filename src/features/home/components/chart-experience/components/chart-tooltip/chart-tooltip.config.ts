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
    clickToAsk: 'Click to ask the AI interpreter',
  },
  ui: {
    degree: {
      decimalPlaces: 2,
    },
  },
} as const;
