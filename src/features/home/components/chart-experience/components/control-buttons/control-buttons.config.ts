export const CONTROL_BUTTONS_CONFIG = {
  copy: {
    newChart: 'New Chart',
    tooltipLimitReached: (timeRemaining: string) =>
      `You have reached the limit of chart generations. Try again in ${timeRemaining}!`,
  },
  ui: {
    button: {
      variant: 'contained' as const,
    },
  },
} as const;
