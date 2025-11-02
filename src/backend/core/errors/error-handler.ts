import { NextResponse } from 'next/server';
import { HttpError } from './http-errors';

/**
 * Maps errors to NextResponse for consistent error handling across route handlers.
 */
export function handleError(error: unknown): NextResponse {
  // If it's already an HttpError, use it
  if (error instanceof HttpError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  // If it's a Zod error (validation), return 400
  if (error && typeof error === 'object' && 'issues' in error) {
    return NextResponse.json({ message: 'Validation error', details: error }, { status: 400 });
  }

  // Handle specific error messages
  if (error instanceof Error) {
    const message = error.message;
    if (message === 'Unauthorized') {
      return NextResponse.json({ message }, { status: 401 });
    }
    return NextResponse.json({ message }, { status: 500 });
  }

  // Fallback for unknown errors
  return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
}
