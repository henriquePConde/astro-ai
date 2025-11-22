/**
 * Configuration and copy text for the profile component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const PROFILE_CONFIG = {
  copy: {
    menu: {
      login: 'Log in',
      signup: 'Sign up',
      myCharts: 'My charts',
      signOut: 'Sign out',
    },
  },
  ui: {
    avatar: {
      size: 40,
    },
  },
} as const;
