import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const FOUNDER_EMAIL = process.env.ADMIN_EMAIL || process.env.FOUNDER_EMAIL || 'founder@albion.dev';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/admin')) {
    const queryEmail = request.nextUrl.searchParams.get('email') || request.nextUrl.searchParams.get('admin');
    const cookieEmail = request.cookies.get('admin_email')?.value;
    const headerEmail = request.headers.get('x-admin-email');

    const email = queryEmail || cookieEmail || headerEmail;

    // HARD RULE: Only allow access if email exactly matches the founder's email
    if (email && email.toLowerCase().trim() === FOUNDER_EMAIL.toLowerCase().trim()) {
      const response = NextResponse.next();
      if (queryEmail && !cookieEmail) {
        response.cookies.set('admin_email', queryEmail.trim(), {
          path: '/',
          httpOnly: true,
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });
      }
      return response;
    }

    // Redirect any unauthorized user directly to homepage
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
