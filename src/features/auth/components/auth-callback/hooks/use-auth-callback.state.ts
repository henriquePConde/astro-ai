import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  useExchangeCodeForSessionMutation,
  useSyncServerSessionMutation,
  useEnsureUserMutation,
} from '@/features/auth/services/auth.mutations';
import { authKeys } from '@/features/auth/services/auth.keys';
import { AUTH_CALLBACK_CONFIG } from '../auth-callback.config';
import type { UseAuthCallbackParams, UseAuthCallbackReturn } from '../auth-callback.types';

/**
 * Hook that handles the OAuth callback flow:
 * 1. Exchange code for session
 * 2. Sync session to server
 * 3. Ensure user exists in Prisma
 * 4. Redirect to destination
 * UI state hook - follows the *.state.ts pattern.
 */
export function useAuthCallback({ code, next }: UseAuthCallbackParams): UseAuthCallbackReturn {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const exchangeMutation = useExchangeCodeForSessionMutation();
  const syncMutation = useSyncServerSessionMutation();
  const ensureUserMutation = useEnsureUserMutation();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (!code) {
          setError(AUTH_CALLBACK_CONFIG.errors.noCode);
          router.push(
            `${AUTH_CALLBACK_CONFIG.routes.login}?error=${AUTH_CALLBACK_CONFIG.errorCodes.noCode}`,
          );
          setIsLoading(false);
          return;
        }

        const redirectTo = next || AUTH_CALLBACK_CONFIG.routes.home;

        // Exchange the code for a session
        const exchangeResult = await exchangeMutation.mutateAsync(code);

        if (exchangeResult.error || !exchangeResult.data?.session) {
          const errorMessage =
            exchangeResult.error?.message || AUTH_CALLBACK_CONFIG.errors.unexpected;
          setError(errorMessage);
          router.push(
            `${AUTH_CALLBACK_CONFIG.routes.login}?error=${AUTH_CALLBACK_CONFIG.errorCodes.authenticationFailed}`,
          );
          setIsLoading(false);
          return;
        }

        const { user, session } = exchangeResult.data;

        if (!user || !session) {
          setError(AUTH_CALLBACK_CONFIG.errors.noUser);
          router.push(
            `${AUTH_CALLBACK_CONFIG.routes.login}?error=${AUTH_CALLBACK_CONFIG.errorCodes.noUser}`,
          );
          setIsLoading(false);
          return;
        }

        // Sync session to server cookies
        await syncMutation.mutateAsync({
          access_token: session.access_token,
          refresh_token: session.refresh_token,
        });

        // Update query cache
        queryClient.setQueryData(authKeys.user(), {
          id: user.id,
          email: user.email ?? undefined,
        });
        queryClient.invalidateQueries({ queryKey: authKeys.user() });

        // Ensure user exists in Prisma database
        await ensureUserMutation.mutateAsync({
          userId: user.id,
          email: user.email || '',
          name:
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            user.user_metadata?.display_name ||
            null,
          accessToken: session.access_token,
        });

        // Wait a brief moment to ensure session is fully set in browser storage
        // This prevents the login page from flashing
        await new Promise((resolve) =>
          setTimeout(resolve, AUTH_CALLBACK_CONFIG.timing.sessionStabilizationDelay),
        );

        // Use replace instead of push to avoid adding to history
        // Also ensure we don't redirect to login if already authenticated
        const finalRedirectTo =
          redirectTo === AUTH_CALLBACK_CONFIG.routes.login
            ? AUTH_CALLBACK_CONFIG.routes.home
            : redirectTo;
        router.replace(finalRedirectTo);
      } catch (err) {
        console.error('[useAuthCallback] Unexpected error:', err);
        const errorMessage =
          err instanceof Error ? err.message : AUTH_CALLBACK_CONFIG.errors.unexpected;
        setError(errorMessage);
        router.push(
          `${AUTH_CALLBACK_CONFIG.routes.login}?error=${AUTH_CALLBACK_CONFIG.errorCodes.unexpectedError}`,
        );
        setIsLoading(false);
      }
    };

    handleCallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, next]);

  return { error, isLoading };
}
