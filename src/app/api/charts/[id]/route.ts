import { NextRequest, NextResponse } from 'next/server';
import { getChartById, deleteChart } from '@/backend/features/charts';
import { handleError } from '@/backend/core/errors/error-handler';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized } from '@/backend/core/errors/http-errors';
import { getOrCreateCurrentUser } from '@/backend/features/users';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getSessionUser();
    if (!authUser) {
      throw unauthorized();
    }

    const user = await getOrCreateCurrentUser();
    const { id } = await params;

    const result = await getChartById(id, user.id);
    return NextResponse.json(result);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const authUser = await getSessionUser();
    if (!authUser) {
      throw unauthorized();
    }

    const user = await getOrCreateCurrentUser();
    const { id } = await params;

    await deleteChart(id, user.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
}
