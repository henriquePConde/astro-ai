// astro-ai-fullstack/src/backend/core/errors/error-handler.ts
import { NextResponse } from 'next/server';
import { HttpError } from '@/backend/core/errors/http-errors';

export function handleError(err: unknown) {
  const e = err as (HttpError & { stack?: string; code?: string; meta?: any }) | undefined;
  const status = (e as any)?.status ?? 500;

  if (process.env.NODE_ENV !== 'production') {
    const msg = e?.message ?? 'Unknown error';
    const code = (e as any)?.code;
    console.error(`[handleError] status=${status} code=${code ?? 'n/a'} msg=${msg}`);
    if (e?.stack) {
      const firstLine = e.stack.split('\n')[1]?.trim() ?? '';
      console.error(`[handleError] at ${firstLine}`);
    }
  }

  const body =
    process.env.NODE_ENV === 'production'
      ? { message: e?.message ?? 'Internal Server Error' }
      : {
        message: e?.message ?? 'Internal Server Error',
        code: (e as any)?.code,
        meta: (e as any)?.meta,
        stack: e?.stack?.split('\n').slice(0, 6).join('\n'),
      };

  return NextResponse.json(body, { status });
}
