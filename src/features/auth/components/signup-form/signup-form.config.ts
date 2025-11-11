/**
 * Configuration and copy text for the signup form component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const SIGNUP_FORM_CONFIG = {
  copy: {
    title: 'Join the Cosmos',
    subtitle: 'Begin your astrological journey',
    fields: {
      email: {
        label: 'Email',
      },
      password: {
        label: 'Password',
      },
      confirmPassword: {
        label: 'Confirm password',
      },
    },
    button: {
      loading: 'Creating account...',
      default: 'Create account',
    },
    link: {
      prompt: 'Already have an account?',
      text: 'Log in',
    },
  },
  fields: {
    email: {
      name: 'email' as const,
      type: 'email' as const,
    },
    password: {
      name: 'password' as const,
      type: 'password' as const,
    },
    confirmPassword: {
      name: 'confirmPassword' as const,
      type: 'password' as const,
    },
  },
  ui: {
    title: {
      variant: 'h1' as const,
      component: 'h1' as const,
    },
    subtitle: {
      variant: 'body1' as const,
    },
    linkText: {
      variant: 'body2' as const,
    },
    button: {
      type: 'submit' as const,
      variant: 'contained' as const,
    },
    alert: {
      error: {
        severity: 'error' as const,
      },
      success: {
        severity: 'success' as const,
      },
    },
  },
  messages: {
    error: {
      signupFailed: 'Signup failed',
    },
    success: {
      signupSuccess: 'Account created. Redirecting…',
    },
  },
} as const;
