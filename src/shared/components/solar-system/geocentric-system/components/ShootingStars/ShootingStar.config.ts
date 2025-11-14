export const SHOOTING_STAR_CONFIG = {
  colorPalette: ['#fff', '#fffacd', '#e6e6fa', '#f0ffff', '#fff0f5'],
  sphere: {
    radius: 0.015,
    widthSegments: 12,
    heightSegments: 12,
    material: {
      transparent: true,
      opacity: 1,
    },
  },
  pointLight: {
    intensity: 0.3,
    distance: 1.5,
    decay: 2,
  },
  cylinder: {
    radiusTop: 0,
    radiusBottom: 0.01,
    height: 0.4,
    radialSegments: 8,
    heightSegments: 1,
    material: {
      transparent: true,
      opacity: 0.5,
    },
  },
} as const;
