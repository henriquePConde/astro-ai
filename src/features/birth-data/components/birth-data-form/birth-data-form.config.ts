/**
 * Configuration and copy text for the birth data form component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const BIRTH_DATA_FORM_CONFIG = {
  copy: {
    title: 'Birth Chart Calculator',
    subtitle: 'Enter your birth details to reveal your astrological blueprint',
    usage: {
      prefix: 'You have generated',
      suffix: 'charts today.',
      of: 'of',
    },
    fields: {
      name: {
        label: 'Name',
      },
      year: {
        label: 'Year',
      },
      month: {
        label: 'Month',
      },
      day: {
        label: 'Day',
      },
      hour: {
        label: 'Hour',
      },
      minute: {
        label: 'Minute',
      },
      country: {
        label: 'Country',
      },
      city: {
        label: 'City',
      },
    },
    button: {
      continue: 'Continue',
      tooltipLimitReached: (timeRemaining: string) =>
        `You have reached the limit of chart generations. Try again in ${timeRemaining}!`,
    },
  },
  fields: {
    name: {
      name: 'name' as const,
    },
    year: {
      name: 'year' as const,
      type: 'number' as const,
    },
    month: {
      name: 'month' as const,
      type: 'number' as const,
    },
    day: {
      name: 'day' as const,
      type: 'number' as const,
    },
    hour: {
      name: 'hour' as const,
      type: 'number' as const,
    },
    minute: {
      name: 'minute' as const,
      type: 'number' as const,
    },
    nation: {
      name: 'nation' as const,
    },
    city: {
      name: 'city' as const,
    },
  },
  ui: {
    header: {
      title: {
        component: 'h2' as const,
      },
      subtitle: {
        component: 'p' as const,
      },
    },
    button: {
      type: 'submit' as const,
      variant: 'contained' as const,
    },
    loading: {
      spinnerSize: 16,
    },
  },
} as const;
