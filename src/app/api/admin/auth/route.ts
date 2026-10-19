import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_SECRET } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { passkey } = body;

    if (!passkey || typeof passkey !== 'string') {
      return NextResponse.json({ ok: false, error: 'Passkey is required' }, { status: 400 });
    }

    if (passkey.trim() !== ADMIN_SECRET.trim()) {
      return NextResponse.json({ ok: false, error: 'Access denied: Invalid master passkey' }, { status: 401 });
    }

    // Passkey matches -> set secure session cookie
    const response = NextResponse.json({ ok: true, message: 'Founder authenticated' });
    response.cookies.set('admin_session', ADMIN_SECRET.trim(), {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days session
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  // Logout / Lock console
  const response = NextResponse.json({ ok: true, message: 'Console locked' });
  response.cookies.delete('admin_session');
  response.cookies.delete('admin_email');
  return response;
}
