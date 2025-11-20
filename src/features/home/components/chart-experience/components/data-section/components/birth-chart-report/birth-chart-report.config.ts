export const BIRTH_CHART_REPORT_CONFIG = {
  copy: {
    title: 'Personalized Birth Chart Report',
    description: 'Generate an AI-written, structured report based on your birth data.',
    button: {
      generate: 'Generate report',
      regenerate: 'Regenerate report',
      generating: 'Generating…',
      downloadPdf: 'Download PDF',
      tooltipLimitReached: (timeRemaining: string) =>
        `You have reached the limit of report generations. Try again in ${timeRemaining}!`,
    },
  },
  ui: {
    button: {
      generate: {
        variant: 'contained' as const,
      },
      download: {
        variant: 'outlined' as const,
      },
    },
    alert: {
      severity: 'error' as const,
    },
    container: {
      maxWidth: 800,
    },
  },
} as const;
