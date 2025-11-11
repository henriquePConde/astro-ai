/**
 * Configuration and copy text for the login form component.
 * Centralized to avoid magical strings and enable easy content updates.
 */
export const LOGIN_FORM_CONFIG = {
  copy: {
    title: 'Welcome Back',
    subtitle: 'Enter the cosmic realm',
    fields: {
      email: {
        label: 'Email',
      },
      password: {
        label: 'Password',
      },
    },
    button: {
      loading: 'Logging in...',
      default: 'Log in',
    },
    link: {
      prompt: "Don't have an account?",
      text: 'Sign up',
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
      severity: 'error' as const,
    },
  },
  messages: {
    error: {
      loginFailed: 'Login failed',
    },
  },
} as const;
