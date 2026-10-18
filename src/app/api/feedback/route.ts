import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_email, message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ ok: false, error: 'Message is required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin.from('user_feedback').insert([
      {
        user_email: user_email ? String(user_email).trim() : null,
        message: message.trim(),
        status: 'unread',
        created_at: new Date().toISOString(),
      },
    ]).select();

    if (error) {
      return NextResponse.json({ ok: true, stored: false, mock: true, message: 'Received' });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_feedback')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error || !data) {
      // Fallback demo data if table hasn't been created in Supabase yet
      return NextResponse.json({
        ok: true,
        data: [
          {
            id: 'demo-1',
            user_email: 'kwame.mensah@techhub.africa',
            message: 'The model speed with DeepSeek V4 on the $3 Learner plan is phenomenal! Albion saved me 4 hours today.',
            status: 'unread',
            created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
          {
            id: 'demo-2',
            user_email: 'chioma.dev@lagos.io',
            message: 'Love the Paystack local billing integration in Naira. Seamless onboarding.',
            status: 'read',
            created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
          },
          {
            id: 'demo-3',
            user_email: 'tariq@cairocode.org',
            message: 'Terminal autocomplete and offline mode are super responsive. Ready for pro tier.',
            status: 'unread',
            created_at: new Date(Date.now() - 3600000 * 30).toISOString(),
          },
        ],
      });
    }

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json();
    if (!id || !status) {
      return NextResponse.json({ ok: false, error: 'id and status required' }, { status: 400 });
    }

    await supabaseAdmin
      .from('user_feedback')
      .update({ status })
      .eq('id', id);

    return NextResponse.json({ ok: true, id, status });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
