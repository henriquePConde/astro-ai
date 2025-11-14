/**
 * Configuration and copy text for the OTP auth form component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const OTP_AUTH_FORM_CONFIG = {
  copy: {
    title: {
      signedIn: 'Signed in',
      signIn: 'Sign in',
    },
    messages: {
      signedInPrefix: 'Signed in as',
    },
    fields: {
      email: {
        label: 'Email',
      },
    },
    button: {
      loading: 'Sending...',
      default: 'Send magic link',
    },
  },
  fields: {
    email: {
      name: 'email' as const,
      type: 'email' as const,
    },
  },
  ui: {
    title: {
      variant: 'h1' as const,
      component: 'h1' as const,
    },
    signedInTitle: {
      variant: 'h1' as const,
      component: 'h1' as const,
      gutterBottom: true,
    },
    signedInMessage: {
      variant: 'body1' as const,
      paragraph: true,
    },
    button: {
      signOut: {
        variant: 'outlined' as const,
      },
      submit: {
        type: 'submit' as const,
        variant: 'contained' as const,
      },
    },
    alert: {
      severity: 'info' as const,
    },
  },
  messages: {
    error: {
      signInFailed: 'Failed to send magic link',
    },
    success: {
      otpSent: 'Check your email for a sign-in link.',
    },
  },
} as const;
