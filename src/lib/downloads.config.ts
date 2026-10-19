export interface PlatformDownload {
  platformId: "windows" | "macos" | "linux";
  title: string;
  osName: string;
  badge?: string;
  version: string;
  format: string;
  sizeMB?: number;
  sha256?: string;
  url?: string;
  altUrl?: string;
  altFormat?: string;
  isAvailable: boolean;
  installGuide: string[];
}

/**
 * GitHub owner/repo for release asset URLs.
 * All download links point to the public GitHub Releases page.
 */
const GITHUB_REPO = "Marcdev001/ALBION";
const VERSION = "0.0.46";

// Use the proxy API route so downloads work for both public and private repos.
// The proxy auto-resolves the latest release from GitHub.
const DOWNLOAD_BASE = "/api/download";

export const DOWNLOADS_CONFIG: PlatformDownload[] = [
  {
    platformId: "windows",
    title: "Windows",
    osName: "Windows",
    badge: "Available",
    version: `v${VERSION}`,
    format: "64-bit Installer (.exe)",
    sizeMB: 143,
    url: `${DOWNLOAD_BASE}/windows`,
    isAvailable: true,
    installGuide: [
      `Run the downloaded Albion-${VERSION}-x64.exe installer.`,
      "If Windows SmartScreen prompts: Click 'More info' → 'Run anyway'.",
      "Launch Albion and start with the free tier — no card required.",
    ],
  },
  {
    platformId: "macos",
    title: "macOS",
    osName: "macOS",
    badge: "Available",
    version: `v${VERSION}`,
    format: "Apple Silicon DMG (.dmg)",
    sizeMB: 168,
    url: `${DOWNLOAD_BASE}/macos`,
    altUrl: `${DOWNLOAD_BASE}/macos-zip`,
    altFormat: "ZIP Archive",
    isAvailable: true,
    installGuide: [
      "Mount the DMG and drag Albion into your Applications folder.",
      "On initial launch, if Gatekeeper warns: Right-click Albion.app → Open.",
    ],
  },
  {
    platformId: "linux",
    title: "Linux",
    osName: "Linux",
    badge: "Available",
    version: `v${VERSION}`,
    format: "AppImage (x86_64)",
    sizeMB: 184,
    url: `${DOWNLOAD_BASE}/linux`,
    altUrl: `${DOWNLOAD_BASE}/linux-deb`,
    altFormat: ".deb Package",
    isAvailable: true,
    installGuide: [
      `Grant execute permissions: chmod +x Albion-${VERSION}-x86_64.AppImage`,
      "Execute the binary directly from terminal or application launcher.",
      `Or install the .deb package: sudo dpkg -i Albion-${VERSION}-amd64.deb`,
    ],
  },
];
