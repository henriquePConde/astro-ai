// src/app/api/auth/signout/route.ts
import { NextResponse } from 'next/server';
import { signOut } from '@/backend/features/auth';
import { handleError } from '@/backend/core/errors/error-handler';

/**
 * Idempotent sign-out:
 * - If a session exists: revoke via Supabase and clear cookies.
 * - If no session: still clear any sb-* cookies and return 200.
 */
export async function POST() {
  try {
    const result = await signOut();
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
