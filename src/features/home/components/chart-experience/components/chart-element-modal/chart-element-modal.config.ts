export const CHART_ELEMENT_MODAL_CONFIG = {
  copy: {
    title: {
      planet: 'Planet Information',
      house: 'House Information',
      sign: 'Sign Information',
      aspect: 'Aspect Information',
    },
    buttons: {
      askAI: 'Ask AI Interpreter',
      close: 'Close',
    },
    labels: {
      planet: 'Planet',
      sign: 'Sign',
      house: 'House',
      degree: 'Degree',
      aspect: 'Aspect',
      between: 'between',
      angle: 'Angle',
      rulerInfo: 'Ruler Information',
      houseInfo: 'House Information',
    },
    fallbacks: {
      unknownElement: 'Unknown chart element',
      noData: 'No data available',
    },
  },
  ui: {
    backdropOpacity: 0.8,
    maxWidth: 400,
    borderRadius: 2,
    spacing: {
      content: 3,
      buttons: 2,
      items: 1.5,
    },
  },
} as const;
