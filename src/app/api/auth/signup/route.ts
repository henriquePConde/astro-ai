import { NextRequest, NextResponse } from 'next/server';
import { supabaseServerMutable } from '@/backend/core/db/supabase-server-mutable';
import { makeUsersRepo } from '@/backend/features/users/infra/users.repo';
import { handleError } from '@/backend/core/errors/error-handler';
import { z } from 'zod';

const signupBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

/**
 * Server-side signup endpoint that:
 * 1. Creates the user in Supabase Auth
 * 2. Ensures the user exists in Prisma database
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = signupBodySchema.parse(body);

    // Create user in Supabase Auth
    const supabase = await supabaseServerMutable();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      // Check if the error indicates user already exists
      const errorMessage = authError.message.toLowerCase();
      const isUserExistsError =
        errorMessage.includes('user already registered') ||
        errorMessage.includes('already registered') ||
        errorMessage.includes('email already exists') ||
        errorMessage.includes('user already exists');

      if (isUserExistsError) {
        return NextResponse.json(
          { error: 'User already exists', code: 'USER_EXISTS' },
          { status: 400 },
        );
      }

      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }

    // Ensure user exists in Prisma database
    // Use the Supabase user ID and email to create/ensure the user exists
    // This is important even if email confirmation is required
    try {
      const usersRepo = await makeUsersRepo();
      await usersRepo.ensureUser({
        userId: authData.user.id,
        email: authData.user.email || email,
        name: authData.user.user_metadata?.name || null,
      });
    } catch (userError) {
      // If user creation in Prisma fails, log but don't fail the signup
      // The user exists in Supabase Auth, they can be created in Prisma later
      console.error('[signup] Failed to create user in Prisma:', userError);
    }

    // Return user data and session (session may be null if email confirmation is required)
    return NextResponse.json({
      user: {
        id: authData.user.id,
        email: authData.user.email,
      },
      session: authData.session,
      // Include this flag if email confirmation is required
      requiresEmailConfirmation: !authData.session,
    });
  } catch (error) {
    return handleError(error);
  }
}
