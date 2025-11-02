// src/app/api/auth/sync/route.ts
import { NextResponse } from 'next/server';
import { supabaseServerMutable } from '@/backend/core/db/supabase-server-mutable';

export async function POST(req: Request) {
  try {
    const { access_token, refresh_token } = await req.json();

    if (!access_token || !refresh_token) {
      return NextResponse.json({ message: 'Missing tokens' }, { status: 400 });
    }

    const supabase = await supabaseServerMutable();
    const { error } = await supabase.auth.setSession({ access_token, refresh_token });
    if (error) return NextResponse.json({ message: error.message }, { status: 400 });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message ?? 'Bad Request' }, { status: 400 });
  }
}
