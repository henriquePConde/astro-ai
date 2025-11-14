// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Auth-enforcing middleware for protected routes.
 * - For API routes: returns 401 if no session
 * - For app routes: redirects to /login?next=... if no session
 * - Public routes: /api/health, /api/auth/sync, /api/auth/signout, /api/auth/signup, /api/reports/[id], /api/pdf/validate-token
 */
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip public endpoints
  const publicPaths = [
    '/api/health',
    '/api/auth/sync',
    '/api/auth/signout',
    '/api/auth/signup',
    '/api/auth/callback',
    '/api/auth/ensure-user',
    '/api/pdf/validate-token',
  ];

  // Skip public pages
  const publicPages = ['/auth/callback', '/login', '/signup'];

  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  // Check if this is a public reports endpoint (/api/reports/[id])
  if (
    pathname.startsWith('/api/reports/') &&
    pathname !== '/api/reports' &&
    pathname !== '/api/reports/daily-usage'
  ) {
    return NextResponse.next();
  }

  // Check if this is the PDF preview public route
  if (pathname.startsWith('/pdf-preview/public')) {
    return NextResponse.next();
  }

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  res.headers.set('x-middleware-ran', 'yes');

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Check for Bearer token in Authorization header (for API testing with Postman)
  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    // If Bearer token is present, let the route handler validate it
    // This allows Postman to use Bearer tokens instead of cookies
    return res;
  }

  // If envs are missing, do a cookie-based fallback
  if (!url || !anon) {
    const hasAccess = !!req.cookies.get('sb-access-token')?.value;
    const hasRefresh = !!req.cookies.get('sb-refresh-token')?.value;
    if (!hasAccess && !hasRefresh) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
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
    console.log('session', session);
    if (!session?.user) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = '/login';
      loginUrl.searchParams.set('next', req.nextUrl.pathname + req.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
  } catch {
    // If Supabase throws, fall back to cookie check
    const hasAccess = !!req.cookies.get('sb-access-token')?.value;
    const hasRefresh = !!req.cookies.get('sb-refresh-token')?.value;
    if (!hasAccess && !hasRefresh) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
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
    // Protect API routes except public endpoints
    '/api/:path*',
    // Protect app routes
    '/protected/:path*',
    // PDF preview route (will be checked for public access above)
    '/pdf-preview/:path*',
  ],
};
