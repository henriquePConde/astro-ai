export interface AuthCallbackViewProps {
  error: string | null;
  isLoading: boolean;
  config: typeof import('./auth-callback.config').AUTH_CALLBACK_CONFIG;
}

export interface UseAuthCallbackParams {
  code: string | null;
  next: string | null;
}

export interface UseAuthCallbackReturn {
  error: string | null;
  isLoading: boolean;
}
