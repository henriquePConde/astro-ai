import { NextResponse } from 'next/server';
import { getOrCreateCurrentUser } from '@/backend/features/users';
import { userDto } from '@/backend/features/users/http/users.schemas';
import { handleError } from '@/backend/core/errors/error-handler';

export async function GET() {
  try {
    const user = await getOrCreateCurrentUser();
    // Ensure we only validate once and return a clean object
    const dto = userDto.parse(user);
    return NextResponse.json(dto);
  } catch (error) {
    return handleError(error);
  }
}
