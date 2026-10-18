import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const RAILWAY_HEALTH_URL =
  process.env.RAILWAY_BACKEND_URL ||
  'https://albion-backend-production-a88e.up.railway.app/health';

export async function GET(request: Request) {
  const startTime = Date.now();
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  // If CRON_SECRET is configured in Vercel, verify it for incoming automated cron calls.
  // We allow requests without secret if CRON_SECRET is not configured or for manual healthchecks.
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // Optionally log or allow manual checks with ?key= or check origin
    const url = new URL(request.url);
    const keyParam = url.searchParams.get('key');
    if (keyParam !== cronSecret) {
      return NextResponse.json(
        { error: 'Unauthorized: invalid or missing cron secret' },
        { status: 401 }
      );
    }
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(RAILWAY_HEALTH_URL, {
      method: 'GET',
      headers: {
        'User-Agent': 'Albion-Vercel-KeepAlive/1.0',
        'Cache-Control': 'no-cache',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const responseTimeMs = Date.now() - startTime;

    let responseData = null;
    try {
      responseData = await response.json();
    } catch {
      responseData = await response.text();
    }

    return NextResponse.json({
      status: 'success',
      target: RAILWAY_HEALTH_URL,
      statusCode: response.status,
      responseTimeMs,
      timestamp: new Date().toISOString(),
      backendResponse: responseData,
    });
  } catch (error: any) {
    const responseTimeMs = Date.now() - startTime;
    return NextResponse.json(
      {
        status: 'error',
        target: RAILWAY_HEALTH_URL,
        message: error.message || 'Failed to ping backend',
        responseTimeMs,
        timestamp: new Date().toISOString(),
      },
      { status: 502 }
    );
  }
}
