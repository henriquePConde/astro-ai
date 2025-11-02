import { NextResponse } from 'next/server';
import { getOrCreateCurrentUser } from '@/backend/features/users';

export async function GET() {
  try {
    const user = await getOrCreateCurrentUser();
    return NextResponse.json(user);
  } catch (e: any) {
    const status = e?.status ?? (e?.message === 'Unauthorized' ? 401 : 500);
    return NextResponse.json({ message: e?.message ?? 'Error' }, { status });
  }
}
