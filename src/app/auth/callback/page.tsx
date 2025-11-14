'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabaseBrowser } from '@/shared/services/supabase-browser';

/**
 * OAuth callback page that handles the redirect from Supabase after OAuth authentication.
 * This page runs in the browser to handle PKCE code exchange.
 *
 * Flow:
 * 1. Supabase redirects here with a code after OAuth authentication
 * 2. Browser Supabase client exchanges the code for a session (PKCE verifier is in browser)
 * 3. We ensure the user exists in Prisma database via API
 * 4. Redirect to home page or originally requested page
 */
function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const supabase = supabaseBrowser();
        const code = searchParams.get('code');
        const next = searchParams.get('next') || '/';

        if (!code) {
          setError('No authorization code provided');
          router.push('/login?error=no_code');
          return;
        }

        // Exchange the code for a session using the browser client (has PKCE verifier)
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

        if (exchangeError) {
          console.error('[auth/callback] Error exchanging code for session:', exchangeError);
          setError(exchangeError.message);
          router.push('/login?error=authentication_failed');
          return;
        }

        if (data?.user && data?.session) {
          // Sync session to server cookies first
          try {
            await fetch('/api/auth/sync', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              credentials: 'include',
              body: JSON.stringify({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
              }),
            });
          } catch (syncError) {
            console.error('[auth/callback] Error syncing session:', syncError);
            // Continue anyway - session is in browser
          }

          // Ensure user exists in Prisma database via API
          try {
            const response = await fetch('/api/auth/ensure-user', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.session.access_token}`,
              },
              credentials: 'include',
              body: JSON.stringify({
                userId: data.user.id,
                email: data.user.email || '',
                name:
                  data.user.user_metadata?.full_name ||
                  data.user.user_metadata?.name ||
                  data.user.user_metadata?.display_name ||
                  null,
              }),
            });

            if (!response.ok) {
              const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
              console.error('[auth/callback] Failed to ensure user in Prisma:', {
                status: response.status,
                statusText: response.statusText,
                error: errorData,
              });
              // Don't fail the auth flow - user exists in Supabase Auth
            } else {
              console.log('[auth/callback] User ensured in Prisma successfully');
            }
          } catch (userError) {
            console.error('[auth/callback] Error ensuring user:', userError);
            // Don't fail the auth flow - user exists in Supabase Auth
          }

          // Wait a brief moment to ensure session is fully set in browser storage
          // This prevents the login page from flashing
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Use replace instead of push to avoid adding to history
          // Also ensure we don't redirect to login if already authenticated
          const redirectTo = next === '/login' ? '/' : next;
          router.replace(redirectTo);
        } else {
          setError('No user data received');
          router.push('/login?error=no_user');
        }
      } catch (err) {
        console.error('[auth/callback] Unexpected error:', err);
        setError(err instanceof Error ? err.message : 'Unexpected error');
        router.push('/login?error=unexpected_error');
      }
    };

    handleCallback();
  }, [router, searchParams]);

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Authentication Error</h1>
        <p>{error}</p>
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Completing sign in...</h1>
      <p>Please wait while we finish setting up your account.</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Completing sign in...</h1>
          <p>Please wait while we finish setting up your account.</p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  );
}
