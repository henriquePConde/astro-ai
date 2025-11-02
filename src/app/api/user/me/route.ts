import { NextResponse } from 'next/server';
import { getOrCreateCurrentUser, userDto } from '@/backend/features/users';
import { handleError } from '@/backend/core/errors/error-handler';

export async function GET() {
  try {
    const user = await getOrCreateCurrentUser();
    return NextResponse.json(userDto.parse(user));
  } catch (error) {
    return handleError(error);
  }
}
