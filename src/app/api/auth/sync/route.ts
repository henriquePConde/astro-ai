// src/app/api/auth/sync/route.ts
import { NextResponse } from 'next/server';
import { syncSession } from '@/backend/features/auth';
import { handleError } from '@/backend/core/errors/error-handler';

export async function POST(req: Request) {
  try {
    const input = await req.json();
    const result = await syncSession(input);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}
