import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      // Empty body
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const pagePath = body.pagePath || '/';

    // Best-effort insert into Supabase site_visitors
    const { error } = await supabaseAdmin.from('site_visitors').insert([
      {
        ip_address: ip,
        user_agent: userAgent,
        page_path: pagePath,
        visited_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      // Table might not exist yet or connection issue; silently succeed for telemetry
      return NextResponse.json({ ok: true, stored: false });
    }

    return NextResponse.json({ ok: true, stored: true });
  } catch (err: any) {
    return NextResponse.json({ ok: true, error: err.message }, { status: 200 });
  }
}
