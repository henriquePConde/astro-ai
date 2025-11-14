/**
 * Configuration and copy text for the auth callback component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const AUTH_CALLBACK_CONFIG = {
  copy: {
    title: {
      loading: 'Completing sign in...',
      error: 'Authentication Error',
    },
    message: {
      loading: 'Please wait while we finish setting up your account.',
      redirecting: 'Redirecting to login...',
    },
  },
  errors: {
    noCode: 'No authorization code provided',
    noUser: 'No user data received',
    unexpected: 'Unexpected error',
  },
  queryParams: {
    code: 'code',
    next: 'next',
    error: 'error',
  },
  errorCodes: {
    noCode: 'no_code',
    noUser: 'no_user',
    authenticationFailed: 'authentication_failed',
    unexpectedError: 'unexpected_error',
  },
  routes: {
    login: '/login',
    home: '/',
  },
  timing: {
    sessionRetryDelay: 300,
    sessionRetryCount: 3,
    sessionStabilizationDelay: 100,
  },
} as const;
