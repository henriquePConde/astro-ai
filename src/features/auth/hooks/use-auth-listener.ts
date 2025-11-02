import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabaseBrowser } from '@/shared/services/supabase-browser';
import { authKeys } from '../services/auth.keys';
import { syncServerSession } from './use-session-sync';

/**
 * Manages Supabase auth state change listener and cache synchronization.
 * Handles side effects for auth state changes.
 */
export function useAuthListener() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const supabase = supabaseBrowser();

    // @ts-expect-error debug only
    if (typeof window !== 'undefined') window.sb = supabase;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user
        ? { id: session.user.id, email: session.user.email ?? undefined }
        : null;

      // keep cache synced so UI flips instantly
      queryClient.setQueryData(authKeys.user(), u);
      queryClient.invalidateQueries({ queryKey: authKeys.user(), refetchType: 'active' });

      // sync cookies on SIGNED_IN / TOKEN_REFRESHED
      await syncServerSession(session ?? undefined);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);
}
