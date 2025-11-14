/**
 * Configuration and copy text for the header auth component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const HEADER_AUTH_CONFIG = {
  copy: {
    links: {
      login: 'Log in',
      signup: 'Sign up',
    },
    button: {
      signOut: 'Sign out',
    },
  },
  ui: {
    links: {
      underline: 'hover' as const,
    },
    email: {
      variant: 'body2' as const,
    },
    button: {
      variant: 'outlined' as const,
      size: 'small' as const,
    },
    loading: {
      size: 20,
    },
  },
} as const;
