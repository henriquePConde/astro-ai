import { AuthCallbackContainer } from '@/features/auth/components/auth-callback/auth-callback.container';

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
export default function AuthCallbackPage() {
  return <AuthCallbackContainer />;
}
