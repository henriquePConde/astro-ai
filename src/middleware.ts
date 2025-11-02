// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Auth-enforcing middleware for protected routes.
 * - Adds "x-middleware-ran: yes" so you can verify it ran in DevTools.
 * - If Supabase envs are missing, falls back to checking sb- cookies directly.
 * - Redirects to /login?next=... when no session.
 */
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  res.headers.set('x-middleware-ran', 'yes'); // <-- verify in Network tab

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If envs are missing, do a cookie-based fallback so protection still works
  if (!url || !anon) {
    const hasAccess = !!req.cookies.get('sb-access-token')?.value;
    const hasRefresh = !!req.cookies.get('sb-refresh-token')?.value;
    if (!hasAccess && !hasRefresh) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
    return res;
  }

  // Normal path: use Supabase to validate/refresh cookie session
  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return req.cookies.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          res.cookies.set(name, value, options);
        });
      },
    },
  });

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
  } catch {
    // If Supabase throws (e.g. bad env), fall back to cookie check.
    const hasAccess = !!req.cookies.get('sb-access-token')?.value;
    const hasRefresh = !!req.cookies.get('sb-refresh-token')?.value;
    if (!hasAccess && !hasRefresh) {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
  }

  return res;
}

/**
 * IMPORTANT:
 * - Ensure this file sits at project root (same level as `app/`), not under `src/`.
 * - Restart dev server after creating/updating middleware.
 */
export const config = {
  matcher: [
    // enforce both the exact route and any subpaths
    '/protected',
    '/protected/:path*',

    // (Optional) You can broaden this later. Avoid static and auth endpoints.
    // '/((?!_next/static|_next/image|favicon.ico|.well-known|api/auth/sync|api/auth/signout).*)',
  ],
};
