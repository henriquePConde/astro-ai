import { NextRequest } from 'next/server';
import { interpretBody } from '@/backend/features/interpretation/http/interpretation.schemas';
import { interpretChartUseCase } from '@/backend/features/interpretation';
import { getSessionUser } from '@/backend/core/auth/get-session';
import { unauthorized } from '@/backend/core/errors/http-errors';

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();
    const input = interpretBody.parse(body);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of interpretChartUseCase(
            input.message,
            input.context,
            input.chatHistory,
          )) {
            controller.enqueue(new TextEncoder().encode(chunk));
          }
          controller.close();
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          controller.error(new Error(errorMessage));
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Invalid request';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
