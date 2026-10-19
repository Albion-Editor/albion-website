import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const ADMIN_SECRET = process.env.ADMIN_SECRET || 'albion_founder_2026';

export function middleware(request: NextRequest) {
  // Pass through - the /admin page renders an executive cryptographic passkey lock screen,
  // and the backend API routes (/api/admin/* and /api/feedback GET/PATCH) strictly reject
  // any unauthenticated request with 401 Unauthorized.
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
