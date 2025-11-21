import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { env } from '@/backend/core/config/env';
import { prisma } from '@/backend/core/db/prisma';
import { z } from 'zod';

const checkUserQuerySchema = z.object({
  email: z.string().email(),
});

/**
 * API endpoint to check if a user exists by email.
 * Uses Supabase Admin API if available, otherwise falls back to Prisma database.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    // Validate email format
    const validationResult = checkUserQuerySchema.safeParse({ email });
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Try Supabase Admin API first if service role key is available
    if (env.SUPABASE_SERVICE_ROLE_KEY) {
      try {
        // Create admin client with service role key
        const supabaseAdmin = createClient(
          env.NEXT_PUBLIC_SUPABASE_URL,
          env.SUPABASE_SERVICE_ROLE_KEY,
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false,
            },
          },
        );

        // List users with email filter
        // Note: Supabase Admin API doesn't have a direct getUserByEmail,
        // so we use listUsers with a filter
        const { data, error } = await supabaseAdmin.auth.admin.listUsers();

        if (error) {
          console.error('[check-user] Error listing users from Supabase:', error);
          // Fall through to Prisma check
        } else {
          // Check if any user has the matching email (case-insensitive)
          const userExists = data.users.some(
            (user) => user.email?.toLowerCase() === email.toLowerCase(),
          );
          return NextResponse.json({ exists: userExists });
        }
      } catch (supabaseError) {
        console.error('[check-user] Error with Supabase Admin API:', supabaseError);
        // Fall through to Prisma check
      }
    }

    // Fallback: Check Prisma database
    // This is less accurate but works when service role key is not configured
    try {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });
      return NextResponse.json({ exists: !!user });
    } catch (prismaError) {
      console.error('[check-user] Error checking Prisma database:', prismaError);
      return NextResponse.json({ error: 'Failed to check user existence' }, { status: 500 });
    }
  } catch (error) {
    console.error('[check-user] Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
