import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const GITHUB_REPO = 'Albion-Editor/ALBION';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

/**
 * Maps platform slugs to asset filename patterns.
 * GET /api/download/windows → redirects to .exe
 * GET /api/download/macos   → redirects to .dmg
 * GET /api/download/linux   → redirects to .AppImage
 * GET /api/download/linux-deb → redirects to .deb
 * GET /api/download/macos-zip → redirects to .zip
 */
const PLATFORM_PATTERNS: Record<string, string> = {
  windows: '.exe',
  macos: '.dmg',
  'macos-zip': '.zip',
  linux: '.AppImage',
  'linux-deb': '.deb',
};

export async function GET(
  _request: Request,
  { params }: { params: { platform: string } }
) {
  const platform = params.platform?.toLowerCase();

  if (!platform || !PLATFORM_PATTERNS[platform]) {
    return NextResponse.json(
      { error: 'Invalid platform. Use: windows, macos, macos-zip, linux, linux-deb' },
      { status: 400 }
    );
  }

  const ext = PLATFORM_PATTERNS[platform];

  try {
    // Fetch latest release from GitHub API
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'Albion-Website/1.0',
    };
    if (GITHUB_TOKEN) {
      headers.Authorization = `token ${GITHUB_TOKEN}`;
    }

    const releaseRes = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
      { headers, next: { revalidate: 300 } } // cache for 5 minutes
    );

    if (!releaseRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch release info from GitHub', status: releaseRes.status },
        { status: 502 }
      );
    }

    const release = await releaseRes.json();
    const asset = release.assets?.find((a: any) => a.name.endsWith(ext));

    if (!asset) {
      return NextResponse.json(
        { error: `No ${ext} asset found in release ${release.tag_name}` },
        { status: 404 }
      );
    }

    // For public repos, redirect directly to the browser_download_url
    // For private repos, we need to use the GitHub API URL with auth
    if (GITHUB_TOKEN) {
      // Fetch the actual binary through the API and stream it
      const assetRes = await fetch(asset.url, {
        headers: {
          ...headers,
          Accept: 'application/octet-stream',
        },
        redirect: 'follow',
      });

      if (!assetRes.ok) {
        return NextResponse.json(
          { error: 'Failed to download asset' },
          { status: 502 }
        );
      }

      // Redirect to the resolved URL (GitHub API returns a temporary S3 URL)
      return new NextResponse(assetRes.body, {
        status: 200,
        headers: {
          'Content-Type': 'application/octet-stream',
          'Content-Disposition': `attachment; filename="${asset.name}"`,
          'Content-Length': String(asset.size),
          'Cache-Control': 'public, max-age=3600',
        },
      });
    } else {
      // Public repo — just redirect to the download URL
      return NextResponse.redirect(asset.browser_download_url, 302);
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal error fetching release', message: error.message },
      { status: 500 }
    );
  }
}
