import { NextRequest } from 'next/server';

export const ADMIN_SECRET = process.env.ADMIN_SECRET || 'albion_founder_2026';

export function isAuthorizedAdmin(request: NextRequest): boolean {
  // 1. Check HTTP-only admin session cookie
  const cookieSession = request.cookies.get('admin_session')?.value;
  if (cookieSession && cookieSession === ADMIN_SECRET) {
    return true;
  }

  // 2. Check Authorization header: Bearer <ADMIN_SECRET>
  const authHeader = request.headers.get('authorization');
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (token === ADMIN_SECRET) {
      return true;
    }
  }

  // 3. Check custom header x-admin-key
  const adminKey = request.headers.get('x-admin-key');
  if (adminKey && adminKey.trim() === ADMIN_SECRET) {
    return true;
  }

  return false;
}
