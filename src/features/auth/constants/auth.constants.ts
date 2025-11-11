/**
 * Authentication routes used throughout the auth feature.
 * Centralized to avoid magical strings and enable easy route updates.
 * These are shared infrastructure constants, not component-specific config.
 */
export const AUTH_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  AUTH: '/auth',
} as const;

/**
 * Gets the current origin URL for redirect purposes.
 * Used for OTP email redirects and similar auth flows.
 */
export const getAuthRedirectOrigin = (): string => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for SSR (shouldn't happen in client components)
  return '';
};
