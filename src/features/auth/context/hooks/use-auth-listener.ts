import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabaseBrowser } from '@/shared/services/supabase-browser';
import { authKeys } from '../../services/auth.keys';
import { syncServerSession } from '../../services/auth.service';

/**
 * Manages Supabase auth state change listener and cache synchronization.
 * Handles side effects for auth state changes.
 * Also ensures users exist in Prisma database when they sign in.
 */
export function useAuthListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = supabaseBrowser();

    // @ts-expect-error debug only
    if (typeof window !== 'undefined') window.sb = supabase;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const u = session?.user
        ? { id: session.user.id, email: session.user.email ?? undefined }
        : null;

      // keep cache synced so UI flips instantly
      queryClient.setQueryData(authKeys.user(), u);
      queryClient.invalidateQueries({ queryKey: authKeys.user(), refetchType: 'active' });

      // sync cookies on SIGNED_IN / TOKEN_REFRESHED
      await syncServerSession(session?.access_token, session?.refresh_token);

      // Ensure user exists in Prisma database when they sign in
      // This handles cases where:
      // 1. User signs in via Google OAuth (first time or returning)
      // 2. User signs in via email/password (if they weren't created before)
      // 3. User's session is restored from storage
      if (event === 'SIGNED_IN' && session?.user && session?.access_token) {
        try {
          const response = await fetch('/api/auth/ensure-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${session.access_token}`,
            },
            credentials: 'include',
            body: JSON.stringify({
              userId: session.user.id,
              email: session.user.email || '',
              name:
                session.user.user_metadata?.full_name ||
                session.user.user_metadata?.name ||
                session.user.user_metadata?.display_name ||
                null,
            }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
            console.error('[useAuthListener] Failed to ensure user in Prisma:', {
              status: response.status,
              statusText: response.statusText,
              error: errorData,
            });
          } else {
            console.log('[useAuthListener] User ensured in Prisma successfully');
          }
        } catch (error) {
          console.error('[useAuthListener] Error ensuring user:', error);
          // Don't fail - user exists in Supabase Auth
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);
}
