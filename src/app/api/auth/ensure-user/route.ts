import { NextRequest, NextResponse } from 'next/server';
import { supabaseServerMutable } from '@/backend/core/db/supabase-server-mutable';
import { makeUsersRepo } from '@/backend/features/users/infra/users.repo';
import { handleError } from '@/backend/core/errors/error-handler';
import { z } from 'zod';
import { createServerClient } from '@supabase/ssr';

const ensureUserBodySchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  name: z.string().nullable().optional(),
});

/**
 * API endpoint to ensure a user exists in Prisma database.
 * Called after OAuth authentication to sync user data.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, email, name } = ensureUserBodySchema.parse(body);

    // Verify the user is authenticated via Bearer token or session cookie
    const authHeader = req.headers.get('authorization');
    let session = null;

    if (authHeader?.startsWith('Bearer ')) {
      // Verify Bearer token
      const token = authHeader.substring(7);
      const supabase = await supabaseServerMutable();
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (error || !user || user.id !== userId) {
        return NextResponse.json({ error: 'Invalid token or user mismatch' }, { status: 401 });
      }
    } else {
      // Try to get session from cookies
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (url && anon) {
        const res = NextResponse.next();
        const supabase = createServerClient(url, anon, {
          cookies: {
            getAll() {
              return req.cookies.getAll().map(({ name, value }) => ({ name, value }));
            },
            setAll() {
              // Not needed for read-only operation
            },
          },
        });

        const {
          data: { session: cookieSession },
        } = await supabase.auth.getSession();
        session = cookieSession;

        if (session && userId !== session.user.id) {
          return NextResponse.json({ error: 'User ID mismatch' }, { status: 403 });
        }
      }
    }

    // Ensure user exists in Prisma database
    try {
      const usersRepo = await makeUsersRepo();
      const user = await usersRepo.ensureUser({
        userId,
        email,
        name: name ?? null,
      });

      console.log('[ensure-user] User ensured in Prisma:', {
        userId,
        email,
        created: !!user,
      });

      return NextResponse.json({ success: true, user: { id: user.id, email: user.email } });
    } catch (userError) {
      console.error('[ensure-user] Failed to ensure user in Prisma:', {
        userId,
        email,
        error: userError instanceof Error ? userError.message : String(userError),
        stack: userError instanceof Error ? userError.stack : undefined,
      });
      return NextResponse.json(
        {
          error: 'Failed to create user',
          details: userError instanceof Error ? userError.message : String(userError),
        },
        { status: 500 },
      );
    }
  } catch (error) {
    return handleError(error);
  }
}
